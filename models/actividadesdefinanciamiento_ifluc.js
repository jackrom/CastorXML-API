module.exports = (sequelize, DataType) => {
    const ActividadesdefinanciamientoIfluc = sequelize.define("ActividadesdefinanciamientoIfluc", {
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
        efe_md_95: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9503: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9504: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9505: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9506: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9507: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950301: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95030101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95030102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95030103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95030104: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950302: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950303: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950304: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950305: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950306: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950307: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950308: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95030801: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950309: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950310: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95031001: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95031002: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95031003: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95031004: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95031005: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95031006: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95031007: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95031008: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950401: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActividadesdefinanciamientoIfluc;
};
