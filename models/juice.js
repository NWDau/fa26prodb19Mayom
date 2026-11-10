const mongoos = require('mongoose');

var juiceSchema = new mongoose.Schema({
    flavor: String,
    volume: Number,
    sugarContent: Number,
    brand: String
});


module.exports = mongoose.model("Juice", juiceSchema);

