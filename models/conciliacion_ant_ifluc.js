module.exports = (sequelize, DataType) => {
    const ConciliacionAntIfluc = sequelize.define("ConciliacionAntIfluc", {
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
        efe_md_96_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_97_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_98_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9703_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9704_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9705_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9706_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9707_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9708_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970801_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970802_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9709_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970901_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9710_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971001_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9711_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971108_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971109_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971110_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971111_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971112_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971113_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971114_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971115_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971116_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971117_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971118_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971119_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971120_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971121_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971122_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971123_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971124_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9801_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9802_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9803_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9804_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980403_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980404_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9805_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980505_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980506_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980507_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9806_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9807_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9808_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980801_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9809_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9810_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981001_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981002_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981003_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981004_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981005_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981006_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981007_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981008_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981009_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981010_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981011_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981012_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981013_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981014_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9820_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ConciliacionAntIfluc;
};
