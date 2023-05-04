import express from 'express'
import { deleteTask, getallTask, newTask, updateTask } from '../controller/task.js'
import { isAuthenticated } from '../middlewares/auth.js'


const taskRouter = express.Router()

taskRouter.post('/new', isAuthenticated, newTask)
taskRouter.get('/all', isAuthenticated, getallTask)

taskRouter.route('/:id').put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)

export default taskRouter