var mongoose = require('mongoose');

var stateSchema = mongoose.Schema({
    routeName        : String,
    pointNumber      : Number,
    user             : {},
    username         : String,
    point            : {}
});

module.exports = mongoose.model('State', stateSchema);