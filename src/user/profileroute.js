const express = require("express");
const router = new express.Router();
const auth = require('../auth/auth')


router.get("/me", auth ,  (req, res) => {
  if (req.reject) return res.send("Please logout First");
  console.log(req.user)
  res.render("profile",req.user);
});

router.get('/logout', auth ,async (req,res)=>{

})

module.exports = router;
