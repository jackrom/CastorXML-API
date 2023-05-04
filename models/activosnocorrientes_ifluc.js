module.exports = (sequelize, DataType) => {
    const ActivosnocorrientesIfluc = sequelize.define("ActivosnocorrientesIfluc", {
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
        esf_102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020104: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020105: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020106: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020107: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020108: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020109: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020110: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020111: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020112: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020113: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020114: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102011401: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102011402: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102011403: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102020101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102020102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102020201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_102020202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020204: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020301: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020302: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020303: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020304: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020305: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020306: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10204: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020401: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020402: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020403: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020404: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020405: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020406: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020407: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10205: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10206: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020601: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020602: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020603: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020604: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020605: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020606: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10207: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020701: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020702: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020703: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10208: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020801: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020802: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020803: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020805: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020806: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020807: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020808: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020809: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020810: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020811: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10209: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020901: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020902: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1020903: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10210: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1021001: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1021002: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1021003: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1021004: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActivosnocorrientesIfluc;
};
