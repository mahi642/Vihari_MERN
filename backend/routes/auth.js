const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const orderController = require('../controllers/order')
const fileUpload=require('../middleware/fileUpload');
const fetchuser = require('../middleware/fetchUser')
router.post('/login',authController.verifyUser);
router.post('/signup',authController.createUser);
router.post("/agentSignUp",fileUpload.single('document'),authController.createAgent);
router.post("/agentLogin",authController.verifyAgent);
router.post('/order',orderController.createorder)
router.post('/userdetails',fetchuser,authController.getUserDetails)
router.get('/history',fetchuser,authController.getBookings);
router.get('/tourbookings',fetchuser,authController.tourBookings)
module.exports = router;