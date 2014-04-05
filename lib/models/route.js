
var mongoose = require('mongoose');

var routeSchema = mongoose.Schema({
    description        : String,
    name               : String,
    publicRoute        : Boolean,
    owner              : String,
    assigned_routes    :[String],
    route              :{},
    locs               :[]
});

module.exports = mongoose.model('Route', routeSchema);