module.exports = (sequelize, DataType) => {
    const MailFolders = sequelize.define("MailFolders", {
        FolderId: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        }
    });

    return MailFolders;
};
