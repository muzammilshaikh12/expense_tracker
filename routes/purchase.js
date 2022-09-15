const express = require('express');

const router = express.Router()

const purchaseController = require('../controller/purchase')

const authenticator = require('../middleware/authenticator')

router.get('/premium',authenticator.authenticator,purchaseController.purchasePremium)

router.post('/updatetransactionstatus',authenticator.authenticator, purchaseController.updateStatus)

module.exports = router