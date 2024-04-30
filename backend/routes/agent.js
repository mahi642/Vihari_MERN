const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/fileUpload');
const agentController = require('../controllers/agent');

router.post('/addbus', fileUpload.single('image'), agentController.addBus);
router.get('/allbuses', agentController.getBuses);
router.delete('/deletebus/:busId', agentController.deleteBus);
router.get('/getbus/:busId', agentController.getBusDetails);
router.put('/editbus/:busId', agentController.editBus);
router.get('/agentbuses/:agentId', agentController.getAgentBuses);
router.get('/agentProfile/:agentId',agentController.getAgentProfile);

router.put('/editProfile/:agentId',agentController.agentEditProfile);

// Tour routes
router.post('/addtour', fileUpload.single('tourImage'), agentController.addTour);
router.get('/alltours', agentController.getTours);
router.delete('/deletetour/:tourId', agentController.deleteTour);
router.get('/gettour/:tourId', agentController.getTourDetails);
router.put('/edittour/:tourId', agentController.editTour);
router.get('/agenttours/:agentId', agentController.getAgentTours);

// Place routes
router.post('/addplace/:tourId', fileUpload.single('placeImage'), agentController.addPlace);
router.get('/tourplaces/:tourId', agentController.getPlaces);
router.delete('/deleteplace/:placeId', agentController.deletePlace);



module.exports = router;
