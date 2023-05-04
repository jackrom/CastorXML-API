module.exports = (sequelize, DataType) => {
    const GastosfinancierosAntIfluc = sequelize.define("GastosfinancierosAntIfluc", {
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
        eri_50203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020304_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020305_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020306_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020307_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020308_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020309_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020310_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020311_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020312_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030304_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030305_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030306_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030307_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030308_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030403_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030404_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203020101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203020103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203020104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203020105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203020106_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return GastosfinancierosAntIfluc;
};
