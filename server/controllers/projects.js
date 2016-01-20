var Project = require('../models/Project');

var projects = {

    getAll: function (req, res) {
        var query = Project.find();
        query.sort('projectName');
        query.exec(function (err, projects) {
            if (err) {
                console.log(err);
                return res.send(400);
            }
            return res.json(200, projects);
        });
    },

    getOne: function (req, res) {
        var id = req.params.id || '';
        if (id === '') {
            return res.send(400);
        }

        var query = Project.findOne({
            _id: id
        });

        query.exec(function (err, project) {
            if (err) {
                console.log(err);
                return res.send(400);
            }

            return res.json(200, project);
        });
    },

    create: function (req, res) {
        var project = req.body.project;
        if (project === null) {
            return res.send(400);
        }

        var projectEntry = new Project();
        projectEntry.projectName = project.projectName;
        projectEntry.projectDescription = project.projectDescription;

        projectEntry.save(function (err) {
            if (err) {
                console.log(err);
                return res.send(400, 'Error creating new Project');
            }

            return res.send(200, 'Project: ' + project.projectName + ' is created');
        });
    },

    update: function (req, res) {
        var project = req.body.project,
            id = req.params.id || '';
        if (project === null || id === '') {
            return res.send(400);
        }

        var projectUpdate = {};

        projectUpdate.projectName = project.projectName;
        projectUpdate.projectDescription = project.projectDescription;
        projectUpdate.updated = Date.now();

        Project.update({
            _id: id
        }, projectUpdate, function (err, count) {
            if (err) {
                console.log(err);
                return res.send(400, 'Error udpating project: ' + project.projectName);
            }

            return res.send(200, 'Project: ' + project.projectName + ' is updated');
        });
    },

    delete: function (req, res) {
        var id = req.params.id || '';

        if (id === '') {
            return res.send(400);
        }

        var query = Project.findOne({
            _id: id
        });

        query.exec(function (err, project) {
            if (err) {
                console.log(err);
                return res.send(400);
            }
            if (project) {
                project.remove();
                return res.send(200, 'Project ' + project.projectName + ' is deleted !!!');
            }

            return res.send(400);
        });
    }
}

module.exports = projects;