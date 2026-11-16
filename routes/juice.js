
var express = require('express');
var router = express.Router();
const juice_controller = require('../controllers/juice');

// Display all juices 
router.get('/', juice_controller.juice_view_all_Page);

// Create page 
router.get('/create', juice_controller.juice_create_Page);

// Detail page 
router.get('/detail', juice_controller.juice_view_one_Page);

// Update page 
router.get('/update', juice_controller.juice_update_Page);

// Delete page 
router.get('/delete', juice_controller.juice_delete_Page);

module.exports = router;
