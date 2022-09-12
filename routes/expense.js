const expenseController =  require('../controller/expense')

const express = require('express')

const router =  express.Router()

router.post('/addexpense', expenseController.addExpense)

router.get('/getexpense',expenseController.showExpense)

module.exports = router