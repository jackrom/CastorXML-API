module.exports = (sequelize, DataType) => {
    const ActivosFinancierosLargoPlazoAntIfluc = sequelize.define("ActivosFinancierosLargoPlazoAntIfluc", {
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
        mov_saldoinicial_ant: {
            type: DataType.DECIMAL
        },
        mov_nuevasinversiones_ant: {
            type: DataType.DECIMAL
        },
        mov_interesactualizacionantiguasinv_ant: {
            type: DataType.DECIMAL
        },
        mov_provisionpordeterioro_ant: {
            type: DataType.DECIMAL
        },
        mov_ajustes_ant: {
            type: DataType.DECIMAL
        },
        mov_saldofinalsegunmovimiento_ant: {
            type: DataType.DECIMAL
        },
        mov_saldofinalsegunesf_ant: {
            type: DataType.DECIMAL
        },
        mov_diferenciaporcuadrar: {
            type: DataType.DECIMAL
        },
    });

    return ActivosFinancierosLargoPlazoAntIfluc;
};
