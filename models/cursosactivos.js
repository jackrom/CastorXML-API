module.exports = (sequelize, DataType) => {
    const CursosactivosFC = sequelize.define("CursosactivosFC", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER
        },
        idCurso: {
            type: DataType.INTEGER
        },
        fecha_activacion: {
            type: DataType.DATE,
        },
        fecha_fin: {
            type: DataType.DATE,
        },
        vencido: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        ispacket: {
            type: DataType.INTEGER,
        }
    });

    CursosactivosFC.associate = function(models) {
        CursosactivosFC.belongsTo(models.Usersfc, {
            foreignKey: 'user_id',
            as: 'usuario'
        });
        CursosactivosFC.belongsTo(models.Promocionesfc, {
            foreignKey: 'idCurso',
            as: 'promocion'
        });
        CursosactivosFC.belongsTo(models.Productosfc, {
            foreignKey: 'idCurso',
            as: 'producto'
        });
        CursosactivosFC.belongsTo(models.Cursosfc, {
            foreignKey: 'idCurso',
            as: 'cursosproducto'
        });
    }

    return CursosactivosFC;
};
