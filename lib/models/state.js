var mongoose = require('mongoose');

var stateSchema = mongoose.Schema({
    routeName        : String,
    pointNumber      : Number,
    user             : {}
});

module.exports = mongoose.model('State', stateSchema);