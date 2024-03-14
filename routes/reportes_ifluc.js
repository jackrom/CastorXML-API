module.exports = app => {
    const ReportesIfluc = app.db.models.ReportesIfluc
    const PeriodosIfluc = app.db.models.PeriodosIfluc
    const EmpresasIfluc = app.db.models.EmpresasIfluc
    const ActivoscorrientesIfluc = app.db.models.ActivoscorrientesIfluc
    const ActivosnocorrientesIfluc = app.db.models.ActivosnocorrientesIfluc
    const ActividadesdefinanciamientoIfluc = app.db.models.ActividadesdefinanciamientoIfluc
    const ActividadesdeinversionIfluc = app.db.models.ActividadesdeinversionIfluc
    const ActividadesdeoperacionIfluc = app.db.models.ActividadesdeoperacionIfluc
    const ConciliacionIfluc = app.db.models.ConciliacionIfluc
    const CostosIfluc = app.db.models.CostosIfluc
    const EcpIfluc = app.db.models.EcpIfluc
    const GastosadministrativosIfluc = app.db.models.GastosadministrativosIfluc
    const GastosdeventasIfluc = app.db.models.GastosdebentasIfluc
    const GastosfinancierosIfluc = app.db.models.GastosfinancierosIfluc
    const IngresosIfluc = app.db.models.IngresosIfluc
    const OperacionesdiscontinuadasIfluc = app.db.models.OperacionesdiscontinuadasIfluc
    const OtrosingresosIfluc = app.db.models.OtrosingresosIfluc
    const OtrosgastosIfluc = app.db.models.OtrosgastosIfluc
    const OtrosresultadosintegralesIfluc = app.db.models.OtrsoresultadosintegralesIfluc
    const ParticipacioncontroladoraIfluc = app.db.models.ParticipacioncontroladoraIfluc
    const PasivoscorrientesIfluc = app.db.models.PasivoscorrientesIfluc
    const PasivosnocorrientesIfluc = app.db.models.PasivosnocorrientesIfluc
    const PatrimonioIfluc = app.db.models.PatrimonioIfluc
    const ResultadosIfluc = app.db.models.ResultadosIfluc
    const PerdidasAcumCuentasIncobyDeterioroIfluc = app.db.models.PerdidasAcumCuentasIncobyDeterioroIfluc
    const ActivoscorrientesAntIfluc = app.db.models.ActivoscorrientesAntIfluc
    const ActivosnocorrientesAntIfluc = app.db.models.ActivosnocorrientesAntIfluc
    const ActividadesdefinanciamientoAntIfluc = app.db.models.ActividadesdefinanciamientoAntIfluc
    const ActividadesdeinversionAntIfluc = app.db.models.ActividadesdeinversionAntIfluc
    const ActividadesdeoperacionAntIfluc = app.db.models.ActividadesdeoperacionAntIfluc
    const ConciliacionAntIfluc = app.db.models.ConciliacionAntIfluc
    const CostosAntIfluc = app.db.models.CostosAntIfluc
    const GastosadministrativosAntIfluc = app.db.models.GastosadministrativosAntIfluc
    const GastosdeventasAntIfluc = app.db.models.GastosdebentasAntIfluc
    const GastosfinancierosAntIfluc = app.db.models.GastosfinancierosAntIfluc
    const IngresosAntIfluc = app.db.models.IngresosAntIfluc
    const OperacionesdiscontinuadasAntIfluc = app.db.models.OperacionesdiscontinuadasAntIfluc
    const OtrosingresosAntIfluc = app.db.models.OtrosingresosAntIfluc
    const OtrosgastosAntIfluc = app.db.models.OtrosgastosAntIfluc
    const OtrosresultadosintegralesAntIfluc = app.db.models.OtrsoresultadosintegralesAntIfluc
    const ParticipacioncontroladoraAntIfluc = app.db.models.ParticipacioncontroladoraAntIfluc
    const PasivoscorrientesAntIfluc = app.db.models.PasivoscorrientesAntIfluc
    const PasivosnocorrientesAntIfluc = app.db.models.PasivosnocorrientesAntIfluc
    const PatrimonioAntIfluc = app.db.models.PatrimonioAntIfluc
    const ResultadosAntIfluc = app.db.models.ResultadosAntIfluc
    const PerdidasAcumCuentasIncobyDeterioroAntIfluc = app.db.models.PerdidasAcumCuentasIncobyDeterioroAntIfluc

    const PerdidasAcumValNetRealizyOtrasPerdEnInvIfluc = app.db.models.PerdidasAcumValNetRealizyOtrasPerdEnInvIfluc
    const PerdidasAcumValNetRealizyOtrasPerdEnInvAntIfluc = app.db.models.PerdidasAcumValNetRealizyOtrasPerdEnInvAntIfluc

    const PropiedadesPlantasyEquiposIfluc = app.db.models.PropiedadesPlantasyEquiposIfluc
    const PropiedadesPlantasyEquiposAntIfluc = app.db.models.PropiedadesPlantasyEquiposAntIfluc

    const PropiedadesDeInversionIfluc = app.db.models.PropiedadesDeInversionIfluc
    const PropiedadesDeInversionAntIfluc = app.db.models.PropiedadesDeInversionAntIfluc

    const IntangiblesIfluc = app.db.models.IntangiblesIfluc
    const IntangiblesAntIfluc = app.db.models.IntangiblesAntIfluc

    const ActivosBiologicosIfluc = app.db.models.ActivosBiologicosIfluc
    const ActivosBiologicosAntIfluc = app.db.models.ActivosBiologicosAntIfluc

    const ImpuestosDiferidosIfluc = app.db.models.ImpuestosDiferidosIfluc
    const ImpuestosDiferidosAntIfluc = app.db.models.ImpuestosDiferidosAntIfluc

    const JubilacionPatronalIfluc = app.db.models.JubilacionPatronalIfluc
    const JubilacionPatronalAntIfluc = app.db.models.JubilacionPatronalAntIfluc

    const DeshaucioIfluc = app.db.models.DeshaucioIfluc
    const DeshaucioAntIfluc = app.db.models.DeshaucioAntIfluc

    const ActivosFinancierosLargoPlazoIfluc = app.db.models.ActivosFinancierosLargoPlazoIfluc
    const ActivosFinancierosLargoPlazoAntIfluc = app.db.models.ActivosFinancierosLargoPlazoAntIfluc

    const OtrosIfluc = app.db.models.OtrosIfluc
    const OtrosAntIfluc = app.db.models.OtrosAntIfluc

    const TurboNotasfc = app.db.models.TurboNotasfc


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
    app.get("/reportesIfluc", (req, res) => {
        ReportesIfluc.findAll({
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
    app.get("/reportesIfluc/bycompany", (req, res) => {
        ReportesIfluc.findAll({
            include: [
                {
                    model: EmpresasIfluc,
                    as: 'empresareporteifluc',
                },
                {
                    model: PeriodosIfluc,
                    as: 'periodosreporteifluc',
                },
                {
                    model: ActivoscorrientesIfluc,
                    as: 'activoscorrientesifluc',
                },
                {
                    model: ActividadesdefinanciamientoIfluc,
                    as: 'actividadesdefinanciamientoifluc',
                },
                {
                    model: ActividadesdeinversionIfluc,
                    as: 'actividadesdeinversionifluc',
                },
                {
                    model: ActividadesdeoperacionIfluc,
                    as: 'actividadesdeoperacionifluc',
                },
                {
                    model: ActivosnocorrientesIfluc,
                    as: 'activosnocorrientesifluc',
                },
                {
                    model: ConciliacionIfluc,
                    as: 'conciliacionganancianetaifluc',
                },
                {
                    model: CostosIfluc,
                    as: 'costosifluc',
                },
                {
                    model: EcpIfluc,
                    as: 'ecpifluc',
                },
                {
                    model: GastosadministrativosIfluc,
                    as: 'gastosadministrativosifluc',
                },
                {
                    model: GastosdeventasIfluc,
                    as: 'gastosdeventasifluc',
                },
                {
                    model: GastosfinancierosIfluc,
                    as: 'gastosfinancierosifluc',
                },
                {
                    model: IngresosIfluc,
                    as: 'ingresosifluc',
                },
                {
                    model: OperacionesdiscontinuadasIfluc,
                    as: 'operacionesdiscontinuadasifluc',
                },
                {
                    model: OtrosingresosIfluc,
                    as: 'otrosingresosifluc',
                },
                {
                    model: OtrosgastosIfluc,
                    as: 'otrosgastosifluc',
                },
                {
                    model: OtrosresultadosintegralesIfluc,
                    as: 'otrosresultadosintegralifluc',
                },
                {
                    model: ParticipacioncontroladoraIfluc,
                    as: 'resultadosparticipacioncontroladoraifluc',
                },
                {
                    model: PasivoscorrientesIfluc,
                    as: 'pasivoscorrientesifluc',
                },
                {
                    model: PasivosnocorrientesIfluc,
                    as: 'pasivosnocorrientesifluc',
                },
                {
                    model: PatrimonioIfluc,
                    as: 'patrimonioifluc',
                },
                {
                    model: ResultadosIfluc,
                    as: 'resultadosifluc',
                },
                {
                    model: PerdidasAcumCuentasIncobyDeterioroIfluc,
                    as: 'movperdidasacumuladascuentasincobrablesydeterioro',
                },
                {
                    model: PerdidasAcumValNetRealizyOtrasPerdEnInvIfluc,
                    as: 'movperdidasacumuladasvalornetorealizacion',
                },
                {
                    model: PropiedadesPlantasyEquiposIfluc,
                    as: 'movpropiedadesplantasyequipos'
                },
                {
                    model: PropiedadesDeInversionIfluc,
                    as: 'movpropiedadesdeinversion'
                },
                {
                    model: IntangiblesIfluc,
                    as: 'movintangibles'
                },
                {
                    model: ActivosBiologicosIfluc,
                    as: 'movactivosbiologicos'
                },
                {
                    model: ImpuestosDiferidosIfluc,
                    as: 'movimpuestosdiferidos'
                },
                {
                    model: JubilacionPatronalIfluc,
                    as: 'movjubilacionpatronal'
                },
                {
                    model: DeshaucioIfluc,
                    as: 'deshaucio'
                },
                {
                    model: ActivosFinancierosLargoPlazoIfluc,
                    as: 'activosfinancieroslargoplazo'
                },
                {
                    model: OtrosIfluc,
                    as: 'otros'
                },
                {
                    model: ActivoscorrientesAntIfluc,
                    as: 'activoscorrientesifluc_ant',
                },
                {
                    model: ActividadesdefinanciamientoAntIfluc,
                    as: 'actividadesdefinanciamientoifluc_ant',
                },
                {
                    model: ActividadesdeinversionAntIfluc,
                    as: 'actividadesdeinversionifluc_ant',
                },
                {
                    model: ActividadesdeoperacionAntIfluc,
                    as: 'actividadesdeoperacionifluc_ant',
                },
                {
                    model: ActivosnocorrientesAntIfluc,
                    as: 'activosnocorrientesifluc_ant',
                },
                {
                    model: ConciliacionAntIfluc,
                    as: 'conciliacionganancianetaifluc_ant',
                },
                {
                    model: CostosAntIfluc,
                    as: 'costosifluc_ant',
                },
                {
                    model: GastosadministrativosAntIfluc,
                    as: 'gastosadministrativosifluc_ant',
                },
                {
                    model: GastosdeventasAntIfluc,
                    as: 'gastosdeventasifluc_ant',
                },
                {
                    model: GastosfinancierosAntIfluc,
                    as: 'gastosfinancierosifluc_ant',
                },
                {
                    model: IngresosAntIfluc,
                    as: 'ingresosifluc_ant',
                },
                {
                    model: OperacionesdiscontinuadasAntIfluc,
                    as: 'operacionesdiscontinuadasifluc_ant',
                },
                {
                    model: OtrosingresosAntIfluc,
                    as: 'otrosingresosifluc_ant',
                },
                {
                    model: OtrosgastosAntIfluc,
                    as: 'otrosgastosifluc_ant',
                },
                {
                    model: OtrosresultadosintegralesAntIfluc,
                    as: 'otrosresultadosintegralifluc_ant',
                },
                {
                    model: ParticipacioncontroladoraAntIfluc,
                    as: 'resultadosparticipacioncontroladoraifluc_ant',
                },
                {
                    model: PasivoscorrientesAntIfluc,
                    as: 'pasivoscorrientesifluc_ant',
                },
                {
                    model: PasivosnocorrientesAntIfluc,
                    as: 'pasivosnocorrientesifluc_ant',
                },
                {
                    model: PatrimonioAntIfluc,
                    as: 'patrimonioifluc_ant',
                },
                {
                    model: ResultadosAntIfluc,
                    as: 'resultadosifluc_ant',
                },
                {
                    model: PerdidasAcumCuentasIncobyDeterioroAntIfluc,
                    as: 'movperdidasacumuladascuentasincobrablesydeterioro_ant',
                },
                {
                    model: PerdidasAcumValNetRealizyOtrasPerdEnInvAntIfluc,
                    as: 'movperdidasacumuladasvalornetorealizacion_ant'
                },
                {
                    model: PropiedadesPlantasyEquiposAntIfluc,
                    as: 'movpropiedadesplantasyequipos_ant'
                },
                {
                    model: PropiedadesDeInversionAntIfluc,
                    as: 'movpropiedadesdeinversion_ant'
                },
                {
                    model: IntangiblesAntIfluc,
                    as: 'movintangibles_ant'
                },
                {
                    model: ActivosBiologicosAntIfluc,
                    as: 'movactivosbiologicos_ant'
                },
                {
                    model: ImpuestosDiferidosAntIfluc,
                    as: 'movimpuestosdiferidos_ant'
                },
                {
                    model: JubilacionPatronalAntIfluc,
                    as: 'movjubilacionpatronal_ant'
                },
                {
                    model: DeshaucioAntIfluc,
                    as: 'deshaucio_ant'
                },
                {
                    model: ActivosFinancierosLargoPlazoAntIfluc,
                    as: 'activosfinancieroslargoplazo_ant'
                },
                {
                    model: OtrosAntIfluc,
                    as: 'otros_ant'
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

    app.get("/reportesIfluc/byuser", (req, res) => {
        ReportesIfluc.findAll({
            include: [
                {
                    model: EmpresasIfluc,
                    as: 'empresareporteifluc',
                },
                {
                    model: PeriodosIfluc,
                    as: 'periodosreporteifluc',
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
                const totalReporteifluc = filteredReportes.length
                if (req.query.perPage) {
                    const firstIndex = (req.query.currentPage - 1) * req.query.perPage
                    const lastIndex = req.query.perPage * req.query.currentPage

                    filteredReportes = filteredReportes.slice(firstIndex, lastIndex)
                }

                res.json({ reportes: results, totalPage, totalReporteifluc})
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
    app.get("/reportesIfluc/actual/:id", (req, res) => {
        ReportesIfluc.findOne({
            include: [
                {
                    model: EmpresasIfluc,
                    as: 'empresareporteifluc',
                },
                {
                    model: PeriodosIfluc,
                    as: 'periodosreporteifluc',
                },
                {
                    model: ActivoscorrientesIfluc,
                    as: 'activoscorrientesifluc',
                },
                {
                    model: ActividadesdefinanciamientoIfluc,
                    as: 'actividadesdefinanciamientoifluc',
                },
                {
                    model: ActividadesdeinversionIfluc,
                    as: 'actividadesdeinversionifluc',
                },
                {
                    model: ActividadesdeoperacionIfluc,
                    as: 'actividadesdeoperacionifluc',
                },
                {
                    model: ActivosnocorrientesIfluc,
                    as: 'activosnocorrientesifluc',
                },
                {
                    model: ConciliacionIfluc,
                    as: 'conciliacionganancianetaifluc',
                },
                {
                    model: CostosIfluc,
                    as: 'costosifluc',
                },
                {
                    model: EcpIfluc,
                    as: 'ecpifluc',
                },
                {
                    model: GastosadministrativosIfluc,
                    as: 'gastosadministrativosifluc',
                },
                {
                    model: GastosdeventasIfluc,
                    as: 'gastosdeventasifluc',
                },
                {
                    model: GastosfinancierosIfluc,
                    as: 'gastosfinancierosifluc',
                },
                {
                    model: IngresosIfluc,
                    as: 'ingresosifluc',
                },
                {
                    model: OperacionesdiscontinuadasIfluc,
                    as: 'operacionesdiscontinuadasifluc',
                },
                {
                    model: OtrosingresosIfluc,
                    as: 'otrosingresosifluc',
                },
                {
                    model: OtrosgastosIfluc,
                    as: 'otrosgastosifluc',
                },
                {
                    model: OtrosresultadosintegralesIfluc,
                    as: 'otrosresultadosintegralifluc',
                },
                {
                    model: ParticipacioncontroladoraIfluc,
                    as: 'resultadosparticipacioncontroladoraifluc',
                },
                {
                    model: PasivoscorrientesIfluc,
                    as: 'pasivoscorrientesifluc',
                },
                {
                    model: PasivosnocorrientesIfluc,
                    as: 'pasivosnocorrientesifluc',
                },
                {
                    model: PatrimonioIfluc,
                    as: 'patrimonioifluc',
                },
                {
                    model: ResultadosIfluc,
                    as: 'resultadosifluc',
                },
                {
                    model: PerdidasAcumCuentasIncobyDeterioroIfluc,
                    as: 'movperdidasacumuladascuentasincobrablesydeterioro',
                },
                {
                    model: PerdidasAcumValNetRealizyOtrasPerdEnInvIfluc,
                    as: 'movperdidasacumuladasvalornetorealizacion',
                },
                {
                    model: PropiedadesPlantasyEquiposIfluc,
                    as: 'movpropiedadesplantasyequipos'
                },
                {
                    model: PropiedadesDeInversionIfluc,
                    as: 'movpropiedadesdeinversion'
                },
                {
                    model: IntangiblesIfluc,
                    as: 'movintangibles'
                },
                {
                    model: ActivosBiologicosIfluc,
                    as: 'movactivosbiologicos'
                },
                {
                    model: ImpuestosDiferidosIfluc,
                    as: 'movimpuestosdiferidos'
                },
                {
                    model: JubilacionPatronalIfluc,
                    as: 'movjubilacionpatronal'
                },
                {
                    model: DeshaucioIfluc,
                    as: 'deshaucio'
                },
                {
                    model: ActivosFinancierosLargoPlazoIfluc,
                    as: 'activosfinancieroslargoplazo'
                },
                {
                    model: OtrosIfluc,
                    as: 'otros'
                },
                {
                    model: TurboNotasfc,
                    as: 'reporteTurboNotas',
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
    app.get("/reportesIfluc/anterior/:id", (req, res) => {
        ReportesIfluc.findOne({
            include: [
                {
                    model: ActivoscorrientesAntIfluc,
                    as: 'activoscorrientesifluc_ant',
                },
                {
                    model: ActividadesdefinanciamientoAntIfluc,
                    as: 'actividadesdefinanciamientoifluc_ant',
                },
                {
                    model: ActividadesdeinversionAntIfluc,
                    as: 'actividadesdeinversionifluc_ant',
                },
                {
                    model: ActividadesdeoperacionAntIfluc,
                    as: 'actividadesdeoperacionifluc_ant',
                },
                {
                    model: ActivosnocorrientesAntIfluc,
                    as: 'activosnocorrientesifluc_ant',
                },
                {
                    model: ConciliacionAntIfluc,
                    as: 'conciliacionganancianetaifluc_ant',
                },
                {
                    model: CostosAntIfluc,
                    as: 'costosifluc_ant',
                },
                {
                    model: GastosadministrativosAntIfluc,
                    as: 'gastosadministrativosifluc_ant',
                },
                {
                    model: GastosdeventasAntIfluc,
                    as: 'gastosdeventasifluc_ant',
                },
                {
                    model: GastosfinancierosAntIfluc,
                    as: 'gastosfinancierosifluc_ant',
                },
                {
                    model: IngresosAntIfluc,
                    as: 'ingresosifluc_ant',
                },
                {
                    model: OperacionesdiscontinuadasAntIfluc,
                    as: 'operacionesdiscontinuadasifluc_ant',
                },
                {
                    model: OtrosingresosAntIfluc,
                    as: 'otrosingresosifluc_ant',
                },
                {
                    model: OtrosgastosAntIfluc,
                    as: 'otrosgastosifluc_ant',
                },
                {
                    model: OtrosresultadosintegralesAntIfluc,
                    as: 'otrosresultadosintegralifluc_ant',
                },
                {
                    model: ParticipacioncontroladoraAntIfluc,
                    as: 'resultadosparticipacioncontroladoraifluc_ant',
                },
                {
                    model: PasivoscorrientesAntIfluc,
                    as: 'pasivoscorrientesifluc_ant',
                },
                {
                    model: PasivosnocorrientesAntIfluc,
                    as: 'pasivosnocorrientesifluc_ant',
                },
                {
                    model: PatrimonioAntIfluc,
                    as: 'patrimonioifluc_ant',
                },
                {
                    model: ResultadosAntIfluc,
                    as: 'resultadosifluc_ant',
                },
                {
                    model: PerdidasAcumCuentasIncobyDeterioroAntIfluc,
                    as: 'movperdidasacumuladascuentasincobrablesydeterioro_ant',
                },
                {
                    model: PerdidasAcumValNetRealizyOtrasPerdEnInvAntIfluc,
                    as: 'movperdidasacumuladasvalornetorealizacion_ant'
                },
                {
                    model: PropiedadesPlantasyEquiposAntIfluc,
                    as: 'movpropiedadesplantasyequipos_ant'
                },
                {
                    model: PropiedadesDeInversionAntIfluc,
                    as: 'movpropiedadesdeinversion_ant'
                },
                {
                    model: IntangiblesAntIfluc,
                    as: 'movintangibles_ant'
                },
                {
                    model: ActivosBiologicosAntIfluc,
                    as: 'movactivosbiologicos_ant'
                },
                {
                    model: ImpuestosDiferidosAntIfluc,
                    as: 'movimpuestosdiferidos_ant'
                },
                {
                    model: JubilacionPatronalAntIfluc,
                    as: 'movjubilacionpatronal_ant'
                },
                {
                    model: DeshaucioAntIfluc,
                    as: 'deshaucio_ant'
                },
                {
                    model: ActivosFinancierosLargoPlazoAntIfluc,
                    as: 'activosfinancieroslargoplazo_ant'
                },
                {
                    model: OtrosAntIfluc,
                    as: 'otros_ant'
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
    app.get("/reportesIfluc/actual/ByPeriodo/:periodoId", (req, res) => {
        ReportesIfluc.findOne({
            include: [
                {
                    model: EmpresasIfluc,
                    as: 'empresareporteifluc',
                },
                {
                    model: PeriodosIfluc,
                    as: 'periodosreporteifluc',
                },
                {
                    model: ActivoscorrientesIfluc,
                    as: 'activoscorrientesifluc',
                },
                {
                    model: ActividadesdefinanciamientoIfluc,
                    as: 'actividadesdefinanciamientoifluc',
                },
                {
                    model: ActividadesdeinversionIfluc,
                    as: 'actividadesdeinversionifluc',
                },
                {
                    model: ActividadesdeoperacionIfluc,
                    as: 'actividadesdeoperacionifluc',
                },
                {
                    model: ActivosnocorrientesIfluc,
                    as: 'activosnocorrientesifluc',
                },
                {
                    model: ConciliacionIfluc,
                    as: 'conciliacionganancianetaifluc',
                },
                {
                    model: CostosIfluc,
                    as: 'costosifluc',
                },
                {
                    model: EcpIfluc,
                    as: 'ecpifluc',
                },
                {
                    model: GastosadministrativosIfluc,
                    as: 'gastosadministrativosifluc',
                },
                {
                    model: GastosdeventasIfluc,
                    as: 'gastosdeventasifluc',
                },
                {
                    model: GastosfinancierosIfluc,
                    as: 'gastosfinancierosifluc',
                },
                {
                    model: IngresosIfluc,
                    as: 'ingresosifluc',
                },
                {
                    model: OperacionesdiscontinuadasIfluc,
                    as: 'operacionesdiscontinuadasifluc',
                },
                {
                    model: OtrosingresosIfluc,
                    as: 'otrosingresosifluc',
                },
                {
                    model: OtrosgastosIfluc,
                    as: 'otrosgastosifluc',
                },
                {
                    model: OtrosresultadosintegralesIfluc,
                    as: 'otrosresultadosintegralifluc',
                },
                {
                    model: ParticipacioncontroladoraIfluc,
                    as: 'resultadosparticipacioncontroladoraifluc',
                },
                {
                    model: PasivoscorrientesIfluc,
                    as: 'pasivoscorrientesifluc',
                },
                {
                    model: PasivosnocorrientesIfluc,
                    as: 'pasivosnocorrientesifluc',
                },
                {
                    model: PatrimonioIfluc,
                    as: 'patrimonioifluc',
                },
                {
                    model: ResultadosIfluc,
                    as: 'resultadosifluc',
                },
                {
                    model: PerdidasAcumCuentasIncobyDeterioroIfluc,
                    as: 'movperdidasacumuladascuentasincobrablesydeterioro',
                },
                {
                    model: PerdidasAcumValNetRealizyOtrasPerdEnInvIfluc,
                    as: 'movperdidasacumuladasvalornetorealizacion',
                },
                {
                    model: PropiedadesPlantasyEquiposIfluc,
                    as: 'movpropiedadesplantasyequipos'
                },
                {
                    model: PropiedadesDeInversionIfluc,
                    as: 'movpropiedadesdeinversion'
                },
                {
                    model: IntangiblesIfluc,
                    as: 'movintangibles'
                },
                {
                    model: ActivosBiologicosIfluc,
                    as: 'movactivosbiologicos'
                },
                {
                    model: ImpuestosDiferidosIfluc,
                    as: 'movimpuestosdiferidos'
                },
                {
                    model: JubilacionPatronalIfluc,
                    as: 'movjubilacionpatronal'
                },
                {
                    model: DeshaucioIfluc,
                    as: 'deshaucio'
                },
                {
                    model: ActivosFinancierosLargoPlazoIfluc,
                    as: 'activosfinancieroslargoplazo'
                },
                {
                    model: OtrosIfluc,
                    as: 'otros'
                },
            ],
            where: {
                periodoId: req.params.periodoId
            }
        })
            .then(result => {
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
    app.get("/reportesIfluc/:empresa/:periodo", (req, res) => {
        ReportesIfluc.findOne({
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
    app.delete("/reportesIfluc/:id", (req, res) => {
        console.log('req.params.id', req.params.id)
        ReportesIfluc.destroy({where: {reporteId: req.params.id}})
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
    app.post("/reportesifluc", (req, res) => {
        const reporte = req.body.reporte
        ReportesIfluc.findAll({
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
                    ReportesIfluc.update(reporte, {where: {reporteId: resultados[0].reporteId}})
                        .then(result => {
                            res.json(resultados)
                        })
                        .catch(error => {
                            res.status(412).json({msg: error.message});
                        });
                } else {
                    ReportesIfluc.create(reporte)
                        .then(result => {
                            ReportesIfluc.findOne({
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
    app.put("/reportesIfluc", (req, res) => {
        ReportesIfluc.update(req.body.reporte, {
            where: {
                reporteId: req.body.reporte.reporteId
            }})
            .then(result => {
                console.log(result)
                res.json(result)
            })
            .catch(error => {
                console.log(error.response)
                res.status(412).json({msg: error.message});
            });
    })
}
