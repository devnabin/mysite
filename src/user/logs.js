const express = require('express')
const router = new express.Router()
const User = require('../database/model/Usermodel')


//Login Page
router.get('/login', (req,res)=>{

    res.render('login');
  })
  

  //Login post 
router.post('/login', async (req,res)=>{
  try {
    console.log(req.body)
    const user = await User.findOne({email : req.body.email})
   if(!user){
            res.status(400).send('Please Enter Your correct Email and Password')   
    }else if(!(user.password === req.body.password)){
     res.status(400).send('Please Enter Your valid password')     
    }else{
      res.status(200).send(user)
    }
    
  } catch (error) {
       res.status(400).send(error)
  }
})



//register Page
router.get('/register', (req,res)=>{
  res.render('register');
  })
  


  router.post('/register',async (req,res)=>{
    try {
      const user = await User(req.body)
       await user.save();
      res.status(201).send(user)
     } catch (error) {
       //JSON.stringify(error)
         res.status(400).send(error)
     }
  })





module.exports = router