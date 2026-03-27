const router = require('express').Router();
const { demoAuth, roleGuard } = require('../middleware/auth');
const { catchAsync } = require('../utils');
const ctrl = require('../controllers/buyer.controller');

router.use([demoAuth, roleGuard('handler')]);

// replace html parameter with catchasync when controller done
// HANDLER ROUTER LOGIC:

/// 5.2 LISTINGS
router.route('/listings')
    //// post new listing 
    .post('/', (req,res) => {

    })

    //// patch specific listing --refer to document 
    .patch('/:id', (req,res) => {
        const listingId = req.params.id;

    })

    //// patch specific listing --refer to document 
    .delete('/:id', (req,res) => {
        const listingId = req.params.id;

    })
;

/// 5.3 COLLECTION POINTS
router.route('/collection-points')
    //// create new collection point
    .post('/', (req,res) => {
        
    })
;

/// 5.5 SHIPMENT
router.route('/shipments')
    //// list all shipments
    .get('/', (req,res) => {
        
    })

    //// single shipment order
    .get('/:id', (req,res) => {
        const listingId = req.params.id;

    })

    //// confirm shipment for a listing
    .post('/', (req,res) => {
        
    })

    //// cancel listing
    .patch('/:id/cancel-shipment', (req,res) => {
        const listingId = req.params.id;

    })
;

/// 5.6 DASHBOARD
router.route('/listings:id/demand')
    //// demand for a listing id
    .get('/', (req,res) => {
        
    })

    //// warning when demand is too low
    .get('/warning', (req,res) => {
        const listingId = req.params.id;

    })
;

module.exports = router;