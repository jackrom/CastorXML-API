const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")
const date = new Date()
const request = require('request')
const fileUpload = require('express-fileupload')
module.exports = app => {
    const PreciosFC = app.db.models.Preciosfc
    const ProductosFC = app.db.models.Productosfc
    const PromocionesFC = app.db.models.Promocionesfc
    const PlanesFC = app.db.models.Planesfc
    const multer  = require('multer')
    const path = require('path')
    const fs = require('fs')
    const cfg = app.libs.config
    const Op = app.db.Sequelize.op
    const nodeMailer = require('nodemailer')
    const soap = require('soap')
    const soapURL = 'http://186.4.187.28/InvoiceService/ServiceEb.svc?singleWsdl'
    // const soapURL = 'http://186.4.187.28/EbIntegrationService/ServiceEb.svc?singleWsdl'

    // SET STORAGE
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/files/categorias')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    let upload = multer({ storage: storage })

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
    app.get("/preciosfc", (req, res) => {
        PreciosFC.findAll({
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

    app.get("/preciosfc/:id", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                PreciosFC.findOne({
                    where: {
                        id: req.params.id
                    }
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

    app.post("/preciosByAppAndOpcion", (req, res) => {
        console.log(req.body)
        PreciosFC.findOne({
            where: {
                producto: req.body.solicitud.producto,
                opcion: req.body.solicitud.opcion,
            }
        })
        .then(result => {
            let ahorro = (result.preciomensual * 12) - result.precioanual
            if (result) {
                ProductosFC.findOne({
                    where: {
                        id: result.productoId
                    }
                })
                .then(resultados => {
                    PlanesFC.findOne({
                        where: {
                            productoId: result.productoId,
                            opcion: req.body.solicitud.opcion,
                            ispacket: 0,
                        }
                    })
                        .then(response => {
                            let precio = {
                                active: result.active,
                                createdAt: result.createdAt,
                                id: result.id,
                                ofertaanual: result.ofertaanual,
                                ofertamensual: result.ofertamensual,
                                opcion: result.opcion,
                                precioanual: result.precioanual,
                                preciomensual: result.preciomensual,
                                producto: result.producto,
                                productoId: result.productoId,
                                tieneofertaanual: result.tieneofertaanual,
                                tieneofertamensual: result.tieneofertamensual,
                                tipo: result.tipo,
                                updatedAt: result.updatedAt,
                                infoproducto: resultados,
                                ahorro: ahorro,
                                plan: response,
                                aceptapagosmensuales: result.aceptapagosmensuales,
                                cantidadpagos: result.cantidadpagos,
                                periodopago: result.periodopago,
                                ispacket: result.ispacket,
                                formaspagomensual: JSON.parse(result.formaspagomensual),
                                formaspagoanual: JSON.parse(result.formaspagoanual),
                                planpaypal: result.idPlanPaypal,
                                showfirst: result.showfirst,
                                aceptapagos: result.aceptapagos,
                                aceptaafiliados: result.aceptaafiliados,
                                tipocomisionafiliados: result.tipocomisionafiliados,
                                comisionafiliados: result.comisionafiliados,
                                showdashboardafiliados: result.showdashboardafiliados,
                                showindashboardafiliados: result.showindashboardafiliados
                            }
                            res.json(precio)
                        })

                })
            }
        })
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });


    app.post("/preciosByAppAndOpcionWithPromo", (req, res) => {
        console.log(req.body)
        PreciosFC.findOne({
            where: {
                producto: req.body.solicitud.producto,
                opcion: req.body.solicitud.opcion,
            }
        })
            .then(result => {
                let ahorro = (result.preciomensual * 12) - result.precioanual
                if (result) {
                    PromocionesFC.findOne({
                        where: {
                            id: result.productoId
                        }
                    })
                        .then(resultados => {
                            PlanesFC.findOne({
                                where: {
                                    productoId: result.productoId,
                                    opcion: req.body.solicitud.opcion,
                                    ispacket: 1,
                                }
                            })
                                .then(response => {
                                    let precio = {
                                        active: result.active,
                                        createdAt: result.createdAt,
                                        id: result.id,
                                        ofertaanual: result.ofertaanual,
                                        ofertamensual: result.ofertamensual,
                                        opcion: result.opcion,
                                        precioanual: result.precioanual,
                                        preciomensual: result.preciomensual,
                                        producto: result.producto,
                                        productoId: result.productoId,
                                        tieneofertaanual: result.tieneofertaanual,
                                        tieneofertamensual: result.tieneofertamensual,
                                        tipo: result.tipo,
                                        updatedAt: result.updatedAt,
                                        infoproducto: resultados,
                                        ahorro: ahorro,
                                        plan: response,
                                        aceptapagosmensuales: result.aceptapagosmensuales,
                                        cantidadpagos: result.cantidadpagos,
                                        periodopago: result.periodopago,
                                        ispacket: result.ispacket,
                                        formaspagomensual: JSON.parse(result.formaspagomensual),
                                        formaspagoanual: JSON.parse(result.formaspagoanual),
                                        planpaypal: result.idPlanPaypal,
                                        showfirst: result.showfirst,
                                        aceptapagos: result.aceptapagos,
                                        aceptaafiliados: result.aceptaafiliados,
                                        tipocomisionafiliados: result.tipocomisionafiliados,
                                        comisionafiliados: result.comisionafiliados,
                                        showindashboardafiliados: result.showindashboardafiliados
                                    }
                                    res.json(precio)
                                })

                        })
                }
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });


    app.post("/preciosByProducts", (req, res) => {
        console.log(req.body)
        PreciosFC.findAll()
            .then(result => {
                let productos = []
                let contador = 0
                result.forEach((obj) => {
                    let ahorro = (obj.preciomensual * 12) - obj.precioanual
                    if (obj) {
                        ProductosFC.findOne({
                            where: {
                                id: obj.productoId
                            }
                        })
                            .then(resultados => {
                                PlanesFC.findOne({
                                    where: {
                                        productoId: obj.productoId
                                    }
                                })
                                    .then(response => {
                                        let precio = {
                                            active: obj.active,
                                            createdAt: obj.createdAt,
                                            id: obj.id,
                                            ofertaanual: obj.ofertaanual,
                                            ofertamensual: obj.ofertamensual,
                                            opcion: obj.opcion,
                                            precioanual: obj.precioanual,
                                            preciomensual: obj.preciomensual,
                                            producto: obj.producto,
                                            productoId: obj.productoId,
                                            tieneofertaanual: obj.tieneofertaanual,
                                            tieneofertamensual: obj.tieneofertamensual,
                                            tipo: obj.tipo,
                                            updatedAt: obj.updatedAt,
                                            infoproducto: resultados,
                                            ahorro: ahorro,
                                            plan: response,
                                            aceptapagosmensuales: result.aceptapagosmensuales,
                                            cantidadpagos: result.cantidadpagos,
                                            periodopago: result.periodopago,
                                            planpaypal: result.idPlanPaypal,
                                            showfirst: result.showfirst,
                                            aceptapagos: result.aceptapagos,
                                            tipocomisionafiliados: result.tipocomisionafiliados,
                                            comisionafiliados: result.comisionafiliados,
                                            showindashboardafiliados: result.showindashboardafiliados
                                        }
                                        console.log(productos.length)
                                        productos.push(precio)
                                        contador++
                                        if (contador === result.length) {
                                            res.json(productos)
                                        }
                                    })

                            })
                    }

                })
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });


    app.post("/preciosByModulo/:id", (req, res) => {
        console.log(req.params)
        PreciosFC.findOne({
            where: {
                productoId: req.params.id,
            }
        })
            .then(result => {
                result.ahorro = (result.preciomensual * 12) - result.precioanual
                if (result) {
                    res.json(result)
                }
            })
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
    app.delete("/preciosfc/:id", (req, res) => {
        PreciosFC.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(resultados => {
                console.log(resultados)
                res.json(resultados)
            })
            .catch(error => {
                console.log(error.message)
                res.status(412).json({msg: error.message});
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

    app.post("/preciosfc", (req, res) => {
        console.log(req.body)
        PreciosFC.create(req.body.producto)
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                if(error.original) {
                    res.status(412).json({
                        cod: error.original.code,
                        err: error.original.errno,
                        state: error.original.sqlState,
                        msg: error.original.sqlMessage,
                        sql: error.sql
                    });
                }else {
                    res.status(412).json({
                        msg: error.message,
                        err: error.response
                    });
                }
            });
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
    app.put("/preciosfc", (req, res) => {
        console.log(req.body)
        PreciosFC.update(req.body.producto, {
            where: {
                id: req.body.producto.identificacion
            }})
            .then(result => {
                console.log(result)
                res.json(result)
            })
            .catch(error => {
                console.log(error.response)
                res.status(412).json({msg: error.message});
            });
    });

}
