module.exports = (sequelize, DataType) => {
    const DeshaucioAntIfluc = sequelize.define("DeshaucioAntIfluc", {
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
        mov_saldoinicial_ant: {
            type: DataType.DECIMAL
        },
        mov_costosporservicios_ant: {
            type: DataType.DECIMAL
        },
        mov_costofinanciero_ant: {
            type: DataType.DECIMAL
        },
        mov_gananciaoperdidaactuarial_ant: {
            type: DataType.DECIMAL
        },
        mov_otros_ant: {
            type: DataType.DECIMAL
        },
        mov_efectodeliquidaciones_ant: {
            type: DataType.DECIMAL
        },
        mov_beneficiospagados_ant: {
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

    return DeshaucioAntIfluc;
};
