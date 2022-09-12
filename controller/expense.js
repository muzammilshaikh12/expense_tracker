const Expense = require('../models/expense')

exports.addExpense = (req,res,next) => {
    const {amount,description,category} = req.body
    if(amount == undefined || amount.length === 0 
        || description == undefined || description.length === 0
        || category == undefined || category.length === 0)
        {
            return res.status(400).json({err:'Parameters Missing'})
        } else {
            Expense.create({amount,description,category})
            .then(result=>{
                res.status(201).json({message:'Expense added',success:true})
                
            })
            .catch(err=>{
                res.status(500).json({err:'Something went wrong'})
            })
         
}
}


exports.showExpense = (req,res,next)=>{
    Expense.findAll()
    .then(expenses=>{
        res.status(200).json({data:expenses,success:true})
    })
}