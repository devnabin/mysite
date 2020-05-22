const User = require("../database/model/Usermodel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) =>{
try {
  const token  =await  req.header('Authorization').replace('Bearer ' , '');
  const decode = await jwt.verify(token , "nokianabin" )
  const user = await User.findOne({_id : decode._id , "tokens.token" : token})
  if(!user) throw new error()
  req.user = user;
  req.token = token ;
  next()
} catch (error) {
  res.status(404).send({error : 'Please auth'})
}

  /*   const token = await req.cookies.token;
  if (!token) {
    req.reject = true;
    // console.log('please auth')
    // throw new Error('Please auth')
    next();
  } else {
    const decode = jwt.verify(token, "nokianabin");
    const user = await User.findOne({ _id: decode._id, "tokens.token": token });
    req.user = user;
    req.reject = false;
    next();
  } */
}

module.exports = auth;
