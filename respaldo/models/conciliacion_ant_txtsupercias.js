module.exports = (sequelize, DataType) => {
    const ConciliacionAntTxt = sequelize.define("ConciliacionAntTxt", {
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
        efe_md_9702_ant: {
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
        efe_md_9709_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9710_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9711_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9801_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9802_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9803_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9804_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9805_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9806_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9807_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9808_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9809_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9810_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9820_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ConciliacionAntTxt;
};
