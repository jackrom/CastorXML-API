const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")
const date = new Date()
const request = require('request')
const fileUpload = require('express-fileupload')
module.exports = app => {
    const CardsFC = app.db.models.Cardsfc
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
    app.get("/cardsfc", (req, res) => {
        CardsFC.findAll({
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

    app.get("/cardsfc/:id", (req, res) => {
        CardsFC.findOne({
            where: {
                id: req.params.id
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
    app.delete("/cardsfc/:id", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                CardsFC.destroy({
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

    app.post("/cardsfc", (req, res) => {
        console.log(req.body)
        console.log(req.params)
        console.log(req.query)
        let venta = {
            bin: req.body.bin,
            message: req.body.message,
            expirymonth: req.body.expiry_month,
            expiryyear: req.body.expiry_year,
            origin: req.body.origin,
            status: req.body.status,
            number: req.body.number,
            token: req.body.token,
            transactionreference: req.body.transaction_reference,
            type: req.body.type
        }
        console.log(venta)
        CardsFC.create(venta)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
            })
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
    app.put("/cardsfc", (req, res) => {
        console.log(req.body)
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                const ruta = {
                    empresaId: req.body.empresaId,
                    codigo: req.body.codigo,
                    ruta: req.body.ruta,
                    descripcion: req.body.descripcion
                }
                CardsFC.update(ruta, {
                    where: {
                        id: req.body.rutaId
                    }})
                    .then(result => {
                        console.log(result)
                        res.json(result)
                    })
                    .catch(error => {
                        console.log(error.response)
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    });

}
