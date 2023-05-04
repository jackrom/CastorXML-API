module.exports = (sequelize, DataType) => {
    const ParticipacioncontroladoraAntTxt = sequelize.define("ParticipacioncontroladoraAntTxt", {
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
        eri_80101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80102_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ParticipacioncontroladoraAntTxt;
};
