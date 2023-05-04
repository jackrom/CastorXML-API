module.exports = (sequelize, DataType) => {
    const GastosfinancierosIfluc = sequelize.define("GastosfinancierosIfluc", {
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
        eri_50203: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020301: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020302: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020303: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020304: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020305: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020306: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020307: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020308: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020309: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020310: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020311: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020312: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030101: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030102: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030103: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030104: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030201: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030301: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030302: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030303: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030304: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030305: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030306: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030307: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030308: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030401: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030402: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030403: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030404: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030501: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030502: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030503: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502030504: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203020101: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203020103: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203020104: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203020105: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50203020106: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return GastosfinancierosIfluc;
};
