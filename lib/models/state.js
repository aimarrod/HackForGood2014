var mongoose = require('mongoose');

var stateSchema = mongoose.Schema({
    routeName        : String,
    pointNumber      : Number,
    user             : {},
    username         : String
});

module.exports = mongoose.model('State', stateSchema);