module.exports = (sequelize, DataType) => {
    const OtrosingresosAntTxt = sequelize.define("OtrosingresosAntTxt", {
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
        eri_403_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40303_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return OtrosingresosAntTxt;
};
