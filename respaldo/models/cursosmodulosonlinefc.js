module.exports = (sequelize, DataType) => {
    const CursosmodulosonlineFC = sequelize.define("Cursosmodulosonlinefc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cursoId: {
            type: DataType.INTEGER,
        },
        enlace: {
            type: DataType.STRING(512),
        },
        idreunion: {
            type: DataType.STRING(256),
        },
        codigoacceso: {
            type: DataType.STRING(256),
        },
        horario: {
            type: DataType.STRING(1000),
        },
        observaciones: {
            type: DataType.TEXT,
        },
    });

    return CursosmodulosonlineFC;
};
