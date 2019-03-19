var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  customerID: Number,
  name: {
    first: String,
    last: String
  },
  birthday: String,
  gender: String,
  lastContact: String,
  customerLifetimeValue: Number,
});

module.exports = mongoose.model('Customer', CustomerSchema);
