const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.users;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            User.findByPk(userId).then((res) => {
                req.auth = { userId: userId, isAdmin: res.dataValues.isAdmin };
                next();
            })
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' });
    }
}