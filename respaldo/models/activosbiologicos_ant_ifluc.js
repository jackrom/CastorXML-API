module.exports = (sequelize, DataType) => {
    const ActivosBiologicosAntIfluc = sequelize.define("ActivosBiologicosAntIfluc", {
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
        mov_saldoinicial_aec_ant: {
            type: DataType.DECIMAL
        },
        mov_compras_aec_ant: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_aec_ant: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_aec_ant: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_aec_ant: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_aec_ant: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_aep_ant: {
            type: DataType.DECIMAL
        },
        mov_compras_aep_ant: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_aep_ant: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_aep_ant: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_aep_ant: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_aep_ant: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_pec_ant: {
            type: DataType.DECIMAL
        },
        mov_compras_pec_ant: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_pec_ant: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_pec_ant: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_pec_ant: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_pec_ant: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_pep_ant: {
            type: DataType.DECIMAL
        },
        mov_compras_pep_ant: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_pep_ant: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_pep_ant: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_pep_ant: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_pep_ant: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_otros_ant: {
            type: DataType.DECIMAL
        },
        mov_compras_otros_ant: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_otros_ant: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_otros_ant: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_otros_ant: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_otros_ant: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_total_ant: {
            type: DataType.DECIMAL
        },
        mov_compras_total_ant: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_total_ant: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_total_ant: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_total_ant: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_total_ant: {
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

    return ActivosBiologicosAntIfluc;
};
