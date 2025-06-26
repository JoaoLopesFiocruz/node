const appError = require('../utils/AppError');

class UserController {
    static create(req, res) {
        const { name, email, password } = req.body;

        if (!name) {
            throw new appError("O nome é obrigatório");
        }

        res.status(201).json({ name, email, password });
    }
}

module.exports = UserController;
