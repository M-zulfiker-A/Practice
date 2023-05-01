import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import { Comments } from "../Schema/CommentSchema.js"

const router = express.Router()


router.get("/",async (req, res,next)=>{
    try {
        const data = await Comments.find({})
        res.json({
            mesage : "Comments added",
            data
        })
    } catch (error) {
        next(error)
    }
})

router.get("/:id",async (req, res,next)=>{
    try {
        const data = await Comments.find({ _id : req.params.id})
        res.json({
            mesage : "Comments found",
            data
        })
    } catch (error) {
        next(error)
    }
})

router.put("/:id",async (req, res,next)=>{
    try {
        const data = await Comments.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            mesage : "Comments edited",
            data
        })
    } catch (error) {
        next(error)
    }
})

router.delete("/:id",async (req, res,next)=>{
    try {
        const data = await Comments.findByIdAndDelete(req.params.id)
        res.json({
            mesage : "Comments deleted",
            data
        })
    } catch (error) {
        next(error)
    }
})





export default router