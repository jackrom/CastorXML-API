const multer = require("multer");
const path = require("path");

const Notificaciones = require("../utils/notificaciones");
const PlantillasEmail = require("../templates/plantillasEmail");

module.exports = app => {
    const CursosleccionesFC = app.db.models.Cursosleccionesfc
    const multer  = require('multer')
    const path = require('path')
    const notificador = new Notificaciones();

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
    app.get("/cursosleccionesfc", (req, res) => {
        CursosleccionesFC.findAll({
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

    app.get("/cursosleccionesfc/:id", (req, res) => {
        CursosleccionesFC.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/cursosleccionesfc/byseccion/:id", (req, res) => {
        CursosleccionesFC.findAll({
            where: {
                seccionId: req.params.id
            },
            order: [
                ['orden', 'ASC']
            ]
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.post("/cursosleccionesfc/byuser", (req, res) => {
        CursosleccionesFC.findAll({
            where: {
                userId: req.body.leccion.userId,
                leccion: req.body.leccion.leccion
            },
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(result => {
                // console.log('lecciones usuario', result)
                res.json(result)
            })
            .catch(error => {
                // console.log('error usuario', error)
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
    app.delete("/cursosleccionesfc/:id", (req, res) => {
        // Primero buscar el registro
        CursosleccionesFC.findOne({ where: { id: req.params.id } })
            .then(registro => {
                if (registro) {
                    let datos = JSON.parse(JSON.stringify(datos));

                    datos.registro = registro;
                    datos.query = "INSERT INTO `Cursosleccionesfcs` (`id`, `cursoId`, `seccionId`, `guia`, `mapamental`, `ejercicio`, `modulo`, `orden`, `otros`, `titulo`, `videourl`, `visibilidad`, `tipo`, `informacion`, `enlace`, `iframe`, `leccionactiva`, `createdAt`, `updatedAt`) VALUES (registro.id, registro.cursoId, registro.seccionId, registro.guia, registro.mapamental, registro.ejercicio, registro.modulo, registro.orden, registro.otros, registro.titulo, registro.videourl, registro.visibilidad, registro.tipo, registro.informacion, registro.enlace, registro.iframe, registro.leccionactiva, registro.createdAt, registro.updatedAt)";
;

                    CursosleccionesFC.destroy({ where: { id: req.params.id } })
                        .then(resultados => {
                            if (resultados) {
                                // Preparar los datos adicionales incluyendo el registro completo
                                const usuario = req.query.usuario;
                                const fechaHora = req.query.fechaHora;
                                const aplicacion = req.query.aplicacion;
                                const idRegistro = req.query.idRegistro;
                                const ip = req.query.ip;
                                const datosAdicionales = JSON.stringify(registro); // Registro completo

                                let plantilla = PlantillasEmail.eliminacionRegistro(usuario, fechaHora, aplicacion, ip, idRegistro, 'cursosleccionesfc', datosAdicionales);

                                notificador.sendMessage('Recupera tu contraseña ✔', plantilla, "soporte@facilcontabilidad.net");
                                let result = {
                                    msg: 'Registro eliminado correctamente',
                                }
                                res.json(result)
                            } else {
                                let result = {
                                    msg: 'Registro no pudo ser eliminado',
                                }
                                res.json(result)
                            }
                        })
                        .catch(error => {
                            console.log(error.message)
                            res.status(412).json({msg: error.message});
                        });
                } else {
                    res.status(404).json({ msg: "Registro no encontrado" });
                }
            })
            .catch(error => {
                console.log(error.message)
                res.status(412).json({ msg: error.message });
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
    app.post("/cursosleccionesfc", (req, res) => {
        console.log(req.body.leccion)
        CursosleccionesFC.create(req.body.leccion)
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                res.status(412).json({msg: error.message});
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
    app.put("/cursosleccionesfc", (req, res) => {
        // console.log(req.body.leccion)
        CursosleccionesFC.update(req.body.leccion, {
            where: {
                id: req.body.leccion.identificacion
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
