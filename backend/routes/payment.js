const express = require('express')
const router = express.Router();

const {
    sendStripApi,
    processPayment,

} = require('../controllers/paymentController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/stripe/apikey').get(isAuthenticatedUser, sendStripApi);
router.route('/payment/process').post(isAuthenticatedUser, processPayment);

module.exports = router;