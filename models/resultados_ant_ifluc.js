module.exports = (sequelize, DataType) => {
    const ResultadosAntIfluc = sequelize.define("ResultadosAntIfluc", {
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
        eri_600_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_607_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ResultadosAntIfluc;
};
