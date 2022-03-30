const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/user-auth');
const postAuth = require('../middleware/post-auth');


const postCtrl = require('../controllers/post.controller');
const likeCtrl = require('../controllers/likeOrDislike.controller');

router.post('/user/:id/post', userAuth, postCtrl.createPost);
router.put('/post/:id', userAuth, postAuth, postCtrl.updatePost);
router.delete('/post/:id', userAuth, postAuth, postCtrl.delete);
router.get('/posts', userAuth, postCtrl.findAll);
router.get('/post/:id', userAuth, postCtrl.findPostById);
router.post('/post/:postId/like', userAuth, likeCtrl.likePost);

module.exports = router;