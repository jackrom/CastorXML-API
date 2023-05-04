module.exports = (sequelize, DataType) => {
    const OtrosgastosAntIfluc = sequelize.define("OtrosgastosAntIfluc", {
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
        eri_502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020402_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return OtrosgastosAntIfluc;
};
