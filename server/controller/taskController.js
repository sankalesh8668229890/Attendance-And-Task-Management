const mongoose = require('mongoose');
const TaskModel = require('../model/task');


const newTask = async (req, res) => {
    try {
        const data = req.body
        const { name, description, assignedTo } = data;
        const result = await TaskModel.create(data)
        return res.status(200).json({ status: true, message: "Task created successfully", data: result });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const data = req.body;
        const taskId = req.params.id

        const task = await TaskModel.findById(taskId)
        if (!task) {
            return res.status(404).json({ status: false, message: "Task not found" });
        }
        let updatedData = await TaskModel.findOneAndUpdate({ _id: taskId }, { ...data }, { new: true })
        return res.status(200).send({ status: true, message: "data updated successfully", data: updatedData });
    } catch (error) {
        return res.status(500).json({ status: false, message: err.message });

    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id
        const task = await TaskModel.findById(taskId)
        if (!task) {
            return res.status(404).json({ status: false, message: "Task not found" });
        }
        const result = await TaskModel.findOneAndRemove({ _id: taskId });
        return res.status(200).send({ status: true, message: "delete task successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = { newTask, updateTask, deleteTask }