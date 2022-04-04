const { sequelize } = require("../models");
const db = require("../models");
const base64Img = require('base64-img');
const fs = require('fs');
const Post = db.posts;
const Comment = db.comments


exports.createPost = (req, res) => {

    if (!req.body.text) {
        res.status(400).send({
            message: 'Les données du post sont vides'
        });
        return
    }

    return Post.create({
        text: req.body.text,
        file: req.body.file,
        userId: req.params.id,
    })
        .then((post) => {
            res.status(201).send(post);
            return post;
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
            console.error(">> Error while creating post: ", err);
        });
};

exports.findAll = (req, res) => {
    return Post.findAll({
        include: ["comments", "user", { model: Comment, as: "comments", include: "user" }, "likesOrDislikes"],
        order: sequelize.literal('id DESC')
    }).then((posts) => {
        res.status(201).send(posts);
        return posts;
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving posts."
        });
    });
};

exports.findPostById = (req, res) => {
    const id = req.params.id;
    return Post.findByPk(id, { include: ["comments"] })
        .then((post) => {
            if (post) {
                res.status(201).send(post);
                return post;
            } else {
                res.status(404).send({
                    message: `Post n°${id} non trouvé.`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Erreur lors de la recherche du post n°${id}.`
            });
        });
};

exports.updatePost = (req, res) => {
    if (!req.auth.isCreator) {
        if (!req.auth.isAdmin) {
            res.status(401).json({ message: 'Utilisateur non autorisé à modifier le post' });
            return;
        }
    }
    if (req.body.file) {
        Post.findByPk(req.params.id).then((post) => {
            if (req.body.file != post.file) {
                //let imgToDelete = JSON.stringify(post.file);

                fs.unlinkSync(post.file);
            }
        })
    }
    Post.update(req.body, {
        where: { id: req.params.id },
    }
    ).then(() => res.status(200).json({ message: 'Post modifié' })
    ).catch(error => res.status(400).json({ message: `Erreur lors de la modification du post : ${error}.` }));
};

exports.delete = (req, res) => {
    if (!req.auth.isCreator) {
        if (!req.auth.isAdmin) {
            res.status(401).json({ message: 'Utilisateur non autorisé à supprimer le post' });
            return;
        }
    }
    Post.findByPk(req.params.id).then((post) => {
        if (post.file) {
            fs.unlinkSync(post.file);
        }
    });
    Post.destroy({
        where: { id: req.params.id }
    }).then(() => res.status(200).json({ message: 'Post supprimé' }))
        .catch(error => res.status(400).json({ message: `Erreur lors de la suppression du post : ${error}.` }));
}



