const express = require('express')

const bodyParser = require('body-parser');

const app = express()

const cors =  require('cors')

app.use(cors())

const sequelize = require('./util/database');

app.use(bodyParser.json());

const userRoute = require('./routes/user')

const expenseRoute = require('./routes/expense')

const purchaseRoute = require('./routes/purchase')

const dotenv = require('dotenv')

dotenv.config();

app.use('/users',userRoute)

app.use('/expense',expenseRoute)

app.use(purchaseRoute)

const User = require('./models/user')

const Expense = require('./models/expense')

const Order = require('./models/order')

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

sequelize.sync()
.then(user=>{
 app.listen(3000)
})
.catch(err=>console.log(err))