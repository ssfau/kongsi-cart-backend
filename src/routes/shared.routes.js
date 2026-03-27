const router = require('express').Router();
const { demoAuth, roleGuard } = require('../middleware/auth');
const { catchAsync } = require('../utils');
const ctrl = require('../controllers/buyer.controller');

router.use(demoAuth);

// replace html parameter with catchasync when controller done
// SHARED ROUTER LOGIC:

/// 5.2 LISTINGS
router.route('/listings')
    //// get all listings
    .get('/listings', (req,res) => {
        
    })

    //// get specific listing
    .get('/listings/:id', (req,res) => {
        const listingId = req.params.id;

    })
;

/// 5.3 COLLECTION POINTS
router.route('/collection-points')
    //// gets all collection points
    .get('/', (req,res) => {
        
    })

    //// single collection point details
    .get('/:id', (req,res) => {
        const listingId = req.params.id;

    })
;

/// 5.4 ORDERS
router.route('/orders')
    //// returns own orders for customers, for handlers returns all orders
    .get('/', (req,res) => {
        
    })

    //// get specific order, customers can only access their own order 
    .get('/:id', (req,res) => {
        const listingId = req.params.id;

    })
;

/// 5.7 PAYMENT (placeholder)
router.route('/payments')
    //// list of payment history, customer sees own payments, handler sees all
    .get('/', (req,res) => {
        
    })
;

module.exports = router;