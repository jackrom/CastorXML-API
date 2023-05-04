module.exports = (sequelize, DataType) => {
    const Modulosonlinefc = sequelize.define("Modulosonlinefc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cursoId: {
            type: DataType.INTEGER,
        },
        curso: {
            type: DataType.STRING(256),
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
        ispacket: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    });

    return Modulosonlinefc;
};
