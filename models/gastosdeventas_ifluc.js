module.exports = (sequelize, DataType) => {
    const GastosdeventasIfluc = sequelize.define("GastosdebentasIfluc", {
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
        eri_50201: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020101: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020102: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020103: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020104: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020105: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020106: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020107: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020108: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020109: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020110: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020111: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020112: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020113: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020114: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020115: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020116: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020117: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020118: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020119: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020120: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012001: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012002: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012003: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020121: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012101: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012102: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020122: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012201: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012202: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012203: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012204: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012205: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012206: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012207: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020123: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012301: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012302: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502012303: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020124: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020125: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020126: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020127: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020128: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return GastosdeventasIfluc;
};
