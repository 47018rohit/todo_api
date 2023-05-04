import ErrorHandler from "../middlewares/error.js";
import Task from "../models/task.js";


export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body
        const createTask = await Task.create({
            title,
            description,
            user: req.user
        })

        if (!createTask) return next(new ErrorHandler("Something went wrong", 400))

        res.status(201).json({
            success: true,
            message: 'task created successfully'
        })
    } catch (error) {
        next(error)
    }
}

export const getallTask = async (req, res, next) => {
    try {
        const userId = req.user._id
        const task = await Task.find({ user: userId })

        if (!task) return next(new ErrorHandler("task not found", 404))

        res.json({
            success: true,
            task
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        if (!task) return next(new ErrorHandler("task not found", 404))

        task.isCompleted = !task.isCompleted

        await task.save()

        res.json({
            success: true
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)

        if (!task) return next(new ErrorHandler("task not found", 404))

        await task.deleteOne()

        res.json({
            success: true
        })
    } catch (error) {
        next(error)
    }
}