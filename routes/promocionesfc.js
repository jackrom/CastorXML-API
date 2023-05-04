Sequelize = require("sequelize"),
module.exports = app => {
    const PromocionesFC = app.db.models.Promocionesfc
    const CursosFC = app.db.models.Cursosfc
    const CursospreciosFC = app.db.models.Cursospreciosfc
    const CursosplanesFC = app.db.models.Cursosplanesfc
    const ProductosFC = app.db.models.Productosfc
    const PreciosFC = app.db.models.Preciosfc
    const PlanesFC = app.db.models.Planesfc
    const ModulosonlineFC = app.db.models.Modulosonlinefc
    const CursosactivosFC = app.db.models.CursosactivosFC
    const Productosfc = app.db.models.Productosfc
    const ProductosToPromocionesfc = app.db.models.ProductosToPromocionesfc
    const SuscripcionesGetResponseFC = app.db.models.SuscripcionesGetResponsefc
    const CursostopackFC = app.db.models.Cursostopackfc
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
    app.get("/promocionesfc", (req, res) => {
        PromocionesFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 1
                    }
                },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 1
                    }
                },
                {
                    model: ModulosonlineFC,
                    as: 'modulosonline'
                }
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


    app.get("/promocionesfc/activos", (req, res) => {
        PromocionesFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 1
                    }
                },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 1
                    }
                },
                {
                    model: ModulosonlineFC,
                    as: 'modulosonline'
                }
            ],
            where: {
                activo: 1
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

    app.get("/promocionesfc/activos/referencia", (req, res) => {
        PromocionesFC.findAll({
            attributes: [
                "id",
                "idPaypalPromo",
                "activo",
                "categoriaId",
                "categoriaName",
                "descripcion",
                "detalles",
                "fechafinal",
                "fechainicio",
                "idPaypalPromo",
                "modalidad",
                "nombre",
                "nombre_comercial",
                "orden",
                "pais",
                "resumen",
                "tiempoacceso",
                "urlhojadeventa",
                "urlimagenpromocional",
                "videourl",
                "visibilidad"
            ],
            where: {
                activo: 1
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

    app.get('/promocionesfc/byuser/bycategoria/:id', (req, res) =>{
        let usuario = parseInt(req.query.usuario)
        let fechaactual = Date.now()
        PromocionesFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 1
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
                    as: 'promocionesactivasusuarios',
                    where: {
                        user_id: usuario,
                        // fecha_fin: {[Op.lt]: [fechaactual]}
                        ispacket: 1
                    },
                    order: [
                        ['fecha_fin', 'DESC'],
                    ]
                },
                {
                    model: ProductosToPromocionesfc,
                    as: 'allproductos',
                    include: [
                        {
                            model: Productosfc,
                            as: 'detallescurso'
                        },
                    ]
                },
            ],
            attributes: [
                'id',
                'descripcion',
                'detalles',
                'grupowhatsapp',
                'idPaypalPromo',
                'modalidad',
                'nombre',
                'pais',
                'urlhojadeventa',
                'urlimagenpromocional',
                'visibilidad'
            ],
            where: {
                visibilidad: 'PRIVADO'
            }
        })
            .then(result => {
                result.forEach(obj => {
                    if (obj.promocionesactivasusuarios && obj.promocionesactivasusuarios.length > 0) {
                        let cursoactivo = obj.promocionesactivasusuarios[0]
                        let fechafin = new Date(cursoactivo.fecha_fin).getTime();
                        obj.promocionesactivasusuarios[0].vencido = fechaactual > fechafin;
                        // console.log(fechaactual + ' | ' + fechafin)
                    }
                })
                res.json(result)
            })
    })

    app.get("/promocionesfc/:id", (req, res) => {
        PromocionesFC.findOne({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 1
                    }
                },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 1
                    }
                },
                {
                    model: ModulosonlineFC,
                    as: 'modulosonline'
                },
                {
                    model: ProductosToPromocionesfc,
                    as: 'allproductos',
                    include: [
                        {
                            model: ProductosFC,
                            as: 'detallescurso'
                        }
                    ]
                }
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

    app.get("/getpromosbycategoria/:id", (req, res) => {
        PromocionesFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 1
                    }
                },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 1
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

    app.get("/promocionesfc/bycategoria/:id", (req, res) => {
        PromocionesFC.findAll({
            include: [
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 1
                    }
                }
            ],
            attributes: [
                'id',
                'activo',
                'nombre',
                'fechainicio',
                'fechafinal',
                'duracionpromo',
                'urlimagenpromocional'
            ],
            where: {
                categoriaId: req.params.id
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
    app.delete("/promocionesfc/:id", (req, res) => {
        PromocionesFC.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(resultados => {
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

    app.post("/promocionesfc", (req, res) => {
        // console.log(req.body)
        PromocionesFC.create(req.body.promo)
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
    app.put("/promocionesfc", (req, res) => {
        PromocionesFC.update(req.body.producto, {
            where: {
                id: req.body.producto.identificacion
            }})
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error.response)
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/reparartablapromociones", (req, res) => {
        PromocionesFC.findAll({
            where: {
                id: {[Op.gt]: [22]}
            },
            order: [
                ['id', 'ASC'],
            ]
        })
            .then(results => {

                if (results && results.length > 0) {
                    results.forEach((obj, index) => {
                        let productos = JSON.parse(obj.productos)
                        productos.forEach(p => {
                            let producto = {
                                productoId: p.id,
                                promoId: obj.id
                            }

                            ProductosToPromocionesfc.create(producto)
                                .then(result => {
                                    console.log('insertado producto relacionado con promocion')
                                    // res.json(result)
                                })
                                .catch(error => {
                                    res.status(412).json({msg: error.message});
                                });
                        })

                        let listas = (obj.listas) ? JSON.parse(obj.listas) : []

                        if (listas && listas.length > 0) {
                            listas.forEach(l => {
                                let suscripcion = {
                                    promoId: obj.id,
                                    campaignId: l.campaignId,
                                    href: l.href,
                                    name: l.name,
                                    techName: l.techName,
                                    description: l.description,
                                    languageCode: l.languageCode,
                                    isDefault: l.isDefault,
                                    createdOn: l.createdOn
                                }

                                SuscripcionesGetResponseFC.create(suscripcion)
                                    .then(result => {
                                        console.log('insertada suscripcion relacionada con promocion')
                                        // res.json(result)
                                    })
                                    .catch(error => {
                                        res.status(412).json({msg: error.message});
                                    });
                            })
                        }
                    })
                }
                res.json(results)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });


    app.get("/reparartablapromocionesfc", (req, res) => {
        PromocionesFC.findAll({
            include: [
                {
                    model: PreciosFC,
                    as: 'precios',
                    where: {
                        ispacket: 1
                    }
                },
                {
                    model: PlanesFC,
                    as: 'planes',
                    where: {
                        ispacket: 1
                    }
                }
            ],
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(results => {
                if (results && results.length > 0) {
                    results.forEach(obj => {
                        let curso = {
                            idPaypal: obj.idPaypalPromo,
                            categoriaId: obj.categoriaId,
                            subcategoriaId: null,
                            keywords: null,
                            tipo: 'PACK',
                            nombre: obj.nombre,
                            nombre_comercial: obj.nombre_comercial,
                            descripcion: obj.descripcion,
                            resumen: obj.resumen,
                            detalles: obj.detalles,
                            videourl: obj.videourl,
                            configuraciones: null,
                            urlimagen: obj.urlimagenpromocional,
                            metatitle: obj.metatitle,
                            metakeyword: obj.metakeyword,
                            metadescripcion: obj.metadescripcion,
                            author: null,
                            certificados: obj.certificados,
                            urlhojadeventa: obj.urlhojadeventa,
                            modalidad: obj.modalidad,
                            pais: obj.pais,
                            callback: obj.callback,
                            grupowhatsapp: obj.grupowhatsapp,
                            visibilidad: obj.visibilidad,
                            listas: obj.listas,
                            orden: obj.orden,
                            activo: obj.activo,
                            incluyetutorias: obj.incluyetutorias
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


    app.get("/reparartablapromocionesfctopack", (req, res) => {
        PromocionesFC.findAll({
            order: [
                ['id', 'DESC'],
            ]
        })
            .then(results => {
                if (results && results.length > 0) {
                    results.forEach(obj => {
                        let productos = JSON.parse(obj.productos)
                        if (productos && productos.length > 0) {
                            productos.forEach(producto => {
                                let curso = {
                                    packId: obj.id,
                                    cursoId: producto.id,
                                    nombre: producto.nombre
                                }
                                CursostopackFC.create(curso)
                            })
                        }
                    })
                }
                res.json(results)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });
}
