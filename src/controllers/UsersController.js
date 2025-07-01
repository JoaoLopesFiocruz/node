const appError = require('../utils/AppError');
const sqliteConnection=require("../database/sqlite")
class UserController {
    static async create(req, res) {
        const { name, email, password } = req.body;

        const database= await sqliteConnection();
        const checkUserExist=await database.get("SELECT * FROM users WHERE email = (?)",[email])

        if(checkUserExist){
            throw new appError("Este email já está em uso.")
        }
        await database.run("INSERT INTO users(name,password,email) VALUES(?,?,?);",[name,password,email])

        return res.status(201).json()
    }
}

module.exports = UserController;
