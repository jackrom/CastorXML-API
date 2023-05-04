module.exports = app => {
    const ReportesTxt = app.db.models.ReportesTxt
    const PeriodosTxt = app.db.models.PeriodosTxt
    const EmpresasTxt = app.db.models.EmpresasTxt
    const ActivoscorrientesTxt = app.db.models.ActivoscorrientesTxt
    const ActivosnocorrientesTxt = app.db.models.ActivosnocorrientesTxt
    const ActividadesdefinanciamientoTxt = app.db.models.ActividadesdefinanciamientoTxt
    const ActividadesdeinversionTxt = app.db.models.ActividadesdeinversionTxt
    const ActividadesdeoperacionTxt = app.db.models.ActividadesdeoperacionTxt
    const ConciliacionTxt = app.db.models.ConciliacionTxt
    const CostosTxt = app.db.models.CostosTxt
    const EcpTxt = app.db.models.EcpTxt
    const GastosadministrativosTxt = app.db.models.GastosadministrativosTxt
    const GastosdeventasTxt = app.db.models.GastosdebentasTxt
    const GastosfinancierosTxt = app.db.models.GastosfinancierosTxt
    const IngresosTxt = app.db.models.IngresosTxt
    const OperacionesdiscontinuadasTxt = app.db.models.OperacionesdiscontinuadasTxt
    const OtrosingresosTxt = app.db.models.OtrosingresosTxt
    const OtrosgastosTxt = app.db.models.OtrosgastosTxt
    const OtrosresultadosintegralesTxt = app.db.models.OtrsoresultadosintegralesTxt
    const ParticipacioncontroladoraTxt = app.db.models.ParticipacioncontroladoraTxt
    const PasivoscorrientesTxt = app.db.models.PasivoscorrientesTxt
    const PasivosnocorrientesTxt = app.db.models.PasivosnocorrientesTxt
    const PatrimonioTxt = app.db.models.PatrimonioTxt
    const ResultadosTxt = app.db.models.ResultadosTxt
    const ActivoscorrientesAntTxt = app.db.models.ActivoscorrientesAntTxt
    const ActivosnocorrientesAntTxt = app.db.models.ActivosnocorrientesAntTxt
    const ActividadesdefinanciamientoAntTxt = app.db.models.ActividadesdefinanciamientoAntTxt
    const ActividadesdeinversionAntTxt = app.db.models.ActividadesdeinversionAntTxt
    const ActividadesdeoperacionAntTxt = app.db.models.ActividadesdeoperacionAntTxt
    const ConciliacionAntTxt = app.db.models.ConciliacionAntTxt
    const CostosAntTxt = app.db.models.CostosAntTxt
    const GastosadministrativosAntTxt = app.db.models.GastosadministrativosAntTxt
    const GastosdeventasAntTxt = app.db.models.GastosdebentasAntTxt
    const GastosfinancierosAntTxt = app.db.models.GastosfinancierosAntTxt
    const IngresosAntTxt = app.db.models.IngresosAntTxt
    const OperacionesdiscontinuadasAntTxt = app.db.models.OperacionesdiscontinuadasAntTxt
    const OtrosingresosAntTxt = app.db.models.OtrosingresosAntTxt
    const OtrosgastosAntTxt = app.db.models.OtrosgastosAntTxt
    const OtrosresultadosintegralesAntTxt = app.db.models.OtrsoresultadosintegralesAntTxt
    const ParticipacioncontroladoraAntTxt = app.db.models.ParticipacioncontroladoraAntTxt
    const PasivoscorrientesAntTxt = app.db.models.PasivoscorrientesAntTxt
    const PasivosnocorrientesAntTxt = app.db.models.PasivosnocorrientesAntTxt
    const PatrimonioAntTxt = app.db.models.PatrimonioAntTxt
    const ResultadosAntTxt = app.db.models.ResultadosAntTxt

    /**
     * @api {get} /users Devuelve los datos de todos los usuarios registrados
     * @apiGroup Users
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del usuario registrado
     * @apiSuccess {String} nombres Nombres de usuario
     * @apiSuccess {String} cedula Cédula de Identidad del usuario
     * @apiSuccess {String} celular Número de teléfono celular del usuario
     * @apiSuccess {String} direccion Dirección fiscal del usuario para las facturas
     * @apiSuccess {String} email Correo electrónico del usuario
     * @apiSuccess {String} password Password del usuario
     * @apiSuccess {String} avatar Avatar identificativo del usuario
     * @apiSuccess {String} facebook Si el registro se realizo desde facebook login
     * @apiSuccess {String} push Código para notificaciones Push
     * @apiSuccess {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiSuccess {String} version Version de la app con la cual se regsitra el usuario
     * @apiSuccess {Date} updatedAt Update's date
     * @apiSuccess {Date} createdAt Register's date
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "id": 1,
     *    "nombres": "raul",
     *    "cedula": "Raúl Castro",
     *    "celular": "raul@castro.net",
     *    "direccion": "123456",
     *    "email": "raul@hotmail.com",
     *    "password": "123456789",
     *    "avatar": "https://goubi.aplios.net/perfil.png",
     *    "facebook": "0",
     *    "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "version": "0.0.0"
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/reportestxt", (req, res) => {
        ReportesTxt.findAll({
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    /**
     * @api {get} /users Devuelve los datos de todos los usuarios registrados
     * @apiGroup Users
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del usuario registrado
     * @apiSuccess {String} nombres Nombres de usuario
     * @apiSuccess {String} cedula Cédula de Identidad del usuario
     * @apiSuccess {String} celular Número de teléfono celular del usuario
     * @apiSuccess {String} direccion Dirección fiscal del usuario para las facturas
     * @apiSuccess {String} email Correo electrónico del usuario
     * @apiSuccess {String} password Password del usuario
     * @apiSuccess {String} avatar Avatar identificativo del usuario
     * @apiSuccess {String} facebook Si el registro se realizo desde facebook login
     * @apiSuccess {String} push Código para notificaciones Push
     * @apiSuccess {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiSuccess {String} version Version de la app con la cual se regsitra el usuario
     * @apiSuccess {Date} updatedAt Update's date
     * @apiSuccess {Date} createdAt Register's date
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "id": 1,
     *    "nombres": "raul",
     *    "cedula": "Raúl Castro",
     *    "celular": "raul@castro.net",
     *    "direccion": "123456",
     *    "email": "raul@hotmail.com",
     *    "password": "123456789",
     *    "avatar": "https://goubi.aplios.net/perfil.png",
     *    "facebook": "0",
     *    "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "version": "0.0.0"
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/reportestxt/bycompany", (req, res) => {
        ReportesTxt.findAll({
            include: [
                {
                    model: EmpresasTxt,
                    as: 'empresareportesupercias',
                },
                {
                    model: PeriodosTxt,
                    as: 'periodosreportesupercias',
                },
                {
                    model: ActivoscorrientesTxt,
                    as: 'activoscorrientes',
                },
                {
                    model: ActividadesdefinanciamientoTxt,
                    as: 'actividadesdefinanciamiento',
                },
                {
                    model: ActividadesdeinversionTxt,
                    as: 'actividadesdeinversion',
                },
                {
                    model: ActividadesdeoperacionTxt,
                    as: 'actividadesdeoperacion',
                },
                {
                    model: ActivosnocorrientesTxt,
                    as: 'activosnocorrientes',
                },
                {
                    model: ConciliacionTxt,
                    as: 'conciliacionganancianeta',
                },
                {
                    model: CostosTxt,
                    as: 'costos',
                },
                {
                    model: EcpTxt,
                    as: 'ecp',
                },
                {
                    model: GastosadministrativosTxt,
                    as: 'gastosadministrativos',
                },
                {
                    model: GastosdeventasTxt,
                    as: 'gastosdeventas',
                },
                {
                    model: GastosfinancierosTxt,
                    as: 'gastosfinancieros',
                },
                {
                    model: IngresosTxt,
                    as: 'ingresos',
                },
                {
                    model: OperacionesdiscontinuadasTxt,
                    as: 'operacionesdiscontinuadas',
                },
                {
                    model: OtrosingresosTxt,
                    as: 'otrosingresos',
                },
                {
                    model: OtrosgastosTxt,
                    as: 'otrosgastos',
                },
                {
                    model: OtrosresultadosintegralesTxt,
                    as: 'otrosresultadosintegral',
                },
                {
                    model: ParticipacioncontroladoraTxt,
                    as: 'resultadosparticipacioncontroladora',
                },
                {
                    model: PasivoscorrientesTxt,
                    as: 'pasivoscorrientes',
                },
                {
                    model: PasivosnocorrientesTxt,
                    as: 'pasivosnocorrientes',
                },
                {
                    model: PatrimonioTxt,
                    as: 'patrimonio',
                },
                {
                    model: ResultadosTxt,
                    as: 'resultados',
                },
                {
                    model: ActivoscorrientesAntTxt,
                    as: 'activoscorrientes_ant',
                },
                {
                    model: ActividadesdefinanciamientoAntTxt,
                    as: 'actividadesdefinanciamiento_ant',
                },
                {
                    model: ActividadesdeinversionAntTxt,
                    as: 'actividadesdeinversion_ant',
                },
                {
                    model: ActividadesdeoperacionAntTxt,
                    as: 'actividadesdeoperacion_ant',
                },
                {
                    model: ActivosnocorrientesAntTxt,
                    as: 'activosnocorrientes_ant',
                },
                {
                    model: ConciliacionAntTxt,
                    as: 'conciliacionganancianeta_ant',
                },
                {
                    model: CostosAntTxt,
                    as: 'costos_ant',
                },
                {
                    model: GastosadministrativosAntTxt,
                    as: 'gastosadministrativos_ant',
                },
                {
                    model: GastosdeventasAntTxt,
                    as: 'gastosdeventas_ant',
                },
                {
                    model: GastosfinancierosAntTxt,
                    as: 'gastosfinancieros_ant',
                },
                {
                    model: IngresosAntTxt,
                    as: 'ingresos_ant',
                },
                {
                    model: OperacionesdiscontinuadasAntTxt,
                    as: 'operacionesdiscontinuadas_ant',
                },
                {
                    model: OtrosingresosAntTxt,
                    as: 'otrosingresos_ant',
                },
                {
                    model: OtrosgastosAntTxt,
                    as: 'otrosgastos_ant',
                },
                {
                    model: OtrosresultadosintegralesAntTxt,
                    as: 'otrosresultadosintegral_ant',
                },
                {
                    model: ParticipacioncontroladoraAntTxt,
                    as: 'resultadosparticipacioncontroladora_ant',
                },
                {
                    model: PasivoscorrientesAntTxt,
                    as: 'pasivoscorrientes_ant',
                },
                {
                    model: PasivosnocorrientesAntTxt,
                    as: 'pasivosnocorrientes_ant',
                },
                {
                    model: PatrimonioAntTxt,
                    as: 'patrimonio_ant',
                },
                {
                    model: ResultadosAntTxt,
                    as: 'resultados_ant',
                },
            ],
            where: {
                empresaId: req.query.empresa
            },
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/reportestxt/byuser", (req, res) => {
        ReportesTxt.findAll({
            include: [
                {
                    model: EmpresasTxt,
                    as: 'empresareportesupercias',
                },
                {
                    model: PeriodosTxt,
                    as: 'periodosreportesupercias',
                },
                {
                    model: ActivoscorrientesTxt,
                    as: 'activoscorrientes',
                },
                {
                    model: ActividadesdefinanciamientoTxt,
                    as: 'actividadesdefinanciamiento',
                },
                {
                    model: ActividadesdeinversionTxt,
                    as: 'actividadesdeinversion',
                },
                {
                    model: ActividadesdeoperacionTxt,
                    as: 'actividadesdeoperacion',
                },
                {
                    model: ActivosnocorrientesTxt,
                    as: 'activosnocorrientes',
                },
                {
                    model: ConciliacionTxt,
                    as: 'conciliacionganancianeta',
                },
                {
                    model: CostosTxt,
                    as: 'costos',
                },
                {
                    model: EcpTxt,
                    as: 'ecp',
                },
                {
                    model: GastosadministrativosTxt,
                    as: 'gastosadministrativos',
                },
                {
                    model: GastosdeventasTxt,
                    as: 'gastosdeventas',
                },
                {
                    model: GastosfinancierosTxt,
                    as: 'gastosfinancieros',
                },
                {
                    model: IngresosTxt,
                    as: 'ingresos',
                },
                {
                    model: OperacionesdiscontinuadasTxt,
                    as: 'operacionesdiscontinuadas',
                },
                {
                    model: OtrosingresosTxt,
                    as: 'otrosingresos',
                },
                {
                    model: OtrosgastosTxt,
                    as: 'otrosgastos',
                },
                {
                    model: OtrosresultadosintegralesTxt,
                    as: 'otrosresultadosintegral',
                },
                {
                    model: ParticipacioncontroladoraTxt,
                    as: 'resultadosparticipacioncontroladora',
                },
                {
                    model: PasivoscorrientesTxt,
                    as: 'pasivoscorrientes',
                },
                {
                    model: PasivosnocorrientesTxt,
                    as: 'pasivosnocorrientes',
                },
                {
                    model: PatrimonioTxt,
                    as: 'patrimonio',
                },
                {
                    model: ResultadosTxt,
                    as: 'resultados',
                },
                {
                    model: ActivoscorrientesAntTxt,
                    as: 'activoscorrientes_ant',
                },
                {
                    model: ActividadesdefinanciamientoAntTxt,
                    as: 'actividadesdefinanciamiento_ant',
                },
                {
                    model: ActividadesdeinversionAntTxt,
                    as: 'actividadesdeinversion_ant',
                },
                {
                    model: ActividadesdeoperacionAntTxt,
                    as: 'actividadesdeoperacion_ant',
                },
                {
                    model: ActivosnocorrientesAntTxt,
                    as: 'activosnocorrientes_ant',
                },
                {
                    model: ConciliacionAntTxt,
                    as: 'conciliacionganancianeta_ant',
                },
                {
                    model: CostosAntTxt,
                    as: 'costos_ant',
                },
                {
                    model: GastosadministrativosAntTxt,
                    as: 'gastosadministrativos_ant',
                },
                {
                    model: GastosdeventasAntTxt,
                    as: 'gastosdeventas_ant',
                },
                {
                    model: GastosfinancierosAntTxt,
                    as: 'gastosfinancieros_ant',
                },
                {
                    model: IngresosAntTxt,
                    as: 'ingresos_ant',
                },
                {
                    model: OperacionesdiscontinuadasAntTxt,
                    as: 'operacionesdiscontinuadas_ant',
                },
                {
                    model: OtrosingresosAntTxt,
                    as: 'otrosingresos_ant',
                },
                {
                    model: OtrosgastosAntTxt,
                    as: 'otrosgastos_ant',
                },
                {
                    model: OtrosresultadosintegralesAntTxt,
                    as: 'otrosresultadosintegral_ant',
                },
                {
                    model: ParticipacioncontroladoraAntTxt,
                    as: 'resultadosparticipacioncontroladora_ant',
                },
                {
                    model: PasivoscorrientesAntTxt,
                    as: 'pasivoscorrientes_ant',
                },
                {
                    model: PasivosnocorrientesAntTxt,
                    as: 'pasivosnocorrientes_ant',
                },
                {
                    model: PatrimonioAntTxt,
                    as: 'patrimonio_ant',
                },
                {
                    model: ResultadosAntTxt,
                    as: 'resultados_ant',
                },
            ],
            where: {
                userId: req.query.user
            },
            order: [
                ['reporteId', 'DESC'],
            ]
        })
            .then(results => {
                const queryLower = req.query.q.toLowerCase()
                let filteredReportes = results
                const totalPage = Math.ceil(filteredReportes.length / req.query.perPage) ? Math.ceil(filteredReportes.length / req.query.perPage) : 1
                const totalReporteSupercias = filteredReportes.length
                if (req.query.perPage) {
                    const firstIndex = (req.query.currentPage - 1) * req.query.perPage
                    const lastIndex = req.query.perPage * req.query.currentPage

                    filteredReportes = filteredReportes.slice(firstIndex, lastIndex)
                }

                res.json({ reportes: filteredReportes, totalPage, totalReporteSupercias})
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    /**
     * @api {get} /users/id Devuelve los datos del usuario autenticado
     * @apiGroup Users
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} id ID del usuario que se quiere recuperar la info
     * @apiSuccess {Number} id ID del usuario registrado
     * @apiSuccess {String} nombres Nombres de usuario
     * @apiSuccess {String} cedula Cédula de Identidad del usuario
     * @apiSuccess {String} celular Número de teléfono celular del usuario
     * @apiSuccess {String} direccion Dirección fiscal del usuario para las facturas
     * @apiSuccess {String} email Correo electrónico del usuario
     * @apiSuccess {String} password Password del usuario
     * @apiSuccess {String} avatar Avatar identificativo del usuario
     * @apiSuccess {String} facebook Si el registro se realizo desde facebook login
     * @apiSuccess {String} push Código para notificaciones Push
     * @apiSuccess {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiSuccess {String} version Version de la app con la cual se regsitra el usuario
     * @apiSuccess {Date} updatedAt Update's date
     * @apiSuccess {Date} createdAt Register's date
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "id": 1,
     *    "nombres": "raul",
     *    "cedula": "Raúl Castro",
     *    "celular": "raul@castro.net",
     *    "direccion": "123456",
     *    "email": "raul@hotmail.com",
     *    "password": "123456789",
     *    "avatar": "https://goubi.aplios.net/perfil.png",
     *    "facebook": "0",
     *    "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "version": "0.0.0"
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/reportestxt/:id", (req, res) => {
        ReportesTxt.findOne({
            include: [
                {
                    model: EmpresasTxt,
                    as: 'empresareportesupercias',
                },
                {
                    model: PeriodosTxt,
                    as: 'periodosreportesupercias',
                },
                {
                    model: ActivoscorrientesTxt,
                    as: 'activoscorrientes'
                },
                {
                    model: ActividadesdefinanciamientoTxt,
                    as: 'actividadesdefinanciamiento'
                },
                {
                    model: ActividadesdeinversionTxt,
                    as: 'actividadesdeinversion'
                },
                {
                    model: ActividadesdeoperacionTxt,
                    as: 'actividadesdeoperacion'
                },
                {
                    model: ActivosnocorrientesTxt,
                    as: 'activosnocorrientes'
                },
                {
                    model: ConciliacionTxt,
                    as: 'conciliacionganancianeta'
                },
                {
                    model: CostosTxt,
                    as: 'costos'
                },
                {
                    model: EcpTxt,
                    as: 'ecp'
                },
                {
                    model: GastosadministrativosTxt,
                    as: 'gastosadministrativos'
                },
                {
                    model: GastosdeventasTxt,
                    as: 'gastosdeventas'
                },
                {
                    model: GastosfinancierosTxt,
                    as: 'gastosfinancieros'
                },
                {
                    model: IngresosTxt,
                    as: 'ingresos'
                },
                {
                    model: OperacionesdiscontinuadasTxt,
                    as: 'operacionesdiscontinuadas'
                },
                {
                    model: OtrosingresosTxt,
                    as: 'otrosingresos'
                },
                {
                    model: OtrosgastosTxt,
                    as: 'otrosgastos'
                },
                {
                    model: OtrosresultadosintegralesTxt,
                    as: 'otrosresultadosintegral'
                },
                {
                    model: ParticipacioncontroladoraTxt,
                    as: 'resultadosparticipacioncontroladora'
                },
                {
                    model: PasivoscorrientesTxt,
                    as: 'pasivoscorrientes'
                },
                {
                    model: PasivosnocorrientesTxt,
                    as: 'pasivosnocorrientes'
                },
                {
                    model: PatrimonioTxt,
                    as: 'patrimonio'
                },
                {
                    model: ResultadosTxt,
                    as: 'resultados'
                },
                {
                    model: ActivoscorrientesAntTxt,
                    as: 'activoscorrientes_ant'
                },
                {
                    model: ActividadesdefinanciamientoAntTxt,
                    as: 'actividadesdefinanciamiento_ant'
                },
                {
                    model: ActividadesdeinversionAntTxt,
                    as: 'actividadesdeinversion_ant'
                },
                {
                    model: ActividadesdeoperacionAntTxt,
                    as: 'actividadesdeoperacion_ant'
                },
                {
                    model: ActivosnocorrientesAntTxt,
                    as: 'activosnocorrientes_ant'
                },
                {
                    model: ConciliacionAntTxt,
                    as: 'conciliacionganancianeta_ant'
                },
                {
                    model: CostosAntTxt,
                    as: 'costos_ant'
                },
                {
                    model: GastosadministrativosAntTxt,
                    as: 'gastosadministrativos_ant'
                },
                {
                    model: GastosdeventasAntTxt,
                    as: 'gastosdeventas_ant'
                },
                {
                    model: GastosfinancierosAntTxt,
                    as: 'gastosfinancieros_ant'
                },
                {
                    model: IngresosAntTxt,
                    as: 'ingresos_ant'
                },
                {
                    model: OperacionesdiscontinuadasAntTxt,
                    as: 'operacionesdiscontinuadas_ant'
                },
                {
                    model: OtrosingresosAntTxt,
                    as: 'otrosingresos_ant'
                },
                {
                    model: OtrosgastosAntTxt,
                    as: 'otrosgastos_ant'
                },
                {
                    model: OtrosresultadosintegralesAntTxt,
                    as: 'otrosresultadosintegral_ant'
                },
                {
                    model: ParticipacioncontroladoraAntTxt,
                    as: 'resultadosparticipacioncontroladora_ant'
                },
                {
                    model: PasivoscorrientesAntTxt,
                    as: 'pasivoscorrientes_ant'
                },
                {
                    model: PasivosnocorrientesAntTxt,
                    as: 'pasivosnocorrientes_ant'
                },
                {
                    model: PatrimonioAntTxt,
                    as: 'patrimonio_ant'
                },
                {
                    model: ResultadosAntTxt,
                    as: 'resultados_ant'
                },
            ],
            where: {
                reporteId: req.params.id
            }
        })
            .then(result => {
                // console.log(result)
                res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    /**
     * @api {get} /users/id Devuelve los datos del usuario autenticado
     * @apiGroup Users
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} id ID del usuario que se quiere recuperar la info
     * @apiSuccess {Number} id ID del usuario registrado
     * @apiSuccess {String} nombres Nombres de usuario
     * @apiSuccess {String} cedula Cédula de Identidad del usuario
     * @apiSuccess {String} celular Número de teléfono celular del usuario
     * @apiSuccess {String} direccion Dirección fiscal del usuario para las facturas
     * @apiSuccess {String} email Correo electrónico del usuario
     * @apiSuccess {String} password Password del usuario
     * @apiSuccess {String} avatar Avatar identificativo del usuario
     * @apiSuccess {String} facebook Si el registro se realizo desde facebook login
     * @apiSuccess {String} push Código para notificaciones Push
     * @apiSuccess {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiSuccess {String} version Version de la app con la cual se regsitra el usuario
     * @apiSuccess {Date} updatedAt Update's date
     * @apiSuccess {Date} createdAt Register's date
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "id": 1,
     *    "nombres": "raul",
     *    "cedula": "Raúl Castro",
     *    "celular": "raul@castro.net",
     *    "direccion": "123456",
     *    "email": "raul@hotmail.com",
     *    "password": "123456789",
     *    "avatar": "https://goubi.aplios.net/perfil.png",
     *    "facebook": "0",
     *    "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "version": "0.0.0"
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/reportestxt/:empresa/:periodo", (req, res) => {
        ReportesTxt.findOne({
            where: {
                empresaId: req.params.empresa,
                periodoId: req.params.periodo
            }
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    /**
     * @api {delete} /user Elimina al usuario autenticado
     * @apiGroup Users
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} id ID del Usuario a eliminar
     * @apiSuccessExample {json} Success
     * HTTP/1.1 204 No Content
     * @apiErrorExample {json} Delete error
     * HTTP/1.1 412 Precondition Failed
     */
    app.delete("/reportestxt/:id", (req, res) => {
        console.log('req.params.id', req.params.id)
        ReportesTxt.destroy({where: {reporteId: req.params.id}})
            .then(result => {
                console.log(result)
                res.json(result)
            })
            .catch(error => {
                res.json({msg: error.message})
            });
    });

    /**
     * @api {post} /registerusuarios Registra un nuevo usuario
     * @apiGroup Users
     * @apiParam {String} nombres Nombres de usuario
     * @apiParam {String} cedula Cédula de Identidad del usuario
     * @apiParam {String} celular Número de teléfono celular del usuario
     * @apiParam {String} direccion Dirección fiscal del usuario para las facturas
     * @apiParam {String} email Correo electrónico del usuario
     * @apiParam {String} password Password del usuario
     * @apiParam {String} avatar Avatar identificativo del usuario
     * @apiParam {String} facebook Si el registro se realizo desde facebook login
     * @apiParam {String} push Código para notificaciones Push
     * @apiParam {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiParam {String} version Version de la app con la cual se regsitra el usuario
     * @apiParamExample {json} Input
     *{
     *   "nombres": "raul",
     *   "cedula": "Raúl Castro",
     *   "celular": "raul@castro.net",
     *   "direccion": "123456",
     *   "email": "raul@hotmail.com",
     *   "password": "123456789",
     *   "avatar": "https://goubi.aplios.net/perfil.png",
     *   "facebook": "0",
     *   "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *   "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *   "version": "0.0.0"
     * }
     * @apiSuccess {Number} id ID del usuario registrado
     * @apiSuccess {String} nombres Nombres de usuario
     * @apiSuccess {String} cedula Cédula de Identidad del usuario
     * @apiSuccess {String} celular Número de teléfono celular del usuario
     * @apiSuccess {String} direccion Dirección fiscal del usuario para las facturas
     * @apiSuccess {String} email Correo electrónico del usuario
     * @apiSuccess {String} password Password del usuario
     * @apiSuccess {String} avatar Avatar identificativo del usuario
     * @apiSuccess {String} facebook Si el registro se realizo desde facebook login
     * @apiSuccess {String} push Código para notificaciones Push
     * @apiSuccess {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiSuccess {String} version Version de la app con la cual se regsitra el usuario
     * @apiSuccess {Date} updatedAt Update's date
     * @apiSuccess {Date} createdAt Register's date
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "id": 1,
     *    "nombres": "raul",
     *    "cedula": "Raúl Castro",
     *    "celular": "raul@castro.net",
     *    "direccion": "123456",
     *    "email": "raul@hotmail.com",
     *    "password": "123456789",
     *    "avatar": "https://goubi.aplios.net/perfil.png",
     *    "facebook": "0",
     *    "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "version": "0.0.0"
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiErrorExample {json} Register error 30
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/reportestxt", (req, res) => {
        const reporte = req.body.reporte
        ReportesTxt.findAll({
            where: {
                userId: reporte.userId,
                empresaId: reporte.empresaId,
                periodoId: reporte.periodoId
            },
            order: [
                ['reporteId', 'DESC'],
            ]
        })
            .then(resultados => {
                if (resultados.length > 0) {
                    ReportesTxt.update(reporte, {where: {reporteId: resultados[0].reporteId}})
                        .then(result => {
                            res.json(resultados)
                        })
                        .catch(error => {
                            res.status(412).json({msg: error.message});
                        });
                } else {
                    ReportesTxt.create(reporte)
                        .then(result => {
                            ReportesTxt.findOne({
                                order: [
                                    ['reporteId', 'DESC'],
                                ]
                            })
                                .then(resp => {
                                    result.reporteId = resp.reporteId
                                    res.json(result)
                                })
                        })
                        .catch(error => {
                            res.status(412).json({msg: error.message});
                        });
                }
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            })
    });

    /**
     * @api {put} /actualizarusuarios Actualiza un usuario registrado
     * @apiGroup Users
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} nombres Nombres de usuario
     * @apiParam {String} cedula Cédula de Identidad del usuario
     * @apiParam {String} celular Número de teléfono celular del usuario
     * @apiParam {String} direccion Dirección fiscal del usuario para las facturas
     * @apiParam {String} email Correo electrónico del usuario
     * @apiParam {String} password Password del usuario
     * @apiParam {String} avatar Avatar identificativo del usuario
     * @apiParam {String} facebook Si el registro se realizo desde facebook login
     * @apiParam {String} push Código para notificaciones Push
     * @apiParam {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiParam {String} version Version de la app con la cual se regsitra el usuario
     * @apiParamExample {json} Input
     *{
     *   "nombres": "raul",
     *   "cedula": "Raúl Castro",
     *   "celular": "raul@castro.net",
     *   "direccion": "123456",
     *   "email": "raul@hotmail.com",
     *   "password": "123456789",
     *   "avatar": "https://goubi.aplios.net/perfil.png",
     *   "facebook": "0",
     *   "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *   "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *   "version": "0.0.0"
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 204 No Content
     * @apiErrorExample {json} Update error
     * HTTP/1.1 412 Precondition Failed
     */
    app.put("/reportestxt", (req, res) => {
        ReportesTxt.update(req.query, {where: {id: req.query.id}})
            .then(result => {
                console.log(result)
                res.json(result)
                //res.sendStatus(204)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })
}
