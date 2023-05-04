module.exports = (sequelize, DataType) => {
    const PerdidasAcumCuentasIncobyDeterioroIfluc = sequelize.define("PerdidasAcumCuentasIncobyDeterioroIfluc", {
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
        saldoinicial: {
            type: DataType.DECIMAL
        },
        provisionesanio: {
            type: DataType.DECIMAL
        },
        bajasoreversiones: {
            type: DataType.DECIMAL
        },
        ajustes: {
            type: DataType.DECIMAL
        },
        saldofinalsegunmovimiento: {
            type: DataType.DECIMAL
        },
        saldofinalsegunesf: {
            type: DataType.DECIMAL
        },
        diferenciaporcuadrar: {
            type: DataType.DECIMAL
        },
    });

    return PerdidasAcumCuentasIncobyDeterioroIfluc;
};
