const controller = require('../controller/authUser');

const express = require('express');
const router = express.Router();

router.post('/login', controller.postLogin);
router.get('/register', controller.getRegister);
router.get('/login', controller.getLogin);

module.exports = router;
