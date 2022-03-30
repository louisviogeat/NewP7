const db = require("../models");
const LikeOrDislike = db.likesOrDislikes;

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
        if (like === null) {
            LikeOrDislike.create({
                userId: userId,
                postId: postId,
                isALike: isALike
            }).then(() => res.status(201).json({ message: 'like ajouté' })
            ).catch((err) => res.status(500).json({ message: `Erreur lors de l'ajout du like : ${err}.` }))
        } else {
            if (isALike === like.isALike) {
                LikeOrDislike.destroy({
                    where: {
                        userId: userId,
                        postId: postId
                    }
                }).then(() => res.status(201).json({ message: 'like supprimé' }
                )).catch((err) => res.status(500).json({ message: `Erreur lors de la suppression du like : ${err}.` }));
            } else {
                LikeOrDislike.update({ isALike: isALike }, {
                    where: {
                        userId: userId,
                        postId: postId
                    }
                }).then(() => res.status(201).json({ message: 'like modifié' })
                ).catch((err) => res.status(500).json({ message: `Erreur lors de la modification du like : ${err}.` }))

            }

        }
    }
    )
};


