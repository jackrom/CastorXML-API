module.exports = (sequelize, DataType) => {
    const PatrimonioIfluc = sequelize.define("PatrimonioIfluc", {
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
        esf_3: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30: {
            type: DataType.DECIMAL(10,2)
        },
        esf_31: {
            type: DataType.DECIMAL(10,2)
        },
        esf_301: {
            type: DataType.DECIMAL(10,2)
        },
        esf_302: {
            type: DataType.DECIMAL(10,2)
        },
        esf_303: {
            type: DataType.DECIMAL(10,2)
        },
        esf_304: {
            type: DataType.DECIMAL(10,2)
        },
        esf_305: {
            type: DataType.DECIMAL(10,2)
        },
        esf_306: {
            type: DataType.DECIMAL(10,2)
        },
        esf_307: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30104: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30105: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30401: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30402: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30501: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30502: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30503: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30504: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30601: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30602: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30603: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30604: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30605: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30606: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30607: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30701: {
            type: DataType.DECIMAL(10,2)
        },
        esf_30702: {
            type: DataType.DECIMAL(10,2)
        },
        esf_3010501: {
            type: DataType.DECIMAL(10,2)
        },
        esf_3010502: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return PatrimonioIfluc;
};
