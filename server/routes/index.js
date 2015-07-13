var express = require('express'),
    router = express.Router();

var auth = require('../controllers/auth'),
    users = require('../controllers/users'),
    projects = require('../controllers/projects');

//Auth
router.post('/login', auth.login);
router.post('/logout', auth.logout);

//Users - Admin
router.get('/api/admin/users', users.getAll);
router.get('/api/admin/users/:id', users.getOne);
router.post('/api/admin/users', users.create);
router.put('/api/admin/users/:id', users.update);
router.delete('/api/admin/users/:id', users.delete);
router.put('/api/admin/users/pwd/:id', users.resetPassword);
//Users - Users
router.put('/api/users/:id', users.changePassword);
router.get('/api/users/:id', users.getProfile);

//Projects
router.get('/api/admin/projects', projects.getAll);
router.get('/api/admin/projects/:id', projects.getOne);
router.post('/api/admin/projects', projects.create);
router.put('/api/admin/projects/:id', projects.update);
router.delete('/api/admin/projects/:id', projects.delete);


module.exports = router;