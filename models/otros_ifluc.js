module.exports = (sequelize, DataType) => {
    const OtrosIfluc = sequelize.define("OtrosIfluc", {
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
        mov_islr_provisiondelanio: {
            type: DataType.DECIMAL
        },
        mov_islr_pagos: {
            type: DataType.DECIMAL
        },
        mov_pt_provisiondelanio: {
            type: DataType.DECIMAL
        },
        mov_pt_pagos: {
            type: DataType.DECIMAL
        },
        mov_dividendos_dividendospagados: {
            type: DataType.DECIMAL
        },
    });

    return OtrosIfluc;
};
