module.exports = (sequelize, DataType) => {
    const OtrosingresosTxt = sequelize.define("OtrosingresosTxt", {
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
        eri_403: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40301: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40302: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40303: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return OtrosingresosTxt;
};
