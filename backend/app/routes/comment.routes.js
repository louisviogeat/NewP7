const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/user-auth');
const commentAuth = require('../middleware/comment-auth');

const commentCtrl = require('../controllers/comment.controller');

router.post('/user/:userId/post/:postId/comment', userAuth, commentCtrl.createComment);
router.put('/comment/:commentId', userAuth, commentAuth, commentCtrl.updateComment);
router.delete('/comment/:commentId', userAuth, commentAuth, commentCtrl.delete);
router.get('/comments', userAuth, commentCtrl.findAll);
router.get('/comment/:commentId', userAuth, commentCtrl.findCommentById);



module.exports = router;