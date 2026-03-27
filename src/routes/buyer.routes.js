const router = require('express').Router();
const { demoAuth, roleGuard } = require('../middleware/auth');
const { catchAsync } = require('../utils');
const ctrl = require('../controllers/buyer.controller');

router.use([demoAuth, roleGuard('customer')]);

// replace html parameter with catchasync when controller done
// BUYER ROUTER LOGIC:

/// 5.4 ORDERS
router.route('/orders')
    //// place an order
    .post('/', (req,res) => {
        
    })

    //// cancel order
    .patch('/:id/cancel', (req,res) => {
        const listingId = req.params.id;

    })

    //// trigger remaining balance payment
    .patch('/:id/payment-remaining', (req,res) => {
        const listingId = req.params.id;

    })
;

/// 5.7 PAYMENT (placeholders)
router.route('/payments')
    //// simulates deposit payment
    .post('/deposit', (req,res) => {
        
    })

    //// simulates remaining balance payment
    .post('/remaining', (req,res) => {
        
    })
;

module.exports = router;