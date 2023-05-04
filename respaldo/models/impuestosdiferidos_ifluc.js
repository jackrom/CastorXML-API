module.exports = (sequelize, DataType) => {
    const ImpuestosDiferidosIfluc = sequelize.define("ImpuestosDiferidosIfluc", {
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
        mov_apid_saldoinicial: {
            type: DataType.DECIMAL
        },
        mov_apid_generacionenrevision: {
            type: DataType.DECIMAL
        },
        mov_apid_afectacionaresultadosintegrales: {
            type: DataType.DECIMAL
        },
        mov_apid_ajustesresultadosacumulados: {
            type: DataType.DECIMAL
        },
        mov_apid_ajustesresultadospyg: {
            type: DataType.DECIMAL
        },
        mov_apid_saldofinalsegunmovimiento: {
            type: DataType.DECIMAL
        },
        mov_apid_saldofinalsegunesf: {
            type: DataType.DECIMAL
        },
        mov_apid_diferenciaporcuadrar: {
            type: DataType.DECIMAL
        },
        mov_ppid_saldoinicial: {
            type: DataType.DECIMAL
        },
        mov_ppid_generacionenrevision: {
            type: DataType.DECIMAL
        },
        mov_ppid_afectacionaresultadosintegrales: {
            type: DataType.DECIMAL
        },
        mov_ppid_ajustesresultadosacumulados: {
            type: DataType.DECIMAL
        },
        mov_ppid_ajustesresultadospyg: {
            type: DataType.DECIMAL
        },
        mov_ppid_saldofinalsegunmovimiento: {
            type: DataType.DECIMAL
        },
        mov_ppid_saldofinalsegunesf: {
            type: DataType.DECIMAL
        },
        mov_ppid_diferenciaporcuadrar: {
            type: DataType.DECIMAL
        },
    });

    return ImpuestosDiferidosIfluc;
};
