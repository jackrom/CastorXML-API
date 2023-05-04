module.exports = (sequelize, DataType) => {
    const PerdidasAcumCuentasIncobyDeterioroAntIfluc = sequelize.define("PerdidasAcumCuentasIncobyDeterioroAntIfluc", {
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
        provisionesanio_ant: {
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
            type: DataType.DECIMAL
        },
    });

    return PerdidasAcumCuentasIncobyDeterioroAntIfluc;
};
