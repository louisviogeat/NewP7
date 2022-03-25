const db = require("../models");
const LikeOrDislike = db.likesOrDislikes;
const Post = db.posts;

exports.likePost = (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.auth.userId;
    const isALike = req.body.like;
    LikeOrDislike.findOne({
        where: {
            userId: userId,
            postId: postId
        }
    }).then((like) => {
        console.log(like);
        if (like === null) {
            LikeOrDislike.create({
                userId: userId,
                postId: postId,
                isALike: isALike
            }).then(() => res.status(201).json({ message: 'like added' })
            ).catch((err) => res.status(500).json({ error: err }))
        } else {
            if (isALike === like.isALike) {
                LikeOrDislike.destroy({
                    where: {
                        userId: userId,
                        postId: postId
                    }
                }).then(() => res.status(201).json({ message: 'like removed' }
                )).catch((err) => res.status(500).json({ error: err }));
            } else {
                LikeOrDislike.update({ isALike: isALike }, {
                    where: {
                        userId: userId,
                        postId: postId
                    }
                }).then(() => res.status(201).json({ message: 'like updated' })
                ).catch((err) => res.status(500).json({ error: err }))

            }

        }
    }
    )
    /*
    return Post.findByPk(postId)
        .then((post) => {
            switch (like) {
                case 1:
                    if (!post.usersLiked.includes(userId)) {
                        post.usersLiked.push(userId);
                        post.likes++;
                        post.save();
                        res.status(201).json({ message: 'like added' });
                    } else {
                        res.status(400).json({ message: 'User has already liked' });
                    }
                    break;
                case 0:
                    if (post.usersLiked.includes(userId)) {
                        const index = post.usersLiked.findIndex((userLiked) => userLiked === userId);
                        post.usersLiked.splice(index);
                        post.likes--;
                        res.status(201).json({ message: 'like removed' });
                    } else {
                        res.status(400).json({ message: 'User has never liked' });
                    }
                    break;
                default:
                    break;
            }
        });
        */
};

exports.dislikePost = (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.body.userId;
    const dislike = req.body.dislike;
    Post.findByPk(postId)
        .then((post) => {
            switch (dislike) {
                case 1:
                    if (!post.usersDisliked.includes(userId)) {
                        post.dislikes++;
                        post.usersDisliked.push(userId);
                    }
                    break;
                case 0:
                    if (post.usersDisliked.includes(userId)) {
                        const index = post.usersDisliked.findIndex((userDisliked) => userDisliked === userId);
                        post.usersDisliked.splice(index);
                        post.dislikes--;
                    }
                    break;
                default:
                    break;
            }
            post.save()
                .then(() => res.status(200).json())
                .catch(error => res.status(400).json({ error }));
        });
};

