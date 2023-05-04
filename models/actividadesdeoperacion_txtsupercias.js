module.exports = (sequelize, DataType) => {
    const ActividadesdeoperacionTxt = sequelize.define("ActividadesdeoperacionTxt", {
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
        efe_md_950101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950104: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950105: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950106: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950107: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950108: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010104: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010105: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010201: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010202: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010203: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010204: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010205: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActividadesdeoperacionTxt;
};
