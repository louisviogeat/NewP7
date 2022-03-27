const db = require("../models");
const Comment = db.comments;

module.exports = (req, res, next) => {
    try {
        Comment.findByPk(req.params.commentId).then((res) => {
            let isCreator = false;
            if (res.dataValues.userId === req.auth.userId) {
                isCreator = true;
            } else {
                isCreator = false;
            }
            req.auth.isCreator = isCreator;
            next();
        })

    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' });
    }
}