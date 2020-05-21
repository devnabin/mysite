const express = require("express");
const router = new express.Router();
const User = require("../database/model/Usermodel");
const auth = require('../auth/auth')

//Login Page
router.get("/login", (req, res) => {
  if(req.cookies.token){
    res.send('Please Log out First')
  } else{
    res.render("login");
  }  
});


//Login post
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("User not found with this email");
    } else if (!(user.password === req.body.password)) {
      res.status(400).send("Incorrect password");
    } else {
      const token = await user.jwtoken();
      res.status(200).send({ user, token });
    }
  } catch (error) {
    console.log(error);
    console.log(typeof error);
    res.status(400).send(error);
  }
});


//register Page
router.get("/register",auth , (req, res) => {
if(!req.reject) {
  res.send('Please Log out First')
}else{
  res.render("register");
}

});



router.post("/register", async (req, res) => {
  if(req.cookies.token) return res.send('Please logout First')
  try {
    console.log("asdf");
    const user = await User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});





router.get('/test', async (req,res)=>{
  res.render('test')

})



module.exports = router;
