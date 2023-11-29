const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');

router.get('/', UserController.getOneUser);

// router.get('/:_id', UserController.getOneUser);

router.put('/:_id', UserController.update);

router.delete('/:_id', UserController.delete);

router.put('/:_id/follow', UserController.follow);

router.put('/:_id/unfollow', UserController.unfollow);

router.use((err, req, res, next) => {
    res.status(500).json('User_Api: ' + err);
});

module.exports = router;
