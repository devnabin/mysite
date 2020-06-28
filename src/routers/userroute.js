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





 router.get('/confirmation', async (req,res)=>{
  res.render('confirmation') 
  //  main()
})

router.post('/confirmation',  (req,res)=>{
  console.log('post')

 res.send(req.body)
})



module.exports = router;


 /* 
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  console.log('i am main')
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: `nabincoc2@gmail.com`, // generated ethereal user
      pass: `Passw0rd321nabin`, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'nabincoc2@gmail.com', // sender address
    to: "nfornabin@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

main().catch(console.error); */