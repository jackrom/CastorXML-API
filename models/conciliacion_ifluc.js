module.exports = (sequelize, DataType) => {
    const ConciliacionIfluc = sequelize.define("ConciliacionIfluc", {
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
        efe_md_96: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_97: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_98: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9701: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9702: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970201: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970202: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970203: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970204: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970205: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970206: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970207: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9703: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9704: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9705: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9706: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9707: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9708: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970801: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970802: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9709: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_970901: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9710: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971001: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9711: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971104: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971105: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971106: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971107: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971108: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971109: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971110: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971111: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971112: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971113: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971114: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971115: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971116: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971117: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971118: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971119: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971120: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971121: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971122: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971123: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_971124: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9801: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980104: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980105: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980106: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9802: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980201: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9803: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980301: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9804: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980401: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980402: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980403: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980404: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9805: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980501: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980502: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980503: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980504: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980505: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980506: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980507: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9806: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980601: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9807: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9808: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_980801: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9809: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9810: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981001: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981002: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981003: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981004: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981005: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981006: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981007: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981008: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981009: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981010: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981011: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981012: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981013: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_981014: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9820: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ConciliacionIfluc;
};
