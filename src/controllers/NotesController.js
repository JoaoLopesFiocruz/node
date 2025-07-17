const knex= require("../database/knex")

class NotesController{
    static async create(req,res){
        const {title,descriptions,tags,links}=req.body;
        var {user_id}=req.params;

        var note_id = await knex("notes").insert({
            title,descriptions,user_id
        })
        note_id=note_id[0]
        const linksIsnert = links.map(link=>{
            return{
                note_id,
                url:link
            }
        })
        await knex("links").insert(linksIsnert)
        
        console.log(note_id)
        const tagsIsnert = tags.map(name=>{
            return{
                note_id,
                name,
                user_id
            }
        })
        await knex("tags").insert(tagsIsnert)
        res.json();
    }
    static async show(req,res){
        const {id}=req.params
        const note=await knex("notes").where({id}).first();
        const tags= await knex("tags").where({note_id:id}).orderBy("name");
        const links= await knex("links").where({note_id:id}).orderBy("created_at");
        return res.json({
            ...note,
            tags,
            links
        })
    }
    static async delete(req,res){
        const {id}=req.params

        await knex("notes").where({id}).delete();
        return res.json("operação sucedida")
    }
    static async index(req,res){
        const {user_id,title,tags}=req.query;

        let notes;
        if(tags){
            const filterTags=tags.split(",").map(tag=>tag.trim())
            console.log(filterTags)
            notes=await knex("tags")
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id"
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.title",`%${title}%`)
            .whereIn("name",filterTags)
            .innerJoin("notes","notes.id","tags.note_id")
            .orderBy("notes.title")
        }
        else{
            notes= await knex("notes")
            .where({user_id})
            .whereLike("title",`%${title}%`)
            .orderBy("title")
        }
        return res.json(notes)
    }
}

module.exports=NotesController