var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
  userId: {type: String, required: true},
  item: {type: String, required: true}
});

module.exports = mongoose.model('Item', Item);
