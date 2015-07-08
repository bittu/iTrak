'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    projectName: String,
    projectDescription: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

ProjectSchema.pre('remove', function (next) {
    this.model('User').update({
            projects: this._id
        }, {
            $pull: {
                projects: this._id
            }
        }, {
            multi: true
        },
        next
    );
});

module.exports = mongoose.model('Project', ProjectSchema);