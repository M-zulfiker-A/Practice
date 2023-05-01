import User from "../Schema/UserSchema.js";
import express, { Router } from "express"
import { log } from "console";
import bodyParser from "body-parser";

const router = Router()

router.get("/:userId",async(req, res,next)=>{
    if(req.params.userId !== null){
        try {
            const data =  await User.findById(req.params.userId)
            res.json(data).status(200)
        } catch (error) {
            res.json({
                message : "Error while fetching user data",
                details : error.message
            }).status(404)
        }
    }else{
        try {
            const data =  await User.findBy({})
            res.json(data).status(200)
        } catch (error) {
            res.json({
                message : "Error while fetching user data",
                details : error.message
            }).status(404)
        }
    }
    
})

router.post("/",async(req, res, next)=>{
    const {name , password , email } = req.body
    log(req.body)
    log(req.query)
    try{
        const data =  await User.create({name , password , email})
        res.json(data).status(200)
    }catch(err){
        next(err)
    }
})


router.put("/:userId",async(req, res, next)=>{
    const userId = req.params.userId
    if(!userId){
        res.json({
            messsge : "user id required"
        }).status(401)
        return
    }
    try{
        const data = await User.findByIdAndUpdate(userId, req.body)
        res.json({
            message : "Values updates",
        })
    }catch(err){
        next(err)
    }
})

router.delete("/:userid",async (req,res, next)=>{
    const userId = req.params.userid
    try{
        await User.findByIdAndDelete(userId)
        res.json({
            message : 'User deleted',
        })
    }catch(err){
        next(err)
    }
})


export default router
