const mongoose = require("mongoose");
const validator = require("validator");
var jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid or not available");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength : 8
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.jwtoken = async function() {
   const user = this;
  const token = jwt.sign({_id : user._id}, 'nokianabin');
  // await user.tokens.push({token})
   user.tokens =  user.tokens.concat({token})
  await user.save();
  return token

}

/* userSchema.methods.tokenAuth = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "NOkiaNabin");
  user.tokens =user.tokens.concat({token})
  await user.save()
  return token;
};
 */
const User = mongoose.model("user", userSchema);

module.exports = User;
