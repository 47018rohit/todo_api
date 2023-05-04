import jwt  from "jsonwebtoken"


export const sendCokiee = (res , user )=>{
    const token = jwt.sign({_id: user._id} , process.env.JWT_SECRET)

    res.cookie("token",token , {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
        sameSite: process.env.NODE_MODE === 'Development'? 'lax': 'none' ,
        secure: process.env.NODE_MODE === 'Development'? false: true
    } )
}