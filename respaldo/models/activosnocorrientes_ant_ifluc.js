module.exports = (sequelize, DataType) => {
    const ActivosnocorrientesAntIfluc = sequelize.define("ActivosnocorrientesAntIfluc", {
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
        esf_102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020108_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020109_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020110_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020111_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020112_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020113_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020114_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102011401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102011402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102011403_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102020101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102020102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102020201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102020202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020304_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020305_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020306_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020403_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020404_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020405_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020406_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020407_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020703_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10208_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020801_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020802_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020803_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020805_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020806_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020807_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020808_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020809_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020810_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020811_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10209_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020901_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020902_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020903_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10210_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1021001_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1021002_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1021003_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1021004_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActivosnocorrientesAntIfluc;
};
