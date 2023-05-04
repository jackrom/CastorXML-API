module.exports = (sequelize, DataType) => {
    const Transacciones = sequelize.define("Transacciones", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCliente: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        authorizationCode: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        cardToken: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        clientTransactionId: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        messageCode: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        statusCode: {
            type: DataType.INTEGER,
            allowNull: true
        },
        transactionId: {
            type: DataType.INTEGER,
            allowNull: true
        },
        amount: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        estado: {
            type:   DataType.ENUM,
            values: ['procesada', 'no procesada'],
            defaultValue: 'no procesada',
            allowNull: true
        }
    });

    Transacciones.associate = function(models) {
        Transacciones.belongsTo(models.Users, {
            foreignKey: 'idCliente',
            as: 'clientetarjeta'
        });
    };

    return Transacciones;
};
