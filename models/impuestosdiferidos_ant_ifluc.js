module.exports = (sequelize, DataType) => {
    const ImpuestosDiferidosAntIfluc = sequelize.define("ImpuestosDiferidosAntIfluc", {
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
        mov_apid_saldoinicial_ant: {
            type: DataType.DECIMAL
        },
        mov_apid_generacionenrevision_ant: {
            type: DataType.DECIMAL
        },
        mov_apid_afectacionaresultadosintegrales_ant: {
            type: DataType.DECIMAL
        },
        mov_apid_ajustesresultadosacumulados_ant: {
            type: DataType.DECIMAL
        },
        mov_apid_ajustesresultadospyg_ant: {
            type: DataType.DECIMAL
        },
        mov_apid_saldofinalsegunmovimiento_ant: {
            type: DataType.DECIMAL
        },
        mov_apid_saldofinalsegunesf_ant: {
            type: DataType.DECIMAL
        },
        mov_apid_diferenciaporcuadrar_ant: {
            type: DataType.DECIMAL
        },
        mov_ppid_saldoinicial_ant: {
            type: DataType.DECIMAL
        },
        mov_ppid_generacionenrevision_ant: {
            type: DataType.DECIMAL
        },
        mov_ppid_afectacionaresultadosintegrales_ant: {
            type: DataType.DECIMAL
        },
        mov_ppid_ajustesresultadosacumulados_ant: {
            type: DataType.DECIMAL
        },
        mov_ppid_ajustesresultadospyg_ant: {
            type: DataType.DECIMAL
        },
        mov_ppid_saldofinalsegunmovimiento_ant: {
            type: DataType.DECIMAL
        },
        mov_ppid_saldofinalsegunesf_ant: {
            type: DataType.DECIMAL
        },
        mov_ppid_diferenciaporcuadrar_ant: {
            type: DataType.DECIMAL
        },
    });

    return ImpuestosDiferidosAntIfluc;
};
