module.exports = (sequelize, DataType) => {
    const PasivosnocorrientesTxt = sequelize.define("PasivosnocorrientesTxt", {
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
        esf_202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020301: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020302: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20204: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020401: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040104: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020402: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040204: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20205: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020501: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020502: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020503: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020504: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020505: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20206: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020601: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020602: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20207: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020701: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020702: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20208: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20209: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020901: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020902: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20210: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return PasivosnocorrientesTxt;
};
