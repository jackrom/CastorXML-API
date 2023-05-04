const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")
const date = new Date()
const request = require('request')
const fileUpload = require('express-fileupload')
const http = require('http')
const { Base64Encode } = require('base64-stream')
const multer = require("multer");
const path = require("path");


module.exports = app => {
    const EmpresasIfluc = app.db.models.EmpresasIfluc
    const Documentos = app.db.models.Documentos
    const PeriodosIfluc = app.db.models.PeriodosIfluc
    const ReportesIfluc = app.db.models.ReportesIfluc
    const multer  = require('multer')
    const path = require('path')

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

    app.post("/empresasIfluc/uploadlogo", upload.single('logo'), (req, res, next) => {
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

    app.post("/empresasIfluc/uploadcertificado", upload.single('certificado'), (req, res, next) => {
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
    app.get("/empresasIfluc", (req, res) => {
        EmpresasIfluc.findAll({
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
    app.get("/empresasIfluc/byuser", (req, res) => {
        // console.log(req)
        EmpresasIfluc.findAll({
            include: [
                {
                    model: PeriodosIfluc,
                    as: 'periodosifluc',
                }
            ],
            where: {
                userId: req.query.user,
                origen: req.query.origen
            },
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(results => {
                // const { q = '', role = null, plan = null, status = null, perPage = 10, currentPage = 1 } = config.params ?? {}
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


                res.json({ empresas: filteredEmpresas, totalPage, totalEmpresas})
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
    app.post("/empresasIflucByUser", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                EmpresasIfluc.findAll({
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
    app.get("/empresasIfluc/:id", (req, res) => {
        EmpresasIfluc.findOne({
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
    app.delete("/empresasIfluc/:id", (req, res) => {
        PeriodosIfluc.findAll({
            where: {
                empresaId: req.params.id
            }
        })
            .then(results => {
                if (results && results.length > 0) {
                    results.forEach(obj => {
                        PeriodosIfluc.destroy({where: {id: obj.id}})
                    })
                }
                ReportesIfluc.findAll({
                    where: {
                        empresaId: req.params.id
                    }
                })
                .then(results => {
                    if (results && results.length > 0) {
                        results.forEach(obj => {
                            ReportesIfluc.destroy({where: {reporteId: obj.reporteId}})
                        })
                    }
                })
                EmpresasIfluc.destroy({where: {id: req.params.id}})
                    .then(result => {
                        res.json(result)
                    })
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
    app.post("/empresasIfluc", (req, res) => {
        // console.log(req.body)
        EmpresasIfluc.create(req.body.empresa)
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
    app.put("/empresasIfluc", (req, res) => {
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
                            EmpresasIfluc.update(empresa, {where: {id: req.body.obj.id}})
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
}
