const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")
const date = new Date()
const request = require('request')
const fileUpload = require('express-fileupload')
const https = require("https");
Sequelize = require("sequelize")
module.exports = app => {
    const ProductosFC = app.db.models.Productosfc
    const PreciosFC = app.db.models.Preciosfc
    const SeccionesFC = app.db.models.Seccionesfc
    const LeccionesFC = app.db.models.Leccionesfc
    const PlanesFC = app.db.models.Planesfc
    const ModulosonlineFC = app.db.models.Modulosonlinefc
    const CursosactivosFC = app.db.models.CursosactivosFC
    const PromocionesFC = app.db.models.Promocionesfc
    const ProductosToPromocionesfc = app.db.models.ProductosToPromocionesfc
    const CursosFC = app.db.models.Cursosfc
    const CursospreciosFC = app.db.models.Cursospreciosfc
    const CursosplanesFC = app.db.models.Cursosplanesfc
    const CursosseccionesFC = app.db.models.Cursosseccionesfc
    const CursosmodulosonlineFC = app.db.models.Cursosmodulosonlinefc
    const CursosleccionesFC = app.db.models.Cursosleccionesfc
    const multer  = require('multer')
    const path = require('path')
    const Op = Sequelize.Op

    // SET STORAGE
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/files')
        },
        filename: function (req, file, cb) {
            console.log('file', file)
            console.log('cb', cb)
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    const upload = multer({ storage: storage })

    app.post("/productosfc/cargarimagen", upload.single('imagenproducto'), (req, res) => {
        // console.log('body', req.body)
        const file = req.files.imagenproducto
        console.log('archivo', file)
        if (!file) {
            console.log('REQUEST FILE: ', file)
            res.status(404).json({
                message: 'Image not found'
            })
        }
        res.status(200).json({
            message: 'Imagen cargada'
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
    app.get("/productosfc", (req, res) => {
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    }
                },
                { model: SeccionesFC, as: 'secciones' },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 0
                    }
                },
                { model: ModulosonlineFC, as: 'modulosonline' }
            ],
            where: {
                categoriaId: {
                    [Op.not]: 2,
                }
            },
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


    app.get("/productosfc/all", (req, res) => {
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    }
                },
                { model: SeccionesFC, as: 'secciones' },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 0
                    }
                },
                { model: ModulosonlineFC, as: 'modulosonline' }
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

    app.get("/getmodulos", (req, res) => {
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    }
                },
                { model: SeccionesFC, as: 'secciones' },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 0
                    }
                },
                { model: ModulosonlineFC, as: 'modulosonline' }
            ],
            where: {
                categoriaId: 4
            },
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

    app.get("/getproductosbycategoria/:id", (req, res) => {
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    }
                },
                { model: SeccionesFC, as: 'secciones' },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 0
                    }
                },
                { model: ModulosonlineFC, as: 'modulosonline' }
            ],
            where: {
                categoriaId: req.params.id
            },
            order: [
                ['orden', 'ASC'],
            ]
        })
            .then(result => {
                // console.log('result', result)
                res.json(result)
            })
            .catch(error => {
                console.log('error', error)
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/productosfc/bycategoria/:id", (req, res) => {
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    }
                },
                {
                    model: SeccionesFC,
                    as: 'secciones'
                },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 0
                    }
                },
                {
                    model: ModulosonlineFC,
                    as: 'modulosonline'
                }
            ],
            where: {
                categoriaId: req.params.id
            },
            order: [
                ['orden', 'ASC'],
            ]
        })
            .then(result => {
                // console.log('result', result)
                res.json(result)
            })
            .catch(error => {
                console.log('error', error)
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/productosfc/bycategoriatoadduser/:id", (req, res) => {
        ProductosFC.findAll({
            include: [],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypalProduct',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
            ],
            where: {
                categoriaId: req.params.id,
                activo: 1
            },
            order: [
                ['nombre', 'ASC'],
            ]
        })
            .then(result => {
                // console.log('result', result)
                res.json(result)
            })
            .catch(error => {
                console.log('error', error)
                res.status(412).json({msg: error.message});
            });
    });


    // PRODUCTOS ACTIVOS GENERALES
    app.get("/productosfc/activosbycategoria/:id", (req, res) => {
        let usuario = parseInt(req.query.usuario)
        let fechaactual = new Date()
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    },
                    attributes: [
                        'aceptaafiliados',
                        'aceptapagos',
                        'aceptapagosmensuales',
                        'cursosopcion',
                        'formaspagoanual',
                        'formaspagomensual',
                        'id',
                        'ofertaanual',
                        'ofertamensual',
                        'periodopago',
                        'precioanual',
                        'preciomensual',
                        'producto',
                        'productoId',
                        'showfirst',
                        'tieneofertaanual',
                        'tieneofertamensual',
                        'tipo',
                    ]
                },
                {
                    model: CursosactivosFC,
                    as: 'cursosactivosusuarios'
                }
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypalProduct',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaName',
                'categoriaName'
            ],
            where: {
                categoriaId: req.params.id,
                activo: 1,
                visibilidad: 0
            },
            order: [
                ['orden', 'ASC'],
            ]
        })
            .then(results => {
                res.json(results)
            })
            .catch(error => {
                console.log('error', error)
                res.status(412).json({msg: error.message});
            });
    });

    // PRODUCTOS DEL USUARIO
    app.get("/productosfc/byuser/bycategoria/:id", (req, res) => {
        console.log(parseInt(req.query.usuario))
        let usuario = parseInt(req.query.usuario)
        let fechaactual = Date.now()
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    },
                    attributes: [
                        'aceptaafiliados',
                        'aceptapagos',
                        'aceptapagosmensuales',
                        'cursosopcion',
                        'formaspagoanual',
                        'formaspagomensual',
                        'id',
                        'ofertaanual',
                        'ofertamensual',
                        'periodopago',
                        'precioanual',
                        'preciomensual',
                        'producto',
                        'productoId',
                        'showfirst',
                        'tieneofertaanual',
                        'tieneofertamensual',
                        'tipo',
                    ]
                },
                {
                    model: CursosactivosFC,
                    as: 'cursosactivosusuarios',
                    where: {
                        user_id: usuario,
                        // fecha_fin: {[Op.lt]: [fechaactual]}
                    },
                    order: [
                        ['fecha_fin', 'DESC'],
                    ]
                }
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypalProduct',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaName'
            ],
            where: {
                visibilidad: 0
            }
        })
            .then(results => {
                // console.log('result', result)
                results.forEach(obj => {
                    if (obj.cursosactivosusuarios && obj.cursosactivosusuarios.length > 0) {
                        let cursoactivo = obj.cursosactivosusuarios[0]
                        let fechafin = new Date(cursoactivo.fecha_fin).getTime();
                        obj.cursosactivosusuarios[0].vencido = fechaactual > fechafin;
                        // console.log(fechaactual + ' | ' + fechafin)
                    }
                })

                res.json(results)
            })
            .catch(error => {
                console.log('error', error)
                res.status(412).json({msg: error.message});
            });
    });

    // PRODUCTOS GRATUITOS
    app.get("/productosfc/free/activosbycategoria/:id", (req, res) => {
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    },
                    attributes: [
                        'aceptaafiliados',
                        'aceptapagos',
                        'aceptapagosmensuales',
                        'cursosopcion',
                        'formaspagoanual',
                        'formaspagomensual',
                        'id',
                        'ofertaanual',
                        'ofertamensual',
                        'periodopago',
                        'precioanual',
                        'preciomensual',
                        'producto',
                        'productoId',
                        'showfirst',
                        'tieneofertaanual',
                        'tieneofertamensual',
                        'tipo',
                    ]
                }
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypalProduct',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaName'
            ],
            where: {
                categoriaId: req.params.id,
                activo: 1,
                visibilidad: 1
            },
            order: [
                ['orden', 'ASC'],
            ]
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log('error', error)
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/getproductosactivosbycategoria/:id", (req, res) => {
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    }
                },
                { model: SeccionesFC, as: 'secciones' },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 0
                    }
                },
                { model: ModulosonlineFC, as: 'modulosonline' }
            ],
            where: {
                categoriaId: req.params.id,
                activo: true
            },
            order: [
                ['orden', 'ASC'],
            ]
        })
            .then(result => {
                // console.log('result', result)
                res.json(result)
            })
            .catch(error => {
                console.log('error', error)
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/productosfc/software", (req, res) => {
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    }
                },
                { model: SeccionesFC, as: 'secciones' },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 0
                    }
                },
                { model: ModulosonlineFC, as: 'modulosonline' }
            ],
            where: {
                categoriaId: {
                    [Op.notIn]: [2, 3, 5]
                }
            },
            order: [
                ['orden', 'ASC'],
            ]
        })
            .then(result => {
                // console.log('result', result)
                res.json(result)
            })
            .catch(error => {
                console.log('error', error)
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/productosfc/afiliados", (req, res) => {
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        aceptaafiliados: 1,
                        showindashboardafiliados: 1,
                        ispacket: 0
                    }
                }
            ],
            order: [
                ['orden', 'ASC'],
            ]
        })
            .then(result => {
                // console.log('result', result)
                res.json(result)
            })
            .catch(error => {
                console.log('error', error)
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/productosfc/:id", (req, res) => {
        ProductosFC.findOne({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    }
                },
                { model: SeccionesFC, as: 'secciones' },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 0
                    }
                },
                { model: ModulosonlineFC, as: 'modulosonline' }
            ],
            where: {
                id: req.params.id
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
    app.delete("/productosfc/:id", (req, res) => {
        ProductosFC.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(resultados => {
                // console.log(resultados)
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

    app.post("/productosfc", (req, res) => {
        // console.log(req.body)
        ProductosFC.create(req.body.producto)
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
    app.put("/productosfc", (req, res) => {
        // console.log('PRODUCTO A ACTUALIZAR: ', req.body.producto)
        ProductosFC.update(req.body.producto, {
            where: {
                id: req.body.producto.identificacion
            }})
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                res.status(412).json({msg: error.message});
            });
    });


    app.post("/getlistas", (req, res) => {
        const options = {
            port: 443,
            host: 'api.getresponse.com',
            path: '/v3/campaigns',
            method: 'GET',
            headers: {
                'X-Auth-Token': 'api-key 8l7bpte9yinakx90xsi7csd31xcc49ul'
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


    app.post("/getlistas/contacts", (req, res) => {
        let path = '/v3/campaigns/' + req.body.campaignId + '/contacts'
        const options = {
            port: 443,
            host: 'api.getresponse.com',
            path: path,
            method: 'GET',
            headers: {
                'X-Auth-Token': 'api-key 8l7bpte9yinakx90xsi7csd31xcc49ul'
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


    app.post("/getcontactos", (req, res) => {
        let path = '/v3/contacts'
        const options = {
            port: 443,
            host: 'api.getresponse.com',
            path: path,
            method: 'GET',
            headers: {
                'X-Auth-Token': 'api-key 8l7bpte9yinakx90xsi7csd31xcc49ul'
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


    app.post("/crearcontacto", (req, res) => {
        console.log('usuario ', req.body.usuario)
        const options = {
            port: 443,
            host: 'api.getresponse.com',
            path: '/v3/contacts',
            method: 'POST',
            headers: {
                'X-Auth-Token': 'api-key 8l7bpte9yinakx90xsi7csd31xcc49ul',
                'Content-Type': 'application/json'
            },
            maxRedirects: 20
        };

        const postRequest = https.request(options, response => {
            const buf = [];
            response.on('data', chunk => {
                buf.push(Buffer.from(chunk));
                // console.log(JSON.stringify(buf))
            });
            response.on('end', () => {
                const jsonString = Buffer.concat(buf).toString('utf8');
                // console.log(jsonString)
                try {
                    res.json(jsonString)
                } catch (error) {
                    console.log(error)
                }
            });
            response.on("error", function (error) {
                console.error(error);
            });
        });

        let postData = JSON.stringify(req.body.usuario);

        postRequest.write(postData);

        postRequest.end();
    });


    app.post("/gettagsgetresponse", (req, res) => {
        let path = '/v3/tags'
        const options = {
            port: 443,
            host: 'api.getresponse.com',
            path: path,
            method: 'GET',
            headers: {
                'X-Auth-Token': 'api-key 8l7bpte9yinakx90xsi7csd31xcc49ul'
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


    app.post("/getCustomFieldsGetResponse", (req, res) => {
        let path = '/v3/custom-fields'
        const options = {
            port: 443,
            host: 'api.getresponse.com',
            path: path,
            method: 'GET',
            headers: {
                'X-Auth-Token': 'api-key 8l7bpte9yinakx90xsi7csd31xcc49ul'
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


    app.get("/reparartablaproductosfc", (req, res) => {
        ProductosFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 0
                    }
                },
                { model: SeccionesFC, as: 'secciones' },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 0
                    }
                },
                { model: ModulosonlineFC, as: 'modulosonline' }
            ],
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(results => {
                if (results && results.length > 0) {
                    results.forEach(obj => {
                        let curso = {
                            idPaypal: obj.idPaypalProduct,
                            categoriaId: obj.categoriaId,
                            subcategoriaId: obj.subcategoriaId,
                            keywords: obj.keywords,
                            tipo: 'INDIVIDUAL',
                            nombre: obj.nombre,
                            nombre_comercial: obj.nombre_comercial,
                            descripcion: obj.descripcion,
                            resumen: obj.resumen,
                            detalles: obj.detalles,
                            videourl: obj.videourl,
                            configuraciones: obj.configuraciones,
                            urlimagen: obj.urlimagen,
                            metatitle: obj.metatitle,
                            metakeyword: obj.metakeyword,
                            metadescripcion: obj.metadescripcion,
                            author: obj.author,
                            certificados: obj.certificados,
                            urlhojadeventa: obj.urlhojadeventa,
                            modalidad: obj.modalidad,
                            pais: obj.pais,
                            callback: obj.callback,
                            grupowhatsapp: obj.grupowhatsapp,
                            visibilidad: obj.visibilidad,
                            listas: obj.listas,
                            orden: obj.orden,
                            activo: obj.activo
                        }

                        CursosFC.create(curso)
                            .then(resultado => {
                                let precios = obj.precios
                                if (precios && precios.length > 0) {
                                    precios.forEach(p => {
                                        let precio = {
                                            productoId: resultado.id,
                                            opcion: p.opcion,
                                            tipo: p.tipo,
                                            tieneofertaanual: p.tieneofertaanual,
                                            tieneofertamensual: p.tieneofertamensual,
                                            preciomensual: p.preciomensual,
                                            precioanual: p.precioanual,
                                            ofertamensual: p.ofertamensual,
                                            ofertaanual: p.ofertaanual,
                                            aceptapagosmensuales: p.aceptapagosmensuales,
                                            cantidadpagos: p.cantidadpagos,
                                            periodopago: p.periodopago,
                                            formaspagomensual: p.formaspagomensual,
                                            formaspagoanual: p.formaspagoanual,
                                            idPlanPaypal: p.idPlanPaypal,
                                            aceptapagos: p.aceptapagos,
                                            showfirst: p.showfirst,
                                            active: p.active,
                                            aceptaafiliados: p.aceptaafiliados,
                                            tipocomisionafiliados: p.tipocomisionafiliados,
                                            comisionafiliados: p.comisionafiliados,
                                            showindashboardafiliados: p.showindashboardafiliados,
                                            cursosopcion: p.cursosopcion,
                                            caracteristicasadicionalesprecio: p.caracteristicasadicionalesprecio,
                                            incluyeevaluacion: p.incluyeevaluacion
                                        }

                                        CursospreciosFC.create(precio)
                                    })
                                }

                                let planes = obj.planes
                                if (planes && planes.length > 0) {
                                    planes.forEach(p => {
                                        let pl = {
                                            productoId: resultado.id,
                                            opcion: p.opcion,
                                            storage: p.storage,
                                            plan: p.plan,
                                            comprobantes: p.comprobantes,
                                            empresasp: p.empresasp,
                                            incluye: p.incluye,
                                        }
                                        CursosplanesFC.create(pl)
                                    })
                                }

                                let secciones = obj.secciones
                                if (secciones && secciones.length > 0) {
                                    secciones.forEach(s => {
                                        let seccion = {
                                            cursoId: resultado.id,
                                            orden: s.orden,
                                            titulo: s.titulo,
                                            descripcion: s.descripcion
                                        }
                                        CursosseccionesFC.create(seccion).then(resinsert => {
                                            if (s.lecciones) {
                                                let lecciones = JSON.parse(s.lecciones)
                                                if (lecciones && lecciones.length > 0) {
                                                    lecciones.forEach(l => {
                                                        let leccion = {
                                                            cursoId: l.cursoId,
                                                            seccionId: resinsert.id,
                                                            guia: l.guia,
                                                            mapamental: l.mapamental,
                                                            ejercicio: l.ejercicio,
                                                            modulo: l.modulo,
                                                            orden: l.orden,
                                                            otros: JSON.stringify(l.otros),
                                                            titulo: l.titulo,
                                                            videourl: l.videourl,
                                                            visibilidad: l.visibilidad
                                                        }
                                                        CursosleccionesFC.create(leccion)
                                                    })
                                                }
                                            }
                                        })

                                    })
                                }

                                let modulosonline = obj.modulosonline
                                if (modulosonline && modulosonline.length > 0) {
                                    modulosonline.forEach(m => {
                                        let modulo = {
                                            cursoId: resultado.id,
                                            enlace: m.enlace,
                                            idreunion: m.idreunion,
                                            codigoacceso: m.codigoacceso,
                                            horario: m.horario,
                                            observaciones: m.observaciones,
                                        }
                                        CursosmodulosonlineFC.create(modulo)
                                    })
                                }

                            })
                            .catch(error => {
                                console.log(error)
                            });
                    })
                }
                res.json(results)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

}
