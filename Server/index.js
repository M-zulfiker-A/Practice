import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import CommentRouter from "./Router/CommentRouter.js"
import UserRouter from "./Router/UserRouter.js"
import PostsRouter from "./Router/PostRouter.js"
import dotenv from "dotenv"
import { log } from "console"

const app = express()
app.use(express.json())
dotenv.config()

const connectDB = ()=>{
    try{
        mongoose.connect(process.env.MONGO_URL)
        log("DB COnnected")
    }catch{
        log("connections failure");
    }
}

app.use("/",(req, res, next)=>{
    log("home")
    next()
})

app.use("/api/comments",CommentRouter)
app.use("/api/posts",PostsRouter)
app.use("/api/users",UserRouter)
app.use((err, req, res, next)=>{
    res.json({
        message : err.message || "Something went wrong",
        status : err.status || 500
    })
})

app.listen(8000, ()=>{
    connectDB()
    log("Server listening")
})