import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import { handleError } from "./middlewares/error.js";
import cors from "cors"

export const app = express()
config({
    path: './database/config.env'
})

// middleware to use json   sequence needs to be correct
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

// Using Routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/task', taskRouter)

app.get('/', (req, res) => {
    res.send('home page')
})

// Error middleware
app.use(handleError)


