const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")
const date = new Date()
const request = require('request')
const fileUpload = require('express-fileupload')
const https = require("https");
const multer = require("multer");
const path = require("path");
Sequelize = require("sequelize")
module.exports = app => {
    const CursosFC = app.db.models.Cursosfc
    const CursospreciosFC = app.db.models.Cursospreciosfc
    const CursosseccionesFC = app.db.models.Cursosseccionesfc
    const CursosleccionesFC = app.db.models.Cursosleccionesfc
    const CursosplanesFC = app.db.models.Cursosplanesfc
    const CursosmodulosonlineFC = app.db.models.Cursosmodulosonlinefc
    const CursosactivosFC = app.db.models.CursosactivosFC
    const PromocionesFC = app.db.models.Promocionesfc
    const ProductosToPromocionesfc = app.db.models.ProductosToPromocionesfc
    const CategoriasFC = app.db.models.Categoriasfc
    const CursostocategoriasFC = app.db.models.Cursostocategoriasfc
    const CursostosubcategoriasFC = app.db.models.Cursostosubcategoriasfc
    const SubcategoriasFC = app.db.models.Subcategoriasfc
    const CursostopackFC = app.db.models.Cursostopackfc
    const UsersFC = app.db.models.Cursosfc
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

    app.post("/cursosfc/cargarimagen", upload.single('imagenproducto'), (req, res) => {
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
    app.get("/cursosfc", (req, res) => {
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios',
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
                        'productoId',
                        'showfirst',
                        'tieneofertaanual',
                        'tieneofertamensual',
                        'tipo',
                    ]
                },
                {
                    model: CursostocategoriasFC,
                    as: 'categorias',
                    include: [
                        {
                            model: CategoriasFC,
                            as: 'category',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'categoriaId'
                    ]
                },
                {
                    model: CursostosubcategoriasFC,
                    as: 'subcategorias',
                    include: [
                        {
                            model: SubcategoriasFC,
                            as: 'subcategory',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'subcategoriaId'
                    ]
                },
                {
                    model: CursosseccionesFC,
                    as: 'cursossecciones',
                    include: [
                        {
                            model: CursosleccionesFC,
                            as: 'courseslessons',
                            where: {
                                visibilidad: '1'
                            }
                        }
                    ]
                },
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypal',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaId',
                'categoriaId',
                'keywords',
                'activo',
                'tipo'
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

    app.get("/cursosfc/all", (req, res) => {
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios'
                },
                { model: CursosseccionesFC, as: 'cursossecciones' },
                {
                    model: CursosplanesFC,
                    as: 'cursosplanes'
                },
                { model: CursosmodulosonlineFC, as: 'cursosmodulosonline' }
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

    app.get("/cursosfc/activos", (req, res) => {
        CursosFC.findAll({
            where: {
               activo: 1,
               tipo: 'PACK'
            },
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios',
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
                        'productoId',
                        'showfirst',
                        'tieneofertaanual',
                        'tieneofertamensual',
                        'tipo',
                    ]
                },
                {
                    model: CursostocategoriasFC,
                    as: 'categorias',
                    include: [
                        {
                            model: CategoriasFC,
                            as: 'category',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'categoriaId'
                    ]
                },
                {
                    model: CursostosubcategoriasFC,
                    as: 'subcategorias',
                    include: [
                        {
                            model: SubcategoriasFC,
                            as: 'subcategory',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'subcategoriaId'
                    ]
                },
                {
                    model: CursosseccionesFC,
                    as: 'cursossecciones',
                    include: [
                        {
                            model: CursosleccionesFC,
                            as: 'courseslessons',
                            where: {
                                visibilidad: '1'
                            }
                        }
                    ]
                },
                {
                    model: CursosplanesFC,
                    as: 'cursosplanes'
                },
                { model: CursosmodulosonlineFC, as: 'cursosmodulosonline' }
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypal',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaId',
                'categoriaId',
                'keywords',
                'activo'
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

    app.get("/cursosfc/getmodulos", (req, res) => {
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios'
                },
                { model: CursosseccionesFC, as: 'cursossecciones' },
                {
                    model: CursosplanesFC,
                    as: 'cursosplanes'
                },
                { model: CursosmodulosonlineFC, as: 'cursosmodulosonline' }
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

    app.get("/cursosfc/getproductosbycategoria/:id", (req, res) => {
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios'
                },
                { model: CursosseccionesFC, as: 'cursossecciones' },
                {
                    model: CursosplanesFC,
                    as: 'cursosplanes'
                },
                { model: CursosmodulosonlineFC, as: 'cursosmodulosonline' }
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

    app.get("/cursosfc/bycategoria/:id", (req, res) => {
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios'
                },
                {
                    model: CursosseccionesFC,
                    as: 'cursossecciones'
                },
                {
                    model: CursosplanesFC,
                    as: 'cursosplanes'
                },
                {
                    model: CursosmodulosonlineFC,
                    as: 'cursosmodulosonline'
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

    app.get("/cursosfc/bycategoriatoadduser", (req, res) => {
        CursosFC.findAll({
            include: [],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypal',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'tipo'
            ],
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
    app.get("/cursosfc/activosbycategoria/:id", (req, res) => {
        let usuario = parseInt(req.query.usuario)
        let fechaactual = new Date()
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios',
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
                        'productoId',
                        'showfirst',
                        'tieneofertaanual',
                        'tieneofertamensual',
                        'tipo',
                    ]
                },
                {
                    model: CursosactivosFC,
                    as: 'cursosactivosporusuarios'
                },
                {
                    model: CursostocategoriasFC,
                    as: 'categorias',
                    include: [
                        {
                            model: CategoriasFC,
                            as: 'category',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'categoriaId'
                    ]
                },
                {
                    model: CursostosubcategoriasFC,
                    as: 'subcategorias',
                    include: [
                        {
                            model: SubcategoriasFC,
                            as: 'subcategory',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'subcategoriaId'
                    ]
                }
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypal',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaId',
                'categoriaId'
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
                // console.log('results', results.length)
                let cursosusuario = []
                let cursosnousuario = []
                if (results && results.length > 0) {
                    results.forEach(obj => {
                        // console.log('cursosactivosporusuarios', obj.cursosactivosporusuarios)
                        if (obj.cursosactivosporusuarios && obj.cursosactivosporusuarios.length > 0) {
                            obj.cursosactivosporusuarios.forEach(cau => {
                                // console.log('cau', cau)
                                if (cau.user_id === parseInt(req.query.usuario)) {
                                    if (!cursosusuario.includes(obj.id)) {
                                        cursosusuario.push(obj.id)
                                    }
                                } else {
                                    if (!cursosnousuario.includes(obj.id)) {
                                        cursosnousuario.push(obj.id)
                                    }
                                }
                            })
                        }
                    })
                }
                let cursos = []
                if (cursosnousuario.length > 0) {
                    cursosnousuario.forEach(obj => {
                        if (!cursosusuario.includes(obj)) {
                            cursos.push(obj)
                        }
                    })
                }

                let resultados = []
                if (cursos.length > 0) {
                    if (results && results.length > 0) {
                        results.forEach((obj, index) => {
                            cursos.forEach(item => {
                                if (item === obj.id) {
                                    resultados.push(obj)
                                }
                            })
                            if (results.length === (index + 1)) {
                                res.json(resultados)
                            }
                        })
                    }
                } else {
                    res.json(results)
                }

            })
            .catch(error => {
                console.log('error', error)
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/cursosfc/allbycategoria/:id", (req, res) => {
        let fechaactual = new Date()
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios',
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
                        'productoId',
                        'showfirst',
                        'tieneofertaanual',
                        'tieneofertamensual',
                        'tipo',
                    ]
                },
                {
                    model: CursostocategoriasFC,
                    as: 'categorias',
                    include: [
                        {
                            model: CategoriasFC,
                            as: 'category',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'categoriaId'
                    ]
                },
                {
                    model: CursostosubcategoriasFC,
                    as: 'subcategorias',
                    include: [
                        {
                            model: SubcategoriasFC,
                            as: 'subcategory',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'subcategoriaId'
                    ]
                },
                {
                    model: CursosseccionesFC,
                    as: 'cursossecciones',
                    include: [
                        {
                            model: CursosleccionesFC,
                            as: 'courseslessons',
                            where: {
                                visibilidad: '1'
                            }
                        }
                    ]
                },
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypal',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaId',
                'categoriaId',
                'keywords',
                'activo'
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

    app.get("/cursosfc/all/bycategoria/:id", (req, res) => {
        let fechaactual = new Date()
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios',
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
                        'productoId',
                        'showfirst',
                        'tieneofertaanual',
                        'tieneofertamensual',
                        'tipo',
                    ]
                },
                {
                    model: CursosplanesFC,
                    as: 'cursosplanes'
                },
                {
                    model: CursostocategoriasFC,
                    as: 'categorias',
                    include: [
                        {
                            model: CategoriasFC,
                            as: 'category',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'id',
                        'cursoId',
                        'categoriaId'
                    ]
                },
                {
                    model: CursostosubcategoriasFC,
                    as: 'subcategorias',
                    include: [
                        {
                            model: SubcategoriasFC,
                            as: 'subcategory',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'subcategoriaId'
                    ]
                },
                {
                    model: CursosseccionesFC,
                    as: 'cursossecciones',
                    include: [
                        {
                            model: CursosleccionesFC,
                            as: 'courseslessons',
                            where: {
                                visibilidad: '1'
                            }
                        }
                    ]
                },
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypal',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaId',
                'categoriaId',
                'keywords',
                'activo'
            ],
            where: {
                categoriaId: req.params.id
            },
            order: [
                ['id', 'DESC'],
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

    // PRODUCTOS GRATUITOS
    app.get("/cursosfc/free/activosbycategoria/:id", (req, res) => {
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios',
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
                        'productoId',
                        'showfirst',
                        'tieneofertaanual',
                        'tieneofertamensual',
                        'tipo',
                    ]
                },
                {
                    model: CursostocategoriasFC,
                    as: 'categorias',
                    include: [
                        {
                            model: CategoriasFC,
                            as: 'category',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'categoriaId'
                    ]
                },
                {
                    model: CursostosubcategoriasFC,
                    as: 'subcategorias',
                    include: [
                        {
                            model: SubcategoriasFC,
                            as: 'subcategory',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'subcategoriaId'
                    ]
                }
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypal',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaId'
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

    app.get("/cursosfc/getproductosactivosbycategoria/:id", (req, res) => {
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios'
                },
                { model: CursosseccionesFC, as: 'cursossecciones' },
                {
                    model: CursosplanesFC,
                    as: 'cursosplanes'
                },
                { model: CursosmodulosonlineFC, as: 'cursosmodulosonline' },
                {
                    model: CursostocategoriasFC,
                    as: 'categorias',
                    include: [
                        {
                            model: CategoriasFC,
                            as: 'category',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'categoriaId'
                    ]
                },
                {
                    model: CursostosubcategoriasFC,
                    as: 'subcategorias',
                    include: [
                        {
                            model: SubcategoriasFC,
                            as: 'subcategory',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'subcategoriaId'
                    ]
                }
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypal',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaId'
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

    app.get("/cursosfc/software", (req, res) => {
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios'
                },
                {
                    model: CursosseccionesFC,
                    as: 'cursossecciones'
                },
                {
                    model: CursosplanesFC,
                    as: 'cursosplanes'
                },
                { model: CursosmodulosonlineFC, as: 'cursosmodulosonline' }
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

    app.get("/cursosfc/afiliados", (req, res) => {
        CursosFC.findAll({
            include: [
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios',
                    where: {
                        aceptaafiliados: 1,
                        showindashboardafiliados: 1
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

    app.get("/cursosfc/inopcionprecio/:id", (req, res) => {
        CursosFC.findOne({
            attributes: [
                'id',
                'activo',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypal',
                'modalidad',
                'nombre',
                'pais',
                'subcategoriaId',
                'tipo',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad'
            ],
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                res.status(412).json({msg: error.message});
            });

    });

    app.get("/cursosfc/:id", (req, res) => {
        CursosFC.findOne({
            include: [
                {
                    model: CursostopackFC,
                    as: 'items',
                    include: [
                        {
                            model: CursosFC,
                            as: 'infopack',
                            attributes: [
                                'id',
                                'descripcion',
                                'detalles',
                                'grupowhatsapp',
                                'idPaypal',
                                'modalidad',
                                'nombre',
                                'pais',
                                'urlhojadeventa',
                                'urlimagen',
                                'visibilidad',
                                'subcategoriaId',
                                'tipo',
                                'activo'
                            ]
                        }
                    ]
                },
                {
                    model: CursospreciosFC,
                    as: 'cursosprecios',
                    attributes: [
                        'aceptaafiliados',
                        'aceptapagos',
                        'aceptapagosmensuales',
                        'formaspagoanual',
                        'formaspagomensual',
                        'id',
                        'ofertaanual',
                        'ofertamensual',
                        'periodopago',
                        'precioanual',
                        'preciomensual',
                        'productoId',
                        'showfirst',
                        'tieneofertaanual',
                        'tieneofertamensual',
                        'tipo',
                        'opcion',
                        'idPlanPaypal',
                        'cantidadpagos',
                        'periodopago',
                        'tipocomisionafiliados',
                        'comisionafiliados',
                        'showindashboardafiliados',
                        'caracteristicasadicionalesprecio',
                        'cursosopcion',
                        'incluyeevaluacion'
                    ],
                    order: [
                        ['opcion', 'ASC']
                    ]
                },
                {
                    model: CursosplanesFC,
                    as: 'cursosplanes',
                    attributes: [
                        'id',
                        'productoId',
                        'opcion',
                        'storage',
                        'plan',
                        'comprobantes',
                        'empresasp',
                        'incluye'
                    ]
                },
                {
                    model: CursosmodulosonlineFC,
                    as: 'cursosmodulosonline',
                    attributes: [
                        'id',
                        'enlace',
                        'idreunion',
                        'codigoacceso',
                        'horario',
                        'observaciones'
                    ]
                },
                {
                    model: CursostocategoriasFC,
                    as: 'categorias',
                    include: [
                        {
                            model: CategoriasFC,
                            as: 'category',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'categoriaId'
                    ]
                },
                {
                    model: CursostosubcategoriasFC,
                    as: 'subcategorias',
                    include: [
                        {
                            model: SubcategoriasFC,
                            as: 'subcategory',
                            attributes: [
                                'nombre'
                            ]
                        }
                    ],
                    attributes: [
                        'cursoId',
                        'subcategoriaId'
                    ]
                }
            ],
            attributes: [
                'id',
                'descripcion',
                'resumen',
                'detalles',
                'grupowhatsapp',
                'idPaypal',
                'modalidad',
                'nombre',
                'nombre_comercial',
                'pais',
                'urlhojadeventa',
                'urlimagen',
                'visibilidad',
                'subcategoriaId',
                'certificados',
                'metatitle',
                'metakeyword',
                'metadescripcion',
                'callback',
                'urlimagen',
                'videourl',
                'author',
                'keywords',
                'listas',
                'tipo',
                'activo',
                'incluyetutorias',
                'categoriaId'
            ],
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                if (result) {
                    let cursossecciones = []
                    CursosseccionesFC.findAll({
                        where: {
                            cursoId: result.id
                        },
                        attributes: [
                            'id',
                            'cursoId',
                            'orden',
                            'titulo',
                            'descripcion',
                            'lecciones'
                        ],
                        order: [
                            ['orden', 'ASC']
                        ]
                    })
                        .then(resultados => {
                            if (resultados && resultados.length > 0) {
                                resultados.forEach((seccion, index) => {
                                    CursosleccionesFC.findAll({
                                        where: {
                                            seccionId: seccion.id
                                        },
                                        order: [
                                            ['orden', 'ASC']
                                        ]
                                    })
                                        .then(lecciones => {
                                            if (lecciones && lecciones.length > 0) {
                                                seccion.lecciones = lecciones
                                            } else {
                                                seccion.lecciones = []
                                            }
                                        })
                                    cursossecciones = resultados
                                })
                            }
                            setTimeout(() => {
                                res.json({
                                    id: result.id,
                                    descripcion: result.descripcion,
                                    resumen: result.resumen,
                                    detalles: result.detalles,
                                    grupowhatsapp: result.grupowhatsapp,
                                    idPaypal: result.idPaypal,
                                    modalidad: result.modalidad,
                                    nombre: result.nombre,
                                    nombre_comercial: result.nombre_comercial,
                                    pais: result.pais,
                                    urlhojadeventa: result.urlhojadeventa,
                                    urlimagen: result.urlimagen,
                                    visibilidad: result.visibilidad,
                                    subcategoriaId: result.subcategoriaId,
                                    certificados: result.certificados,
                                    metatitle: result.metatitle,
                                    metakeyword: result.metakeyword,
                                    metadescripcion: result.metadescripcion,
                                    callback: result.callback,
                                    videourl: result.videourl,
                                    author: result.author,
                                    keywords: result.keywords,
                                    listas: result.listas,
                                    tipo: result.tipo,
                                    activo: result.activo,
                                    incluyetutorias: result.incluyetutorias,
                                    categoriaId: result.categoriaId,
                                    items: result.items,
                                    cursosprecios: result.cursosprecios,
                                    cursosplanes: result.cursosplanes,
                                    cursosmodulosonline: result.cursosmodulosonline,
                                    categorias: result.categorias,
                                    subcategorias: result.subcategorias,
                                    cursossecciones: cursossecciones
                                })
                            }, 1000)
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(412).json({msg: error.message});
                        });
                } else {
                    res.json(null)
                }
            })
            .catch(error => {
                    console.log(error)
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
    app.delete("/cursosfc/:id", (req, res) => {
        CursosFC.destroy({
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
    app.post("/cursosfc", (req, res) => {
        // console.log(req.body)
        CursosFC.create(req.body.producto)
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
    app.put("/cursosfc", (req, res) => {
        // console.log('PRODUCTO A ACTUALIZAR: ', req.body.producto)
        CursosFC.update(req.body.producto, {
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

    app.post("/cursosfc/getlistas", (req, res) => {
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

    app.post("/cursosfc/getlistas/contacts", (req, res) => {
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

    app.post("/cursosfc/getcontactos", (req, res) => {
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

    app.post("/cursosfc/crearcontacto", (req, res) => {
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

    app.post("/cursosfc/gettagsgetresponse", (req, res) => {
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

    app.post("/cursosfc/getCustomFieldsGetResponse", (req, res) => {
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

    app.get("/reparartablacursosfc", (req, res) => {
        CursosFC.findAll({
            attributes: [
                'id',
                'subcategoriaId'
            ],
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(results => {
                if (results && results.length > 0) {
                    results.forEach(obj => {
                        let cursotosubcategoria = {
                            cursoId: obj.id,
                            subcategoriaId: obj.subcategoriaId
                        }
                        CursostosubcategoriasFC.create(cursotosubcategoria)
                    })
                }
                res.json(results)
            })
            .catch(error => {
                console.log(error)
                res.status(412).json({msg: error.message});
            });
    });

}
