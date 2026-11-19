
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new Schema({
    username: String
});

accountSchema.plugin(passportLocalMongoose);

// Export the Account model using the existing Mongoose connection
module.exports = mongoose.model("Account", accountSchema);
