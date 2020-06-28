const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const imageValidate = require('../middlewares/image')
const sharp = require('sharp')


router.get("/me", (req, res) => {
  if(!(req.cookies.user && req.cookies['coo-key'])) return res.render('404')
  res.render("profile");
});


//getting user data
router.get("/user", auth, (req, res) => {
  res.send(req.user);
});


//image upload by user and getting image for profile page
router.post('/user/pic' , imageValidate.single('upload') ,  auth , async(req,res)=>{
  try {
    console.log('hi i am post image')
    const buffer =await sharp(req.file.buffer).resize({width:300,height:300}).png().toBuffer();
    req.user.profile = buffer;
    await req.user.save()
    res.send({done : 'done'})
  } catch (error) {
    res.status(400).send(error);
  }
},
(error, req, res, next) => {
  res.status(400).send({ error: error.message });
})


router.get('/user/pic/:id' ,async(req,res)=>{
  try {
    const User = require("../database/model/Usermodel");
    const user = await User.findById(req.params.id)
    if(!user){
      throw new Error()
    }
    res.set("Content-Type", "image/png");
    res.send(user.profile);
    
  } catch (error) {
    res.status(404).send(error)
  }
})

//======================================================
router.patch("/user/update", auth, async (req, res) => {
 
  const toUpdate = Object.keys(req.body);
  const allowUpdate = ["name", "bio", "password"];
  const allUpdate = toUpdate.every((args) => allowUpdate.includes(args));
  if (!allUpdate) {
    return res.status(404).send({ error: "Invalid updates" });
  }
  if (toUpdate.includes("password")) {
    if (req.user.password === req.body.password.oldpass) {
       const newpass = req.body.password.newpass1;
      req.body.password = newpass;
    } else {
      return res
        .status(404)
        .send({ error: "Please enter your correct password" });
    }
  }
  

  try { 
    toUpdate.forEach((args) => {
      req.user[args] = req.body[args];
    });
    await req.user.save();    
    res.status(200).send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = await req.user.tokens.filter(
      (args) => args.token !== req.token
    );
    await req.user.save();
    res.clearCookie("coo-key");
    res.clearCookie("user");
    res.status(200).send(req.user);
  } catch (error) {}
});

router.post("/user/logouts", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie("coo-key");
    res.clearCookie("user");
    res.status(200).send(req.user);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/user/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.clearCookie("coo-key");
    res.clearCookie("user");
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;


