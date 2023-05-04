module.exports = (sequelize, DataType) => {
    const CostosAntTxt = sequelize.define("CostosAntTxt", {
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
        eri_5_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010108_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010109_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010110_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010111_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010112_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010403_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010404_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010405_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010406_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010407_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010408_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return CostosAntTxt;
};
