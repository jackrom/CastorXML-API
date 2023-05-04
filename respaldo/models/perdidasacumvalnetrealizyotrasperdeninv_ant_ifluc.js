module.exports = (sequelize, DataType) => {
    const PerdidasAcumValNetRealizyOtrasPerdEnInvAntIfluc = sequelize.define("PerdidasAcumValNetRealizyOtrasPerdEnInvAntIfluc", {
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
        saldoinicial_ant: {
            type: DataType.DECIMAL
        },
        provisionesdelanio_ant: {
            type: DataType.DECIMAL
        },
        bajasoreversiones_ant: {
            type: DataType.DECIMAL
        },
        ajustes_ant: {
            type: DataType.DECIMAL
        },
        saldofinalsegunmovimiento_ant: {
            type: DataType.DECIMAL
        },
        saldofinalsegunesf_ant: {
            type: DataType.DECIMAL
        },
        diferenciaporcuadrar_ant: {
            type: DataType.INTEGER
        },
    });

    return PerdidasAcumValNetRealizyOtrasPerdEnInvAntIfluc;
};
