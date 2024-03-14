module.exports = (sequelize, DataType) => {
    const ReportesIfluc = sequelize.define("ReportesIfluc", {
        reporteId: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        periodoId: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: '0000'
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        empresaId: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        nombre_reporte: {
            type: DataType.STRING,
            allowNull: true
        },
        esf_cuadre: {
            type: DataType.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        eri_cuadre: {
            type: DataType.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        mov_cuadre: {
            type: DataType.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        ecp_cuadre: {
            type: DataType.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        efe_cuadre: {
            type: DataType.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        hasTurboNotas: {
            type: DataType.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        hasInformeSocietario: {
            type: DataType.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
    });

    ReportesIfluc.associate = function(models) {
        ReportesIfluc.belongsTo(models.EmpresasIfluc, {
            foreignKey: 'empresaId',
            as: 'empresareporteifluc'
        });
        ReportesIfluc.belongsTo(models.PeriodosIfluc, {
            foreignKey: 'periodoId',
            as: 'periodosreporteifluc'
        });
        ReportesIfluc.hasMany(models.ActivoscorrientesIfluc, {
            foreignKey: 'reporteId',
            as: 'activoscorrientesifluc'
        });
        ReportesIfluc.hasMany(models.ActivosnocorrientesIfluc, {
            foreignKey: 'reporteId',
            as: 'activosnocorrientesifluc'
        });
        ReportesIfluc.hasMany(models.ActividadesdefinanciamientoIfluc, {
            foreignKey: 'reporteId',
            as: 'actividadesdefinanciamientoifluc'
        });
        ReportesIfluc.hasMany(models.ActividadesdeinversionIfluc, {
            foreignKey: 'reporteId',
            as: 'actividadesdeinversionifluc'
        });
        ReportesIfluc.hasMany(models.ActividadesdeoperacionIfluc, {
            foreignKey: 'reporteId',
            as: 'actividadesdeoperacionifluc'
        });
        ReportesIfluc.hasMany(models.ConciliacionIfluc, {
            foreignKey: 'reporteId',
            as: 'conciliacionganancianetaifluc'
        });
        ReportesIfluc.hasMany(models.CostosIfluc, {
            foreignKey: 'reporteId',
            as: 'costosifluc'
        });
        ReportesIfluc.hasMany(models.EcpIfluc, {
            foreignKey: 'reporteId',
            as: 'ecpifluc'
        });
        ReportesIfluc.hasMany(models.GastosadministrativosIfluc, {
            foreignKey: 'reporteId',
            as: 'gastosadministrativosifluc'
        });
        ReportesIfluc.hasMany(models.GastosdebentasIfluc, {
            foreignKey: 'reporteId',
            as: 'gastosdeventasifluc'
        });
        ReportesIfluc.hasMany(models.GastosfinancierosIfluc, {
            foreignKey: 'reporteId',
            as: 'gastosfinancierosifluc'
        });
        ReportesIfluc.hasMany(models.IngresosIfluc, {
            foreignKey: 'reporteId',
            as: 'ingresosifluc'
        });
        ReportesIfluc.hasMany(models.OperacionesdiscontinuadasIfluc, {
            foreignKey: 'reporteId',
            as: 'operacionesdiscontinuadasifluc'
        });
        ReportesIfluc.hasMany(models.OtrosingresosIfluc, {
            foreignKey: 'reporteId',
            as: 'otrosingresosifluc'
        });
        ReportesIfluc.hasMany(models.OtrosgastosIfluc, {
            foreignKey: 'reporteId',
            as: 'otrosgastosifluc'
        });
        ReportesIfluc.hasMany(models.OtrsoresultadosintegralesIfluc, {
            foreignKey: 'reporteId',
            as: 'otrosresultadosintegralifluc'
        });
        ReportesIfluc.hasMany(models.ParticipacioncontroladoraIfluc, {
            foreignKey: 'reporteId',
            as: 'resultadosparticipacioncontroladoraifluc'
        });
        ReportesIfluc.hasMany(models.PasivoscorrientesIfluc, {
            foreignKey: 'reporteId',
            as: 'pasivoscorrientesifluc'
        });
        ReportesIfluc.hasMany(models.PasivosnocorrientesIfluc, {
            foreignKey: 'reporteId',
            as: 'pasivosnocorrientesifluc'
        });
        ReportesIfluc.hasMany(models.PatrimonioIfluc, {
            foreignKey: 'reporteId',
            as: 'patrimonioifluc'
        });
        ReportesIfluc.hasMany(models.ResultadosIfluc, {
            foreignKey: 'reporteId',
            as: 'resultadosifluc'
        });
        ReportesIfluc.hasMany(models.PerdidasAcumCuentasIncobyDeterioroIfluc, {
            foreignKey: 'reporteId',
            as: 'movperdidasacumuladascuentasincobrablesydeterioro'
        });
        ReportesIfluc.hasMany(models.PerdidasAcumValNetRealizyOtrasPerdEnInvIfluc, {
            foreignKey: 'reporteId',
            as: 'movperdidasacumuladasvalornetorealizacion'
        });
        ReportesIfluc.hasMany(models.PropiedadesPlantasyEquiposIfluc, {
            foreignKey: 'reporteId',
            as: 'movpropiedadesplantasyequipos'
        });
        ReportesIfluc.hasMany(models.PropiedadesDeInversionIfluc, {
            foreignKey: 'reporteId',
            as: 'movpropiedadesdeinversion'
        });
        ReportesIfluc.hasMany(models.IntangiblesIfluc, {
            foreignKey: 'reporteId',
            as: 'movintangibles'
        });
        ReportesIfluc.hasMany(models.ActivosBiologicosIfluc, {
            foreignKey: 'reporteId',
            as: 'movactivosbiologicos'
        });
        ReportesIfluc.hasMany(models.ImpuestosDiferidosIfluc, {
            foreignKey: 'reporteId',
            as: 'movimpuestosdiferidos'
        });
        ReportesIfluc.hasMany(models.JubilacionPatronalIfluc, {
            foreignKey: 'reporteId',
            as: 'movjubilacionpatronal'
        });
        ReportesIfluc.hasMany(models.DeshaucioIfluc, {
            foreignKey: 'reporteId',
            as: 'deshaucio'
        });
        ReportesIfluc.hasMany(models.ActivosFinancierosLargoPlazoIfluc, {
            foreignKey: 'reporteId',
            as: 'activosfinancieroslargoplazo'
        });
        ReportesIfluc.hasMany(models.OtrosIfluc, {
            foreignKey: 'reporteId',
            as: 'otros'
        });
        ReportesIfluc.hasMany(models.ActivoscorrientesAntIfluc, {
            foreignKey: 'reporteId',
            as: 'activoscorrientesifluc_ant'
        });
        ReportesIfluc.hasMany(models.ActivosnocorrientesAntIfluc, {
            foreignKey: 'reporteId',
            as: 'activosnocorrientesifluc_ant'
        });
        ReportesIfluc.hasMany(models.ActividadesdefinanciamientoAntIfluc, {
            foreignKey: 'reporteId',
            as: 'actividadesdefinanciamientoifluc_ant'
        });
        ReportesIfluc.hasMany(models.ActividadesdeinversionAntIfluc, {
            foreignKey: 'reporteId',
            as: 'actividadesdeinversionifluc_ant'
        });
        ReportesIfluc.hasMany(models.ActividadesdeoperacionAntIfluc, {
            foreignKey: 'reporteId',
            as: 'actividadesdeoperacionifluc_ant'
        });
        ReportesIfluc.hasMany(models.ConciliacionAntIfluc, {
            foreignKey: 'reporteId',
            as: 'conciliacionganancianetaifluc_ant'
        });
        ReportesIfluc.hasMany(models.CostosAntIfluc, {
            foreignKey: 'reporteId',
            as: 'costosifluc_ant'
        });
        ReportesIfluc.hasMany(models.EcpAntIfluc, {
            foreignKey: 'reporteId',
            as: 'ecpifluc_ant'
        });
        ReportesIfluc.hasMany(models.GastosadministrativosAntIfluc, {
            foreignKey: 'reporteId',
            as: 'gastosadministrativosifluc_ant'
        });
        ReportesIfluc.hasMany(models.GastosdebentasAntIfluc, {
            foreignKey: 'reporteId',
            as: 'gastosdeventasifluc_ant'
        });
        ReportesIfluc.hasMany(models.GastosfinancierosAntIfluc, {
            foreignKey: 'reporteId',
            as: 'gastosfinancierosifluc_ant'
        });
        ReportesIfluc.hasMany(models.IngresosAntIfluc, {
            foreignKey: 'reporteId',
            as: 'ingresosifluc_ant'
        });
        ReportesIfluc.hasMany(models.OperacionesdiscontinuadasAntIfluc, {
            foreignKey: 'reporteId',
            as: 'operacionesdiscontinuadasifluc_ant'
        });
        ReportesIfluc.hasMany(models.OtrosingresosAntIfluc, {
            foreignKey: 'reporteId',
            as: 'otrosingresosifluc_ant'
        });
        ReportesIfluc.hasMany(models.OtrosgastosAntIfluc, {
            foreignKey: 'reporteId',
            as: 'otrosgastosifluc_ant'
        });
        ReportesIfluc.hasMany(models.OtrsoresultadosintegralesAntIfluc, {
            foreignKey: 'reporteId',
            as: 'otrosresultadosintegralifluc_ant'
        });
        ReportesIfluc.hasMany(models.ParticipacioncontroladoraAntIfluc, {
            foreignKey: 'reporteId',
            as: 'resultadosparticipacioncontroladoraifluc_ant'
        });
        ReportesIfluc.hasMany(models.PasivoscorrientesAntIfluc, {
            foreignKey: 'reporteId',
            as: 'pasivoscorrientesifluc_ant'
        });
        ReportesIfluc.hasMany(models.PasivosnocorrientesAntIfluc, {
            foreignKey: 'reporteId',
            as: 'pasivosnocorrientesifluc_ant'
        });
        ReportesIfluc.hasMany(models.PatrimonioAntIfluc, {
            foreignKey: 'reporteId',
            as: 'patrimonioifluc_ant'
        });
        ReportesIfluc.hasMany(models.ResultadosAntIfluc, {
            foreignKey: 'reporteId',
            as: 'resultadosifluc_ant'
        });
        ReportesIfluc.hasMany(models.PerdidasAcumCuentasIncobyDeterioroAntIfluc, {
            foreignKey: 'reporteId',
            as: 'movperdidasacumuladascuentasincobrablesydeterioro_ant'
        });
        ReportesIfluc.hasMany(models.PerdidasAcumValNetRealizyOtrasPerdEnInvAntIfluc, {
            foreignKey: 'reporteId',
            as: 'movperdidasacumuladasvalornetorealizacion_ant'
        });
        ReportesIfluc.hasMany(models.PropiedadesPlantasyEquiposAntIfluc, {
            foreignKey: 'reporteId',
            as: 'movpropiedadesplantasyequipos_ant'
        });
        ReportesIfluc.hasMany(models.PropiedadesDeInversionAntIfluc, {
            foreignKey: 'reporteId',
            as: 'movpropiedadesdeinversion_ant'
        });
        ReportesIfluc.hasMany(models.IntangiblesAntIfluc, {
            foreignKey: 'reporteId',
            as: 'movintangibles_ant'
        });
        ReportesIfluc.hasMany(models.ActivosBiologicosAntIfluc, {
            foreignKey: 'reporteId',
            as: 'movactivosbiologicos_ant'
        });
        ReportesIfluc.hasMany(models.ImpuestosDiferidosAntIfluc, {
            foreignKey: 'reporteId',
            as: 'movimpuestosdiferidos_ant'
        });
        ReportesIfluc.hasMany(models.JubilacionPatronalAntIfluc, {
            foreignKey: 'reporteId',
            as: 'movjubilacionpatronal_ant'
        });
        ReportesIfluc.hasMany(models.DeshaucioAntIfluc, {
            foreignKey: 'reporteId',
            as: 'deshaucio_ant'
        });
        ReportesIfluc.hasMany(models.ActivosFinancierosLargoPlazoAntIfluc, {
            foreignKey: 'reporteId',
            as: 'activosfinancieroslargoplazo_ant'
        });
        ReportesIfluc.hasMany(models.OtrosAntIfluc, {
            foreignKey: 'reporteId',
            as: 'otros_ant'
        });
        ReportesIfluc.hasMany(models.TurboNotasfc, {
            foreignKey: 'reporteId',
            as: 'reporteTurboNotas'
        });
    };

    return ReportesIfluc;
};
