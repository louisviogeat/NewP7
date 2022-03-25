
module.exports = (sequelize, DataTypes) => {
    const LikeOrDislike = sequelize.define("likeOrDislike", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isALike: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return LikeOrDislike;
};