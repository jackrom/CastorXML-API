module.exports = (sequelize, DataType) => {
    const DeshaucioIfluc = sequelize.define("DeshaucioIfluc", {
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
        mov_saldoinicial: {
            type: DataType.DECIMAL
        },
        mov_costosporservicios: {
            type: DataType.DECIMAL
        },
        mov_costofinanciero: {
            type: DataType.DECIMAL
        },
        mov_gananciaoperdidaactuarial: {
            type: DataType.DECIMAL
        },
        mov_otros: {
            type: DataType.DECIMAL
        },
        mov_efectodeliquidaciones: {
            type: DataType.DECIMAL
        },
        mov_beneficiospagados: {
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

    return DeshaucioIfluc;
};
