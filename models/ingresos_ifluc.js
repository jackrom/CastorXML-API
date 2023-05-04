module.exports = (sequelize, DataType) => {
    const IngresosIfluc = sequelize.define("IngresosIfluc", {
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
        eri_401: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40101: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40102: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010201: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010202: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010203: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010204: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40103: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40104: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40105: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40106: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010601: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010602: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010603: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40107: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40108: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40109: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010901: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090101: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090103: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090104: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090105: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090106: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010902: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090201: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090202: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090203: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090204: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090205: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090206: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090207: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090208: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010903: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090301:{
            type: DataType.DECIMAL(10,2)
        },
        eri_401090302: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090303: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090304: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40110: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011001: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011002: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011003: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011004: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011005: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011006: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40112: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40113: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40114: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40115: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40116: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return IngresosIfluc;
};
