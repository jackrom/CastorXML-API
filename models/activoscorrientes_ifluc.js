module.exports = (sequelize, DataType) => {
    const ActivoscorrientesIfluc = sequelize.define("ActivoscorrientesIfluc", {
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
        esf_1: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010104: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010105: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010106: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010204: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010205: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010206: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010207: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010208: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010209: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010210: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010211: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010212: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010213: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010214: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010215: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010216: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010217: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010218: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010219: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010220: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010221: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010222: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010223: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010301: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010302: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010303: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010304: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020104: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020105: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020106: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020204: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020205: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020206: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020207: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020208: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020209: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020210: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020211: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020212: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020213: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020214: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020215: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020216: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020217: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020218: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020219: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020220: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020221: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020222: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020223: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020302: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030204: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030205: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030206: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030207: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030208: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030209: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030210: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030211: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030212: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030213: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030214: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030215: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030216: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030217: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030218: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030219: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030220: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030221: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030222: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030223: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010204: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020401: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020402: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020403: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010205: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020501: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020502: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050204: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050207: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050208: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050209: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050210: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050211: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050212: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050213: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050214: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050215: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050216: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050217: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050218: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050219: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050220: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050221: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010206: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020601: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020602: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020603: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020604: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010207: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010301: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010302: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010303: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010304: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010305: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010306: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010307: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010308: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010309: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010310: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010311: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010312: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010313: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10104: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010401: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010402: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010403: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010404: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10105: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010501: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010502: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010503: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10106: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10107: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10108: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActivoscorrientesIfluc;
};
