module.exports = (sequelize, DataType) => {
    const RecurrentesdatafastFC = sequelize.define("Recurrentesdatafastfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idDatafast: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        idCliente: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        amount: {
            type: DataType.STRING,
            allowNull: true
        },
        paymentBrand: {
            type: DataType.STRING,
            allowNull: true
        },
        responseId: {
            type: DataType.STRING,
            allowNull: true
        },
        registrationId: {
            type: DataType.STRING,
            allowNull: true
        },
        contenidoCompra: {
            type: DataType.TEXT,
            allowNull: true
        },
        recurrenciaactiva: {
            type: DataType.INTEGER(1),
        },
        fecha: {
            type: DataType.DATE,
            allowNull: true
        },
        diacobro: {
            type: DataType.INTEGER,
            allowNull: true
        }
    });

    RecurrentesdatafastFC.associate = function(models) {
        RecurrentesdatafastFC.belongsTo(models.Usersfc, {
            foreignKey: 'idCliente',
            as: 'usuariorecurrente'
        });
    }

    return RecurrentesdatafastFC;
};
