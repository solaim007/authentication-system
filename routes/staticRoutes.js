const express = require("express");
const db = require("../connection/mysqlConnection");
const protectProfileRoute = require("../middleware/authMiddleware");
const profileRoueController = require("../controller/profileRouter");

 
const router = express.Router();



router.get('/', (req,res)=>{
    return res.render('index')
})
router.get('/login',(req,res)=>{
    return res.render('login') 
})
router.get('/register',(req,res)=>{
    return res.render('register')
})
//protected route
router.get('/profile', protectProfileRoute,profileRoueController);
    // Access user information from request object
  



module.exports=router;