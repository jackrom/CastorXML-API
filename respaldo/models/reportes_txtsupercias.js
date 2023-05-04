module.exports = (sequelize, DataType) => {
    const ReportesTxt = sequelize.define("ReportesTxt", {
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
    });

    ReportesTxt.associate = function(models) {
        ReportesTxt.belongsTo(models.EmpresasTxt, {
            foreignKey: 'empresaId',
            as: 'empresareportesupercias'
        });
        ReportesTxt.belongsTo(models.PeriodosTxt, {
            foreignKey: 'periodoId',
            as: 'periodosreportesupercias'
        });
        ReportesTxt.hasMany(models.ActivoscorrientesTxt, {
            foreignKey: 'reporteId',
            as: 'activoscorrientes'
        });
        ReportesTxt.hasMany(models.ActivosnocorrientesTxt, {
            foreignKey: 'reporteId',
            as: 'activosnocorrientes'
        });
        ReportesTxt.hasMany(models.ActividadesdefinanciamientoTxt, {
            foreignKey: 'reporteId',
            as: 'actividadesdefinanciamiento'
        });
        ReportesTxt.hasMany(models.ActividadesdeinversionTxt, {
            foreignKey: 'reporteId',
            as: 'actividadesdeinversion'
        });
        ReportesTxt.hasMany(models.ActividadesdeoperacionTxt, {
            foreignKey: 'reporteId',
            as: 'actividadesdeoperacion'
        });
        ReportesTxt.hasMany(models.ConciliacionTxt, {
            foreignKey: 'reporteId',
            as: 'conciliacionganancianeta'
        });
        ReportesTxt.hasMany(models.CostosTxt, {
            foreignKey: 'reporteId',
            as: 'costos'
        });
        ReportesTxt.hasMany(models.EcpTxt, {
            foreignKey: 'reporteId',
            as: 'ecp'
        });
        ReportesTxt.hasMany(models.GastosadministrativosTxt, {
            foreignKey: 'reporteId',
            as: 'gastosadministrativos'
        });
        ReportesTxt.hasMany(models.GastosdebentasTxt, {
            foreignKey: 'reporteId',
            as: 'gastosdeventas'
        });
        ReportesTxt.hasMany(models.GastosfinancierosTxt, {
            foreignKey: 'reporteId',
            as: 'gastosfinancieros'
        });
        ReportesTxt.hasMany(models.IngresosTxt, {
            foreignKey: 'reporteId',
            as: 'ingresos'
        });
        ReportesTxt.hasMany(models.OperacionesdiscontinuadasTxt, {
            foreignKey: 'reporteId',
            as: 'operacionesdiscontinuadas'
        });
        ReportesTxt.hasMany(models.OtrosingresosTxt, {
            foreignKey: 'reporteId',
            as: 'otrosingresos'
        });
        ReportesTxt.hasMany(models.OtrosgastosTxt, {
            foreignKey: 'reporteId',
            as: 'otrosgastos'
        });
        ReportesTxt.hasMany(models.OtrsoresultadosintegralesTxt, {
            foreignKey: 'reporteId',
            as: 'otrosresultadosintegral'
        });
        ReportesTxt.hasMany(models.ParticipacioncontroladoraTxt, {
            foreignKey: 'reporteId',
            as: 'resultadosparticipacioncontroladora'
        });
        ReportesTxt.hasMany(models.PasivoscorrientesTxt, {
            foreignKey: 'reporteId',
            as: 'pasivoscorrientes'
        });
        ReportesTxt.hasMany(models.PasivosnocorrientesTxt, {
            foreignKey: 'reporteId',
            as: 'pasivosnocorrientes'
        });
        ReportesTxt.hasMany(models.PatrimonioTxt, {
            foreignKey: 'reporteId',
            as: 'patrimonio'
        });
        ReportesTxt.hasMany(models.ResultadosTxt, {
            foreignKey: 'reporteId',
            as: 'resultados'
        });
        ReportesTxt.hasMany(models.ActivoscorrientesAntTxt, {
            foreignKey: 'reporteId',
            as: 'activoscorrientes_ant'
        });
        ReportesTxt.hasMany(models.ActivosnocorrientesAntTxt, {
            foreignKey: 'reporteId',
            as: 'activosnocorrientes_ant'
        });
        ReportesTxt.hasMany(models.ActividadesdefinanciamientoAntTxt, {
            foreignKey: 'reporteId',
            as: 'actividadesdefinanciamiento_ant'
        });
        ReportesTxt.hasMany(models.ActividadesdeinversionAntTxt, {
            foreignKey: 'reporteId',
            as: 'actividadesdeinversion_ant'
        });
        ReportesTxt.hasMany(models.ActividadesdeoperacionAntTxt, {
            foreignKey: 'reporteId',
            as: 'actividadesdeoperacion_ant'
        });
        ReportesTxt.hasMany(models.ConciliacionAntTxt, {
            foreignKey: 'reporteId',
            as: 'conciliacionganancianeta_ant'
        });
        ReportesTxt.hasMany(models.CostosAntTxt, {
            foreignKey: 'reporteId',
            as: 'costos_ant'
        });
        ReportesTxt.hasMany(models.EcpAntTxt, {
            foreignKey: 'reporteId',
            as: 'ecp_ant'
        });
        ReportesTxt.hasMany(models.GastosadministrativosAntTxt, {
            foreignKey: 'reporteId',
            as: 'gastosadministrativos_ant'
        });
        ReportesTxt.hasMany(models.GastosdebentasAntTxt, {
            foreignKey: 'reporteId',
            as: 'gastosdeventas_ant'
        });
        ReportesTxt.hasMany(models.GastosfinancierosAntTxt, {
            foreignKey: 'reporteId',
            as: 'gastosfinancieros_ant'
        });
        ReportesTxt.hasMany(models.IngresosAntTxt, {
            foreignKey: 'reporteId',
            as: 'ingresos_ant'
        });
        ReportesTxt.hasMany(models.OperacionesdiscontinuadasAntTxt, {
            foreignKey: 'reporteId',
            as: 'operacionesdiscontinuadas_ant'
        });
        ReportesTxt.hasMany(models.OtrosingresosAntTxt, {
            foreignKey: 'reporteId',
            as: 'otrosingresos_ant'
        });
        ReportesTxt.hasMany(models.OtrosgastosAntTxt, {
            foreignKey: 'reporteId',
            as: 'otrosgastos_ant'
        });
        ReportesTxt.hasMany(models.OtrsoresultadosintegralesAntTxt, {
            foreignKey: 'reporteId',
            as: 'otrosresultadosintegral_ant'
        });
        ReportesTxt.hasMany(models.ParticipacioncontroladoraAntTxt, {
            foreignKey: 'reporteId',
            as: 'resultadosparticipacioncontroladora_ant'
        });
        ReportesTxt.hasMany(models.PasivoscorrientesAntTxt, {
            foreignKey: 'reporteId',
            as: 'pasivoscorrientes_ant'
        });
        ReportesTxt.hasMany(models.PasivosnocorrientesAntTxt, {
            foreignKey: 'reporteId',
            as: 'pasivosnocorrientes_ant'
        });
        ReportesTxt.hasMany(models.PatrimonioAntTxt, {
            foreignKey: 'reporteId',
            as: 'patrimonio_ant'
        });
        ReportesTxt.hasMany(models.ResultadosAntTxt, {
            foreignKey: 'reporteId',
            as: 'resultados_ant'
        });
    };

    return ReportesTxt;
};
