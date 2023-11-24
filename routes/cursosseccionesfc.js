const Notificaciones = require("../utils/notificaciones");
const PlantillasEmail = require("../templates/plantillasEmail");

module.exports = app => {
    const CursosseccionesFC = app.db.models.Cursosseccionesfc
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
    app.get("/cursosseccionesfc", (req, res) => {
        CursosseccionesFC.findAll({
            include: [
                {
                    model: CursosleccionesFC,
                    as: 'courseslessons'
                }
            ],
            attributes: [
                'id',
                'cursoId',
                'orden',
                'titulo',
                'descripcion'
            ],
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

    app.get("/cursosseccionesfc/:id", (req, res) => {
        CursosseccionesFC.findOne({
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
    app.delete("/cursostosubcategoriasfc/:id", (req, res) => {

        CursosseccionesFC.findOne({ where: { id: req.params.id } })
            .then(registro => {
                if (registro) {
                    let datos = JSON.parse(JSON.stringify(req.query.datos));
                    datos.registro = registro;
                    datos.query = "INSERT INTO `Cursosseccionesfcs` (`id`, `cursoId`, `orden`, `titulo`, `descripcion`, `lecciones`, `createdAt`, `updatedAt`) VALUES (registro.id, registro.cursoId, registro.orden, registro.titulo, registro.descripcion, registro.lecciones, registro.createdAt, registro.updatedAt)";

                    CursosseccionesFC.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(resultados => {
                            if (resultados) {
                                let plantilla = PlantillasEmail.eliminacionRegistro(usuario, fechaHora, aplicacion, ip, idRegistro, 'cursosseccionesfc', datosAdicionales);

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

    app.post("/cursosseccionesfc", (req, res) => {
        // console.log(req.body.newproducto)
        CursosseccionesFC.create(req.body.newproducto)
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error.response)
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
    app.put("/cursosseccionesfc", (req, res) => {
        // console.log(req.body.newproducto)
        CursosseccionesFC.update(req.body.newproducto, {
            where: {
                id: req.body.newproducto.identificacion
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

    app.get("/reparartablasecciones", (req, res) => {
        CursosseccionesFC.findAll({
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(results => {
                if (results && results.length > 0) {
                    results.forEach(obj => {
                        let lecciones = (obj.lecciones) ? JSON.parse(obj.lecciones) : []
                        if (lecciones && lecciones.length > 0) {
                            lecciones.forEach(l => {
                                let les = {
                                    cursoId: obj.cursoId,
                                    seccionId: obj.id,
                                    guia: l.guia,
                                    mapamental: l.mapamental,
                                    ejercicio: l.ejercicio,
                                    modulo: l.modulo,
                                    orden: l.orden,
                                    otros: JSON.stringify(l.otros),
                                    titulo: l.titulo,
                                    videourl: l.videourl,
                                    visibilidad: l.visibilidad,
                                }

                                LeccionesFC.create(les);
                            })
                        }
                    })
                }
                res.json(results[results.length - 1])
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

}
