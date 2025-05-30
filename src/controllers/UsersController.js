import appError from '../utils/AppError.js';
class UserController{
    static create(input,response){
        const { name, email, password } = input.body;

        if(!name){
            throw new appError("o nome é obrigatório");
        }

        response.status(201).json({ name, email, password});
    }
}

export default UserController