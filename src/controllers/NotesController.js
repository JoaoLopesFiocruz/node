const knex= require("../database/knex")

class NotesController{
    static async create(req,res){
        const {title,descriptions,tags,links}=req.body;
        const {user_id}=req.params;

        const note_id = await knex("notes").insert({
            title,descriptions,user_id
        })
        const linksIsnert = links.map(link=>{
            return{
                note_id,
                url:link
            }
        })
        await knex("links").insert(linksIsnert)
        

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
}

module.exports=NotesController