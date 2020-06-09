const mongoose = require("mongoose");
const validator = require("validator");
var jwt = require("jsonwebtoken");

//adding task model for deleting all task created by user when user deleted himself from site
const task = require("./taskmodel");

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
    minlength: 8,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  bio: {
    type: String,
    minlength: 20,
  },
});

userSchema.virtual("mytask", {
  ref: "task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.jwtoken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "nokianabin");
  // await user.tokens.push({token})
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

/* userSchema.methods.tokenAuth = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "NOkiaNabin");
  user.tokens =user.tokens.concat({token})
  await user.save()
  return token;
};
 */

 //deleting all task associate with that user 
userSchema.pre("remove", async function (next) {
  console.log('hi am exe')
  await task.deleteMany({ owner: this._id });
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
