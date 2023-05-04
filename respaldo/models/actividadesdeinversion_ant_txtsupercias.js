module.exports = (sequelize, DataType) => {
    const ActividadesdeinversionAntTxt = sequelize.define("ActividadesdeinversionAntTxt", {
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
        efe_md_9502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950208_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950209_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950210_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950211_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950212_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950213_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950214_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950215_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950216_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950217_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950218_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950219_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950220_ant: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950221_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActividadesdeinversionAntTxt;
};
