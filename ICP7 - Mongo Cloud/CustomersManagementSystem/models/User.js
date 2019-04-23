var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  userID: Number,
  name: {
    first: String,
    last: String
  },
  username: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
