const express = require('express')

const bodyParser = require('body-parser');

const app = express()

const cors =  require('cors')

app.use(cors())

const sequelize = require('./util/database');

app.use(bodyParser.json());

const userRoute = require('./routes/user')

const expenseRoute = require('./routes/expense')

const userTable = require('./models/user')

const expenseTable = require('./models/expense')

app.use('/users',userRoute)

app.use('/expense',expenseRoute)

const User = require('./models/user')

const Expense = require('./models/expense')

User.hasMany(Expense)
Expense.belongsTo(User)

sequelize.sync()
.then(user=>{
 app.listen(3000)
})
.catch(err=>console.log(err))