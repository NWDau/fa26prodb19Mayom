
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
    console.log("detail " + req.params.id);

    try {
        const result = await Juice.findById(req.params.id);
        res.send(result);
    }
    catch (error) {
        res.status(500);
        res.send(`{"error": "Document for id ${req.params.id} not found"}`);
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

// Handle Juice update on PUT
exports.juice_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);

    try {
        let toUpdate = await Juice.findById(req.params.id);

        // Check whether the Juice exists
        if (!toUpdate) {
            return res.status(404).send({
                error: `Juice with id ${req.params.id} not found`
            });
        }

        // Update the properties if they were provided
        if (req.body.flavor !== undefined)
            toUpdate.flavor = req.body.flavor;

        if (req.body.volume !== undefined)
            toUpdate.volume = req.body.volume;

        if (req.body.sugarContent !== undefined)
            toUpdate.sugarContent = req.body.sugarContent;

        if (req.body.brand !== undefined)
            toUpdate.brand = req.body.brand;

        // Save the updated document
        let result = await toUpdate.save();

        console.log("Success " + result);
        res.send(result);
    }
    catch (err) {
        res.status(500).send({
            error: `Update for id ${req.params.id} failed: ${err.message}`
        });
    }
};