const mongoose=require("mongoose")
const plm=require('passport-local-mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/pin")

const userSchema=mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    // required: true,
  },
  fullname:{
    type: String,
    required: true
  },
})

userSchema.plugin(plm)
const User=mongoose.model("user",userSchema)
module.exports=User;
