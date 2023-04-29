import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"

const router = express.Router()

router.get("/",(req, res,next)=>{
    res.send("hello")
})


export default router