module.exports = (sequelize, DataType) => {
    const AplicacionesToUserfc = sequelize.define("AplicacionesToUserfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: true
        },
        aplicacionId: {
            type: DataType.INTEGER,
            allowNull: true
        },
        isActive: {
            type: DataType.INTEGER,
            allowNull: true
        },
        storage: {
            type: DataType.INTEGER,
            allowNull: true
        },
        modopago: {
            type: DataType.STRING,
            allowNull: true
        },
        valorpago: {
            type: DataType.FLOAT(10,2),
            allowNull: true
        },
        periodopago: {
            type: DataType.INTEGER,
            allowNull: true
        },
        fechapago: {
            type: DataType.DATE
        }
    })

    AplicacionesToUserfc.associate = function(models) {
        AplicacionesToUserfc.belongsTo(models.Aplicacionesfc, {
            foreignKey: 'aplicacionId',
            as: 'aplicacion'
        });
    };

    return AplicacionesToUserfc
};
