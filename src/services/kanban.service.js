import Kanban from "../models/kanban.js";

const createService = async (body) => Kanban.create(body);

const findAllService = async () => Kanban.find();

export { createService, findAllService };