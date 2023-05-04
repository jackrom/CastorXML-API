module.exports = (sequelize, DataType) => {
    const PropiedadesDeInversionAntIfluc = sequelize.define("PropiedadesDeInversionAntIfluc", {
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
        mov_saldoinicial_terrenos_ant: {
            type: DataType.DECIMAL
        },
        mov_compras_terrenos_ant: {
            type: DataType.DECIMAL
        },
        mov_bajasincluida_terrenos_ant: {
            type: DataType.DECIMAL
        },
        mov_valorrazonable_terrenos_ant: {
            type: DataType.DECIMAL
        },
        mov_transferencia_terrenos_ant: {
            type: DataType.DECIMAL
        },
        mov_otros_terrenos_ant: {
            type: DataType.DECIMAL
        },
        mov_gastosdedepreciacion_terrenos_ant: {
            type: DataType.DECIMAL
        },
        mov_saldo_terrenos_ant: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_edificios_ant: {
            type: DataType.DECIMAL
        },
        mov_compras_edificios_ant: {
            type: DataType.DECIMAL
        },
        mov_bajasincluida_edificios_ant: {
            type: DataType.DECIMAL
        },
        mov_valorrazonable_edificios_ant: {
            type: DataType.DECIMAL
        },
        mov_transferencia_edificios_ant: {
            type: DataType.DECIMAL
        },
        mov_otros_edificios_ant: {
            type: DataType.DECIMAL
        },
        mov_gastosdedepreciacion_edificios_ant: {
            type: DataType.DECIMAL
        },
        mov_saldo_edificios_ant: {
            type: DataType.DECIMAL
        },
    });

    return PropiedadesDeInversionAntIfluc;
};
