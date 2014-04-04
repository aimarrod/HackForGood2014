var mongoose = require('mongoose');

var routeSchema = mongoose.Schema({
    description        : String,
    publicRoute        : Boolean,
    created_routes	   :[String],
    assigned_routes    :[String],
    route 			   :{}
});

module.exports = mongoose.model('Route', routeSchema);