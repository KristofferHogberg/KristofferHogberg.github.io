const express = require('express');
const router = express.Router();
const menuController  = require('../../controllers/menuItemsController');


router.route('/')
    .get(menuController.getAllMenuItems)
    .post(menuController.postMenuItem)
    .put(menuController.putMenuItem)
    .delete(menuController.deleteMenuItem);

router.route('/:id')
    .get(menuController.getMenuItem);

module.exports = router;