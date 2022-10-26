const Router = require('../../framework/router');

const usersController = require('./users.controller');

const router = new Router();

router.get('/users', usersController.find);
router.post('/users', usersController.create);
router.post('/usersFromFile', usersController.createFromFile);
router.get('/exportUsers', usersController.exportToXml);

module.exports = router;
