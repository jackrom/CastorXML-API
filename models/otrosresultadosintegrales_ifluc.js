module.exports = (sequelize, DataType) => {
    const OtrosresultadosintegralesIfluc = sequelize.define("OtrsoresultadosintegralesIfluc", {
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
        eri_800: {
            type: DataType.DECIMAL(10,2)
        },
        eri_801: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80001: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80002: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80003: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80004: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80005: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80006: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80007: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80008: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80009: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return OtrosresultadosintegralesIfluc;
};
