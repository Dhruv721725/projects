const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/pclone");

const PostSchema=new mongoose.Schema({
    text:{
        type: String,
        required: true,
        trim:true,
    },
    createdate:{
        type : Date,
        default: Date.now,
    },
    likes:{
        type:Array,
        default:[],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
});

const Post=mongoose.model('Post',PostSchema);

module.exports=Post;
