const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:id', userController.getUser);
router.put(
  '/:id',
  [
    body('email').optional().isEmail().withMessage('Invalid email'),
    // ...add more validation as needed...
  ],
  userController.updateUser
);

module.exports = router;
