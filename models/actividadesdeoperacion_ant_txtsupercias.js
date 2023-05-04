module.exports = (sequelize, DataType) => {
    const ActividadesdeoperacionAntTxt = sequelize.define("ActividadesdeoperacionAntTxt", {
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
        efe_md_950102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950108_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010102_ant: {
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
        efe_md_95010201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010205_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActividadesdeoperacionAntTxt;
};
