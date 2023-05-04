module.exports = (sequelize, DataType) => {
    const CostosIfluc = sequelize.define("CostosIfluc", {
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
        eri_5: {
            type: DataType.DECIMAL(10,2)
        },
        eri_501: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50101: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010101: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010102: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010103: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010104: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010105: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010106: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010107: {
            type: DataType.DECIMAL(18,2)
        },
        eri_5010108: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010109: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010110: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010111: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010112: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50102: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010201: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010202: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50103: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010301: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010302: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50104: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010401: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010402: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010403: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010404: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010405: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010406: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010407: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010408: {
            type: DataType.DECIMAL(10,2)
        },
        eri_50105: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5010501: {
            type: DataType.DECIMAL(10,2)
        },
        eri_402: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return CostosIfluc;
};
