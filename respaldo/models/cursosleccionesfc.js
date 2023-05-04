module.exports = (sequelize, DataType) => {
    const CursosleccionesFC = sequelize.define("Cursosleccionesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cursoId: {
            type: DataType.INTEGER,
        },
        seccionId: {
            type: DataType.INTEGER,
        },
        guia: {
            type: DataType.STRING
        },
        mapamental: {
            type: DataType.STRING
        },
        ejercicio: {
            type: DataType.STRING
        },
        modulo: {
            type: DataType.STRING
        },
        orden: {
            type: DataType.INTEGER
        },
        otros: {
            type: DataType.TEXT
        },
        titulo: {
            type: DataType.STRING
        },
        videourl: {
            type: DataType.STRING
        },
        visibilidad: {
            type: DataType.STRING
        },
        tipo: {
            type:   DataType.ENUM,
            allowNull: true,
            values: ['evaluacion', 'lecccion'],
            defaultValue: null
        },
        informacion: {
            type: DataType.TEXT
        },
        enlace: {
            type: DataType.STRING(512)
        },
        iframe: {
            type: DataType.TEXT
        },
        leccionactiva: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
    });

    return CursosleccionesFC;
};
