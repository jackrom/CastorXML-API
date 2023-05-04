module.exports = (sequelize, DataType) => {
    const GastosdeventasAntTxt = sequelize.define("GastosdebentasAntTxt", {
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
        eri_50201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020108_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020109_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020110_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020111_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020112_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020113_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020114_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020115_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020116_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020117_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020118_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020119_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020120_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012001_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012002_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012003_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020121_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020122_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020123_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020124_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020125_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020126_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020127_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020128_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return GastosdeventasAntTxt;
};
