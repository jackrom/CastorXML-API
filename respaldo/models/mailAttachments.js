module.exports = (sequelize, DataType) => {
    const MailAttachments = sequelize.define("MailAttachments", {
        AttachmentId: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MessageId: {
            type: DataType.INTEGER(11),
            allowNull: true,
            validate: {
                notEmpty: false
            },
            defaultValue: 0
        },
        Filename: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        ContentType: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        Size: {
            type: DataType.INTEGER(11),
            allowNull: true,
            validate: {
                notEmpty: false
            },
            defaultValue: 0
        },
        Data: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
    });

    return MailAttachments;
};
