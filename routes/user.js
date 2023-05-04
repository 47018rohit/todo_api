import express from 'express'
import { createUser, getMyProfile, loginUser, logout } from '../controller/user.js'
import { isAuthenticated } from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/new', createUser)

userRouter.post('/login', loginUser)

userRouter.get('/me', isAuthenticated, getMyProfile)

userRouter.get('/logout', logout)

export default userRouter