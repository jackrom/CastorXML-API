module.exports = (sequelize, DataType) => {
    const OtrosresultadosintegralesAntIfluc = sequelize.define("OtrsoresultadosintegralesAntIfluc", {
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
        eri_800_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_801_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80001_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80002_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80003_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80004_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80005_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80006_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80007_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80008_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_80009_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return OtrosresultadosintegralesAntIfluc;
};
