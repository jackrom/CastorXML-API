module.exports = app => {
    const VentasAfiliado = app.db.models.Ventasafiliado
    const Users = app.db.models.Users
    const ProductosFC = app.db.models.Productosfc
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

    app.get("/ventasafiliado", (req, res) => {
        VentasAfiliado.findAll({
            include: [
                {
                    model: Users,
                    as: 'comprador',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email",
                        "aplicaciones"
                    ]
                },
                {
                    model: Users,
                    as: 'vendedor',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email",
                        "aplicaciones"
                    ]
                },
                {
                    model: ProductosFC,
                    as: 'producto',
                    attributes: [
                        "id",
                        "categoriaName",
                        "nombre",
                        "descripcion",
                        "urlimagen",
                        "urlthumbimage",
                        "urlhojadeventa"
                    ]
                },
            ],
            order: [
                ['id', 'DESC'],
            ],
            limit: 100
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/ventasafiliado/nuevas", (req, res) => {
        VentasAfiliado.findAll({
            include: [
                {
                    model: Users,
                    as: 'comprador',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email",
                        "aplicaciones"
                    ]
                },
                {
                    model: Users,
                    as: 'vendedor',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email",
                        "aplicaciones"
                    ]
                },
                {
                    model: ProductosFC,
                    as: 'producto',
                    attributes: [
                        "id",
                        "categoriaName",
                        "nombre",
                        "descripcion",
                        "urlimagen",
                        "urlthumbimage",
                        "urlhojadeventa"
                    ]
                },
            ],
            where: {
                status: 'pendiente'
            },
            order: [
                ['id', 'DESC'],
            ],
            limit: 100
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
    app.get("/ventasafiliado/porVendedorAfiliado/:id", (req, res) => {
        VentasAfiliado.findAll({
            include: [
                {
                    model: Users,
                    as: 'comprador',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email",
                        "aplicaciones"
                    ]
                },
                {
                    model: Users,
                    as: 'vendedor',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email",
                        "aplicaciones"
                    ]
                },
                {
                    model: ProductosFC,
                    as: 'producto',
                    attributes: [
                        "id",
                        "categoriaName",
                        "nombre",
                        "descripcion",
                        "urlimagen",
                        "urlthumbimage",
                        "urlhojadeventa"
                    ]
                },
            ],
            where: {
                idAfiliadoVendedor: req.params.id
            },
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/ventasafiliado/porComprador/:id", (req, res) => {
        VentasAfiliado.findAll({
            include: [
                {
                    model: Users,
                    as: 'comprador',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email",
                        "aplicaciones"
                    ]
                },
                {
                    model: Users,
                    as: 'vendedor',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email",
                        "aplicaciones"
                    ]
                },
                {
                    model: ProductosFC,
                    as: 'producto',
                    attributes: [
                        "id",
                        "categoriaName",
                        "nombre",
                        "descripcion",
                        "urlimagen",
                        "urlthumbimage",
                        "urlhojadeventa"
                    ]
                },
            ],
            where: {
                idUserComprador: req.params.id
            },
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/ventasafiliado/afiliados/:serial", (req, res) => {
        VentasAfiliado.findAll({
            where: {
                afiliado: req.params.serial
            },
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
    app.get("/ventasafiliado/:id", (req, res) => {
        VentasAfiliado.findOne({
            include: [
                {
                    model: Users,
                    as: 'comprador',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email",
                        "aplicaciones"
                    ]
                },
                {
                    model: Users,
                    as: 'vendedor',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email",
                        "aplicaciones"
                    ]
                },
                {
                    model: ProductosFC,
                    as: 'producto',
                    attributes: [
                        "id",
                        "categoriaName",
                        "nombre",
                        "descripcion",
                        "urlimagen",
                        "urlthumbimage",
                        "urlhojadeventa"
                    ]
                },
            ],
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
    app.delete("/ventasafiliado/:id", (req, res) => {
        VentasAfiliado.destroy({where: {id: req.params.id}})
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

    app.post("/ventasafiliado", (req, res) => {
        console.log(req.body.venta)
        VentasAfiliado.create(req.body.venta)
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                res.json({msg: error.message})
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
    app.put("/ventasafiliado", (req, res) => {
        VentasAfiliado.update(req.body.venta, {
            where: {
                id: req.body.venta.id
            }
        })
            .then(result => {
                console.log(result)
                res.json(result)
                //res.sendStatus(204)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })
}
