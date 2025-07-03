const {hash,compare}= require('bcryptjs')
require('express-async-errors');
const appError = require('../utils/AppError');
const sqliteConnection=require("../database/sqlite");
const { response } = require('express');

class UserController {
    static async create(req, res) {
        const { name, email, password } = req.body;

        const database= await sqliteConnection();
        const checkUserExist=await database.get("SELECT * FROM users WHERE email = (?)",[email])

        if(checkUserExist){
            throw new appError("Este email já está em uso.")
        }

        const hashedPassword=await hash(password, 8)

        await database.run("INSERT INTO users(name,password,email) VALUES(?,?,?);",[name,hashedPassword,email])

        return res.status(201).json()
    }
    static async update(req, res) {
        const {name,email, password, old_password}=req.body
        const {id}=req.params

        const database=await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id=(?)", [id])
        console.log(await compare(old_password,user.password))
        if(!user){
            throw new appError("Usuário não encontrado")
        }

        const userWithUpdatedEmail=await database.get("SELECT * FROM users WHERE email=(?) and id!=?",[email,id])
        if(userWithUpdatedEmail){
            throw new appError("Este email já está em uso")
        }

        if(name){
            user.name=name
        }
        if(email){
            user.email=email
        }
        if(password && !old_password){
            throw new appError("Você precisa da senha antiga para atualizar para uma nova")
        }
        else if(password && old_password){
            console.log("entrou")
            const checkOldPassword= await compare(old_password,user.password)
            console.log(checkOldPassword)
            if(!checkOldPassword){
                throw new appError("A senha antiga não confere")
            }

            user.password=await hash(password,8)
        }
        
        await database.run (`
            UPDATE users SET
            name=?,
            email=?,
            password=?,
            updated_at=DATETIME('now')
            WHERE id=?`,
        [user.name,user.email,user.password, id])

        return res.status(200).json();
    }
}

module.exports = UserController;
