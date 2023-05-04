const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")
const date = new Date()
const request = require('request')

module.exports = app => {
    const VentasFC = app.db.models.Ventasfc
    const Ventasproducto = app.db.models.Ventasproducto
    const Users = app.db.models.Users
    const cfg = app.libs.config
    const Op = app.db.Sequelize.op
    const nodeMailer = require('nodemailer')
    const soap = require('soap')
    const soapURL = 'http://186.4.187.28/InvoiceService/ServiceEb.svc?singleWsdl'
    // const soapURL = 'http://186.4.187.28/EbIntegrationService/ServiceEb.svc?singleWsdl'
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

    app.get("/ventas", (req, res) => {
        VentasFC.findAll({
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: [
                        "name",
                        "ruc",
                        "direccion",
                        "ciudad",
                        "provincia",
                        "celular",
                        "email"
                    ]
                }
            ],
            attributes: [
                "formaDePago",
                "usuarioId",
                "usuarioName",
                "createdAt",
                "datospago",
                "productos",
                "origen",
                "codigo",
                "modopago",
                "valor",
                "id",
                "estado"
            ],
            order: [
                ['id', 'DESC'],
            ],
            limit: 30
        })
            .then(result => {
                result.forEach(obj => {
                    let productos = JSON.parse(obj.productos)[0]
                    obj.productos = {
                        nombre: productos.infoproducto.nombre,
                        categoria: productos.infoproducto.categoriaName,
                        imagen: (productos.infoproducto.urlimagenpromocional) ? productos.infoproducto.urlimagenpromocional : productos.infoproducto.urlimagen
                    }
                    /*
                    let usuario = JSON.parse(obj.usuario)
                    obj.usuario = {
                        nombre: usuario.name,
                        ruc: usuario.ruc,
                        direccion: usuario.direccion,
                        ciudad: usuario.ciudad,
                        provincia: usuario.provincia,
                        telefono: usuario.celular,
                        email: usuario.email
                    }
                     */
                })
                res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/ventas/reparartabla", (req, res) => {
        VentasFC.findAll({
            order: [
                ['id', 'ASC'],
            ],
            limit: 100
        })
            .then(result => {
                let ventas = result;
                let items = [];
                result.forEach(obj => {
                    let productos = JSON.parse(obj.productos)
                    let item
                    productos.forEach(producto => {
                        item = {
                            id: producto.infoproducto.id,
                            categoria: producto.infoproducto.categoriaName,
                            nombre: producto.infoproducto.nombre,
                            imagen: (producto.infoproducto.urlimagenpromocional) ? producto.infoproducto.urlimagenpromocional : producto.infoproducto.urlimagen
                        }
                    })
                    let datospago = JSON.parse(obj.datospago)
                    let idPago
                    if (obj.formaDePago === 'DATAFAST') {
                        idPago = datospago.responseId
                    } else if (obj.formaDePago === 'TRANSFERENCIA/DEPÓSITO') {
                        idPago = datospago.numerotransferencia
                    } else if (obj.formaDePago === 'PAYPAL') {
                        idPago = datospago.id
                    }

                    let venta = {
                        id: obj.id,
                        usuarioId: obj.usuarioId,
                        producto: JSON.stringify(item),
                        cantProductos: obj.cantProductos,
                        pagoId: idPago,
                        valor: obj.valor,
                        formaDePago: obj.formaDePago,
                        modopago: obj.modopago,
                        estado: obj.estado,
                        status: obj.status,
                        origen: obj.origen,
                        codigo: obj.codigo,
                        afiliado: obj.afiliado,
                        createdAt: obj.createdAt,
                        updatedAt: obj.updatedAt
                    }

                    Ventasproducto.create(venta)
                        .then(result => {
                            console.log('insertada venta ' + venta.id)
                        })
                        .catch(error => {
                            console.log(error)
                        });
                })
                res.json('corregidas las ventas')
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });

    app.get("/ventas/nuevas", (req, res) => {
        VentasFC.findAll({
            where: {
                estado: 'no procesada'
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
    app.get("/ventasByUser/:id", (req, res) => {
        VentasFC.findAll({
            where: {
                usuarioId: req.params.id
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

    app.get("/ventasfc/afiliados/:serial", (req, res) => {
        VentasFC.findAll({
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
    app.get("/ventas/:id", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                VentasFC.findById(
                    {
                        id: req.params.id
                    }
                )
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
    app.delete("/ventas/:id", (req, res) => {
        VentasFC.destroy({where: {id: req.params.id}})
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

    app.post("/ventas", (req, res) => {
        let venta = {
            usuarioId: req.body.venta.usuario.id,
            usuarioName: req.body.venta.usuario.name,
            usuario: JSON.stringify(req.body.venta.usuario),
            productos: JSON.stringify(req.body.venta.productos),
            cantProductos: req.body.venta.productos.length,
            datospago: JSON.stringify(req.body.venta.datospago),
            valor: req.body.venta.valor,
            formaDePago: req.body.venta.formadepago,
            modopago: req.body.venta.modopago,
            estado: (req.body.venta.formadepago === "TARJETA DÉBITO/CRÉDITO" || req.body.venta.formadepago === "PAYPAL") ? 'procesada' : 'no procesada',
            status: (req.body.venta.formadepago === "TARJETA DÉBITO/CRÉDITO" || req.body.venta.formadepago === "PAYPAL") ? 'activa' : 'inactiva',
            origen: req.body.venta.origen,
            codigo: req.body.venta.codigo
        }
        VentasFC.create(venta)
            .then(result => {
                // TODO enviar email a la persona con los datos de su compra
                let planadquirido = req.body.plan
                let cliente = req.body.venta.usuario
                let productos = req.body.venta.productos
                let transaccion = req.body.venta.datospago
                let formadepago = req.body.venta.formadepago
                let modopago = req.body.venta.modopago
                let total = req.body.venta.valor

                let hoy = new Date()
                let mes = hoy.getMonth()
                switch (mes) {
                    case 0: mes = 'Enero'
                        break;
                    case 1: mes = 'Febrero'
                        break;
                    case 2: mes = 'Marzo'
                        break;
                    case 3: mes = 'Abril'
                        break;
                    case 4: mes = 'Mayo'
                        break;
                    case 5: mes = 'Junio'
                        break;
                    case 6: mes = 'Julio'
                        break;
                    case 7: mes = 'Agosto'
                        break;
                    case 8: mes = 'Septiembre'
                        break;
                    case 9: mes = 'Octubre'
                        break;
                    case 10: mes = 'Noviembre'
                        break;
                    case 11: mes = 'Diciembre'
                        break;

                }
                let fecha = ((hoy.getDate() > 9) ? hoy.getDate() : '0' + (hoy.getDate())) + ' ' + mes + ' ' + hoy.getFullYear()

                let nuevoPedido = ''
                let template = ''
                let transporter = nodeMailer.createTransport({
                    host: 'smtp.elasticemail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        // should be replaced with real sender's account
                        user: 'info@facilcontabilidad.com',
                        pass: 'CC9800D31C6435095E42E5BEA7CC710B4191'
                    }
                });
                template = `<!DOCTYPE html>
                        <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                        
                          <head>
                            <meta charset="utf-8">
                            <meta name="x-apple-disable-message-reformatting">
                            <meta http-equiv="x-ua-compatible" content="ie=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
                            <!--[if mso]>
                            <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
                            <style>
                              td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
                            </style>
                          <![endif]-->
                            <link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700" rel="stylesheet" media="screen">
                            <style>
                              .hover-underline:hover {
                                text-decoration: underline !important;
                              }
                        
                              @keyframes spin {
                                to {
                                  transform: rotate(360deg);
                                }
                              }
                        
                              @keyframes ping {
                        
                                75%,
                                100% {
                                  transform: scale(2);
                                  opacity: 0;
                                }
                              }
                        
                              @keyframes pulse {
                                50% {
                                  opacity: .5;
                                }
                              }
                        
                              @keyframes bounce {
                        
                                0%,
                                100% {
                                  transform: translateY(-25%);
                                  animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                                }
                        
                                50% {
                                  transform: none;
                                  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                                }
                              }
                        
                              @media (max-width: 600px) {
                                .sm-px-24 {
                                  padding-left: 24px !important;
                                  padding-right: 24px !important;
                                }
                        
                                .sm-py-32 {
                                  padding-top: 32px !important;
                                  padding-bottom: 32px !important;
                                }
                        
                                .sm-w-full {
                                  width: 100% !important;
                                }
                              }
                            </style>
                          </head>
                        
                          <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased;">
                            <div style="display: none;">Esto es el comprobante de tu compra en FacilContabilidad</div>
                            <div role="article" aria-roledescription="email" aria-label="" lang="en">
                              <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td align="center" style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" bgcolor="rgba(236, 239, 241, var(--bg-opacity))">
                                    <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                        <td class="sm-py-32 sm-px-24" style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; padding: 48px; text-align: center;" align="center">
                                          <a href="https://facilcontabilidad.org/">
                                            <img src="https://facilcontabilidad.org/assets/images/logo.png" width="255" alt="Facil Contabilidad" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle;">
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                                          <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                            <tr>
                                              <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));" bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
                                                <p style="font-weight: 600; font-size: 18px; margin-bottom: 0;">Felicitaciones</p>
                                                <p style="font-weight: 700; font-size: 20px; margin-top: 0; --text-opacity: 1; color: #ff5850; color: rgba(255, 88, 80, var(--text-opacity));">${cliente.name}!</p>
                                                <p style="margin: 0 0 24px;">
                                                  Te saludamos del Equipo de FacilContabilidad. Haz tomado una excelente decisión. Se ha procesado correctamente tu compra con los siguientes detalles:
                                                </p>
                                                <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                  <tr>
                                                    <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px; padding-bottom: 16px;">
                                                      <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                        <tr>
                                                          <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;"><strong>Importe total:</strong> $ ${total}</td>
                                                        </tr>
                                                        <tr>
                                                          <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                            <strong>Fecha:</strong> ${fecha}
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                                <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                  <tr>
                                                    <td style="font-family: 'Montserrat',Arial,sans-serif;">
                                                      <h3 style="font-weight: 700; font-size: 12px; margin-top: 0; text-align: left;">Referencia de tu pedido: # ${result.id}</h3>
                                                    </td>
                                                    <td style="font-family: 'Montserrat',Arial,sans-serif;">
                                                      <h3 style="font-weight: 700; font-size: 12px; margin-top: 0; text-align: right;">
                                                        Número de pedido: ${result.id}
                                                      </h3>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td colspan="2" style="font-family: 'Montserrat',Arial,sans-serif;">
                                                      <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                        <tr>
                                                          <th align="left" style="padding-bottom: 8px;">
                                                            <p>Descripción</p>
                                                          </th>
                                                          <th align="right" style="padding-bottom: 8px;">
                                                            <p>Valor</p>
                                                          </th>
                                                        </tr>`
                                            productos.forEach(obj => {
                                                template += `<tr>
                                                          <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px; padding-top: 10px; padding-bottom: 10px; width: 80%;" width="80%">
                                                            ${obj.infoproducto.nombre} - ${obj.infoproducto.descripcion}
                                                          </td>
                                                          <td align="right" style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px; text-align: right; width: 20%;" width="20%">$ ${(modopago === 'Mensual') ? obj.preciomensual : obj.precioanual}</td>
                                                        </tr>`
                                            })

                                            template += `<tr>
                                                          <td style="font-family: 'Montserrat',Arial,sans-serif; width: 80%;" width="80%">
                                                            <p align="right" style="font-weight: 700; font-size: 14px; line-height: 24px; margin: 0; padding-right: 16px; text-align: right;">
                                                              Total
                                                            </p>
                                                          </td>
                                                          <td style="font-family: 'Montserrat',Arial,sans-serif; width: 20%;" width="20%">
                                                            <p align="right" style="font-weight: 700; font-size: 14px; line-height: 24px; margin: 0; text-align: right;">
                                                              $ ${total}
                                                            </p>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                                <table align="center" style="font-family: 'Montserrat',Arial,sans-serif; margin-left: auto; margin-right: auto; text-align: center; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                  <tr>
                                                    <td align="right" style="font-family: 'Montserrat',Arial,sans-serif;">
                                                      <table style="font-family: 'Montserrat',Arial,sans-serif; margin-top: 24px; margin-bottom: 24px;" cellpadding="0" cellspacing="0" role="presentation">
                                                        
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </table>
                                                <p>Los detalles de tu pago son los siguientes:</p>`

                                                if (result.formaDePago === 'TRANSFERENCIA/DEPÓSITO') {
                                                  template += `<table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;paDDING-BOTTOM:25PX;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                  <tr>
                                                    <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                        <strong>Status transacción:</strong> transferencia
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                      <strong>Nro. de transferencia:</strong> ${req.body.venta.datospago.numerotransferencia}
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                      <strong>Importe transferido:</strong> ${req.body.venta.datospago.importetransferencia}
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                      <strong>Banco transferencia:</strong> ${req.body.venta.datospago.bancotransferencia}
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                      <strong>RUC persona quien transfiere:</strong> ${req.body.venta.datospago.rucquientransfiere}
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                      <strong>Nombre de quien transfiere:</strong> ${req.body.venta.datospago.nombrequientransfiere}
                                                    </td>
                                                  </tr>
                                                </table>`
                                                } else if(result.formaDePago === 'TARJETA DÉBITO/CRÉDITO') {
                                                    template += `<table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;paDDING-BOTTOM:25PX;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                            <strong>Status transacción:</strong> pagado
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                          <strong>Fecha de pago:</strong> ${result.createdAt}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                          <strong>Importe total:</strong> ${total}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                          <strong>Transacción ID:</strong> ${req.body.venta.datospago.transactionId}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                          <strong>ID Pago:</strong> ${req.body.venta.datospago.idPago}
                                                        </td>
                                                      </tr>
                                                    </table>`
                                                } else if(result.formaDePago === 'PAYPAL') {
                                                    template += `<table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;paDDING-BOTTOM:25PX;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                            <strong>Status transacción:</strong> pagado
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                          <strong>Fecha de pago:</strong> ${result.createdAt}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                          <strong>Importe total:</strong> ${total}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                          <strong>Transacción ID:</strong> ${req.body.venta.datospago.id}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                          <strong>Tipo de Pago:</strong> ${req.body.venta.datospago.intent}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style="font-family: 'Montserrat',Arial,sans-serif; font-size: 14px;">
                                                          <strong>Status de Pago:</strong> ${req.body.venta.datospago.status}
                                                        </td>
                                                      </tr>
                                                    </table>`
                                                }

                                                template += `<p style="font-size: 14px; line-height: 24px; margin-top: 6px; margin-bottom: 20px;">
                                                  Si tienes dudas, preguntas o algún inconveniente al activar tu producto, no dudes en ponerte en contacto con nuestro equipo de soporte al <a href="mailto:info@facilcontabilidad.com">info@facilcontabilidad.com</a> o al whatsapp (+593) 0980744703 para que puedan prestarte la colaboración necesaria. 
                                                </p>
                                                <p style="font-size: 14px; line-height: 24px; margin-top: 6px; margin-bottom: 20px;">
                                                  Saludos,
                                                  <br>El Equipo de FacilContabilidad
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                                      </tr>
                                      <tr>
                                        <td style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 12px; padding-left: 48px; padding-right: 48px; --text-opacity: 1; color: #eceff1; color: rgba(236, 239, 241, var(--text-opacity));">
                                          <p align="center" style="cursor: default; margin-bottom: 16px;">
                                            <a href="https://www.facebook.com/facilcontabilidad" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://facilcontabilidad.org/logos/facebook.png" width="17" alt="Facebook" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                                            &bull;
                                            <a href="https://www.youtube.com/facilcontabilidad" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://www.powtoon.com/blog/wp-content/uploads/2020/03/videoyoutubeicon-1320192294490006733.png" width="17" alt="Youtube" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                                            &bull;
                                            <a href="https://www.instagram.com/fcontabilidad" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://logodownload.org/wp-content/uploads/2017/04/instagram-logo-3.png" width="17" alt="Instagram" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                                            &bull;
                                            <a href=" https://www.tiktok.com/@fcontabilidad" style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity)); text-decoration: none;"><img src="https://irenebianchi.com.ar/wp-content/uploads/2020/03/tiktok-logo-icon.png" width="17" alt="TikTok" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle; margin-right: 12px;"></a>
                                          </p>
                                          <p style="--text-opacity: 1; color: #263238; color: rgba(38, 50, 56, var(--text-opacity));text-align:center;">
                                            El uso de nuestros servicios, softwares y paginas web estan sujeto a nuestra
                                            <a href="https://www.facilcontabilidad.com/terminos-y-condiciones" class="hover-underline" style="--text-opacity: 1; color: #7367f0; color: rgba(115, 103, 240, var(--text-opacity)); text-decoration: none;">Términos y Condiciones de Uso</a> y
                                            <a href="https://www.facilcontabilidad.com/politica-de-privacidad" class="hover-underline" style="--text-opacity: 1; color: #7367f0; color: rgba(115, 103, 240, var(--text-opacity)); text-decoration: none;">Política de Privacidad</a>.
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </body>
                        </html>`


                let notificacion = transporter.sendMail({
                    from: 'FacilContabilidad <info@facilcontabilidad.com>', // sender address
                    to: cliente.email, // list of receivers
                    subject: "Felicitaciones!, se ha procesado correctamente tu compra ✔", // Subject line
                    // html: "<p>Haz click <a href='https://localhost:3000/pages/recover-password/'" + token + ">aquí</a> para continuar el proceso de recuperación</p><p><p><img src='https://juassic.com/castor.png' width='150px' /></p>",
                    html: template
                }, (error, info) => {
                    if (error) {
                        console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
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
    app.put("/ventas", (req, res) => {
        VentasFC.update(req.body.venta, {
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
