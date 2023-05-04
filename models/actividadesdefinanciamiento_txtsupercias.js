module.exports = (sequelize, DataType) => {
    const ActividadesdefinanciamientoTxt = sequelize.define("ActividadesdefinanciamientoTxt", {
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
        efe_md_950309: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950310: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950401: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActividadesdefinanciamientoTxt;
};
