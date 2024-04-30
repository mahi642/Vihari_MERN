const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/fileUpload');
const adminController = require('../controllers/admin');

router.get('/allusers', adminController.getAllUsers);
router.get('/allagents', adminController.getAllAgents);
router.post('/adduser', adminController.addUser);
router.post('/announcements', adminController.postsendmail);
router.delete('/deleteuser/:userId', adminController.deleteUser);
router.put('/acceptagent/:agentId', adminController.acceptAgent);
router.delete('/rejectagent/:agentId', adminController.rejectAgent);
router.put('/blockagent/:agentId', adminController.blockAgent); 
router.put('/unblockagent/:agentId', adminController.unblockAgent);
router.put('/editProfile/:userId',adminController.userEditProfile);


module.exports = router;
