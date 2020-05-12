const express = require('express')
const router = new express.Router()





//Login Page
router.get('/login', (req,res)=>{
    res.render('login');
  })
  

//register Page
router.get('/register', (req,res)=>{
    res.render('register');
  })
  

  router.post('/register', (req,res)=>{
   console.log(req.body)
    res.send('hih')

  })



module.exports = router