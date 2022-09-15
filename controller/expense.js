const Expense = require('../models/expense')
const User = require('../models/user')

exports.addExpense = (req,res,next) => {
    const {amount,description,category} = req.body
    if(amount == undefined || amount.length === 0 
        || description == undefined || description.length === 0
        || category == undefined || category.length === 0)
        {
            return res.status(400).json({err:'Parameters Missing'})
        } else {
            Expense.create({amount,description,category, userId:req.user.id})
            .then(result=>{
                res.status(201).json({message:'Expense added',success:true})
                
            })
            .catch(err=>{
                res.status(500).json({err:'Something went wrong'})
            })
         
}
}


exports.showExpense = (req,res,next)=>{
    Expense.findAll({where:{userId :req.user.id }})
    .then(expenses=>{
        res.status(200).json({data:expenses,success:true, user:req.user})
    })
    .catch(err=>{
        res.status(500).json({err,success:false})
    })
}

exports.showExpensePremium=(req,res,next)=>{
   
  User.findAll()
  .then(users=>{
   res.status(200).json({users,success:true})
  })
}


exports.seeExpensePremium = (req,res,next)=>{
    const id =  req.params.id
    Expense.findAll({where:{userId:id}})
    .then(users=>{
     res.status(200).json({users,success:true})
    })
  }


exports.deleteExpense = (req,res,next) =>{
    const id = req.params.id
    Expense.destroy({where:{id:id, userId:req.user.id}})
    .then((NoofRows)=>{
        if(NoofRows === 0) {
            return res.status(404).json({success:false,message:'This Expense Does not belong to this user'})
        }
       return res.status(200).json({message:'Successfully deleted',success:true})
    })
    .catch(err=>{
    return res.status(403).json({message:'Failed',success:false})
    })
}