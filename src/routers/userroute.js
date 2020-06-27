const express = require("express");
const router = new express.Router();
const User = require("../database/model/Usermodel");
const auth = require('../middlewares/auth')

//Login Page
router.get("/login", (req, res) => {
  res.render("login");
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
      //date
      var d = new Date();
      var year = d.getFullYear();
      console.log(year)
      var month = d.getMonth();
      console.log(month)
      var day = d.getDate();
      console.log(day)
      var c = new Date(year + 2, month, day);
  
      //\date
      res.cookie("coo-key", `${token}` ,{ expires : c});
      res.cookie("user", `${user.name}` , { expires : c});
      res.status(200).send({ user, token });
      // res.cookie('rememberme', '1',  httpOnly: true });
    }
  } catch (error) {
    console.log(error);
    console.log(typeof error);
    res.status(400).send(error);
  }
});


//register Page
router.get("/register" , (req, res) => {

  res.render("register");
});



router.post("/register", async (req, res) => {
  // if(req.cookies.token) return res.send('Please logout First')
  try {
    const user = await User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});





/* router.get('/test', async (req,res)=>{
  res.render('test') 
})
*/


module.exports = router;
