
var Juice = require('../models/juice');

// List of all Juices
exports.juice_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Juice list');
};

// For a specific Juice
exports.juice_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Juice detail: ' + req.params.id);
};

// Handle Juice create on POST
exports.juice_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Juice create POST');
};

// Handle Juice delete on DELETE
exports.juice_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Juice delete DELETE ' + req.params.id);
};

// Handle Juice update on PUT
exports.juice_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Juice update PUT ' + req.params.id);
};
