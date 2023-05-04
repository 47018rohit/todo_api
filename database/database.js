import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        const connect = await mongoose.connect( process.env.MONGO_URI , { dbName: 'BackendAPI' })
        if (connect) console.log(`database Connected ${connect.connection.host}`); 
    }
    catch (e) {
        console.log(e)
    }
}