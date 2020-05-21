const express = require("express");
const router = new express.Router();
const auth = require('../auth/auth')


router.get("/me", auth ,  (req, res) => {
  if (req.reject) return res.send("Please logout First");
  res.render("profile",req.user);
});

router.patch('/me/update', auth ,async (req,res)=>{
 console.log(req.body)
 res.status(200).send(req.body)
})



router.post("/me/logout", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send("All User logout");
  } catch (error) {}
});

router.post("/me/logouts", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send("All User logout");
  } catch (error) {
    res.send(error)
  }
});


module.exports = router;
