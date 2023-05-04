module.exports = (sequelize, DataType) => {
    const RecurrentesdatafastcobrosFC = sequelize.define("Recurrentesdatafastcobrosfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        datafastId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        clienteId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        recurrenteId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        mesCobro: {
            type: DataType.STRING,
            allowNull: true
        },
        diaCobro: {
            type: DataType.STRING,
            allowNull: true
        },
        responseId: {
            type: DataType.STRING,
            allowNull: true
        },
        codigoResult: {
            type: DataType.STRING,
            allowNull: true
        },
        estado: {
            type: DataType.BOOLEAN,
            allowNull: true
        }
    });

    RecurrentesdatafastcobrosFC.associate = function(models) {
        RecurrentesdatafastcobrosFC.belongsTo(models.Usersfc, {
            foreignKey: 'clienteId',
            as: 'usuariocobrorecurrente'
        });
        RecurrentesdatafastcobrosFC.belongsTo(models.Datafast, {
            foreignKey: 'datafastId',
            as: 'detallecobrorecurrente'
        });
        RecurrentesdatafastcobrosFC.belongsTo(models.Recurrentesdatafastfc, {
            foreignKey: 'recurrenteId',
            as: 'registrocobrorecurrente'
        });
    }

    return RecurrentesdatafastcobrosFC;
};
