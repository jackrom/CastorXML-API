module.exports = (sequelize, DataType) => {
    const PatrimonioAntTxt = sequelize.define("PatrimonioAntTxt", {
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
        esf_3_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_304_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_305_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_306_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_307_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_3010501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_3010502_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return PatrimonioAntTxt;
};
