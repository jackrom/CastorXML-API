module.exports = (sequelize, DataType) => {
    const Tokensdatafastfc =  sequelize.define("Tokensdatafastfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        token: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Tokensdatafastfc.associate = function(models) {
        Tokensdatafastfc.belongsTo(models.Usersfc, {
            foreignKey: 'userId',
            as: 'tokens'
        });
    }

    return Tokensdatafastfc
};
