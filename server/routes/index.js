var express = require('express'),
    router = express.Router();

var auth = require('../controllers/auth'),
    users = require('./controllers/users'),
    projects = require('../controllers/projects');

//Auth
router.post('/login', auth.login);

//Users
router.get('/api/admin/users', users.getAll);
router.get('/api/admin/users/:userid', users.getOne);
router.post('/api/admin/users', users.create);
router.put('/api/admin/users/:userid', users.update);
router.delete('/api/admin/users/:userid', users.delete);

//Projects
router.get('/api/admin/projects', projects.getAll);
router.get('/api/admin/projects/:projectid', projects.getOne);
router.post('/api/admin/projects', projects.create);
router.put('/api/admin/projects/:projectid', projects.update);
router.delete('/api/admin/projects/:projectid', projects.delete);


module.exports = router;