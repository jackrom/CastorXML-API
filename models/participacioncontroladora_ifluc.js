module.exports = (sequelize, DataType) => {
    const ParticipacioncontroladoraIfluc = sequelize.define("ParticipacioncontroladoraIfluc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reporteId: {
            type: DataType.INTEGER
        },
        userId: {
            type: DataType.INTEGER
        },
        empresaId: {
            type: DataType.STRING
        },
        periodoId: {
            type: DataType.INTEGER
        },
        eri_80101: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80102: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ParticipacioncontroladoraIfluc;
};
