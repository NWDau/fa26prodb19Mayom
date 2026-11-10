var express = require('express');
var router = express.Router();
const juice_controller = require('../controllers/juice');

/* Display all juices */
router.get('/', juice_controller.juice_view_all_Page);
router.get('/create', juice_controller.juice_create_Page);
router.get('/:id/update', juice_controller.juice_update_Page);
router.get('/:id/delete', juice_controller.juice_delete_Page);
/* Display one specific juice */
router.get('/:id', juice_controller.juice_detail_Page);

module.exports = router;