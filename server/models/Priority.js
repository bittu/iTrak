'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PrioritySchema = new Schema({
    priorityName: String
});

module.exports = mongoose.model('Priority', PrioritySchema);