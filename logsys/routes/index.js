var express = require('express');
const passport=require('passport')
var router = express.Router();
const User=require('./users')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.redirect('/login');
});

// register route
router.post('/register',async (req,res)=>{
try {
  const {username,password} = req.body;
  const user = new User({username})
  await User.register(user,password);
  res.status(200).send('User registered')
} catch (err) {
  res.status(500).send(err.message)
}
})

// login route
router.get('/login',(req,res)=>{
  res.render('login')
})

// log out
router.get('/logout',(req,res)=>{
  req.logOut((err)=>{
    if(err) return next(err);
    res.send('Logged Out Successfully')
  })
})

// protected route
router.get('/profile',(req,res)=>{
  if(req.isAuthenticated()){
    res.send(`Welcome, ${req.user.username}`)
  }else{
    res.status(401).send('Unauthorized')
  }
})

// creating a user
router.get('/create',async (req,res)=>{
  const userData=await User.create({
    username: "Dhruv12",
    name:"Dhruv",
    password:123
  }) 
  res.send(userData);
})

module.exports = router;
