const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.users;

exports.signup = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: 'Les données de l\'utilisateur sont vides'
        });
        return
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            return User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                isAdmin: req.body.isAdmin
            }).then((user) => {
                res.status(201).send(user);
                return user;
            }).catch((err) => {
                res.status(500).send({
                    message: `Erreur lors de l'inscription de l'utilisateur : ${err}.`
                });
            });
        })
        .catch(error => res.status(500).json({ message: `Erreur lors de l'inscription de l'utilisateur : ${err}.` }));
};

exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect ' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ message: `Erreur lors de la connexion de l'utilisateur : ${error}.` }));
        })
        .catch(error => {
            res.status(500).json({ message: `Erreur lors de la connexion de l'utilisateur : ${error}.` })
        })
}

exports.findAll = (req, res) => {
    return User.findAll({
        include: ["posts", "comments"]
    }).then((users) => {
        res.send(users);
        return users;
    }).catch(err => {
        res.status(500).send({
            message: `Erreur lors de la recherche de tous les utilisateurs : ${err}.`
        });
    });
};

exports.findUserById = (req, res) => {
    const id = req.params.id;
    return User.findByPk(id, { include: ["posts", "comments"] })
        .then((user) => {
            if (user) {
                res.send(user);
                return user;
            } else {
                res.status(404).send({
                    message: `Utilisateur n°${id} non trouvé.`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Erreur lors de la recherche l'utilisateur : ${error}.`
            });
        });
};

exports.deleteUser = (req, res) => {
    if (!req.auth.isAdmin) {
        res.status(401).json({ message: 'Seul un profil admin peut supprimer un utilisateur' });
        return;
    }
    User.destroy({
        where: { id: req.params.id }
    }).then(() => res.status(200).json({ message: 'Utilisateur supprimé' }
    )).catch(() => res.status(400).json({ message: 'Suppression non autorisée' }));

}
