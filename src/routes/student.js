const express = require('express');
const router = express.Router();

//import controller or middleware
const studentController = require('../app/controllers/studentControllerF');

//api
router.get('/test', studentController.test);
router.post('/testc', studentController.testC);
router.get('/testr/:studentId', studentController.testR);
router.get('/testra/', studentController.testRA);
router.put('/testu/:studentId', studentController.testU);
router.delete('/testd/:studentId', studentController.testD);

//export
module.exports = router;