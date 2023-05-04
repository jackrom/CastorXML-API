module.exports = (sequelize, DataType) => {
    const PropiedadesDeInversionIfluc = sequelize.define("PropiedadesDeInversionIfluc", {
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
        mov_saldoinicial_terrenos: {
            type: DataType.DECIMAL
        },
        mov_compras_terrenos: {
            type: DataType.DECIMAL
        },
        mov_bajasincluida_terrenos: {
            type: DataType.DECIMAL
        },
        mov_valorrazonable_terrenos: {
            type: DataType.DECIMAL
        },
        mov_transferencia_terrenos: {
            type: DataType.DECIMAL
        },
        mov_otros_terrenos: {
            type: DataType.DECIMAL
        },
        mov_gastosdedepreciacion_terrenos: {
            type: DataType.DECIMAL
        },
        mov_saldo_terrenos: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_edificios: {
            type: DataType.DECIMAL
        },
        mov_compras_edificios: {
            type: DataType.DECIMAL
        },
        mov_bajasincluida_edificios: {
            type: DataType.DECIMAL
        },
        mov_valorrazonable_edificios: {
            type: DataType.DECIMAL
        },
        mov_transferencia_edificios: {
            type: DataType.DECIMAL
        },
        mov_otros_edificios: {
            type: DataType.DECIMAL
        },
        mov_gastosdedepreciacion_edificios: {
            type: DataType.DECIMAL
        },
        mov_saldo_edificios: {
            type: DataType.DECIMAL
        },
    });

    return PropiedadesDeInversionIfluc;
};
