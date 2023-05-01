import User from "../Schema/UserSchema.js";
import express, { Router } from "express"
import { log } from "console";
import { Post } from "../Schema/PostSchema.js";
import { Comments } from "../Schema/CommentSchema.js";

const router = Router()

router.get("/",async (req, res, next)=>{
    const postId = req.query.id
    const query = postId ? { userId : postId} : {}
    try {
        const posts = await Post.find(query)
        res.json({
            message : "found Post",
            posts
        })
    } catch (error) {
        next(error)
    }
})

router.get("/search",async (req, res, next)=>{
    const q = req.query.q
    try {
        const posts = await Post.find({
            $or : 
            [ 
                { title : { $regex : q , $options: 'i'}},
                { content : { $regex : q , $options: 'i'}}
            ]
        })
        res.json({
            message : "found Post",
            posts
        })
    } catch (error) {
        next(error)
    }
})

router.post("/",async (req, res, next)=>{
    try{
        const newPost = await Post.create(req.body)
        res.json({
            message : "New Post created",
            data : newPost
        })
    }catch(err){
        next(err)
    }
})

router.put("/:id", async (req, res, next)=>{
    const postId = req.params.id
    try {
        if(!postId) return res.json({
            message : "Please provide an id"
        })
        const updated = await Post.findByIdAndUpdate(postId, req.body)
        res.json({
            updated
        })
    } catch (error) {
        next(error)
    }
})

router.delete("/:id",async (req, res, next)=>{
    const postId = req.params.id
    try {
        if(!postId) return res.json({
            message : "Please provide an id"
        })
        const deleted = await Post.findByIdAndDelete(postId)
        res.json({
            deleted
        })
    } catch (error) {
        next(error)
    }
})


router.get("/:postId/comments",async (req, res, next)=>{
    const postId = req.params.postId
    try {
        if(!postId) return res.json({
            message : "Please provide an id"
        })
        const post = await Post.findById(postId)
        const comments = await Comments.find({ postId : post._id })
        res.json({
            comments
        })
    } catch (error) {
        next(error)
    }
})

router.post("/:postId/comments",async (req, res,next)=>{
    const postId = req.params.postId
    try {
        await Comments.create({...req.body, postId : postId})
        res.json({
            mesage : "Comments added to post "+ postId
        })
    } catch (error) {
        next(error)
    }
})








export default router