const Pusher = require('pusher')
const Sequelize = require("sequelize")
const request = require('request')
const nodeMailer = require("nodemailer");
const https = require("https");
const pusher = new Pusher({
    appId: '1086512',
    key: 'd0d2a20a716d5d75f793',
    secret: 'f6ea6fbe0721161ba0e5',
    cluster: 'mt1',
    useTLS: true
});

module.exports = app => {
    const Documentos = app.db.models.Documentos
    const Empresas = app.db.models.Empresas
    const Tags = app.db.models.Tags
    const nodeMailer = require('nodemailer')
    const Op = Sequelize.Op
    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/documentos", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/documentos/cliente", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    attributes: [
                        'idDocumento','clienteId','empresaIdCastor','Tipo','tag','Numero','NumeroAutorizacion','RazonSocialEmisor','fechaEmision','RucEmisor','ImpIva0','ImpIva12','ImpIce','ImporteTotal','ClaveAcceso','origenDocumento','ProductList','AditionalList','RetentionItems'
                    ],
                    include: [
                        {
                            model: Empresas,
                            as: 'detallesempresa',
                            attributes: [
                                'id','nombre','ruc'
                            ]
                        },
                        {model: Tags, as: 'tagsdocument'}
                    ],
                    where: {
                        clienteId: req.query.user
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });


    app.post("/documentos/alldatawithoutxls", (req, res) => {
        // console.log(req.body)
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    attributes: [
                        'idDocumento','clienteId','empresaIdCastor','Tipo','tag','Numero','NumeroAutorizacion','RazonSocialEmisor','fechaEmision','RucEmisor','ImpIva0','ImpIva12','ImpIce','ImporteTotal','ClaveAcceso','origenDocumento','ProductList','AditionalList','RetentionItems','ContribuyenteEspecial',
                        'Descripcion','DireccionComprador','CorreoComprador','TelefonoComprador','DireccionEstablecimiento','DireccionMatriz','DocModificado','Empresa','FechaAutorizacion','GuiaRemision','ICE','IRBPNR','IdentificacionCliente','ImpIva14','ImpNoOnjDeIva','ObligadoContabilidad','Origen','PeriodoFiscal',
                        'Propina','RazonSocialCliente','RazonSocialEmisor','RetentionItems','SubTotalNoObjetoDeIva','SubTotalExentoDeIva','SubTotalIRBPNR','SubTotalIce','SubTotalIva0','SubTotalIva12','SubTotalIva14','TipoDocList','TipoOrigenList','TotalDescuento','TotalSinImp','valorRetIva','valorRetRenta','impNotaDebito','destinatarios','codDocReembolso','fechaEmisionDocSustento','fechaFinTransporte',
                        'fechaIniTransporte','impivaExento','listaDetalleReembolso','listamaquinaFiscal','motivosND','placa','totalBaseImponibleReembolso','totalComprobanteReembolso','totalImpuestoReembolso','baseImponibleReembolso','codDocModificado','Transportista','FormaPago'
                    ],
                    include: [
                        {
                            model: Empresas,
                            as: 'detallesempresa',
                            attributes: [
                                'id','nombre'
                            ]
                        },
                        {model: Tags, as: 'tagsdocument'}
                    ],
                    where: {
                        idDocumento: {
                            [Op.in]: req.body.documentos,
                        },
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });


    app.post("/documentos/alldata", (req, res) => {
        // console.log(req.body)
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [
                        {
                            model: Empresas,
                            as: 'detallesempresa',
                            attributes: [
                                'id','nombre'
                            ]
                        },
                        {model: Tags, as: 'tagsdocument'}
                    ],
                    where: {
                        idDocumento: {
                            [Op.in]: req.body.documentos,
                        },
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });


    app.get("/documentos/documentostotalescliente", (req, res) => {
        Documentos.findAndCountAll({
            attributes: [
                'idDocumento'
            ],
            where: {
                clienteId: req.query.user
            },
            order: [
                ['idDocumento', 'DESC'],
            ]
        })
            .then(result => {
                res.json(result.count)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/byrange", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                let from = new Date(req.body.from)
                let to = new Date(req.body.to)
                let user = req.body.user.id
                // console.log ('de: ' + from + ' a: ' + to + ' quien: ' + user)
                let newfrom = from.getFullYear() + '-' + (((from.getMonth() + 1) < 10)?('0' + (from.getMonth() + 1)):(from.getMonth() + 1)) + '-' + ((from.getDate() < 9)?'0' + from.getDate(): from.getDate())
                //console.log(newfrom)
                let newto = to.getFullYear() + '-' + (((to.getMonth() + 1) < 10)?('0' + (to.getMonth() + 1)):(to.getMonth() + 1)) + '-' + ((to.getDate() < 9)?'0' + to.getDate(): to.getDate())
                // console.log(newto)
                Documentos.findAll({
                    include: [
                        {model: Empresas, as: 'detallesempresa'},
                        {model: Tags, as: 'tagsdocument'}
                    ],
                    where: {
                        clienteId: user,
                        fechaEmision: {
                            [Op.between]: [newfrom, newto]
                        },
                    },
                    order: [
                        ['fechaEmision', 'DESC'],
                    ]
                })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });


    app.post("/documentos/arreglarfecha", (req, res) => {
        Documentos.findAll({
            order: [
                ['fechaEmision', 'DESC'],
            ]
        })
            .then(result => {
                // console.log(result)
                result.forEach((obj) => {
                    let emision = obj.fechaEmision.split('/')
                    let nuevafecha = emision[2] + '-' + emision[1] + '-' + emision[0]
                    const datos = {
                        fechaEmision: nuevafecha
                    }
                    Documentos.update( datos, {
                        where: {
                            idDocumento: obj.idDocumento
                        }
                    })
                    .then(result => {
                        console.log(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
                })
                res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/documentos/byemisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user
                    },
                    group: ['RazonSocialEmisor'],
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });


    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/documentos/facturas", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                // console.log(req.query)
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Factura'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });


    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/facturasEmitidasByEmisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                // console.log('FACTURAS EMITIDAS')
                // console.log(req.body)
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.body.user,
                        empresaIdCastor: req.body.empresa,
                        Tipo: 'Factura',
                        origenDocumento: 'emitidas'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/retencionesEmitidasByEmisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                // console.log('RETENCIONES EMITIDAS')
                // console.log(req.body)
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.body.user,
                        empresaIdCastor: req.body.empresa,
                        Tipo: 'Comprobante de Retención',
                        origenDocumento: 'emitidas'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/liquidacionesEmitidasByEmisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                // console.log('LIQUIDACIONES EMITIDAS')
                // console.log(req.body)
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.body.user,
                        empresaIdCastor: req.body.empresa,
                        Tipo: 'Liquidación de Compra',
                        origenDocumento: 'emitidas'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/debitosEmitidasByEmisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                // console.log('NOTAS DE DEBITO EMITIDAS')
                // console.log(req.body)
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.body.user,
                        empresaIdCastor: req.body.empresa,
                        Tipo: 'Nota de Débito',
                        origenDocumento: 'emitidas'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/creditosEmitidasByEmisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                // console.log('NOTAS DE CRÉDITO EMITIDAS')
                // console.log(req.body)
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.body.user,
                        empresaIdCastor: req.body.empresa,
                        Tipo: 'Nota de Crédito',
                        origenDocumento: 'emitidas'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/guiasEmitidasByEmisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                // console.log('GUIAS DE REMISION EMITIDAS')
                // console.log(req.body)
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.body.user,
                        empresaIdCastor: req.body.empresa,
                        Tipo: 'Guía de Remisión',
                        origenDocumento: 'emitidas'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/documentos/facturas/byemisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                // console.log(req.query)
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Factura'
                    },
                    group: ['RazonSocialEmisor'],
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
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
    app.get("/documentos/:id", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findById(req.params.id)
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
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
    app.delete("/documento/:id", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.destroy({where: {idDocumento: req.params.id}})
                    .then(res => {
                        res.sendStatus(204)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
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
    app.post("/deletebulksdocumentos", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                let registros = req.body
                let borrados = 0
                let fallidos = 0
                registros.forEach((documento) => {
                    Documentos.destroy({where: {idDocumento: documento.idDocumento}})
                        .then(result => {
                            if (result) {
                                borrados++
                            } else {
                                fallidos++
                            }
                            if (borrados === registros.length) {
                                res.json({msg: 'eliminados ' + borrados + ' documentos', code: 1})
                            } else if((borrados + fallidos) === registros.length) {
                                res.json({msg: 'solo se eliminaron ' + borrados + ' documentos de los ' + registros.length + ' solicitados', code: 2})
                            } else if(fallidos === registros.length) {
                                res.json({msg: 'no se eliminaron ninguno de los ' + fallidos + ' documentos solicitados', code: 3 })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            console.log(err.response)
                        })
                })
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
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
    app.put("/documentos", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.update(req.query, {where: {id: req.query.id}})
                    .then(result => {
                        res.json(result)
                        //res.sendStatus(204)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    })

    /**
     * @api {get} /nuevasolicitud Crea un nuevo pedido
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} pedido Descripción del pedido realizado
     * @apiParam {String} address Dirección de entrega del pedido
     * @apiParam {String} latitud Coordenadas de latitud del cliente
     * @apiParam {String} longitud Coordenadas de longitud del cliente
     * @apiParam {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiParam {Number} cliente ID del cliente que solicita el pedido
     * @apiParam {Boolean} done Status del pedido, por defecto se establece en false
     * @apiParam {Date} updatedAt Fecha de la última modificación del pedido
     * @apiParam {Date} createdAt Fecha de creación del pedido
     * @apiParamExample {json} Input
     *{
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiSuccess {Number} id ID del pedido que se acaba de generar
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                let documents = req.body
                let resultados = {
                    ingresados: 0,
                    rechazados: 0
                }
                documents.forEach((obj) => {
                    Documentos.findAndCountAll({
                        where: {
                            Tipo: obj.Tipo,
                            RazonSocialEmisor: obj.RazonSocialEmisor,
                            RazonSocialCliente: obj.RazonSocialCliente,
                            Numero: obj.Numero
                        }
                    })
                        .then(result => {
                            if (result.count === 0) {
                                const documento = {
                                    AditionalList: JSON.stringify(obj.AditionalList),
                                    ClaveAcceso: obj.ClaveAcceso,
                                    ContribuyenteEspecial: obj.ContribuyyenteEspecial,
                                    Descripcion: obj.Descripcion,
                                    DireccionComprador: obj.DireccionComprador,
                                    DireccionEstablecimiento: obj.DireccionEstablecimiento,
                                    DireccionMatriz: obj.DireccionMatriz,
                                    DocModificado: obj.DocModificado,
                                    Empresa: obj.Empresa,
                                    FechaAutorizacion: obj.FechaAutorizacion,
                                    GuiaRemision: obj.GuiaRemision,
                                    ICE: obj.ICE,
                                    IRBPNR: obj.IRBPNR,
                                    IdentificacionCliente: obj.IdentificacionCliente,
                                    ImpIce: obj.ImpIce,
                                    ImpIva0: obj.ImpIva0,
                                    ImpIva12: obj.ImpIva12,
                                    ImpIva14: obj.ImpIva14,
                                    ImporteTotal: obj.ImporteTotal,
                                    Numero: obj.Numero,
                                    NumeroAutorizacion: obj.NumeroAutorizacion,
                                    ObligadoContabilidad: obj.ObligadoContabilidad,
                                    Origen: obj.Origen,
                                    PeriodoFiscal: obj.PeriodoFiscal,
                                    ProductList: JSON.stringify(obj.ProductList),
                                    Propina: obj.Propina,
                                    RazonSocialCliente: obj.RazonSocialCliente,
                                    RazonSocialEmisor: obj.RazonSocialEmisor,
                                    RetentionItems: JSON.stringify(obj.RetentionItems),
                                    RucEmisor: obj.RucEmisor,
                                    SubTotalExentoDeIva: obj.SubTotalExentoDeIva,
                                    SubTotalNoObjetoDeIva: obj.SubTotalNoObjetoDeIva,
                                    Tipo: obj.Tipo,
                                    TipoDocList: obj.TipoDocList,
                                    TipoOrigenList: obj.TipoOrigenList,
                                    TotalDescuento: obj.TotalDescuento,
                                    TotalSinImp: obj.TotalSinImp,
                                    clienteId: obj.clienteId,
                                    empresaIdCastor: obj.empresaIdCastor,
                                    fechaEmision: obj.fechaEmision,
                                    id_empresa: obj.id_empresa,
                                    valorRetIva: obj.valorRetIva,
                                    valorRetRenta: obj.valorRetRenta,
                                    origenDocumento: obj.origenDocumento,
                                    docXML:(obj.docXML)?obj.docXML:obj.Xml,
                                    destinatarios: JSON.stringify(obj.destinatarios),
                                    tag: 5,
                                    Estado: (obj.Estado)?obj.Estado:'',
                                    SubTotalIva12: (obj.SubTotalIva12)?obj.SubTotalIva12:'',
                                    SubTotalIva14: (obj.SubTotalIva14)?obj.SubTotalIva14:'',
                                    SubTotalIva0: (obj.SubTotalIva0)?obj.SubTotalIva0:'',
                                }
                                Documentos.create(documento)
                                    .then(result => {
                                        resultados.ingresados = resultados.ingresados + 1
                                        if((resultados.ingresados + resultados.rechazados) == documents.length){
                                            res.json(resultados)
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        resultados.rechazados = resultados.rechazados + 1
                                        if((resultados.ingresados + resultados.rechazados) == documents.length){
                                            res.json(resultados)
                                        }
                                    });
                            } else {
                                let response = result.rows
                                response.forEach((row) => {
                                    let identificacion = row.IdentificacionCliente
                                    let cedula = identificacion.substring(0, 10)
                                    if (cedula == obj.IdentificacionCliente) {
                                        const documento = {
                                            AditionalList: JSON.stringify(obj.AditionalList),
                                            ClaveAcceso: obj.ClaveAcceso,
                                            ConstribuyenteEspecial: obj.ContribuyyenteEspecial,
                                            Descripcion: obj.Descripcion,
                                            DireccionComprador: obj.DireccionComprador,
                                            DireccionEstablecimiento: obj.DireccionEstablecimiento,
                                            DireccionMatriz: obj.DireccionMatriz,
                                            DocModificado: obj.DocModificado,
                                            Empresa: obj.Empresa,
                                            FechaAutorizacion: obj.FechaAutorizacion,
                                            GuiaRemision: obj.GuiaRemision,
                                            ICE: obj.ICE,
                                            IRBPNR: obj.IRBPNR,
                                            IdentificacionCliente: obj.IdentificacionCliente,
                                            ImpIce: obj.ImpIce,
                                            ImpIva0: obj.ImpIva0,
                                            ImpIva12: obj.ImpIva12,
                                            ImporteTotal: obj.ImporteTotal,
                                            Numero: obj.Numero,
                                            NumeroAutorizacion: obj.NumeroAutorizacion,
                                            ObligadoContabilidad: obj.ObligadoContabilidad,
                                            Origen: obj.Origen,
                                            PeriodoFiscal: obj.PeriodoFiscal,
                                            ProductList: JSON.stringify(obj.ProductList),
                                            Propina: obj.Propina,
                                            RazonSocialCliente: obj.RazonSocialCliente,
                                            RazonSocialEmisor: obj.RazonSocialEmisor,
                                            RetentionItems: JSON.stringify(obj.RetentionItems),
                                            RucEmisor: obj.RucEmisor,
                                            SubTotalExentoDeIva: obj.SubTotalExentoDeIva,
                                            SubTotalNoObjetoDeIva: obj.SubTotalNoObjetoDeIva,
                                            Tipo: obj.Tipo,
                                            TipoDocList: obj.TipoDocList,
                                            TipoOrigenList: obj.TipoOrigenList,
                                            TotalDescuento: obj.TotalDescuento,
                                            TotalSinImp: obj.TotalSinImp,
                                            clienteId: obj.clienteId,
                                            empresaIdCastor: obj.empresaIdCastor,
                                            fechaEmision: obj.fechaEmision,
                                            id_empresa: obj.id_empresa,
                                            valorRetIva: obj.valorRetIva,
                                            valorRetRenta: obj.valorRetRenta,
                                            origenDocumento: obj.origenDocumento,
                                            docXML:(obj.docXML)?obj.docXML:obj.Xml,
                                            destinatarios: JSON.stringify(obj.destinatarios)
                                        }
                                        Documentos.create(documento)
                                            .then(result => {
                                                resultados.ingresados = resultados.ingresados + 1
                                                if((resultados.ingresados + resultados.rechazados) == documents.length){
                                                    res.json(resultados)
                                                }
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                resultados.rechazados = resultados.rechazados + 1
                                                if((resultados.ingresados + resultados.rechazados) == documents.length){
                                                    res.json(resultados)
                                                }
                                            });
                                    } else {
                                        resultados.rechazados++
                                        if ((resultados.ingresados + resultados.rechazados) == documents.length) {
                                            res.json(resultados)
                                        }
                                    }
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(412).json({msg: error.message});
                        });
                })
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    })

    /**
     * @api {get} /buscardeliverers Genera una matriz con los repartidores activos en la ciudad
     * @apiGroup Deliverers
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} ciudad Ciudad donde se quiere recuperar a los deliverers
     * @apiParamExample {json} Input
     *{
     *    "ciudad": Quito
     * }
     * @apiSuccess {String} nombres Nombres de usuario
     * @apiSuccess {String} cedula Cédula de Identidad del usuario
     * @apiSuccess {String} celular Número de teléfono celular del usuario
     * @apiSuccess {String} direccion Dirección fiscal del usuario para las facturas
     * @apiSuccess {String} ciudad Ciudad de registro del deliverer
     * @apiSuccess {String} email Correo electrónico del usuario
     * @apiSuccess {String} password Password del usuario
     * @apiSuccess {String} avatar Avatar identificativo del usuario
     * @apiSuccess {String} facebook Si el registro se realizo desde facebook login
     * @apiSuccess {String} push Código para notificaciones Push
     * @apiSuccess {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiSuccess {String} version Version de la app con la cual se regsitra el usuario
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del deliverer
     * @apiSuccess {Date} createdAt Fecha de creación del deliverer
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "nombres": "raul",
     *    "cedula": "Raúl Castro",
     *    "celular": "raul@castro.net",
     *    "direccion": "123456",
     *    "ciudad": "Quito",
     *    "email": "raul@hotmail.com",
     *    "password": "12345",
     *    "avatar": "https://goubi.aplios.net/perfil.png",
     *    "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "version": "0.0.0"
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/notificar", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                let message = {
                    app_id: "7fd48813-65dd-43dd-b429-b2b1d61b559d",
                    headings: {"en": req.query.titulo},
                    contents: {"en": req.query.mensaje},
                    include_player_ids: [req.query.to]
                };

                // sendNotification(message);
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /buscardeliverers Genera una matriz con los repartidores activos en la ciudad
     * @apiGroup Deliverers
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} ciudad Ciudad donde se quiere recuperar a los deliverers
     * @apiParamExample {json} Input
     *{
     *    "ciudad": Quito
     * }
     * @apiSuccess {String} nombres Nombres de usuario
     * @apiSuccess {String} cedula Cédula de Identidad del usuario
     * @apiSuccess {String} celular Número de teléfono celular del usuario
     * @apiSuccess {String} direccion Dirección fiscal del usuario para las facturas
     * @apiSuccess {String} ciudad Ciudad de registro del deliverer
     * @apiSuccess {String} email Correo electrónico del usuario
     * @apiSuccess {String} password Password del usuario
     * @apiSuccess {String} avatar Avatar identificativo del usuario
     * @apiSuccess {String} facebook Si el registro se realizo desde facebook login
     * @apiSuccess {String} push Código para notificaciones Push
     * @apiSuccess {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiSuccess {String} version Version de la app con la cual se regsitra el usuario
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del deliverer
     * @apiSuccess {Date} createdAt Fecha de creación del deliverer
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "nombres": "raul",
     *    "cedula": "Raúl Castro",
     *    "celular": "raul@castro.net",
     *    "direccion": "123456",
     *    "ciudad": "Quito",
     *    "email": "raul@hotmail.com",
     *    "password": "12345",
     *    "avatar": "https://goubi.aplios.net/perfil.png",
     *    "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "version": "0.0.0"
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/sendDocument", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                let transporter = nodeMailer.createTransport({
                    host: 'smtp.elasticemail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        // should be replaced with real sender's account
                        user: 'info@facilcontabilidad.com',
                        pass: 'CC9800D31C6435095E42E5BEA7CC710B4191'
                    }
                });
                let pdf = req.body.send.documento
                let pdfformat = pdf.replace("data:application/pdf;filename=generated.pdf;base64,",'')
                let message = {
                    from: 'CastorX <info@juassic.com>',
                    // Comma separated list of recipients
                    to: req.body.send.email,

                    // Subject of the message
                    subject: 'Nuevo comprobante electrónico: ' + req.body.send.datos.Tipo + ' ' + req.body.send.datos.Numero + ' ✔' + ' Fecha: ' + Date.now(),

                    // HTML body
                    html: `<p>Estimados</p><br/><p>Adjuntamos nuevo comprobante electrónico: `  + req.body.send.datos.Tipo + ` Nro.: ` + req.body.send.datos.Numero +`</p><p>El Equipo de Castor X</p><p><img src="https://juassic.com/castor.png" width="150px"/></p>`,


                    attachments: [

                        {
                            filename: req.body.send.datos.Numero + '.pdf',
                            content: Buffer.from(
                                pdfformat,
                                'base64'
                            ),

                            cid: 'juassic25@gmail.com' // should be as unique as possible
                        },
                        {
                            filename: req.body.send.datos.Numero + '.xml',
                            content: req.body.docXML,
                            contentType: 'text/xml'
                        },
                        // File Stream attachment
                        {
                            filename: 'castor.png',
                            // path: __dirname + '/nyan.gif',
                            path: 'https://juassic.com/castor.png',
                            cid: 'info@juassic.com' // should be as unique as possible
                        }
                    ],

                    list: {
                        // List-Help: <mailto:admin@example.com?subject=help>
                        help: 'info@juassic.com?subject=help',

                        // List-Unsubscribe: <http://example.com> (Comment)
                        unsubscribe: [
                            {
                                url: 'http://goubi.aplios.net/unsubscribe',
                                comment: 'No deseo recibir mas este email'
                            },
                            'unsubscribe@juassic.com'
                        ],

                        // List-ID: "comment" <example.com>
                        id: {
                            url: 'mylist.example.com',
                            comment: 'Esta es mi increible lista'
                        }
                    }
                }
                transporter.sendMail(message, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    res.json(info.response)
                });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /buscardeliverers Genera una matriz con los repartidores activos en la ciudad
     * @apiGroup Deliverers
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} ciudad Ciudad donde se quiere recuperar a los deliverers
     * @apiParamExample {json} Input
     *{
     *    "ciudad": Quito
     * }
     * @apiSuccess {String} nombres Nombres de usuario
     * @apiSuccess {String} cedula Cédula de Identidad del usuario
     * @apiSuccess {String} celular Número de teléfono celular del usuario
     * @apiSuccess {String} direccion Dirección fiscal del usuario para las facturas
     * @apiSuccess {String} ciudad Ciudad de registro del deliverer
     * @apiSuccess {String} email Correo electrónico del usuario
     * @apiSuccess {String} password Password del usuario
     * @apiSuccess {String} avatar Avatar identificativo del usuario
     * @apiSuccess {String} facebook Si el registro se realizo desde facebook login
     * @apiSuccess {String} push Código para notificaciones Push
     * @apiSuccess {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiSuccess {String} version Version de la app con la cual se regsitra el usuario
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del deliverer
     * @apiSuccess {Date} createdAt Fecha de creación del deliverer
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "nombres": "raul",
     *    "cedula": "Raúl Castro",
     *    "celular": "raul@castro.net",
     *    "direccion": "123456",
     *    "ciudad": "Quito",
     *    "email": "raul@hotmail.com",
     *    "password": "12345",
     *    "avatar": "https://goubi.aplios.net/perfil.png",
     *    "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "version": "0.0.0"
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/sendBulkDocumentByEmail", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                let transporter = nodeMailer.createTransport({
                    host: 'smtp.elasticemail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        // should be replaced with real sender's account
                        user: 'info@facilcontabilidad.com',
                        pass: 'CC9800D31C6435095E42E5BEA7CC710B4191'
                    }
                });
                let pdf = req.body.send.documento
                let pdfformat = pdf.replace("data:application/pdf;filename=generated.pdf;base64,",'')
                let message = {
                    from: 'CastorX <info@juassic.com>',
                    // Comma separated list of recipients
                    to: req.body.send.email,

                    // Subject of the message
                    subject: 'Nuevo comprobante electrónico ✔' + ' Fecha: ' + Date.now(),

                    // HTML body
                    html: `<p>Estimados</p><br/><p>Adjuntamos nuevo comprobante electrónico<p>El Equipo de Castor X</p><p><img src="https://juassic.com/castor.png" width="150px"/></p>`,


                    attachments: [

                        {
                            filename: 'documentos.pdf',
                            content: Buffer.from(
                                pdfformat,
                                'base64'
                            ),

                            cid: 'juassic25@gmail.com' // should be as unique as possible
                        },
                        {
                            filename: 'documento.xml',
                            content: req.body.docXML,
                            contentType: 'text/xml'
                        }
                    ],

                    list: {
                        // List-Help: <mailto:admin@example.com?subject=help>
                        help: 'info@juassic.com?subject=help',

                        // List-Unsubscribe: <http://example.com> (Comment)
                        unsubscribe: [
                            {
                                url: 'http://goubi.aplios.net/unsubscribe',
                                comment: 'No deseo recibir mas este email'
                            },
                            'unsubscribe@juassic.com'
                        ],

                        // List-ID: "comment" <example.com>
                        id: {
                            url: 'mylist.example.com',
                            comment: 'Esta es mi increible lista'
                        }
                    }
                }
                transporter.sendMail(message, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    res.json(info.response)
                });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/comprobanteretencion", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Comprobante de Retención'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/comprobanteretencion/byemisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Comprobante de Retención'
                    },
                    group: ['RazonSocialEmisor'],
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/liquidacion", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Liquidación de Compra'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/liquidacion/byemisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Liquidación de Compra'
                    },
                    group: ['RazonSocialEmisor'],
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/credito", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Nota de Crédito'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/documentos/credito/byemisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Nota de Crédito'
                    },
                    group: ['RazonSocialEmisor'],
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/debito", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Nota de Débito'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/documentos/debito/byemisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Nota de Débito'
                    },
                    group: ['RazonSocialEmisor'],
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/documentos/remision", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Guía de Remisión'
                    },
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/documentos/remision/byemisor", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Documentos.findAll({
                    include: [{model: Empresas, as: 'detallesempresa'}],
                    where: {
                        clienteId: req.query.user,
                        Tipo: 'Guía de Remisión'
                    },
                    group: ['RazonSocialEmisor'],
                    order: [
                        ['idDocumento', 'DESC'],
                    ]
                })
                    .then(result => res.json(result))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/documentosByUser", (req, res) => {
        Documentos.findAll({
            attributes: ["clienteId", [Sequelize.fn('COUNT', 'id'), 'DocumentsCount']],
            group: ['clienteId']
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })

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
    app.post("/documentos/addBulkTagDocument", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                let docs = req.body.documents
                let resultados = []
                let tag = {
                    tag: req.body.tag.idTag
                }
                docs.forEach((obj) => {
                    Documentos.update(tag, { where: {idDocumento: obj.idDocumento}})
                        .then(result => {
                            resultados.push(result)
                            if(resultados.length === req.body.documents.length) {
                                res.json(resultados)
                            }
                        })
                        .catch(error => {
                            res.status(412).json({msg: error.message});
                        });
                })

            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    })

    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/facturasByCompany", (req, res) => {
        Documentos.findAll({
            where: {
                empresaIdCastor: req.body.empresa,
                Tipo: 'Factura'
            },
            order: [
                ['idDocumento', 'DESC'],
            ]
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })

    app.route("/documentos/savedocelectronico")
        .post((req, res) => {
            console.log(req.body.documento)
        })

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
    app.route("/documentos/crearfactura")
        .post((req, res) => {
            console.log('BODY', req.body)
            const datos = {
                invoice: req.body.facturasri.factura,
                user: req.body.facturasri.usuario,
                password: req.body.facturasri.password
            }
            let options = {
                'method': 'POST',
                'url': 'http://181.39.212.133/RestInvoiceIntegration/operation/InsertInvoice',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            };
            request(options, function (error, response) {
                if (error) throw new Error(error)
                if (response.body.length > 0) {
                    let respuesta = JSON.parse(response.body)
                    console.log(respuesta)
                    if (respuesta && respuesta.Sucessful) {
                        res.json(respuesta)
                    } else {
                        res.status(412).json({msg: respuesta.data})
                    }
                } else {
                    res.status(412).json({msg: 'Imposible crear el documento debido a un error desconocido'})
                }
            })
        })

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
    app.route("/documentos/crearretencion")
        .post((req, res) => {
            console.log(req.body)
            const datos = {
                retention: req.body.retencionsri.retencion,
                user: req.body.retencionsri.usuario,
                password: req.body.retencionsri.password
            }
            let options = {
                'method': 'POST',
                'url': 'http://181.39.212.133/RestInvoiceIntegration/operation/InsertRetention',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            };
            request(options, function (error, response) {
                console.log(response.body)
                if (error) throw new Error(error)
                if (response.body.length > 0) {
                    let respuesta = JSON.parse(response.body)
                    // console.log(respuesta)
                    res.json(respuesta)
                } else {
                    res.status(412).json({msg: 'Imposible crear el documento debido a un error desconocido'})
                }
            });
        })

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
    app.route("/documentos/crearnotadebito")
        .post((req, res) => {
            console.log(req.body)
            const datos = {
                debitNote: req.body.nota.documento,
                user: req.body.nota.usuario,
                password: req.body.nota.password
            }
            let options = {
                'method': 'POST',
                'url': 'http://181.39.212.133/RestInvoiceIntegration/operation/InsertDebitNote',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            };
            request(options, function (error, response) {
                console.log(response.body)
                if (error) throw new Error(error)
                if (response.body.length > 0) {
                    let respuesta = JSON.parse(response.body)
                    // console.log(respuesta)
                    if (respuesta && respuesta.Sucessful) {
                        res.json(respuesta)
                    } else {
                        res.status(412).json({msg: respuesta.data})
                    }
                } else {
                    res.status(412).json({msg: 'Imposible crear el documento debido a un error desconocido'})
                }
            });
        })

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
    app.route("/documentos/crearnotacredito")
        .post((req, res) => {
            console.log(req.body)
            const datos = {
                creditNote: req.body.nota.documento,
                user: req.body.nota.usuario,
                password: req.body.nota.password
            }
            let options = {
                'method': 'POST',
                'url': 'http://181.39.212.133/RestInvoiceIntegration/operation/InsertCreditNote',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            };
            request(options, function (error, response) {
                console.log(response.body)
                if (error) throw new Error(error)
                if (response.body.length > 0) {
                    let respuesta = JSON.parse(response.body)
                    // console.log(respuesta)
                    if (respuesta && respuesta.Sucessful) {
                        res.json(respuesta)
                    } else {
                        res.status(412).json({msg: respuesta.data})
                    }
                } else {
                    res.status(412).json({msg: 'Imposible crear el documento debido a un error desconocido'})
                }
            });
        })

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
    app.route("/documentos/crearliquidacion")
        .post((req, res) => {
            console.log(req.body)
            const datos = {
                purchaseLiquidation: req.body.liquidacion.documento,
                user: req.body.liquidacion.usuario,
                password: req.body.liquidacion.password
            }
            let options = {
                'method': 'POST',
                'url': 'http://181.39.212.133/RestInvoiceIntegration/operation/InsertPurchaseLiquidation',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            };
            request(options, function (error, response) {
                console.log(response.body)
                if (error) throw new Error(error)
                if(response.body.length > 0) {
                    let respuesta = JSON.parse(response.body)
                    if (response.body.length > 0) {
                        let respuesta = JSON.parse(response.body)
                        // console.log(respuesta)
                        if (respuesta && respuesta.Sucessful) {
                            res.json(respuesta)
                        } else {
                            res.status(412).json({msg: respuesta.data})
                        }
                    } else {
                        res.status(412).json({msg: 'Imposible crear el documento debido a un error desconocido'})
                    }
                } else {
                    res.status(412).json({msg: 'imposible crear el documento solicitado debido a razones desconocidas, por favor intentalo de nuevo'})
                }
            });
        })

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
    app.route("/documentos/crearguiaremision")
        .post((req, res) => {
            console.log(req.body)
            const datos = {
                guide: req.body.guia.guiaderemision,
                user: req.body.guia.usuario,
                password: req.body.guia.password
            }
            let options = {
                'method': 'POST',
                'url': 'http://181.39.212.133/RestInvoiceIntegration/operation/InsertGuide',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            };
            request(options, function (error, response) {
                console.log(response.body)
                if (error) throw new Error(error)
                if (response.body.length > 0) {
                    let respuesta = JSON.parse(response.body)
                    // console.log(respuesta)
                    if (respuesta && respuesta.Sucessful) {
                        res.json(respuesta)
                    } else {
                        res.status(412).json({msg: respuesta.data})
                    }
                } else {
                    res.status(412).json({msg: 'Imposible crear el documento debido a un error desconocido'})
                }
            });
        })

    app.post("/documentos/chequearstatusdocumento", (req, res) => {
        Documentos.findAll({
            include: [{model: Empresas, as: 'detallesempresa'}],
            where: {
                origenDocumento: 'emitidas',
                Estado: {
                    [Op.in]: ['CREADA','creada']
                },
            },
            order: [
                ['idDocumento', 'DESC'],
            ]
        })
            .then(result => {
                if (result.length > 0) {
                    result.forEach((obj) => {
                        let tipo = ''
                        if (obj.Tipo === 'Factura') {
                            tipo = '01'
                        }
                        if (obj.Tipo === 'Comprobante de Retención') {
                            tipo = '07'
                        }
                        if (obj.Tipo === 'Liquidación de Compra') {
                            tipo = '03'
                        }
                        if (obj.Tipo === 'Nota de Débito') {
                            tipo = '05'
                        }
                        if (obj.Tipo === 'Nota de Crédito') {
                            tipo = '04'
                        }
                        if (obj.Tipo === 'Guía de Remisión') {
                            tipo = '06'
                        }
                        const datos = {
                            accessKey: obj.ClaveAcceso,
                            type: tipo,
                            user: "yrsuarez@gmail.com",
                            password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
                        }
                        let options = {
                            'method': 'POST',
                            'url': 'http://181.39.212.133/RestInvoiceIntegration/operation/GetDocState',
                            'headers': {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(datos)
                        };
                        request(options, function (error, response) {
                            console.log(response.body)
                            if (error) throw new Error(error)
                            if(response.body.length > 0) {
                                let respuesta = JSON.parse(response.body)
                                if (respuesta) {
                                    let estado = ''
                                    if (respuesta.history) {
                                        respuesta.history.forEach((item) => {
                                            estado = item.state
                                        })
                                    }

                                    const documento = {
                                      docXML: respuesta.xml,
                                      Estado: estado,
                                      Historial: JSON.stringify(respuesta.history)
                                    }
                                    Documentos.update(documento, {
                                      where: {
                                        idDocumento: obj.idDocumento
                                      }
                                    })
                                    .then(result => {
                                      console.log(result)
                                    })
                                    .catch(error => {
                                      res.status(401).json({msg: error.message})
                                    })
                                }
                            } else {
                                res.status(412).json({msg: respuesta.data})
                            }
                        })
                    })

                }
                // res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })

    app.post("/documentos/statusdocumentosri", (req, res) => {
        const datos = {
            accessKey: req.body.factura.autorizacion,
            type: req.body.factura.tipo, // '01'
            user: "yrsuarez@gmail.com",
            password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
        }
        let options = {
            'method': 'POST',
            'url': 'http://181.39.212.133/RestInvoiceIntegration/operation/GetDocState',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        };
        request(options, function (error, response) {
            console.log(response.body)
            if (error) throw new Error(error)
            if(response && response.body.length > 0) {
                let respuesta = JSON.parse(response.body)
                if (respuesta) {
                    let estado = ''
                    if (respuesta.history) {
                        respuesta.history.forEach((item) => {
                            estado = item.state
                        })
                    }

                    const documento = {
                        docXML: respuesta.xml,
                        Estado: estado,
                        Historial: JSON.stringify(respuesta.history)
                    }
                    res.json(documento)
                    /*
                    Documentos.update(documento, {
                        where: {
                            idDocumento: obj.idDocumento
                        }
                    })
                        .then(result => {
                            console.log(result)
                        })
                        .catch(error => {
                            res.status(401).json({msg: error.message})
                        })
                    */
                }
            } else {
                res.status(412).json({msg: respuesta.data})
            }
        })
    })

    app.post("/documentos/statusfacturasventassri", (req, res) => {

         const datos = {
            accessKey: req.body.ClaveAcceso, // '1108202201179250235700110010010000000011234567810', // obj.ClaveAcceso,
            type: '01', // tipo,
            user: "yrsuarez@gmail.com",
            password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
        }
        let options = {
            'method': 'POST',
            'url': 'http://181.39.212.133/RestInvoiceIntegration/operation/GetDocState',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        };
        request(options, function (error, response) {
            console.log(response.body)
            if (error) throw new Error(error)
            if(response.body.length > 0) {
                let respuesta = JSON.parse(response.body)
                if (respuesta) {
                    let estado = ''
                    if (respuesta.history) {
                        respuesta.history.forEach((item) => {
                            estado = item.state
                        })
                    }

                    const documento = {
                        docXML: respuesta.xml,
                        Estado: estado,
                        Historial: JSON.stringify(respuesta.history)
                    }

                    res.json(documento)
                    /*
                    Documentos.update(documento, {
                        where: {
                            idDocumento: obj.idDocumento
                        }
                    })
                        .then(result => {
                            console.log(result)
                        })
                        .catch(error => {
                            res.status(401).json({msg: error.message})
                        })
                    */
                }
            } else {
                res.status(412).json({msg: respuesta.data})
            }
        })
    })

    // GEMSA 360 //////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * @api {get} /buscardeliverers Genera una matriz con los repartidores activos en la ciudad
     * @apiGroup Deliverers
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} ciudad Ciudad donde se quiere recuperar a los deliverers
     * @apiParamExample {json} Input
     *{
     *    "ciudad": Quito
     * }
     * @apiSuccess {String} nombres Nombres de usuario
     * @apiSuccess {String} cedula Cédula de Identidad del usuario
     * @apiSuccess {String} celular Número de teléfono celular del usuario
     * @apiSuccess {String} direccion Dirección fiscal del usuario para las facturas
     * @apiSuccess {String} ciudad Ciudad de registro del deliverer
     * @apiSuccess {String} email Correo electrónico del usuario
     * @apiSuccess {String} password Password del usuario
     * @apiSuccess {String} avatar Avatar identificativo del usuario
     * @apiSuccess {String} facebook Si el registro se realizo desde facebook login
     * @apiSuccess {String} push Código para notificaciones Push
     * @apiSuccess {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiSuccess {String} version Version de la app con la cual se regsitra el usuario
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del deliverer
     * @apiSuccess {Date} createdAt Fecha de creación del deliverer
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "nombres": "raul",
     *    "cedula": "Raúl Castro",
     *    "celular": "raul@castro.net",
     *    "direccion": "123456",
     *    "ciudad": "Quito",
     *    "email": "raul@hotmail.com",
     *    "password": "12345",
     *    "avatar": "https://goubi.aplios.net/perfil.png",
     *    "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "version": "0.0.0"
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/sendDocumentByGemsa", (req, res) => {
        console.log(req.body)
        let transporter = nodeMailer.createTransport({
            host: 'smtp.elasticemail.com',
            port: 465,
            secure: true,
            auth: {
                // should be replaced with real sender's account
                user: 'info@facilcontabilidad.com',
                pass: 'CC9800D31C6435095E42E5BEA7CC710B4191'
            }
        });
        let message = {
            from: 'GEMSA360 <info@gemsa.com>',
            // Comma separated list of recipients
            to: req.body.email,
            // Subject of the message
            subject: req.body.subject + ' ✔' + ' Fecha: ' + Date.now(),
            // HTML body
            html: `${req.body.message}` +`</p><p>El Equipo de Gemsa360</p><p><img src="https://juassic.com/gemsa.png" width="150px"/></p>`,

        }
        transporter.sendMail(message, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Mensaje %s enviado: %s', info.messageId, info.response);
            res.json(info.response)
        });
    });

    app.post("/checkoutIdDatafast", (req, res) => {

        let headers = {
            'Authorization': 'Bearer OGFjZGE0Y2I4MWFlODMyMjAxODFiYzE2NDZjZTQ5ZDV8and5ZWFyMmZnYw=='
        };

        let peticion = `/v1/checkouts`
        peticion += `?entityId=8acda4cb81ae83220181bc182d9749d9`
        peticion += `&amount=${req.body.data.amount}`
        peticion += `&currency=${req.body.data.currency}`
        peticion += `&paymentType=${req.body.data.paymentType}`
        peticion += `&customer.givenName=${req.body.data.primerNombre}`
        peticion += `&customer.middleName=${req.body.data.segundoNombre}`
        peticion += `&customer.surname=${req.body.data.apellidos}`
        peticion += `&customer.ip=${req.body.data.ip}`
        peticion += `&customer.merchantCustomerId=${req.body.data.identificacionCliente}`
        peticion += `&merchantTransactionId=${req.body.data.transaccionIdFC}`
        peticion += `&customer.email=${req.body.data.email}`
        peticion += `&customer.identificationDocType=IDCARD`
        peticion += `&customer.identificationDocId=${req.body.data.cedula}`
        peticion += `&customer.phone=${req.body.data.telefono}`
        peticion += `&billing.street1=${req.body.data.direccion}`
        peticion += `&billing.country=${req.body.data.pais}`
        peticion += `&billing.postcode=${req.body.data.codigoPostal}`
        peticion += `&shipping.street1=${req.body.data.direccion}`
        peticion += `&shipping.country=${req.body.data.pais}`

        if (req.body.data.pagorecurrente) {
            peticion += `&risk.parameters[USER_DATA1]=REPEATED`
            peticion += `&risk.parameters[USER_DATA2]=PagoRapidoDF`
            peticion += `&recurringType=REPEATED`
        } else {
            peticion += `&risk.parameters[USER_DATA2]=FACILCONTABILIDAD`
        }

        peticion += `&customParameters[SHOPPER_MID]=${req.body.data.idComercio}`
        peticion += `&customParameters[SHOPPER_TID]=${req.body.data.idTerminal}`
        peticion += `&customParameters[SHOPPER_ECI]=${req.body.data.idSeguridad}`
        peticion += `&customParameters[SHOPPER_PSERV]=${req.body.data.idProveedor}`
        peticion += `&customParameters[SHOPPER_VAL_BASE0]=0.00`
        peticion += `&customParameters[SHOPPER_VAL_BASEIMP]=${req.body.data.valorSinImpuesto}`
        peticion += `&customParameters[SHOPPER_VAL_IVA]=${req.body.data.iva}`

        if (req.body.data.registrations) {
            req.body.data.registrations.forEach((obj, index) => {
                peticion += `&registrations[${index}].id=${obj.token}`
            })
        }

        req.body.data.productos.forEach((obj, index) => {
            peticion += `&cart.items[${index}].name=${obj.nombre}`
            peticion += `&cart.items[${index}].description=Descripcion: ${obj.descripcion}`
            peticion += `&cart.items[${index}].price=${req.body.data.amount}`
            peticion += `&cart.items[${index}].quantity=1.00`
        })

        peticion += `&customParameters[SHOPPER_VERSIONDF]=2`
        // peticion += `&testMode=EXTERNAL`

        console.log('peticion: ', encodeURI(peticion))

        let options = {
            // hostname: "eu-test.oppwa.com",
            hostname: 'eu-prod.oppwa.com',
            port: 443,
            path: encodeURI(peticion),
            method: "POST",
            headers: headers,
            maxRedirects: 20
        };

        const https = require('https');
        let request = https.request(options, function(response) {
            let chunks = [];

            response.on("data", function (chunk) {
                chunks.push(chunk);
                // console.log(JSON.parse(chunk))
                res.json(JSON.parse(chunk))
            });

            response.on("end", function (chunk) {
                let body = Buffer.concat(chunks);
                // console.log(body.toString())
            });

            response.on("error", function (error) {
                console.error(error);
            });
        });

        request.end();


    });

    app.post("/checkoutIdDatafastDev", (req, res) => {

        let headers = {
            'Authorization': 'Bearer OGE4Mjk0MTg1YTY1YmY1ZTAxNWE2YzhjNzI4YzBkOTV8YmZxR3F3UTMyWA=='
        };

        let peticion = `/v1/checkouts`
        peticion += `?entityId=8ac7a4c981151a7a0181166a8b39026b`
        peticion += `&amount=${req.body.data.amount}`
        peticion += `&currency=${req.body.data.currency}`
        peticion += `&paymentType=${req.body.data.paymentType}`
        peticion += `&customer.givenName=${req.body.data.primerNombre}`
        peticion += `&customer.middleName=${req.body.data.segundoNombre}`
        peticion += `&customer.surname=${req.body.data.apellidos}`
        peticion += `&customer.ip=${req.body.data.ip}`
        peticion += `&customer.merchantCustomerId=${req.body.data.identificacionCliente}`
        peticion += `&merchantTransactionId=${req.body.data.transaccionIdFC}`
        peticion += `&customer.email=${req.body.data.email}`
        peticion += `&customer.identificationDocType=IDCARD`
        peticion += `&customer.identificationDocId=${req.body.data.cedula}`
        peticion += `&customer.phone=${req.body.data.telefono}`
        peticion += `&billing.street1=${req.body.data.direccion}`
        peticion += `&billing.country=${req.body.data.pais}`
        peticion += `&billing.postcode=${req.body.data.codigoPostal}`
        peticion += `&shipping.street1=${req.body.data.direccion}`
        peticion += `&shipping.country=${req.body.data.pais}`

        if (req.body.data.pagorecurrente) {
            peticion += `&risk.parameters[USER_DATA1]=REPEATED`
            peticion += `&risk.parameters[USER_DATA2]=PagoRapidoDF`
            peticion += `&recurringType=REPEATED`
        } else {
            peticion += `&risk.parameters[USER_DATA2]=FACILCONTABILIDAD`
        }

        peticion += `&customParameters[SHOPPER_MID]=${req.body.data.idComercio}`
        peticion += `&customParameters[SHOPPER_TID]=${req.body.data.idTerminal}`
        peticion += `&customParameters[SHOPPER_ECI]=${req.body.data.idSeguridad}`
        peticion += `&customParameters[SHOPPER_PSERV]=${req.body.data.idProveedor}`
        peticion += `&customParameters[SHOPPER_VAL_BASE0]=0.00`
        peticion += `&customParameters[SHOPPER_VAL_BASEIMP]=${req.body.data.valorSinImpuesto}`
        peticion += `&customParameters[SHOPPER_VAL_IVA]=${req.body.data.iva}`

        if (req.body.data.registrations) {
            req.body.data.registrations.forEach((obj, index) => {
                peticion += `&registrations[${index}].id=${obj.token}`
            })
        }

        req.body.data.productos.forEach((obj, index) => {
            peticion += `&cart.items[${index}].name=${obj.infoproducto.nombre}`
            peticion += `&cart.items[${index}].description=Descripcion: ${obj.infoproducto.descripcion}`
            peticion += `&cart.items[${index}].price=${req.body.data.amount}`
            peticion += `&cart.items[${index}].quantity=1.00`
        })

        peticion += `&customParameters[SHOPPER_VERSIONDF]=2`
        peticion += `&testMode=EXTERNAL`

        console.log('peticion: ', encodeURI(peticion))

        let options = {
            hostname: "eu-test.oppwa.com",
            // hostname: 'eu-prod.oppwa.com',
            port: 443,
            path: encodeURI(peticion),
            method: "POST",
            headers: headers,
            maxRedirects: 20
        };

        const https = require('https');
        let request = https.request(options, function(response) {
            let chunks = [];

            response.on("data", function (chunk) {
                chunks.push(chunk);
                // console.log(JSON.parse(chunk))
                res.json(JSON.parse(chunk))
            });

            response.on("end", function (chunk) {
                let body = Buffer.concat(chunks);
                // console.log(body.toString())
            });

            response.on("error", function (error) {
                console.error(error);
            });
        });

        request.end();


    });

    app.post("/transactionDatafast", (req, res) => {
        // console.log(req.body.url + '?entityId=8ac7a4c981151a7a0181166a8b39026b')
        let path = req.body.url;
        path += '?entityId=8acda4cb81ae83220181bc182d9749d9';
        // console.log(path)
        const options = {
            port: 443,
            host: 'eu-prod.oppwa.com',
            // host: 'eu-test.oppwa.com',
            path: path,
            method: 'GET',
            headers: {
                'Authorization':'Bearer OGFjZGE0Y2I4MWFlODMyMjAxODFiYzE2NDZjZTQ5ZDV8and5ZWFyMmZnYw=='
            }
        };
        const postRequest = https.request(options, response => {
            const buf = [];
            response.on('data', chunk => {
                buf.push(Buffer.from(chunk));
            });
            response.on('end', () => {
                const jsonString = Buffer.concat(buf).toString('utf8');
                // console.log(JSON.parse(jsonString))
                try {
                    res.json(JSON.parse(jsonString))
                } catch (error) {
                    console.log(error)
                }
            });
            response.on("error", function (error) {
                console.error(error);
            });
        });

        postRequest.end();
    });

    app.post("/transactionDatafastDev", (req, res) => {
        // console.log(req.body.url + '?entityId=8ac7a4c981151a7a0181166a8b39026b')
        let path = req.body.url;
        path += '?entityId=8ac7a4c981151a7a0181166a8b39026b';
        // console.log(path)
        const options = {
            port: 443,
            // host: 'eu-prod.oppwa.com',
            host: 'eu-test.oppwa.com',
            path: path,
            method: 'GET',
            headers: {
                'Authorization':'Bearer OGE4Mjk0MTg1YTY1YmY1ZTAxNWE2YzhjNzI4YzBkOTV8YmZxR3F3UTMyWA=='
            }
        };
        const postRequest = https.request(options, response => {
            const buf = [];
            response.on('data', chunk => {
                buf.push(Buffer.from(chunk));
            });
            response.on('end', () => {
                const jsonString = Buffer.concat(buf).toString('utf8');
                // console.log(JSON.parse(jsonString))
                try {
                    res.json(JSON.parse(jsonString))
                } catch (error) {
                    console.log(error)
                }
            });
            response.on("error", function (error) {
                console.error(error);
            });
        });

        postRequest.end();
    });

    app.post("/refundTransactionDatafast", (req, res) => {
        // console.log(req.body.url + '?entityId=8ac7a4c981151a7a0181166a8b39026b')
        let path = req.body.url;
        path = `/v1/payments/${req.body.transaccion.responseId}?entityId=8acda4cb81ae83220181bc182d9749d9`;
        path += `&amount=${req.body.transaccion.amount}`;
        path += `&currency=USD`;
        path += `&paymentType=RF`;
        // path += `&testMode=EXTERNAL`;

        // console.log(path)
        // host dev eu-test.oppwa.com
        const options = {
            port: 443,
            host: 'eu-prod.oppwa.com',
            path: path,
            method: 'POST',
            headers: {
                'Authorization':'Bearer OGFjZGE0Y2I4MWFlODMyMjAxODFiYzE2NDZjZTQ5ZDV8and5ZWFyMmZnYw=='
            }
        };
        const postRequest = https.request(options, response => {
            const buf = [];
            response.on('data', chunk => {
                buf.push(Buffer.from(chunk));
            });
            response.on('end', () => {
                const jsonString = Buffer.concat(buf).toString('utf8');
                // console.log(JSON.parse(jsonString))
                try {
                    res.json(JSON.parse(jsonString))
                } catch (error) {
                    console.log(error)
                }
            });
            response.on("error", function (error) {
                console.error(error);
            });
        });

        postRequest.end();
    });

    app.post("/cobroRecurrenteDatafast", (req, res) => {

        let headers = {
            'Authorization': 'Bearer OGFjZGE0Y2I4MWFlODMyMjAxODFiYzE2NDZjZTQ5ZDV8and5ZWFyMmZnYw=='
            // 'Authorization': 'Bearer OGE4Mjk0MTg1YTY1YmY1ZTAxNWE2YzhjNzI4YzBkOTV8YmZxR3F3UTMyWA=='
        };

        // "https://test.oppwa.com/v1/registrations/".$token."/payments

        let peticion = `/v1/registrations/${req.body.data.token}/payments`
        // peticion += `?entityId=8ac7a4c981151a7a0181166a8b39026b`
        peticion += `?entityId=8acda4cb81ae83220181bc182d9749d9`
        peticion += `&amount=${req.body.data.amount}`
        peticion += `&currency=${req.body.data.currency}`
        peticion += `&paymentType=${req.body.data.paymentType}`
        peticion += `&merchantTransactionId=${req.body.data.transaccionIdFC}`
        peticion += `&risk.parameters[USER_DATA1]=REPEATED`
        peticion += `&risk.parameters[USER_DATA2]=PagoRapidoDF`
        peticion += `&recurringType=REPEATED`
        peticion += `&customParameters[SHOPPER_MID]=${req.body.data.idComercio}`
        peticion += `&customParameters[SHOPPER_TID]=${req.body.data.idTerminal}`
        peticion += `&customParameters[SHOPPER_ECI]=${req.body.data.idSeguridad}`
        peticion += `&customParameters[SHOPPER_PSERV]=${req.body.data.idProveedor}`
        peticion += `&customParameters[SHOPPER_VAL_BASE0]=0.00`
        peticion += `&customParameters[SHOPPER_VAL_BASEIMP]=${req.body.data.valorSinImpuesto}`
        peticion += `&customParameters[SHOPPER_VAL_IVA]=${req.body.data.iva}`
        peticion += `&customParameters[SHOPPER_VERSIONDF]=2`
        // peticion += `&testMode=EXTERNAL`

        console.log('peticion: ', encodeURI(peticion))

        let options = {
            // hostname: "eu-test.oppwa.com",
            hostname: 'eu-prod.oppwa.com',
            port: 443,
            path: encodeURI(peticion),
            method: "POST",
            headers: headers,
            maxRedirects: 20
        };

        const https = require('https');
        let request = https.request(options, function(response) {
            let chunks = [];

            response.on("data", function (chunk) {
                chunks.push(chunk);
                // console.log('chunk ', JSON.parse(chunk))
                res.json(JSON.parse(chunk))
            });

            response.on("end", function (chunk) {
                let body = Buffer.concat(chunks);
                // console.log('body ', body.toString())
            });

            response.on("error", function (error) {
                console.error(error);
            });
        });

        request.end();

    });
}


/*
let sendNotification = function(data) {
    let headers = {
        "Content-Type": "application/json; charset=utf-8"
    };

    let options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    const https = require('https');
    let req = https.request(options, function(res) {
        res.on('data', function(data) {
            console.log("Response:");
            // console.log(JSON.parse(data));
        });
    });

    req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};
*/

let getIdRequest = function(data) {
    console.log(data)
    let headers = {
        'Authorization': 'Bearer OGE4Mjk0MTg1MzNjZjMxZDAxNTMzZDA2ZmQwNDA3NDh8WHQ3RjIyUUVOWA=='
    };

    let options = {
        hostname: "test.oppwa.com",
        port: 443,
        path: "/v1/checkouts?entityId=8a829418533cf31d01533d06f2ee06fa&amount=5.00&currency=USD&paymentType=DB",
        method: "POST",
        headers: headers,
        maxRedirects: 20
    };

    const https = require('https');
    let req = https.request(options, function(res) {
        let chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            // console.log(body.toString());
            // console.log(JSON.parse(body.toString()));
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    req.end();
};

