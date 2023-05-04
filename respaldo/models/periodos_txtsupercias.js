module.exports = (sequelize, DataType) => {
    const PeriodosTxt = sequelize.define("PeriodosTxt", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataType.INTEGER
        },
        empresaId: {
            type: DataType.STRING
        },
        periodo: {
            type: DataType.INTEGER
        }
    });

    PeriodosTxt.associate = function(models) {
        PeriodosTxt.belongsTo(models.EmpresasTxt, {
            foreignKey: 'empresaId',
            as: 'enterprisestxt'
        });
    };

    return PeriodosTxt;
};
