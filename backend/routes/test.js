
const express = require('express');
const { getUserTripsByBusId, getUserDetailsById } = require('../controllers/GetUserBookings');
const {getUserToursByTourId} = require('../controllers/GetUserTours');
const router = express.Router()

router.get('/:busId/alldetails',getUserTripsByBusId)
router.get('/:userId/userdetails',getUserDetailsById)
router.get('/:tourId/alldetails',getUserToursByTourId)

module.exports=router;


