var Issues = require('../models/Issues'),
    IssueHistory = require('../models/IssueHistory');

var issues = {
    
    getOne: function(req, res) {
        var id = req.params.id || '';
        if (id === '') {
            return res.send(400);
        }

        var query = Issues.findOne({
            _id: id
        });

        query.exec(function (err, issue) {
            if (err) {
                console.log(err);
                return res.send(400);
            }

            return res.json(200, issue);
        });
    },
    
    create: function(req, res) {
        var issue = req.body.issue;
        if (issue === null) {
            return res.send(400);
        }

        console.log(issue)
        var issueEntry = new Issues();
        issueEntry.name = issue.name;
        issueEntry.description = issue.description;
        issueEntry.status = issue.status;
        issueEntry.priority = issue.priority;
        issueEntry.owner = issue.owner;
        issueEntry.assignedTo = issue.assignedTo;
        issueEntry.project = issue.project;

        console.log(issueEntry)
        issueEntry.save(function (err) {
            if (err) {
                console.log(err);
                return res.send(400, 'Error creating issue ' + issue.name);
            }
            
            var issueHistory = new IssueHistory();
            issueHistory.name = issue.name;
            issueHistory.description = issue.description;
            issueHistory.status = issue.status;
            issueHistory.priority = issue.priority;
            issueHistory.owner = issue.owner;
            issueHistory.assignedTo = issue.assignedTo;
            issueHistory.project = issue.project;
            issueHistory.issue = issue._id;
            
            console.log(issueHistory);
            issueHistory.save(function(err) {
                if (err) {
                    console.log(err);
                    console.log('Error creating issue history for ' + issue.name);
                } else {
                    console.log('Issue history created for ' + issue.name);
                }
            })

            return res.send(200, 'Issue: ' + issue.name + ' is created');
        });
    },
    
    update: function(req, res) {
        var issue = req.body.issue,
            id = req.params.id || '';
        if (issue === null || id === '') {
            return res.send(400);
        }

        console.log(issue)
        var issueUpdate = {};
        
        issueUpdate.name = issue.name;
        issueUpdate.description = issue.description;
        issueUpdate.status = issue.status;
        issueUpdate.priority = issue.priority;
        issueUpdate.assignedTo = issue.assignedTo;
        issueUpdate.updated = Date.now();

        console.log(issueUpdate)
        issueUpdate.update({
            _id: id
        }, issueUpdate, function (err, count) {
            if (err) {
                console.log(err);
                return res.send(400, 'Error updating issue ' + issue.name);
            }
            
            var issueHistory = new IssueHistory();
            issueHistory.name = issue.name;
            issueHistory.description = issue.description;
            issueHistory.status = issue.status;
            issueHistory.priority = issue.priority;
            issueHistory.owner = issue.owner;
            issueHistory.assignedTo = issue.assignedTo;
            issueHistory.project = issue.project;
            issueHistory.issue = id;
            issueHistory.updated = Date.now();
            
            console.log(issueHistory);
            issueHistory.save(function(err) {
                if (err) {
                    console.log(err);
                    console.log('Error creating issue history for ' + issue.name);
                } else {
                    console.log('Issue history created for ' + issue.name);
                }
            })

            return res.send(200, 'Issue: ' + issue.name + ' is updated');
        });
    },
    
    getHistory: function(req, res) {
        var id = req.params.id || '';
        if (id === '') {
            return res.send(400);
        }

        var query = IssueHistory.findAll({
            issue: id
        });

        query.exec(function (err, issueHistory) {
            if (err) {
                console.log(err);
                return res.send(400);
            }

            return res.json(200, issueHistory);
        });
    },
    
    delete: function(req, res) {
        var id = req.params.id || '';

        if (id === '') {
            return res.send(400);
        }

        var query = Issues.findOne({
            _id: id
        });

        query.exec(function (err, issue) {
            if (err) {
                console.log(err);
                return res.send(400);
            }
            if (issue) {
                issue.remove();
                return res.send(200, 'Issue deleted');
            }

            return res.send(400);
        });
    },
    
    getMyIssues: function(req, res) {
        var projectId = req.params.projectId || '',
            userId = req.params.userId || '';
            
        if (projectId === '' || userId === '') {
            return res.send(400);
        }
       
        var query = Issues.find({
            project: projectId,
            assignedTo: userId
        });
        
        query.populate('assignedTo owner project');

        query.exec(function (err, issues) {
            if (err) {
                console.log(err);
                return res.send(400);
            }

            return res.json(200, issues);
        });
    },
    
    getAllOpenProjectIssues: function(req, res) {
        var projectId = req.params.projectId || '';
        
        if (projectId === '') {
            return res.send(400);
        }

        var query = Issues.find({
            project: projectId,
            status: 'OPEN'
        });

        query.exec(function (err, issues) {
            if (err) {
                console.log(err);
                return res.send(400);
            }

            return res.json(200, issues);
        });
    }
    
};

module.exports = issues;