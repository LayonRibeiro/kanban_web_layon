import userService from '../services/user.service.js';


const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;
        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).json({ "message": "Submit all fields for resgistration" })
        }

        const user = await userService.createService(req.body);

        if (!user) {
            return res.status(400).json({ "message": "Error to create user" })
        }

        res.status(201).json({
            message: "User created successfully!",
            user: {
                id: user._id,
                name,
                username,
                email,
                avatar,
                background
            },
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const findAll = async (req, res) => {
    console.log("Estou aqui em user")
    try {
        const users = await userService.findAllService();

        if (!users) {
            return res.status(404).json({ "message": "Users not found" })
        }

        res.status(200).json(users)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

    const findById = async (req, res) => {
        const user = req.user
        res.status(200).json(user)
    }

    const update = async (req, res) => {
        try {
            const { name, username, email, password, avatar, background } = req.body;

            if (!name && !username && !email && !password && !avatar && !background) {
                res.status(400).json({ "message": "Submit at least one fields for update" })
            }

            const { id, user } = req;

            // Atualizando o usuário nessas linhas. Se o campo não for enviado, ele não será atualizado.
            await userService.updateService(
                id,
                name,
                username,
                email,
                password,
                avatar,
                background
            );

            res.status(200).json({ "message": "User updated successfully!" })
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    }

export default { create, findAll, findById, update };