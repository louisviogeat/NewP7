const express = require('express');
const router = express.Router();
const userAuth = require('../middleware/user-auth');
const postAuth = require('../middleware/post-auth');
const multer = require('../middleware/mutler-config');


const postCtrl = require('../controllers/post.controller');
const likeCtrl = require('../controllers/likeOrDislike.controller');

router.post('/user/:id/post', userAuth, multer, postCtrl.createPost);
router.put('/post/:id', userAuth, multer, postAuth, postCtrl.updatePost);
router.delete('/post/:id', userAuth, postAuth, postCtrl.delete);
router.get('/posts', userAuth, postCtrl.findAll);
router.get('/post/:id', userAuth, postCtrl.findPostById);
router.post('/post/:postId/like', userAuth, likeCtrl.likePost);
router.post('/post/:postId/dislike', userAuth, likeCtrl.dislikePost);

module.exports = router;