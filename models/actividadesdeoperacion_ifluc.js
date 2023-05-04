module.exports = (sequelize, DataType) => {
    const ActividadesdeoperacionIfluc = sequelize.define("ActividadesdeoperacionIfluc", {
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
        efe_md_950101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010104: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010105: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010106: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010107: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010108: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010109: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010110: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010111: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010112: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010113: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010114: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010115: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010116: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010117: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010118: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010119: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010120: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010121: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010201: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010202: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010203: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010204: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010205: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010206: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501010207: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010104: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010105: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010201: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020101: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020102: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020104: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020105: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020106: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020107: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020108: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020109: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020110: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020111: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020112: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020113: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020114: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020115: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020116: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020117: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020118: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020119: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020120: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020121: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020122: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020123: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020124: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020125: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020126: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020127: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020128: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020129: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020130: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020131: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020132: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020133: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020134: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020135: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020136: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020137: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020138: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020139: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020140: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020141: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020142: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020143: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020144: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020145: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020146: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020147: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020148: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020149: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020150: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020151: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020152: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020153: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020154: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020155: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020156: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010202: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010203: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020301: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020302: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_9501020303: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010204: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010205: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950103: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950104: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010401: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950105: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010501: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010502: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010503: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950106: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950107: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010701: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010702: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010703: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_950108: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010801: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010802: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010803: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010804: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010805: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010806: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010807: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010808: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010809: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010810: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010811: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010812: {
            type: DataType.DECIMAL(10,2)
        },
        efe_md_95010813: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActividadesdeoperacionIfluc;
};
