module.exports = (sequelize, DataType) => {
    const ActividadesdefinanciamientoAntTxt = sequelize.define("ActividadesdefinanciamientoAntTxt", {
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
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9505_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9506_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9507_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950304_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950305_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950306_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950307_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950308_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950309_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950310_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950401_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActividadesdefinanciamientoAntTxt;
};
