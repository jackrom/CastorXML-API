module.exports = (sequelize, DataType) => {
    const GastosadministrativosIfluc = sequelize.define("GastosadministrativosIfluc", {
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
        eri_50202: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020201: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020202: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020203: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020204: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020205: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020206: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020207: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020208: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020209: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020210: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020211: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020212: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020213: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020214: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020215: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020216: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020217: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020218: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020219: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020220: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020221: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020222: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020223: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020224: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020225: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020226: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020227: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020228: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020229: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022101: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022102: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022103: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022201: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022202: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022301: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022302: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022303: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022304: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022305: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022306: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022307: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022401: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022402: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022403: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return GastosadministrativosIfluc;
};
