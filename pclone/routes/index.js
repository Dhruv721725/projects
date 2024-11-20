var express = require('express');
var router = express.Router();
const userModel=require('./users')
const postModel=require('./posts')

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createuser',async function(req, res, next) {
  let createdUser = await userModel.create({
    username: "Dhruv",
    password : "123",
    posts:[],
    email:"dhruv721725@gmail.com",
    fullname:"Dhruv Gupta",
  })
  res.send(createdUser)
});

router.get('/createpost',async function(req,res,next){
  let createdPost = await postModel.create({
    text: "thrilling at its peak",
    user: "673e0e497d2b91cc3d77af3a"
  })
  let user = await userModel.findOne({_id:"673e0e497d2b91cc3d77af3a"})
  user.posts.push(createdPost._id);
  user.save()
  res.send(createdPost)
})

router.get('/allposts',async function(req,res,next){
  let userPost = await userModel
    .findOne({_id:'673e0e497d2b91cc3d77af3a'})
    .populate('posts')
  res.send(userPost)
})


module.exports = router;
