const express = require('express');
const router = express.Router();
const busController = require('../controllers/bus')
const fetchUser = require('../middleware/fetchUser')
router.post('/buslist',busController.busList);
router.post('/booking',fetchUser,busController.booking)
router.post('/busdetails',busController.getBusDetails)
router.post('/bookedseats',busController.booked)
module.exports = router;