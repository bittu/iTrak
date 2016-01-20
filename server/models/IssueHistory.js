'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IssueHistorySchema = new Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issues'
    },
    name: String,
    description: String,
    status: {
        type: 'String',
        uppercase: true,
        enum: ['OPEN', 'ACCEPTED', 'REJECTED', 'REASSIGNED', 'CLOSED']
    },
    priority: {
        type: 'String',
        uppercase: true,
        enum: ['LOW', 'MEDIUM', 'HIGH']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('IssueHistory', IssueHistorySchema);