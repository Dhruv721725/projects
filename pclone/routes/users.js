const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/pclone");
// users schema

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required : true,
    unique : true,
    trim : true,
  },
  password : {
    type: String,
    required: true,
  },
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Post',
    required:true,
  }],
  dp:{
    type: String,
    // default:''
  },
  email:{
    type:String,
    required: true,
    unique: true,
    // match:[/\S+@\S+\.\S+/,'Invalid email format.']
  },
  fullname:{
    type:String,
    required:true,
    trim:true,
  },
},
{timestamps:true});

const User = mongoose.model('User',UserSchema);

module.exports = User;