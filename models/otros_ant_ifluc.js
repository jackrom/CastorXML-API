module.exports = (sequelize, DataType) => {
    const OtrosAntIfluc = sequelize.define("OtrosAntIfluc", {
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
        mov_islr_provisiondelanio_ant: {
            type: DataType.DECIMAL
        },
        mov_islr_pagos_ant: {
            type: DataType.DECIMAL
        },
        mov_pt_provisiondelanio_ant: {
            type: DataType.DECIMAL
        },
        mov_pt_pagos_ant: {
            type: DataType.DECIMAL
        },
        mov_dividendos_dividendospagados_ant: {
            type: DataType.DECIMAL
        },
    });

    return OtrosAntIfluc;
};
