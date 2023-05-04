module.exports = (sequelize, DataType) => {
    const ActivosFinancierosLargoPlazoIfluc = sequelize.define("ActivosFinancierosLargoPlazoIfluc", {
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
        mov_saldoinicial: {
            type: DataType.DECIMAL
        },
        mov_nuevasinversiones: {
            type: DataType.DECIMAL
        },
        mov_interesactualizacionantiguasinv: {
            type: DataType.DECIMAL
        },
        mov_provisionpordeterioro: {
            type: DataType.DECIMAL
        },
        mov_ajustes: {
            type: DataType.DECIMAL
        },
        mov_saldofinalsegunmovimiento: {
            type: DataType.DECIMAL
        },
        mov_saldofinalsegunesf: {
            type: DataType.DECIMAL
        },
        mov_diferenciaporcuadrar: {
            type: DataType.DECIMAL
        },
    });

    return ActivosFinancierosLargoPlazoIfluc;
};
