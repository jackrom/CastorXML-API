module.exports = (sequelize, DataType) => {
    const ActividadesdeoperacionAntIfluc = sequelize.define("ActividadesdeoperacionAntIfluc", {
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
        efe_md_950101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010108_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010109_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010110_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010111_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010112_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010113_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010114_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010115_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010116_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010117_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010118_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010119_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010120_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010121_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020108_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020109_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020110_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020111_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020112_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020113_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020114_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020115_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020116_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020117_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020118_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020119_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020120_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020121_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020122_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020123_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020124_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020125_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020126_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020127_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020128_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020129_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020130_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020131_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020132_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020133_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020134_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020135_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020136_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020137_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020138_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020139_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020140_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020141_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020142_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020143_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020144_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020145_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020146_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020147_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020148_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020149_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020150_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020151_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020152_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020153_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020154_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020155_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020156_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010703_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950108_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010801_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010802_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010803_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010804_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010805_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010806_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010807_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010808_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010809_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010810_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010811_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010812_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010813_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActividadesdeoperacionAntIfluc;
};
