const express = require('express');
const router = express.Router();
const watsonController = require('../../controllers/watsonController');

router.route('/')
    .post(watsonController.mainWatson);


module.exports = router;