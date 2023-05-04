module.exports = (sequelize, DataType) => {
    const Srifc = sequelize.define("Srifc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        periodoId: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: '00000000'
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        empresaId: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        nombre_reporte: {
            type: DataType.STRING,
            allowNull: true
        },
    });

    Srifc.associate = function(models) {
        Srifc.belongsTo(models.Empresas, {
            foreignKey: 'empresaId',
            as: 'empresareportesri'
        });
        Srifc.belongsTo(models.Periodos, {
            foreignKey: 'periodoId',
            as: 'periodosreportesri'
        });
    };

    return Srifc;
};
