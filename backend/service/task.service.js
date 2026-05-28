import { Task } from "../model/index.js";

export async function createTask(body) {
    return await Task.create(body);
}

export async function getTaskList(
    query = {},
    projection = {},
    options = {}
) {
    return await Task.find(query, projection, options).lean();
}

export async function getTask(
    query,
    projection = {}
) {
    return await Task.findOne(query, projection).lean();
}

export async function updateTask(query, body) {
    return await Task.findOneAndUpdate(
        query,
        body,
        {
            new: true,
            runValidators: true
        }
    ).lean();
}

export async function deleteTask(query) {
    return await Task.findOneAndDelete(query).lean();
}