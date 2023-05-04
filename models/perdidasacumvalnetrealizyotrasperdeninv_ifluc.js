module.exports = (sequelize, DataType) => {
    const PerdidasAcumValNetRealizyOtrasPerdEnInvIfluc = sequelize.define("PerdidasAcumValNetRealizyOtrasPerdEnInvIfluc", {
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
        saldoinicial: {
            type: DataType.DECIMAL
        },
        provisionesdelanio: {
            type: DataType.DECIMAL
        },
        bajasoreversiones: {
            type: DataType.DECIMAL
        },
        ajustes: {
            type: DataType.DECIMAL
        },
        saldofinalsegunmovimiento: {
            type: DataType.DECIMAL
        },
        saldofinalsegunesf: {
            type: DataType.DECIMAL
        },
        diferenciaporcuadrar: {
            type: DataType.DECIMAL
        },
    });

    return PerdidasAcumValNetRealizyOtrasPerdEnInvIfluc;
};
