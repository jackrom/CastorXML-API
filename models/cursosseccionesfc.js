module.exports = (sequelize, DataType) => {
    const CursosseccionesFC = sequelize.define("Cursosseccionesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cursoId: {
            type: DataType.INTEGER,
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
            type: DataType.STRING
        },
    });

    CursosseccionesFC.associate = function(models) {
        CursosseccionesFC.hasMany(models.Cursosleccionesfc, {
            foreignKey: 'seccionId',
            as: 'courseslessons'
        });
    }

    return CursosseccionesFC;
};
