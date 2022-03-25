
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        file: {
            type: DataTypes.STRING
        },
        likes: {
            type: DataTypes.INTEGER
        },
        dislikes: {
            type: DataTypes.INTEGER
        },
        usersLiked: {
            type: DataTypes.JSON
        },
        usersDisliked: {
            type: DataTypes.JSON
        }
    });
    return Post;
};