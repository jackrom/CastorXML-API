module.exports = (sequelize, DataType) => {
    const PropiedadesPlantasyEquiposIfluc = sequelize.define("PropiedadesPlantasyEquiposIfluc", {
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
        mov_terreno_si: {
            type: DataType.DECIMAL
        },
        mov_edificios_si: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_si: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_si: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_si: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_si: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_si: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_si: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_si: {
            type: DataType.DECIMAL
        },
        mov_terreno_sida: {
            type: DataType.DECIMAL
        },
        mov_edificios_sida: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_sida: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_sida: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_sida: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_sida: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_sida: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_sida: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_sida: {
            type: DataType.DECIMAL
        },
        mov_terreno_compras: {
            type: DataType.DECIMAL
        },
        mov_edificios_compras: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_compras: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_compras: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_compras: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_compras: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_compras: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_compras: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_compras: {
            type: DataType.DECIMAL
        },
        mov_terreno_bilddb: {
            type: DataType.DECIMAL
        },
        mov_edificios_bilddb: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_bilddb: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_bilddb: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_bilddb: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_bilddb: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_bilddb: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_bilddb: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_bilddb: {
            type: DataType.DECIMAL
        },
        mov_terreno_transf: {
            type: DataType.DECIMAL
        },
        mov_edificios_transf: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_transf: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_transf: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_transf: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_transf: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_transf: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_transf: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_transf: {
            type: DataType.DECIMAL
        },
        mov_terreno_od: {
            type: DataType.DECIMAL
        },
        mov_edificios_od: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_od: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_od: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_od: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_od: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_od: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_od: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_od: {
            type: DataType.DECIMAL
        },
        mov_terreno_gdd: {
            type: DataType.DECIMAL
        },
        mov_edificios_gdd: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_gdd: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_gdd: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_gdd: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_gdd: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_gdd: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_gdd: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_gdd: {
            type: DataType.DECIMAL
        },
        mov_terreno_total: {
            type: DataType.DECIMAL
        },
        mov_edificios_total: {
            type: DataType.DECIMAL
        },
        mov_construccionesencurso_total: {
            type: DataType.DECIMAL
        },
        mov_instalaciones_total: {
            type: DataType.DECIMAL
        },
        mov_mueblesyenseres_total: {
            type: DataType.DECIMAL
        },
        mov_maquinariayequipo_total: {
            type: DataType.DECIMAL
        },
        mov_vehiculo_total: {
            type: DataType.DECIMAL
        },
        mov_equipodecomputacion_total: {
            type: DataType.DECIMAL
        },
        mov_otrospropiedadesplantasyequipos_total: {
            type: DataType.DECIMAL
        },
        mov_total_si: {
            type: DataType.DECIMAL
        },
        mov_total_sida: {
            type: DataType.DECIMAL
        },
        mov_total_compras: {
            type: DataType.DECIMAL
        },
        mov_total_bilddb: {
            type: DataType.DECIMAL
        },
        mov_total_transf: {
            type: DataType.DECIMAL
        },
        mov_total_od: {
            type: DataType.DECIMAL
        },
        mov_total_gdd: {
            type: DataType.DECIMAL
        },
        mov_total_sf: {
            type: DataType.DECIMAL
        },
    });

    return PropiedadesPlantasyEquiposIfluc;
};
