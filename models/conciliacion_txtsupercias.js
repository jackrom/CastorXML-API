module.exports = (sequelize, DataType) => {
    const ConciliacionTxt = sequelize.define("ConciliacionTxt", {
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
        efe_md_96: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_97: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_98: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9701: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9702: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9703: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9704: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9705: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9706: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9707: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9708: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9709: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9710: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9711: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9801: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9802: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9803: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9804: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9805: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9806: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9807: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9808: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9809: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9810: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9820: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ConciliacionTxt;
};
