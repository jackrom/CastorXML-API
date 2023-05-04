const Sequelize = require("sequelize")
module.exports = app => {
    const Visitantes = app.db.models.Visitantes;
    const cfg = app.libs.config;
    const Op = Sequelize.Op
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
    app.get("/visitantes/:id", (req, res) => {
        Visitantes.findById(req.params.id, {
            attributes: [
                "id",
                "origen",
                "city",
                "calling_code",
                "connection_type",
                "continent_code",
                "continent_name",
                "country_capital",
                "country_code2",
                "country_code3",
                "country_flag",
                "country_name",
                "country_tld",
                "currency",
                "district",
                "geoname_id",
                "ip",
                "is_eu",
                "isp",
                "languages",
                "latitude",
                "longitude",
                "organization",
                "state_prov",
                "time_zone",
                "zipcode"
            ]
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    /**
     * @api {get} /ciudades Devuelve una matriz con las ciudades actuales de la app
     * @apiGroup Ciudades
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID de la ciudad
     * @apiSuccess {String} ciudad Ciudad donde esta trabajando la app de clientes
     * @apiSuccess {Date} updatedAt Fecha de la última modificación
     * @apiSuccess {Date} createdAt Fecha de creación
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "ciudad": "0.0.0",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} no hay ninguna ciudad creada, no existe
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/visitantes", (req, res) => {
        Visitantes.findAll({})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.post("/visitantesbyuser", (req, res) => {
        Visitantes.findAll({
            where: {
                usuario: req.body.user
            },
            limit: 200,
            order: [['id', 'DESC']]
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.post("/visitantesbyusertimeline", (req, res) => {
        Visitantes.findAll({
            where: {
                usuario: req.body.user
            },
            limit: 4,
            order: [['id', 'DESC']]
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.post("/visitantesmasactivos", (req, res) => {
        Visitantes.findAll({
            attributes: [
                "usuario",
                "origen",
                "city",
                [Sequelize.fn('count', Sequelize.col('usuario')), 'count']
            ],
            group : ['Visitantes.usuario'],
            raw: true,
            order: Sequelize.literal('count DESC'),
            limit: 10
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.post("/headers", (req, res) => {
        Visitantes.findAll({
            attributes: [
                "headers",
            ],
            where: {
                headers: { [Op.not]: null}
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
    app.delete("/visitantes/:id", (req, res) => {
        Visitantes.destroy({where: {id: req.params.id}})
            .then(res => res.sendStatus(204))
            .catch(error => {
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
    app.post("/visitantes", (req, res) => {
        const solicitud = {
            origen: req.body.visitante.origen,
            pathname: req.body.visitante.pathname,
            location: req.body.visitante.location,
            modulo: req.body.visitante.modulo,
            accion: req.body.visitante.accion,
            usuario: req.body.visitante.usuario,
            headers: JSON.stringify(req.headers),
            calling_code: (req.body.visitante.calling_code !== '')?req.body.visitante.calling_code:'NA',
            city: (req.body.visitante.city !== '')?req.body.visitante.city:'NA',
            connection_type: (req.body.visitante.connection_type !== '')?req.body.visitante.connection_type:'Desconocido',
            continent_code: (req.body.visitante.continent_code !== '')?req.body.visitante.continent_code:'NA',
            continent_name: (req.body.visitante.continent_name !== '')?req.body.visitante.continent_name: 'NA',
            country_capital: (req.body.visitante.country_capital !== '')?req.body.visitante.country_capital:'NA',
            country_code2: (req.body.visitante.country_code2 !== '')?req.body.visitante.country_code2:'NA',
            country_code3: (req.body.visitante.country_code3 !== '')?req.body.visitante.country_code3:'NA',
            country_flag: (req.body.visitante.country_flag !== '')?req.body.visitante.country_code3:'NA',
            country_name: (req.body.visitante.country_name !== '')?req.body.visitante.country_name:'NA',
            country_tld: (req.body.visitante.country_tld !== '')?req.body.visitante.country_tld:'NA',
            currency: (req.body.visitante.currency !== '')?JSON.stringify(req.body.visitante.currency):'NA',
            district: (req.body.visitante.district !== '')?req.body.visitante.district:'NA',
            geoname_id: (req.body.visitante.geoname_id !== '')?req.body.visitante.geoname_id:'NA',
            ip: (req.body.visitante.ip !== '')?req.body.visitante.ip:'NA',
            is_eu: (req.body.visitante.is_eu !== '')?req.body.visitante.is_eu:'NA',
            isp: (req.body.visitante.isp !== '')?req.body.visitante.isp:'',
            languages: (req.body.visitante.languages !== '')?req.body.visitante.languages:'NA',
            latitude: (req.body.visitante.latitude !== '')?req.body.visitante.latitude:'NA',
            longitude: (req.body.visitante.longitude !== '')?req.body.visitante.longitude:'NA',
            organization: (req.body.visitante.organization !== '')?req.body.visitante.organization:'NA',
            state_prov: (req.body.visitante.state_prov !== '')?req.body.visitante.state_prov:'',
            time_zone: (req.body.visitante.time_zone !== '')?JSON.stringify(req.body.visitante.time_zone):'',
            zipcode: (req.body.visitante.zipcode !== '')?req.body.visitante.zipcode:'000000'
        }
        Visitantes.create(solicitud)
            .then(result => {
                res.status(200).json({
                    visitante: result
                })
            })
            .catch(error => {
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
    app.put("/visitantes", (req, res) => {
        Visitantes.update(req.query, {where: {id: req.query.id}})
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })
}
