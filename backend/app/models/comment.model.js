
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

    });
    return Comment;
};