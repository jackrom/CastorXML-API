module.exports = (sequelize, DataType) => {
    const PeriodosIfluc = sequelize.define("PeriodosIfluc", {
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

    PeriodosIfluc.associate = function(models) {
        PeriodosIfluc.belongsTo(models.EmpresasIfluc, {
            foreignKey: 'empresaId',
            as: 'enterprisesifluc'
        });
    };

    return PeriodosIfluc;
};
