module.exports = (sequelize, DataType) => {
    const Periodos = sequelize.define("Periodos", {
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

    Periodos.associate = function(models) {
        Periodos.belongsTo(models.Empresas, {
            foreignKey: 'empresaId',
            as: 'enterprises'
        });
    };

    return Periodos;
};
