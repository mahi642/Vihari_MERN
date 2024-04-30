const express = require('express');
const router = express.Router();
const tourControllers = require('../controllers/tour')
const fetchUser = require('../middleware/fetchUser')

router.post("/tourbooking",fetchUser,tourControllers.booking)
router.post("/gettour",fetchUser,tourControllers.getTour)
module.exports=router;