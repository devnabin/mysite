const express = require("express");
const router = new express.Router();
const User = require("../database/model/Usermodel");

//Login Page
router.get("/login", (req, res) => {
  console.log(req.cookies.jwttoken)
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
        res.cookie("jwttoken", token, {expire: 360000 + Date.now() ,httpOnly: true ,secure : true });
      //var cookie = req.cookies.cookieName;
      // console.log('cookie exists', cookie); //to view the cookiews
      res.status(200).send({ user, token });
    }
  } catch (error) {
    console.log(error);
    console.log(typeof error);
    res.status(400).send(error);
  }
});

//register Page
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    console.log("asdf");
    const user = await User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
