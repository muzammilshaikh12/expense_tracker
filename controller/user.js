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

exports.login=(req,res,next) =>{
    const{email,password} = req.body
    if(email == undefined || email.length === 0
        || password == undefined || password.length === 0)
        {
            return res.status(400).json({err:'Email Id or Password Missing',success:false})
        }
        User.findAll({where:{email}})
        .then(user=>{
            if(user.length>0){
                if(user[0].password === password){
                    res.status(200).json({message:'Successfully logged in', success:true})
                } else {
                    res.status(400).json({message: 'Password did not match', success:false})
                }
            } else {
                res.status(404).json({message:'User does not exist'})
            }
        })

        .catch(err=>{
            res.status(500).json({message:err, success:false})
        })
}