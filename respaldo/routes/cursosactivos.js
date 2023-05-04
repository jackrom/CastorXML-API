Sequelize = require("sequelize")
module.exports = app => {
    const CursosactivosFC = app.db.models.CursosactivosFC
    const CursosFC = app.db.models.Cursosfc
    const CursospreciosFC = app.db.models.Cursospreciosfc
    const CursostocategoriasFC = app.db.models.Cursostocategoriasfc
    const CursostosubcategoriasFC = app.db.models.Cursostosubcategoriasfc
    const CategoriasFC = app.db.models.Categoriasfc
    const SubcategoriasFC = app.db.models.Subcategoriasfc
    const CursostopackFC = app.db.models.Cursostopackfc
    const PromocionesFC = app.db.models.Promocionesfc
    const ProductosToPromocionesfc = app.db.models.ProductosToPromocionesfc
    const ProductosFC = app.db.models.Productosfc
    const CursosseccionesFC = app.db.models.Cursosseccionesfc
    const CursosleccionesFC = app.db.models.Cursosleccionesfc
    const CursosmodulosonlineFC = app.db.models.Cursosmodulosonlinefc
    const multer  = require('multer')
    const path = require('path')
    const Op = Sequelize.Op

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
    app.get("/cursosactivosfc", (req, res) => {
        CursosactivosFC.findAll({
            include: [
                {
                    model: PromocionesFC,
                    as: 'promocion'
                },
                {
                    model: ProductosFC,
                    as: 'producto'
                },
            ],
            order: [
                ['id', 'DESC'],
            ],
            limit: 1
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/cursosactivosfc/packets", (req, res) => {
        CursosactivosFC.findAll({
            include: [
                {
                    model: PromocionesFC,
                    as: 'promocion',
                    include: [
                        {
                            model: ProductosToPromocionesfc,
                            as: 'allproductos',
                            include: [
                                {
                                    model: ProductosFC,
                                    as: 'detallescurso',
                                    attributes: [
                                        "idPaypalProduct",
                                        "categoriaId",
                                        "categoriaName",
                                        "subcategoriaId",
                                        "subcategoriaName",
                                        "tipo",
                                        "productoPadreId",
                                        "productoPadreNombre",
                                        "nombre",
                                        "nombre_comercial",
                                        "descripcion",
                                        "resumen",
                                        "detalles",
                                        "videourl",
                                        "configuraciones",
                                        "urlimagen",
                                        "urlthumbimage",
                                        "author",
                                        "certificados",
                                        "urlhojadeventa",
                                        "modalidad",
                                        "pais",
                                        "callback",
                                        "grupowhatsapp",
                                        "visibilidad",
                                        "orden",
                                        "activo"
                                    ]
                                }
                            ],
                            attributes: [
                                "id",
                                "productoId"
                            ],
                        }
                    ],
                    attributes: [
                        "id",
                        "idPaypalPromo",
                        "nombre",
                        "nombre_comercial",
                        "descripcion",
                        "resumen",
                        "categoriaId",
                        "categoriaName",
                        "detalles",
                        "videourl",
                        "activo",
                        "fechainicio",
                        "fechafinal",
                        "duracionpromo",
                        "tiempoacceso",
                        "urlhojadeventa",
                        "urlimagenpromocional",
                        "metatitle",
                        "metakeyword",
                        "metadescripcion",
                        "certificados",
                        "modalidad",
                        "pais",
                        "callback",
                        "grupowhatsapp",
                        "visibilidad",
                        "incluyetutorias",
                        "listas",
                        "orden",
                        "createdAt",
                        "updatedAt",
                    ],
                }
            ],
            where: {
                ispacket: 1
            },
            order: [
                ['id', 'DESC'],
            ],
            limit: 1
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/cursosactivosfc/cursos", (req, res) => {
        CursosactivosFC.findAll({
            include: [
                {
                    model: ProductosFC,
                    as: 'producto'
                },
            ],
            where: {
                ispacket: 0
            },
            order: [
                ['id', 'DESC'],
            ],
            limit: 1
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
    app.get("/cursosactivosfc/byusuario/:userid", (req, res) => {
        // console.log(req.params.id)
        let fechaactual = Date.now()
        CursosactivosFC.findAll({
            include: [
                {
                    model: CursosFC,
                    as: 'cursosproducto',
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
                        'tipo'
                    ],
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
                                'tieneofertamensual'
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
                            model: CursosmodulosonlineFC,
                            as: 'cursosmodulosonline'
                        }
                    ]
                }
            ],
            where: {
                user_id: req.params.userid
            },
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(results => {
                let cursos = []
                let packs = []
                if (results && results.length > 0) {
                    results.forEach((obj, index) => {
                        if (obj.cursosproducto && (obj.cursosproducto.tipo === 'INDIVIDUAL' && !obj.cursosproducto.visibilidad)) {
                            let fechafin = new Date(obj.fecha_fin).getTime();
                            obj.vencido = fechaactual > fechafin;
                            let curso = {
                                categoriaId: obj.cursosproducto.categorias[0].categoriaId,
                                categorias: obj.cursosproducto.categorias,
                                cursosprecios: obj.cursosproducto.cursosprecios,
                                descripcion: obj.cursosproducto.descripcion,
                                detalles: obj.cursosproducto.detalles,
                                grupowhatsapp: obj.cursosproducto.grupowhatsapp,
                                id: obj.cursosproducto.id,
                                idPaypal: obj.cursosproducto.idPaypal,
                                modalidad: obj.cursosproducto.modalidad,
                                nombre: obj.cursosproducto.nombre,
                                pais: obj.cursosproducto.pais,
                                subcategoriaId: obj.cursosproducto.subcategoriaId,
                                subcategorias: obj.cursosproducto.subcategorias,
                                urlhojadeventa: obj.cursosproducto.urlhojadeventa,
                                urlimagen: obj.cursosproducto.urlimagen,
                                visibilidad: obj.cursosproducto.visibilidad,
                                fecha_activacion: obj.fecha_activacion,
                                fecha_fin: obj.fecha_fin,
                                vencido: obj.vencido
                            }
                            cursos.push(curso)


                        } else if (obj.cursosproducto && obj.cursosproducto.tipo === 'PACK') {
                            let fechafin = new Date(obj.fecha_fin).getTime();
                            obj.vencido = fechaactual > fechafin;
                            let pack = {
                                id: obj.cursosproducto.id,
                                fecha_activacion: obj.fecha_activacion,
                                fecha_fin: obj.fecha_fin,
                                vencido: obj.vencido
                            }
                            packs.push(pack)
                        }
                    })

                    res.json({cursos, packs})
                }
            })
            .catch(error => {
                console.log(error)
            });


    });

    app.get("/cursosactivosfc/all/byusuario/:userid", (req, res) => {
        // console.log(req.params.id)
        let fechaactual = Date.now()
        CursosactivosFC.findAll({
            include: [
                {
                    model: CursosFC,
                    as: 'cursosproducto',
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
                        'tipo'
                    ],
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
                                'tieneofertamensual'
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
                            model: CursosmodulosonlineFC,
                            as: 'cursosmodulosonline'
                        }
                    ],
                    where: {
                        categoriaId: { [Op.or]: [2, 5] }
                    }
                }
            ],
            where: {
                user_id: req.params.userid
            },
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(results => {
                // res.json({results})
                let cursos = []
                if (results && results.length > 0) {
                    results.forEach((obj, index) => {
                        if (obj.cursosproducto) {
                            let fechafin = new Date(obj.fecha_fin).getTime();
                            obj.vencido = fechaactual > fechafin;
                            let curso = {
                                categoriaId: (obj.cursosproducto.categorias && obj.cursosproducto.categorias.length > 0) ? obj.cursosproducto.categorias[0].categoriaId : null,
                                categorias: obj.cursosproducto.categorias,
                                cursosprecios: obj.cursosproducto.cursosprecios,
                                descripcion: obj.cursosproducto.descripcion,
                                detalles: obj.cursosproducto.detalles,
                                grupowhatsapp: obj.cursosproducto.grupowhatsapp,
                                id: obj.cursosproducto.id,
                                idPaypal: obj.cursosproducto.idPaypal,
                                modalidad: obj.cursosproducto.modalidad,
                                nombre: obj.cursosproducto.nombre,
                                pais: obj.cursosproducto.pais,
                                subcategoriaId: obj.cursosproducto.subcategoriaId,
                                subcategorias: obj.cursosproducto.subcategorias,
                                urlhojadeventa: obj.cursosproducto.urlhojadeventa,
                                urlimagen: obj.cursosproducto.urlimagen,
                                visibilidad: obj.cursosproducto.visibilidad,
                                fecha_activacion: obj.fecha_activacion,
                                fecha_fin: obj.fecha_fin,
                                vencido: obj.vencido,
                                tipo: obj.cursosproducto.tipo
                            }
                            cursos.push(curso)
                        }
                    })

                    res.json({cursos})
                } else {
                    res.json({cursos})
                }
            })
            .catch(error => {
                console.log(error)
            });
    });

    app.get("/cursosactivosfc/bypack/coursesinto/:userid/:cursoId", (req, res) => {
        // console.log(req.params.id)
        let fechaactual = Date.now()
        CursosactivosFC.findAll({
            include: [
                {
                    model: CursosFC,
                    as: 'cursosproducto',
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
                        'tipo'
                    ],
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
                                'tieneofertamensual'
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
                            model: CursosmodulosonlineFC,
                            as: 'cursosmodulosonline'
                        }
                    ],
                    where: {
                        categoriaId: { [Op.or]: [2, 5] }
                    }
                }
            ],
            where: {
                user_id: req.params.userid,
                idCurso: req.params.cursoId
            },
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(results => {
                // res.json({results})
                let cursos = []
                let packs = []
                if (results && results.length > 0) {
                    results.forEach((obj, index) => {
                        if (obj.cursosproducto && (obj.cursosproducto.tipo === 'INDIVIDUAL' && !obj.cursosproducto.visibilidad)) {
                            let fechafin = new Date(obj.fecha_fin).getTime();
                            obj.vencido = fechaactual > fechafin;
                            let curso = {
                                categoriaId: obj.cursosproducto.categorias[0].categoriaId,
                                categorias: obj.cursosproducto.categorias,
                                cursosprecios: obj.cursosproducto.cursosprecios,
                                descripcion: obj.cursosproducto.descripcion,
                                detalles: obj.cursosproducto.detalles,
                                grupowhatsapp: obj.cursosproducto.grupowhatsapp,
                                id: obj.cursosproducto.id,
                                idPaypal: obj.cursosproducto.idPaypal,
                                modalidad: obj.cursosproducto.modalidad,
                                nombre: obj.cursosproducto.nombre,
                                pais: obj.cursosproducto.pais,
                                subcategoriaId: obj.cursosproducto.subcategoriaId,
                                subcategorias: obj.cursosproducto.subcategorias,
                                urlhojadeventa: obj.cursosproducto.urlhojadeventa,
                                urlimagen: obj.cursosproducto.urlimagen,
                                visibilidad: obj.cursosproducto.visibilidad,
                                fecha_activacion: obj.fecha_activacion,
                                fecha_fin: obj.fecha_fin,
                                vencido: obj.vencido
                            }
                            cursos.push(curso)


                        } else if (obj.cursosproducto && obj.cursosproducto.tipo === 'PACK') {
                            let fechafin = new Date(obj.fecha_fin).getTime();
                            obj.vencido = fechaactual > fechafin;
                            let pack = {
                                id: obj.cursosproducto.id,
                                fecha_activacion: obj.fecha_activacion,
                                fecha_fin: obj.fecha_fin,
                                vencido: obj.vencido
                            }
                            packs.push(pack)
                        }
                    })

                    res.json({cursos, packs})
                }
            })
            .catch(error => {
                console.log(error)
            });
    });

    app.get("/cursosactivosfc/bycourse/:user/:curso", (req, res) => {
        CursosactivosFC.findOne({
            include: [
                {
                    model: CursosFC,
                    as: 'cursosproducto',
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
                        'tipo'
                    ],
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
                                'tieneofertamensual'
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
                            model: CursosmodulosonlineFC,
                            as: 'cursosmodulosonline'
                        }
                    ]
                }
            ],
            where: {
                user_id: req.params.user,
                idCurso: req.params.curso
            },
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(result => {
                let fechaactual = Date.now()
                let fechafin = new Date(result.fecha_fin).getTime();
                result.vencido = fechaactual > fechafin;
                result.cursosproducto.cursossecciones.forEach(obj => {
                    obj.courseslessons.forEach(lec => {
                        lec.leccionactiva = (!result.vencido)
                    })
                })

                let curso = {
                    categorias: result.cursosproducto.categorias,
                    cursosmodulosonline: result.cursosproducto.cursosmodulosonline,
                    cursosplanes: result.cursosproducto.cursosplanes,
                    cursosprecios: result.cursosproducto.cursosprecios,
                    cursossecciones: result.cursosproducto.cursossecciones,
                    descripcion: result.cursosproducto.descripcion,
                    detalles: result.cursosproducto.detalles,
                    grupowhatsapp: result.cursosproducto.grupowhatsapp,
                    id: result.cursosproducto.id,
                    idPaypal: result.cursosproducto.idPaypal,
                    modalidad: result.cursosproducto.modalidad,
                    nombre: result.cursosproducto.nombre,
                    pais: result.cursosproducto.pais,
                    subcategoriaId: result.cursosproducto.subcategoriaId,
                    subcategorias: result.cursosproducto.subcategorias,
                    urlhojadeventa: result.cursosproducto.urlhojadeventa,
                    urlimagen: result.cursosproducto.urlimagen,
                    visibilidad: result.cursosproducto.visibilidad,
                    fecha_activacion: result.fecha_activacion,
                    fecha_fin: result.fecha_fin,
                    vencido: result.vencido
                }
                res.json(curso)
            })
            .catch(error => {
                console.log(error)
            });


    });

    app.get("/cursosactivosfc/packs/byid/:id", (req, res) => {
        CursostopackFC.findAll({
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
                        'tipo'
                    ],
                    where: {
                      visibilidad: 0
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
                                'tieneofertamensual'
                            ],
                            where: {
                                opcion: '1'
                            }
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
                    ]
                }
            ],
            attributes: [
                'id',
                'packId',
                'cursoId'
            ],
            where: {
                packId: req.params.id
            }
        }).then(results => {
            let cursos = []
            if (results && results.length > 0) {
                results.forEach(result => {
                    let curso = {
                        categoriaId: result.infopack.categorias[0].categoriaId,
                        categorias: result.infopack.categorias,
                        cursosprecios: result.infopack.cursosprecios,
                        descripcion: result.infopack.descripcion,
                        detalles: result.infopack.detalles,
                        grupowhatsapp: result.infopack.grupowhatsapp,
                        id: result.infopack.id,
                        idPaypal: result.infopack.idPaypal,
                        modalidad: result.infopack.modalidad,
                        nombre: result.infopack.nombre,
                        pais: result.infopack.pais,
                        subcategoriaId: result.infopack.subcategoriaId,
                        subcategorias: result.infopack.subcategorias,
                        urlhojadeventa: result.infopack.urlhojadeventa,
                        urlimagen: result.infopack.urlimagen,
                        visibilidad: result.infopack.visibilidad
                    }
                    cursos.push(curso)
                })
            }

            res.json(cursos)

        })
            .catch(err => {
                console.log(err)
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
    app.get("/cursosactivosfc/promo/:id", (req, res) => {
        CursosactivosFC.findAll({
            include: [
                {
                    model: PromocionesFC,
                    as: 'promocion'
                },
            ],
            where: {
                packetId: req.params.id
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

    app.get("/cursosactivosfc/:id", (req, res) => {
        CursosactivosFC.findOne({
            include: [
                { model: PromocionesFC, as: 'promocion' },
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
    app.delete("/cursosactivosfc/:id", (req, res) => {
        CursosactivosFC.destroy({
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
    app.post("/cursosactivosfc", (req, res) => {
        CursosactivosFC.create(req.body.curso)
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                if (error.original) {
                    res.status(412).json({
                        cod: error.original.code,
                        err: error.original.errno,
                        state: error.original.sqlState,
                        msg: error.original.sqlMessage,
                        sql: error.sql
                    });
                } else {
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
    app.put("/cursosactivosfc", (req, res) => {
        // console.log(req.body)
        CursosactivosFC.update(req.body.newproducto, {
            where: {
                id: req.body.newproducto.identificacion
            }})
            .then(result => {
                // console.log(result)
                res.json(result)
            })
            .catch(error => {
                console.log(error.response)
                res.status(412).json({msg: error.message});
            });
    });

    app.post("/cursosactivosfc/checkcursousuario", (req, res) => {
        CursosactivosFC.findOne({
            where: {
                user_id: req.body.curso.user_id,
                idCurso: req.body.curso.idCurso
            }
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

}
