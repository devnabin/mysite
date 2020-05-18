const User = require("../database/model/Usermodel");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  const token = await req.cookies.token;
  if (!token) {
    req.reject = true;
    next();
  } else {
    const decode = jwt.verify(token, "nokianabin");
    const user = await User.findOne({ _id: decode._id, "tokens.token": token });
    req.user = user;
    req.reject = false;
    next();
  }
}

module.exports = auth;
