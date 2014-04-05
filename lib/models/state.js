var mongoose = require('mongoose');

var stateSchema = mongoose.Schema({
    routeName        : String,
    pointNumber      : Number,
    userName         : String
});

module.exports = mongoose.model('State', stateSchema);