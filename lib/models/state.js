var mongoose = require('mongoose');

var stateSchema = mongoose.Schema({
    routeName        : String,
    pointNumber      : Number,
    user             : {},
    username         : String,
    point            : {},
    question         : {}
});

module.exports = mongoose.model('State', stateSchema);