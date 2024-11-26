const mongoose=require('mongoose')
const plm=require ('passport-local-mongoose')

const UserSchema=mongoose.Schema({
  username:{
    type: String,
    unique: true,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  password:{
    type: Number,
    required: true,
  },
})
UserSchema.plugin(plm)
module.exports=mongoose.model('User',UserSchema)