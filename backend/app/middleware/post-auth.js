const db = require("../models");
const Post = db.posts;

module.exports = (req, res, next) => {
    try {
        Post.findByPk(req.params.id).then((res) => {
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
