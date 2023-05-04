module.exports = (sequelize, DataType) => {
    const PropiedadesPlantasyEquiposAntIfluc = sequelize.define("PropiedadesPlantasyEquiposAntIfluc", {
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
        mov_terreno_si_ant: {
            type: DataType.DECIMAL
        },
        mov_edificios_si_ant: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_si_ant: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_si_ant: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_si_ant: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_si_ant: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_si_ant: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_si_ant: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_si_ant: {
            type: DataType.DECIMAL
        },
        mov_terreno_sida_ant: {
            type: DataType.DECIMAL
        },
        mov_edificios_sida_ant: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_sida_ant: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_sida_ant: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_sida_ant: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_sida_ant: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_sida_ant: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_sida_ant: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_sida_ant: {
            type: DataType.DECIMAL
        },
        mov_terreno_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_edificios_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_terreno_bilddb_ant: {
            type: DataType.DECIMAL
        },
        mov_edificios_bilddb_ant: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_bilddb_ant: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_bilddb_ant: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_bilddb_ant: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_bilddb_ant: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_bilddb_ant: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_bilddb_ant: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_bilddb_ant: {
            type: DataType.DECIMAL
        },
        mov_terreno_transf_ant: {
            type: DataType.DECIMAL
        },
        mov_edificios_transf_ant: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_transf_ant: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_transf_ant: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_transf_ant: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_transf_ant: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_transf_ant: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_transf_ant: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_transf_ant: {
            type: DataType.DECIMAL
        },
        mov_terreno_od_ant: {
            type: DataType.DECIMAL
        },
        mov_edificios_od_ant: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_od_ant: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_od_ant: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_od_ant: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_od_ant: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_od_ant: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_od_ant: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_od_ant: {
            type: DataType.DECIMAL
        },
        mov_terreno_gdd_ant: {
            type: DataType.DECIMAL
        },
        mov_edificios_gdd_ant: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_gdd_ant: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_gdd_ant: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_gdd_ant: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_gdd_ant: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_gdd_ant: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_gdd_ant: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_gdd_ant: {
            type: DataType.DECIMAL
        },
        mov_terreno_total_ant: {
            type: DataType.DECIMAL
        },
        mov_edificios_total_ant: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_total_ant: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_total_ant: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_total_ant: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_total_ant: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_total_ant: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_total_ant: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_total_ant: {
            type: DataType.DECIMAL
        },
        mov_total_si_ant: {
            type: DataType.DECIMAL
        },
        mov_total_sida_ant: {
            type: DataType.DECIMAL
        },
        mov_total_compras_ant: {
            type: DataType.DECIMAL
        },
        mov_total_bilddb_ant: {
            type: DataType.DECIMAL
        },
        mov_total_transf_ant: {
            type: DataType.DECIMAL
        },
        mov_total_od_ant: {
            type: DataType.DECIMAL
        },
        mov_total_gdd_ant: {
            type: DataType.DECIMAL
        },
        mov_total_sf_ant: {
            type: DataType.DECIMAL
        },
    });

    return PropiedadesPlantasyEquiposAntIfluc;
};
