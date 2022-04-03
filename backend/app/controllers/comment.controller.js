const db = require("../models");
const { sequelize } = require("../models");

const Comment = db.comments;


exports.createComment = (req, res) => {
    if (!req.body.text) {
        res.status(400).send({
            message: 'Les données du commentaire sont vides'
        });
        return
    }
    return Comment.create({
        text: req.body.text,
        file: req.body.file,
        userId: req.params.userId,
        postId: req.params.postId,
    })
        .then((comment) => {
            res.status(201).send(comment);
            return comment;
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comment."
            });
            console.error(">> Error while creating comment: ", err);
        });
};

exports.findAll = (req, res) => {
    return Comment.findAll({
        include: ["post", "user"],
        order: sequelize.literal('id DESC')
    }).then((comments) => {
        res.status(201).send(comments);
        return comments;
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving comments."
        });
    });
};

exports.findCommentById = (req, res) => {
    const id = req.params.commentId;
    return Comment.findByPk(id, { include: ["user"] })
        .then((comment) => {
            if (comment) {
                res.status(201).send(comment);
                return comment;
            } else {
                res.status(404).send({
                    message: `Commentaire n°${id} non trouvé.`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Erreur lors de la recherche de commentaire : ${err}.`
            });
        });
};

exports.updateComment = (req, res) => {
    if (!req.auth.isCreator) {
        if (!req.auth.isAdmin) {
            res.status(401).json({ message: 'Utilisateur non autorisé à modifier le commentaire' });
            return;
        }
    }
    Comment.update(req.body, {
        where: { id: req.params.commentId },
    }
    ).then(() => res.status(200).json({ message: 'Commentaire modifié' })
    ).catch(error => res.status(400).json({
        message: `Erreur lors de la modification du commentaire : ${error}.`
    }));
};

exports.delete = (req, res) => {
    if (!req.auth.isCreator) {
        if (!req.auth.isAdmin) {
            res.status(401).json({ message: 'Utilisateur non autorisé à supprimer le commentaire' });
            return;
        }
    }
    Comment.destroy({
        where: { id: req.params.commentId }
    }).then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
        .catch(error => res.status(400).json({ message: `Erreur lors de la suppression du commentaire : ${error}.` }));
}




