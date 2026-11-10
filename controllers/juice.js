
const juice = require('../models/juice');
var Juice = require('../models/juice');

// List of all Juices
exports.juice_list = async function(req, res) {
    try {
        const theJuices = await Juice.find();
        res.send(theJuices);
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`)
    }
};

exports.juice_view_all_Page = async function(req, res) {
    try {
        const theJuices = await Juice.find();
        res.render('juice', {
            title: 'Juice Search Results',
            results: theJuices
        });
    }
    catch(err){
        console.error(err);
        res.status(500).send(err.stack);
        
    }
};

// Display details for one specific Juice
exports.juice_detail_Page = async function(req, res) {
    try {
        const theJuice = await Juice.findById(req.params.id);

        res.render('juice_detail', {
            title: 'Juice Details',
            details: theJuice
        });
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// For a specific Juice
exports.juice_detail = async function(req, res) {
    try {
        const theJuice = await Juice.findById(req.params.id);

        res.render('juice_detail', {
            title: 'Juice Details',
            details: theJuice
        });
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Display the form to create a new Juice
exports.juice_create_Page = function(req, res) {
    res.render('juice_create', {
        title: 'Add New Juice'
    });
};


// Handle Juice create on POST
exports.juice_create_post = async function(req, res) {
    let document = new Juice();
    document.flavor = req.body.flavor;
    document.volume = req.body.volume;
    document.sugarContent = req.body.sugarContent;
    document.brand = req.body.brand;
    try{
        await document.save();
        res.redirect('/juices');
    } catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Display the form to up
exports.juice_update_Page = async function(req, res) {
    try {
        const theJuice = await Juice.findById(req.params.id);

        res.render('juice_update', {
            title: 'Update Juice',
            details: theJuice
        });
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Display the Delete confirmation page
exports.juice_delete_Page = async function(req, res) {
    try {
        const theJuice = await Juice.findById(req.params.id);

        res.render('juice_delete', {
            title: 'Delete Juice',
            details: theJuice
        });
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Juice delete on DELETE
// Handle Juice deletion
exports.juice_delete = async function(req, res) {
    try {
        await Juice.findByIdAndDelete(req.params.id);
        res.redirect('/juices');
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Juice update
exports.juice_update_put = async function(req, res) {
    try {
        await Juice.findByIdAndUpdate(req.params.id, {
            flavor: req.body.flavor,
            volume: req.body.volume,
            sugarContent: req.body.sugarContent,
            brand: req.body.brand
        });

        res.redirect('/juices');
    }
    catch(err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};