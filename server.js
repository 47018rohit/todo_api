import { app } from "./app.js";
import { connectDB } from "./database/database.js";

connectDB()

app.listen(process.env.PORT, () => {
    console.log(`server connected to ${process.env.PORT} at ${process.env.NODE_MODE} mode`)
})