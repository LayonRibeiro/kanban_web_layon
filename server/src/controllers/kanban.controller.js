import { createService, findAllService } from "../services/kanban.service.js";

console.log("To aqui primeiro")
const create = async (req, res) => {
    console.log("entrou")
    try {
        const { title, content } = req.body;
        console.log(req.body)

        if (!title || !content) {
            return res.status(400).send({ message: "Submmit all fields for registration" })
        }

        await createService({
            title,
            content,
            owner: "objectIdFake",
        });

        res.status(201).send({ message: "Kanban created successfully" })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }

};

const findAll = (req, res) => {
    const kanbans = [];
    res.send(kanbans);
}

export { create, findAll }