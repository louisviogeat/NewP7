
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
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
    return Comment;
};