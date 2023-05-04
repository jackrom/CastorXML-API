module.exports = (sequelize, DataType) => {
    const GastosadministrativosAntIfluc = sequelize.define("GastosadministrativosAntIfluc", {
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
        eri_50202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020208_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020209_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020210_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020211_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020212_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020213_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020214_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020215_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020216_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020217_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020218_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020219_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020220_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020221_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020222_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020223_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020224_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020225_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020226_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020227_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020228_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_5020229_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022304_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022305_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022306_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022307_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_502022403_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return GastosadministrativosAntIfluc;
};
