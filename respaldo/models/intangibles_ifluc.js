module.exports = (sequelize, DataType) => {
    const IntangiblesIfluc = sequelize.define("IntangiblesIfluc", {
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
        mov_saldoinicialcosto: {
            type: DataType.DECIMAL
        },
        mov_saldoinicialamortizacionacumulada: {
            type: DataType.DECIMAL
        },
        mov_compras: {
            type: DataType.DECIMAL
        },
        mov_bajasincluida: {
            type: DataType.DECIMAL
        },
        mov_otros: {
            type: DataType.DECIMAL
        },
        mov_gastosdeamortizacion: {
            type: DataType.DECIMAL
        },
        mov_saldofinalsegunmovimiento: {
            type: DataType.DECIMAL
        },
        mov_saldofinalsegunesf: {
            type: DataType.DECIMAL
        },
        mov_diferenciaporcuadrar: {
            type: DataType.DECIMAL
        },
    });

    return IntangiblesIfluc;
};
