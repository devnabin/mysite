const express = require('express')
const router = new express.Router()
const Task = require('../database/model/taskmodel')
const auth =require('../auth/auth')



router.get('/me/task', (req , res)=>{
    res.render('task')
 })
 


router.post('/me/task' ,async (req , res)=>{
   try {
       const task =await Task(req.body)
       await task.save();
       res.status(200).send(task)
   } catch (error) {
      console.log(error) 
   } 
})







module.exports = router;