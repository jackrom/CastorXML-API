module.exports = (sequelize, DataType) => {
    const ActivosBiologicosIfluc = sequelize.define("ActivosBiologicosIfluc", {
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
        mov_saldoinicial_aec: {
            type: DataType.DECIMAL
        },
        mov_compras_aec: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_aec: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_aec: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_aec: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_aec: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_aep: {
            type: DataType.DECIMAL
        },
        mov_compras_aep: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_aep: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_aep: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_aep: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_aep: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_pec: {
            type: DataType.DECIMAL
        },
        mov_compras_pec: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_pec: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_pec: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_pec: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_pec: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_pep: {
            type: DataType.DECIMAL
        },
        mov_compras_pep: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_pep: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_pep: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_pep: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_pep: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_otros: {
            type: DataType.DECIMAL
        },
        mov_compras_otros: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_otros: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_otros: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_otros: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_otros: {
            type: DataType.DECIMAL
        },
        mov_saldoinicial_total: {
            type: DataType.DECIMAL
        },
        mov_compras_total: {
            type: DataType.DECIMAL
        },
        mov_bajasoventas_total: {
            type: DataType.DECIMAL
        },
        mov_incrementodisminuciondevalor_total: {
            type: DataType.DECIMAL
        },
        mov_reclasificacion_total: {
            type: DataType.DECIMAL
        },
        mov_saldofinal_total: {
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

    return ActivosBiologicosIfluc;
};
