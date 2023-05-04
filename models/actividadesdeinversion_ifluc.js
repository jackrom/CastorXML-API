module.exports = (sequelize, DataType) => {
    const ActividadesdeinversionIfluc = sequelize.define("ActividadesdeinversionIfluc", {
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
        efe_md_9502: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950201: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950202: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950203: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950204: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950205: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95020501: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950206: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950207: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950208: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950209: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95020901: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950210: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950211: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95021101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950212: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950213: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95021301: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95021302: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95021303: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950214: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950215: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950216: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950217: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950218: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950219: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950220: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950221: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95022101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95022102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95022103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95022104: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95022105: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95022106: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95022107: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95022108: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95022109: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95022110: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActividadesdeinversionIfluc;
};
