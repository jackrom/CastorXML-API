module.exports = (sequelize, DataType) => {
    const LeccionesFC = sequelize.define("Leccionesfc", {
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
        }
    });

    return LeccionesFC;
};
