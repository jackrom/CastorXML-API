module.exports = (sequelize, DataType) => {
    const ResultadosIfluc = sequelize.define("ResultadosIfluc", {
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
        eri_600: {
            type: DataType.DECIMAL(10,2)
        },
        eri_601: {
            type: DataType.DECIMAL(10,2)
        },
        eri_602: {
            type: DataType.DECIMAL(10,2)
        },
        eri_603: {
            type: DataType.DECIMAL(10,2)
        },
        eri_604: {
            type: DataType.DECIMAL(10,2)
        },
        eri_605: {
            type: DataType.DECIMAL(10,2)
        },
        eri_606: {
            type: DataType.DECIMAL(10,2)
        },
        eri_607: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ResultadosIfluc;
};
