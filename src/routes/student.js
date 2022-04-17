const express = require('express');
const router = express.Router();

//import controller or middleware
const studentController = require('../app/controllers/studentController');

//api
router.get('/test', studentController.test);
router.post('/testC', studentController.testC);
router.get('/testR/:studentId', studentController.testR);
router.get('/testRA/', studentController.testRA);
router.put('/testU/:studentId', studentController.testU);
router.delete('/testD/:studentId', studentController.testD);

//export
module.exports = router;