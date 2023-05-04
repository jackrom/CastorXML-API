const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")
const date = new Date()
const request = require('request')

module.exports = app => {
    const NotasDeCredito = app.db.models.Notasdecredito
    const cfg = app.libs.config
    const Op = app.db.Sequelize.op
    const nodeMailer = require('nodemailer')
    const soap = require('soap')
    const soapURL = 'http://186.4.187.28/InvoiceService/ServiceEb.svc?singleWsdl'
    // const soapURL = 'http://186.4.187.28/EbIntegrationService/ServiceEb.svc?singleWsdl'
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
    app.get("/notascredito", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                NotasDeCredito.findAll({
                    order: [
                        ['id', 'DESC'],
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
    app.get("/notascredito/:id", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                NotasDeCredito.findById(
                    {
                        id: req.params.id
                    }
                )
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
    app.delete("/notascredito/:id", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                NotasDeCredito.destroy({where: {id: req.params.id}})
                    .then(res => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.json({msg: error.message})
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
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
    app.post("/notascredito", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                NotasDeCredito.create(req.body)
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
    app.post("/notascredito/savedocelectronico", (req, res) => {
        console.log(req.body.documento)
        NotasDeCredito.findAll({
            where: {
                secuencial: req.body.documento.secuencial
            }
        })
            .then(result => {
                if (result.data) {
                    console.log(result)
                    res.status(412).json({
                        error: true,
                        msg: 'El número de factura que intentas crear ya ha sido registrado, por favor, revisa el documento y el secuencial e intentalo de nuevo',
                        factura: result.data
                    });
                } else {
                    req.body.documento.razonSocialCliente = req.body.documento.razon_social_cliente
                    req.body.documento.correoCliente = req.body.documento.correo_cliente
                    // req.body.documento.telefonoCliente = req.body.documento.telefonoCliente
                    // req.body.documento.direccionCliente = req.body.documento.direccion_cliente
                    // req.body.documento.guiaRemision = req.body.documento.guiaremision
                    // req.body.documento.descuentoSolidario = req.body.documento.descuentosolidario
                    req.body.documento.informacionAdicional = JSON.stringify(req.body.documento.DatosAdicionalesList)
                    req.body.documento.productList = JSON.stringify(req.body.documento.productList)
                    req.body.documento.formaPagoList = JSON.stringify(req.body.documento.formaPagoList)

                    NotasDeCredito.create(req.body.documento)
                        .then(result => {
                            let respuesta = {
                                error: false,
                                msg: 'documento insertado correctamente',
                                data: result
                            }
                            res.json(respuesta)
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(412).json({msg: error.message});
                        });
                }
            })
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
    app.put("/notascredito", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                NotasDeCredito.update(req.query, {where: {id: req.query.id}})
                    .then(result => {
                        console.log(result)
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
}
