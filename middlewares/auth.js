import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({
        success: false,
        message: 'Not logged in'
    })
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decode._id)
    next();
}