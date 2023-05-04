module.exports = (sequelize, DataType) => {
    const ResumenesTxt = sequelize.define("ResumenesTxt", {
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
        diferenciaperiodoactual: {
            type: DataType.INTEGER
        },
        diferenciaperiodoanterior: {
            type: DataType.INTEGER
        },
        eri_602: {
            type: DataType.INTEGER
        },
        eri_603: {
            type: DataType.INTEGER
        },
        eri_604: {
            type: DataType.INTEGER
        },
        eri_605: {
            type: DataType.INTEGER
        },
        eri_606: {
            type: DataType.INTEGER
        },
        eri_607: {
            type: DataType.INTEGER
        },
    });

    return ResumenesTxt;
};
