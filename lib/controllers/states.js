var mongoose = require('mongoose'),
    State = mongoose.model('State');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newState = new State(req.body);
  newState.save(function(err) {
    if (err) return res.json(400, err);
  });
};

exports.show = function (req, res, next) {
  var routeName = req.params.name;
  var user=req.user.name;
  State.find({$and: [{routeName: routeName, username: user}]}, function (err, state) {
    if (err) return next(err);
    if (!state) return res.send(404);
    res.send(state);
  });
};