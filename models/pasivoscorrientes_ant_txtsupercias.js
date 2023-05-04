module.exports = (sequelize, DataType) => {
    const PasivoscorrientesAntTxt = sequelize.define("PasivoscorrientesAntTxt", {
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
        esf_201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010703_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010704_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010705_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010706_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010707_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20108_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010801_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010802_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20109_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20110_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011001_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011002_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20111_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20112_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20113_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011304_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011305_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011306_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011307_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011308_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011309_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011310_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011311_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011312_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20114_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return PasivoscorrientesAntTxt;
};
