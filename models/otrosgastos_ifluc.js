module.exports = (sequelize, DataType) => {
    const OtrosgastosIfluc = sequelize.define("OtrosgastosIfluc", {
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
        eri_502: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50201: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50202: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50204: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020401: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020402: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return OtrosgastosIfluc;
};
