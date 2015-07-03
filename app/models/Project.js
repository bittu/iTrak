'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    projectName: String,
    projectDescription: String
});

module.exports = mongoose.model('Project', ProjectSchema);