const User = require('../models/user.js')


exports.signup = (req,res,next)=>{
    const {name,email,password} = req.body
    if(name == undefined || name.length === 0 
        || email == undefined || email.length === 0
        || password == undefined || password.length === 0)
        {
            return res.status(400).json({err:'Parameters Missing'})
        }
    User.create({name,email,password})
    .then(res.status(201).json({message:'User Successfully Created'}))
    .catch(err=>res.status(500).json({message:'Something went wrong'}))
}