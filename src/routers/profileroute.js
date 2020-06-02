const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");


router.get("/me", (req, res) => {
  res.render("profile");
});

router.get("/user", auth, (req, res) => {
  res.send(req.user);
});

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
    res.status(200).send(req.user);
  } catch (error) {}
});

router.post("/user/logouts", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie("coo-key");
    res.status(200).send(req.user);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/user/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.clearCookie("coo-key");
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;


