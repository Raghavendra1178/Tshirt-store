
const express=require('express');
const router=express.Router();
const {signout, isSignedIn}=require("../controllers/auth")
const {signup}=require("../controllers/auth.js")
const {signin}=require("../controllers/auth")
const {check,validationResult}=require('express-validator');


router.post('/signup',[
    check("name").isLength({min:3}).withMessage("name should be atleast 3 characters"),
    check("email").isEmail().withMessage("email is required"),
    check("password","password should be 3 chars").isLength({min:3})

],signup);

router.post(
    "/signin",
    [
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 1 })
    ],
    signin
  );
  

router.get('/signout',signout);



module.exports=router;