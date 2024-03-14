const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")
const date = new Date()
const request = require('request')
const fileUpload = require('express-fileupload')
const http = require('http')
const { Base64Encode } = require('base64-stream')


module.exports = app => {
    const Empresas = app.db.models.Empresas
    const Documentos = app.db.models.Documentos
    const Users = app.db.models.Users
    const Establecimientos = app.db.models.Establecimientos
    const PuntosEmision = app.db.models.PuntosEmision
    const Periodos = app.db.models.Periodos
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
            cb(null, 'public/files/cursos')
        },
        filename: function (req, file, cb) {
            console.log('file', file)
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    let upload = multer({ storage: storage })

    app.post("/empresas/uploadlogo", upload.single('logo'), (req, res, next) => {
        // console.log(req)
        const file = req.files.file
        // console.log(file)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(file)
        res.end(file)
    })

    app.post("/empresas/uploadcertificado", upload.single('certificado'), (req, res, next) => {
        const file = req.file
        res.setHeader('Content-Type', 'application/x-pkcs12')
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(file)
        res.end(file)
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
    app.get("/empresas", (req, res) => {
        Empresas.findAll({
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
    app.get("/empresas/byuser", (req, res) => {
        Empresas.findAll({
            include: [
                {
                    model: Periodos,
                    as: 'periodos',
                }
            ],
            where: {
                userId: req.query.user,
            },
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(results => {
                console.log('EMPRESAS BY USER: ', results)
                // const { q = '', role = null, plan = null, status = null, perPage = 10, currentPage = 1 } = config.params ?? {}
                /*
                const queryLower = req.query.q.toLowerCase()
                let filteredEmpresas = results.filter(
                    result => ((
                        result.nombre.toLowerCase().includes(queryLower) &&
                        result.direccion.toLowerCase().includes(queryLower) &&
                        result.ciudad.toLowerCase().includes(queryLower) &&
                        result.provincia.toLowerCase().includes(queryLower) &&
                        result.gerente.toLowerCase().includes(queryLower)
                    ))).reverse()
                const totalPage = Math.ceil(filteredEmpresas.length / req.query.perPage) ? Math.ceil(filteredEmpresas.length / req.query.perPage) : 1
                const totalEmpresas = filteredEmpresas.length
                if (req.query.perPage) {
                    const firstIndex = (req.query.currentPage - 1) * req.query.perPage
                    const lastIndex = req.query.perPage * req.query.currentPage

                    filteredEmpresas = filteredEmpresas.slice(firstIndex, lastIndex)
                }

                */
                // res.json({ empresas: results, totalPage, totalEmpresas})
                res.json(results)
            })
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
    app.post("/empresasByUser", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Empresas.findAll({
                    where: {
                        userId: req.body.user.id
                    },
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
    app.get("/empresas/:id", (req, res) => {
        Empresas.findOne({
            where: {
                ruc: req.params.id
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
    app.delete("/empresas/:id", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Empresas.destroy({where: {id: req.params.id}})
                    .then(resultados => {
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
    app.post("/empresas", (req, res) => {
        console.log(req.body)
        Empresas.create(req.body.empresa)
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
    app.put("/empresas", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                const empresa = {
                    ruc: req.body.obj.ruc,
                    nombre: req.body.obj.nombre,
                    direccion: req.body.obj.direccion,
                    ciudad: req.body.obj.ciudad,
                    provincia: req.body.obj.provincia,
                }
                Documentos.findAndCountAll({
                    where: {
                        empresaIdCastor: req.body.obj.id
                    }
                })
                    .then(result => {
                        if (result.count === 0) {
                            Empresas.update(empresa, {where: {id: req.body.obj.id}})
                                .then(result => {
                                    console.log(result)
                                    res.json(result)
                                    //res.sendStatus(204)
                                })
                                .catch(error => {
                                    res.status(412).json({msg: error.message});
                                });
                        } else {
                            if(req.body.obj.id !== req.body.obj.ruc) {
                                res.status(412).json({msg: 'Usted tiene documentos registrados en esta empresa y ya no se puede modificar el ruc'});
                            } else {
                                Empresas.update(empresa, {where: {id: req.body.obj.id}})
                                    .then(result => {
                                        res.json(result)
                                        //res.sendStatus(204)
                                    })
                                    .catch(error => {
                                        console.log(error.response)
                                        res.status(412).json({msg: error.message});
                                    });
                            }
                        }
                    })
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


    app.post("/empresas/facturafull", (req, res) => {
        let empresa = {
            ruc: req.body.ruc,
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            nombre_comercial: req.body.nombrecomercial,
            email: req.body.email,
            descripcion: req.body.descripcion,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            provincia: req.body.provincia,
            obligado_contabilidad: req.body.obligadocontabilidad,
            tipo_emision: req.body.tipoemision,
            gerente: req.body.gerente,
            ambiente: req.body.ambiente,
            dir_P12: req.body.certificado,
            password_P12: req.body.passp12,
            contribuyenteespecial: req.body.contribuyenteespecial,
            numerocontribuyenteespecial: req.body.numerocontribuyenteespecial,
            regimenmicroempresas: req.body.regimenmicroempresas,
            agenteretencion: req.body.agenteretencion,
            userId: req.body.userId,
            logo: req.body.logo,
            id: req.body.uid
        }
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Empresas.create(empresa)
                    .then(result => {
                        let empresasri = {
                            id_empresa: req.body.uid,
                            desc_empresa: req.body.descripcion,
                            razon_social_empresa: req.body.nombre,
                            nom_com_empresa: req.body.nombrecomercial,
                            ruc_empresa: req.body.uid,
                            dir_matriz_empresa: req.body.direccion,
                            dir_emisor_empresa: '',
                            ciu_empresa: req.body.ciudad,
                            pro_empresa: req.body.provincia,
                            num_contribuyente: req.body.numerocontribuyenteespecial,
                            img_empresa: req.body.logo,
                            obligado_contabilidad: req.body.obligadocontabilidad,
                            nom_gerente_empresa: req.body.gerente,
                            tipoEmision: req.body.tipoemision,
                            tipoAmbiente: req.body.ambiente,
                            correo_empresa: req.body.email,
                            dir_P12: req.body.certificado,
                            contrasenna_P12: req.body.passp12,
                            codigo: req.body.codigo,
                            activo: true
                        }

                        const datos = {
                            transmitter: empresasri,
                            user: "yrsuarez@gmail.com",
                            password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
                        }
                        let options = {
                            'method': 'POST',
                            'url': 'http://181.39.193.148/RestInvoiceIntegration/operation/InsertTransmitter',
                            'headers': {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(datos)
                        };
                        request(options, function (error, response) {
                            if (error) throw new Error(error)
                            if (response.body.length > 0) {
                                let respuesta = JSON.parse(response.body)
                            } else {
                                res.status(412).json({msg: respuesta.data})
                            }
                        })
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
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    })

    app.post('/uploadcertificado', function(req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('Ningún archivo fue cargado')
        }
        let certificadoFile = req.files.certificado
        certificadoFile.mv('public/files/certificados/' + req.files.certificado.name, function(err) {
            if (err)
                return res.status(500).send(err)

            res.send({
                msg: 'Archivo cargado correctamente',
                url: '/files/certificados/' + req.files.certificado.name
            })
        });
    })

    app.post('/uploadlogo', function(req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('Ningún archivo fue cargado')
        }
        let logoFile = req.files.logo
        logoFile.mv('public/files/logos/' + req.files.logo.name, function(err) {
            if (err)
                return res.status(500).send(err)

            res.send({
                msg: 'Archivo cargado correctamente',
                url: '/files/logos/' + req.files.logo.name
            })
        });
    })

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
    app.post("/empresafacturacionelectronica", (req, res) => {
        // console.log(req.body)
        Users.findOne({
            where: {
                email: req.body.empresa.user_id
            }
        })
        .then(resultados => {
            let empresasri = {
                id: req.body.empresa.id,
                userId: resultados.id,
                usuariofirebase: req.body.empresa.usuario,
                nombre: req.body.empresa.nombre,
                nombre_comercial: req.body.empresa.nombre,
                descripcion: req.body.empresa.descripcion,
                ruc: req.body.empresa.ruc,
                email: req.body.empresa.email,
                direccion: req.body.empresa.direccion,
                direccion_emisor: req.body.empresa.direccion_emisor,
                telefono: req.body.empresa.telefono,
                ciudad: req.body.empresa.ciudad,
                provincia: req.body.empresa.provincia,
                logo: req.body.empresa.logo,
                obligado_contabilidad: req.body.empresa.obligadocontabilidad,
                gerente: req.body.empresa.gerente,
                tipo_emision: req.body.empresa.tipo_emision,
                ambiente: req.body.empresa.ambiente,
                codigo: req.body.empresa.codigo,
                activo: req.body.empresa.activo,
                contribuyenteespecial: req.body.empresa.contribuyenteespecial,
                numerocontribuyenteespecial: req.body.empresa.numerocontribuyenteespecial,
                agenteretencion: req.body.empresa.agenteretencion,
                regimenmicroempresas: req.body.empresa.regimenmicroempresas
            }
            console.log('empresasri', empresasri)
            Empresas.create(empresasri)
                .then(result => {
                    // console.log(result)
                    // console.log(empresasri)
                    res.json(result)
                })
                .catch(error => {
                    console.log(error)
                    res.status(412).json({msg: 'No se pudo crear la empresa en la base de datos'})
                });
        })
        .catch(error => {
            console.log(error)
            res.status(412).json({msg: 'Problemas con el id del usuario, parece no estar registrado en la base de datos'})
        });

    });

    app.post("/empresas/crearempresasri", (req, res) => {
        console.log(req)
        console.log('req.body', req.body)
        let empresasri = {
            id_empresa: req.body.empresa.rucempresa,
            desc_empresa: req.body.empresa.descripcion,
            razon_social_empresa: req.body.empresa.nombre,
            nom_com_empresa: req.body.empresa.nombre,
            rucempresa: req.body.empresa.rucempresa,
            dir_matriz_empresa: req.body.empresa.direccion,
            dir_emisor_empresa: req.body.empresa.direccion,
            ciu_empresa: req.body.empresa.ciudad,
            pro_empresa: req.body.empresa.provincia,
            num_contribuyente: req.body.empresa.numerocontribuyenteespecial, // debe ser numerico entero
            img_empresa: null, //
            obligado_contabilidad: req.body.empresa.obligadocontabilidad,
            nom_gerente_empresa: req.body.empresa.gerente, //
            tipoEmision: req.body.empresa.tipoEmision,
            tipoAmbiente: (req.body.empresa.tipoAmbiente === 'Prueba' || req.body.empresa.tipoAmbiente === '1') ? '1' : '2',
            correo_empresa: req.body.empresa.email,
            dir_P12: req.body.empresa.dir_P12,
            contrasenna_P12: req.body.empresa.passp12,
            codigo: req.body.empresa.codigo, // debe ser numerico de 8 caracteres - elegido por el cliente
            activo: true
        }
        console.log('empresasri', empresasri)
        const datos = {
            transmitter: empresasri,
            user: "yrsuarez@gmail.com",
            password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
        }
        let options = {
            'method': 'POST',
            'url': 'http://181.39.193.148/RestInvoiceIntegration/operation/InsertTransmitter',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        };
        request(options, function (error, response) {
            if (error) throw new Error(error)
            if(response.body.length > 0) {
                let respuesta = JSON.parse(response.body)
                console.log('respuesta', respuesta)
                if (respuesta && respuesta.Sucessful) {
                    res.json(respuesta.data)
                }
            } else {
                res.status(412).json({msg: response.body.data})
            }
        })
    })


    app.post("/empresas/insertarusuariosri", (req, res) => {
       const usersri = {
            FullName: req.body.usuario.fullname, //
            idEmpresa: req.body.usuario.empresaid,
            Email: req.body.usuario.email,
            Password: req.body.usuario.password,
            activo: req.body.usuario.activo, // true or false
            NewPassword: req.body.usuario.newpassword
        }
        console.log('usersri', usersri)
        const datos = {
            usermodel: usersri,
            user: "yrsuarez@gmail.com",
            password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
        }
        let options = {
            'method': 'POST',
            'url': 'http://181.39.193.148/RestInvoiceIntegration/operation/InsertUser',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        };
        request(options, function (error, response) {
            if (error) throw new Error(error)
            if(response.body.length > 0) {
                let respuesta = JSON.parse(response.body)
                console.log('respuesta', respuesta)
                if (respuesta && respuesta.Sucessful) {
                    const credenciales = {
                        useradmin: JSON.stringify({usuario: usersri, response: respuesta}),
                        passsri: respuesta.Tag,
                        id_sri: req.body.usuario.empresaid
                    }
                    Empresas.update(credenciales, {
                        where: {
                            ruc: req.body.usuario.ruc
                        }
                    })
                    .then(result => {
                        res.json(result)
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

    app.post("/logodigitalcontable", (req, res) => {
        console.log(req.body)
        Users.findOne({
            where: {
                email: req.body.empresa.userId
            }
        })
            .then(resultados => {
                if (resultados) {
                    let empresa = {
                        codigo: req.body.empresa.codigo,
                        nombre: (req.body.empresa.nombre) ? req.body.empresa.nombre : req.body.empresa.nombre_comercial,
                        nombre_comercial: req.body.empresa.nombre_comercial,
                        email: req.body.empresa.email,
                        descripcion: req.body.empresa.descripcion,
                        direccion: req.body.empresa.direccion,
                        ciudad: req.body.empresa.ciudad,
                        provincia: req.body.empresa.provincia,
                        obligado_contabilidad: (req.body.empresa.obligado_contabilidad === 'si') ? 1 : 0,
                        tipo_emision: req.body.empresa.tipo_emision,
                        gerente: req.body.empresa.gerente,
                        ambiente: (req.body.empresa.ambiente === 'Prueba') ? 1 : 2,
                        logo: req.body.empresa.logo,
                        contribuyenteespecial: req.body.empresa.contribuyenteespecial,
                        numerocontribuyenteespecial: req.body.empresa.numerocontribuyenteespecial,
                        regimenmicroempresas: req.body.empresa.regimenmicroempresas,
                        agenteretencion: req.body.empresa.agenteretencion,
                        userId: resultados.id,
                        id: req.body.empresa.ruc,
                        activo: true
                    }
                    Empresas.update(empresa, {
                        where: {
                            ruc: req.body.empresa.ruc
                        }
                    })
                        .then(result => {
                            res.json(empresa)
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(412).json({msg: error.message})
                        });
                }
            })
            .catch(error => {
                console.log(error)
                res.status(412).json({msg: 'Problemas con el id del usuario, parece no estar registrado en la base de datos'})
            });
    })

    app.post("/certificadodigitalcontable", (req, res) => {
        console.log(req.body)
        Users.findOne({
            where: {
                email: req.body.empresa.userId
            }
        })
            .then(resultados => {
                console.log('resultados: ', resultados)
                if (resultados) {
                    let empresa = {
                        codigo: req.body.empresa.codigo,
                        nombre: (req.body.empresa.nombre) ? req.body.empresa.nombre : req.body.empresa.nombre_comercial,
                        nombre_comercial: req.body.empresa.nombre_comercial,
                        email: req.body.empresa.email,
                        descripcion: req.body.empresa.descripcion,
                        direccion: req.body.empresa.direccion,
                        ciudad: req.body.empresa.ciudad,
                        provincia: req.body.empresa.provincia,
                        obligado_contabilidad: (req.body.empresa.obligado_contabilidad === 'si') ? 1 : 0,
                        tipo_emision: req.body.empresa.tipo_emision,
                        gerente: req.body.empresa.gerente,
                        ambiente: (req.body.empresa.ambiente === 'prueba') ? 1 : 2,
                        dir_P12: req.body.empresa.dir_P12,
                        password_P12: req.body.empresa.password_P12,
                        contribuyenteespecial: req.body.empresa.contribuyenteespecial,
                        numerocontribuyenteespecial: req.body.empresa.numerocontribuyenteespecial,
                        regimenmicroempresas: req.body.empresa.regimenmicroempresas,
                        agenteretencion: req.body.empresa.agenteretencion,
                        userId: resultados.id,
                        logo: req.body.empresa.logo,
                        id: req.body.empresa.ruc,
                        activo: true,
                        passsri: (req.body.empresa.passsri) ? req.body.empresa.passsri : ''
                    }
                    Empresas.update(empresa, {
                        where: {
                            ruc: req.body.empresa.ruc
                        }
                    })
                        .then(result => {
                            res.json(empresa)
                        })
                        .catch(error => {
                            console.log(error)
                            let certificado = {
                                error: true,
                                empresa: null,
                                mensaje: error.message
                            }
                            res.json(certificado)
                            // res.status(412).json({msg: error.message})
                        });
                } else {
                    let certificado = {
                        error: true,
                        empresa: null,
                        mensaje: 'Problemas con el id del usuario, parece no estar registrado en la base de datos ya que no se encontró ningún registro'
                    }
                    res.json(certificado)
                }
            })
            .catch(error => {
                console.log(error)
                let certificado = {
                    error: true,
                    empresa: null,
                    mensaje: 'Problemas con el id del usuario, parece no estar registrado en la base de datos'
                }
                res.json(empresa)
                // res.status(412).json({msg: 'Problemas con el id del usuario, parece no estar registrado en la base de datos'})
            });
    })
}
