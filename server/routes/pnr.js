var express = require('express');
var router = express.Router();
var pnrcontroller = require('../controllers/pnrcontroller');

router.route('/')
    .post(pnrcontroller.getstatus);

router.route('/livestatus')
    .post(pnrcontroller.livestatus);

router.route('/trainsbetween')
    .get(pnrcontroller.trainsbetween);


module.exports = router;