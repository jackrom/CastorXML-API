module.exports = (sequelize, DataType) => {
    const MailMessages = sequelize.define("MailMessages", {
        MessageId: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        To: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        CC: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        BCC: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        From: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        Subject: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        Date: {
            type: DataType.BIGINT(20),
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        Message: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        HasAttachments: {
            type: DataType.INTEGER(1),
            allowNull: true,
            validate: {
                notEmpty: false
            },
            defaultValue: 0
        },
        Unread: {
            type: DataType.INTEGER(1),
            allowNull: true,
            validate: {
                notEmpty: false
            },
            defaultValue: 1
        },
        FolderId: {
            type: DataType.INTEGER(11),
            allowNull: true,
            validate: {
                notEmpty: false
            },
            defaultValue: 0
        }
    });

    return MailMessages;
};
