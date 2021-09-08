const controller = require("../controller/validateUser");

const express = require("express");
const router = express.Router();


router.post('/', controller.postUser);
router.delete('/', controller.deleteUsers);
router.get('/', controller.getUsers);

router.get('/:id', controller.getUsers);
router.delete('/:id', controller.deleteUsers);
router.patch('/:id', controller.updateUser);

module.exports = router;
