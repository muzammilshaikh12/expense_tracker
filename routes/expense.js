const expenseController =  require('../controller/expense')

const authenticator = require('../middleware/authenticator')

const express = require('express')

const router =  express.Router()

router.post('/addexpense',authenticator.authenticator, expenseController.addExpense)

router.get('/getexpense',authenticator.authenticator, expenseController.showExpense)

router.delete('/deleteexpense/:id',authenticator.authenticator,expenseController.deleteExpense)

module.exports = router