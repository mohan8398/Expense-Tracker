const express = require('express');

const userController = require('../controller/user');
const expenseController = require('../controller/expense')

const authenticatemiddleware = require('../middleware/auth');

const router = express.Router();


router.post('/signup', userController.signup);

router.post('/login', userController.login)

router.post('/addexpense', authenticatemiddleware.authenticate, expenseController.addexpense )

router.get('/getexpenses', authenticatemiddleware.authenticate, expenseController.getexpenses )

router.get('/download', authenticatemiddleware.authenticate, expenseController.downloadExpenses)

routes.get('/getUserExpenses', authenticatemiddleware.authenticate,  userController.getUserExpenses);

routes.get('/getParticularUserExpenses/', authenticatemiddleware.authenticate, userexpenseController.getParticularUserExpenses);

module.exports = router;
