import User from "../models/user.js"
import bcrypt from 'bcrypt'
import { sendCokiee } from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js"



export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        let user = await User.findOne({ email })
        if (user) return next(new ErrorHandler('User Already exist', 409))

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hashedPassword })
        if (user) return res.status(201).json({
            success: true,
            message: 'User Created'
        })
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({ email }).select("+password")
        if (!user) return next(new ErrorHandler('Invalid email or password', 400))

        let passMatch = await bcrypt.compare(password, user.password)

        if (!passMatch) return next(new ErrorHandler('Invalid email or password', 400))

        sendCokiee(res, user)

        res.status(200).json({
            success: true,
            message: `login succesfully , Welcome ${user.name} `
        })
    } catch (error) {
        next(error)
    }
}

export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}

export const logout = (req, res) => {
    res.cookie('token', "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_MODE === 'Development' ? 'lax' : 'none',
        secure: process.env.NODE_MODE === 'Development' ? false : true
    })
        .status(200)
        .json({
            success: true,
            message: 'Logged Out'
        })
}