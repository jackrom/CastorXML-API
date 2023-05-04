module.exports = (sequelize, DataType) => {
    const SeccionesFC = sequelize.define("Seccionesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cursoId: {
            type: DataType.INTEGER,
        },
        curso: {
            type: DataType.STRING(255)
        },
        orden: {
            type: DataType.INTEGER,
        },
        titulo: {
            type: DataType.STRING(1000)
        },
        descripcion: {
            type: DataType.STRING(2000)
        },
        lecciones: {
            type: DataType.TEXT
        },
    });

    SeccionesFC.associate = function(models) {
        SeccionesFC.hasMany(models.Leccionesfc, {
            foreignKey: 'seccionId',
            as: 'lessons'
        });
    }

    return SeccionesFC;
};
