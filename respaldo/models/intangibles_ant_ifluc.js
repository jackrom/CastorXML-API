module.exports = (sequelize, DataType) => {
    const IntangiblesAntIfluc = sequelize.define("IntangiblesAntIfluc", {
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
        mov_saldoinicialcosto_ant: {
            type: DataType.DECIMAL
        },
        mov_saldoinicialamortizacionacumulada_ant: {
            type: DataType.DECIMAL
        },
        mov_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_bajasincluida_ant: {
            type: DataType.DECIMAL
        },
        mov_otros_ant: {
            type: DataType.DECIMAL
        },
        mov_gastosdeamortizacion_ant: {
            type: DataType.DECIMAL
        },
        mov_saldofinalsegunmovimiento_ant: {
            type: DataType.DECIMAL
        },
        mov_saldofinalsegunesf_ant: {
            type: DataType.DECIMAL
        },
        mov_diferenciaporcuadrar_ant: {
            type: DataType.DECIMAL
        },
    });

    return IntangiblesAntIfluc;
};
