module.exports = app => {
    const Facturas = app.db.models.Facturas;
    /**
     * @api {get} /pedidos Genera una matriz con los pedidos existentes indiferentemente de su status
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID del pedido
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   },
     *   {
     *    "id": 2,
     *    "pedido": "Una hamburguesa con queso",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 17.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-13T15:20:11.700Z",
     *    "created_at": "2016-02-13T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.route("/facturas")
        .all((req, res, next) => {
            delete req.body.id;
            next();
        })
        .get((req, res) => {
            if (req.headers.authorization) {
                if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                    Facturas.findAll({
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
    app.get("/facturas/:id", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Facturas.findById(req.params.id)
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
    app.delete("/facturas/:id", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Facturas.destroy({where: {id: req.params.id}})
                    .then(res => res.sendStatus(204))
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
    app.put("/facturas", (req, res) => {
        console.log(req.query)
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Facturas.update(req.query, {where: {id: req.query.id}})
                    .then(result => {
                        console.log(result)
                        res.json(result)
                        //res.sendStatus(204)
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    })

    /**
     * @api {get} /nuevasolicitud Crea un nuevo pedido
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} pedido Descripción del pedido realizado
     * @apiParam {String} address Dirección de entrega del pedido
     * @apiParam {String} latitud Coordenadas de latitud del cliente
     * @apiParam {String} longitud Coordenadas de longitud del cliente
     * @apiParam {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiParam {Number} cliente ID del cliente que solicita el pedido
     * @apiParam {Boolean} done Status del pedido, por defecto se establece en false
     * @apiParam {Date} updatedAt Fecha de la última modificación del pedido
     * @apiParam {Date} createdAt Fecha de creación del pedido
     * @apiParamExample {json} Input
     *{
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiSuccess {Number} id ID del pedido que se acaba de generar
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/facturas", (req, res) => {
        Facturas.findAll({
            where: {
                secuencial: req.body.secuencial
            }
        })
            .then(result => {
                if (result.data) {
                    console.log(result)
                    res.status(412).json({
                        msg: 'El número de factura que intentas crear ya ha sido registrado, por favor, revisa el documento y el secuencial e intentalo de nuevo',
                        factura: result.data
                    });
                } else {
                    req.body.razonSocialCliente = req.body.razon_social_cliente
                    req.body.correoCliente = req.body.correo_cliente
                    req.body.telefonoCliente = req.body.telefono_cliente
                    req.body.direccionCliente = req.body.direccion_cliente
                    req.body.guiaRemision = req.body.guiaremision
                    req.body.descuentoSolidario = req.body.descuentosolidario
                    req.body.informacionAdicional = JSON.stringify(req.body.DatosAdicionalesList)
                    req.body.productList = JSON.stringify(req.body.productList)
                    req.body.formaPagoList = JSON.stringify(req.body.formaPagoList)

                    Facturas.create(req.body)
                        .then(result => {
                            res.json(result)
                        })
                        .catch(error => {
                            res.status(412).json({msg: error.message});
                        });
                }
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })
    /*
        Facturas.create(req.query)
            .then(result => {
                let repartidores = [];
                let pedido = result;

                Facturas.findAll({
                    where: {
                        secuencial: req.query.secuencial
                    }
                })
                    .then(result => {
                        if(result) {
                            console.log('REPARTIDORES');
                            console.log(result[0].nombres);
                            repartidores = result;
                            repartidores.forEach(function(obj){
                                console.log(obj.push);
                                let fecha = new Date(req.query.createdAt);
                                console.log(fecha);
                                let message = {
                                    app_id: "7fd48813-65dd-43dd-b429-b2b1d61b559d",
                                    headings: {"en": "NUEVO PEDIDO Nro. " + pedido.id},
                                    subtitle: {"en": "Se ha notificado a " + repartidores.length + " repartidores"},
                                    contents: {"en": "Hay un nuevo pedido relizado por: " + pedido.nombrecliente + " a las: "+ fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds() +", por favor, abre tu app y aceptala!"},
                                    //include_player_ids: ["d75af91d-6454-4a3c-a044-03536bf4b891"]
                                    include_player_ids: [obj.push]
                                };
                                sendNotification(message);
                            });

                            const message = {
                                app_id: "7fd48813-65dd-43dd-b429-b2b1d61b559d",
                                headings: {"en": "NUEVO PEDIDO Nro. " + pedido.id},
                                subtitle: {"en": "Se ha notificado a " + repartidores.length + " repartidores"},
                                contents: {"en": "Hay un nuevo pedido relizado por: " + pedido.nombrecliente + " a las: "+ fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds() +", por favor, revisa tu email y el panel de administración para que le puedas hacer seguimiento!"},
                                include_player_ids: ["1ae0181b-132f-4e0d-9d3a-a96625a1c389", "5785a9ec-db73-4202-aa5e-0d1d26228e5b"]
                            };
                            sendNotification(message);

                        }else{
                            res.sendStatus(404);
                        }
                    })
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });

                let nuevoPedido =
                    `Nro.Pedido : ` + result.id +
                    `<br/> Pedido: ` + result.pedido +
                    `<br/> Direccion: ` + result.address +
                    `<br/> Ciudad: ` + result.ciudad +
                    `<br/> Cliente: ` + result.nombrecliente +
                    `<br/> Telefono: ` + result.telcliente +
                    `<br/> Cedula: ` + result.cedulacliente +
                    `<br/> Status Pedido: ` + result.status +
                    `<br/> Localizacion: https://www.google.com/maps/place/` + result.latitud + `,` + result.longitud;

                let transporter = nodeMailer.createTransport({
                    host: 'aplios.net',
                    port: 465,
                    secure: true,
                    auth: {
                        // should be replaced with real sender's account
                        user: 'goubi@aplios.net',
                        pass: 'Qowqy8-rifson-maxrap'
                    }
                });
                if(result.ciudad == 'Quito'){
                    let message = {
                        from: 'goUBI <goubi@aplios.net>',
                        // Comma separated list of recipients
                        to: 'Nehiver Carrion <ncarrion@aplios.com>, Juan Carlos Reyes <jackrom@live.com>',

                        // Subject of the message
                        subject: 'Se ha producido un nuevo pedido ✔' + Date.now(),

                        // HTML body
                        html: `<p><b>En este momento se ha realizado un nuevo pedido, </b> Se ha adjuntado un archivo con los detalles completos del pedido </p>
        <p>A continuacion el resumen del pedido:<br/>` + nuevoPedido + `<br/><p><img src="cid:info@aplios.net"/></p>`,

                        // AMP4EMAIL
                        amp:
                            `<!doctype html>
                    <html ⚡4email>
                      <head>
                        <meta charset="utf-8">
                        <style amp4email-boilerplate>body{visibility:hidden}</style>
                        <script async src="https://cdn.ampproject.org/v0.js"></script>
                        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                      </head>
                      <body>
                        <p><b>Hola</b> Braulio <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                        <p>Han hecho un nuevo pedido en la plataforma con los siguientes detalles:<br/>` +
                            nuevoPedido +
                            `</p></body>
                    </html>`,
                        attachments: [
                            // String attachment
                            {
                                filename: 'notes.txt',
                                content: JSON.stringify(result),
                                contentType: 'text/plain' // optional, would be detected from the filename
                            },

                            // Binary Buffer attachment
                            {
                                filename: 'image.png',
                                content: Buffer.from(
                                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                                    '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                                    'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                                    'base64'
                                ),

                                cid: 'info@aplios.net' // should be as unique as possible
                            },

                            // File Stream attachment
                            {
                                filename: 'nyan cat ✔.gif',
                                // path: __dirname + '/nyan.gif',
                                path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5wZJit2cl6GsRTsWJ2NocxKZT6a1xEDRE_U8jH6Ju84cOypjY',
                                cid: 'info@aplios.net' // should be as unique as possible
                            }
                        ],

                        list: {
                            // List-Help: <mailto:admin@example.com?subject=help>
                            help: 'admin@aplios.net?subject=help',

                            // List-Unsubscribe: <http://example.com> (Comment)
                            unsubscribe: [
                                {
                                    url: 'http://goubi.aplios.net/unsubscribe',
                                    comment: 'No deseo recibir mas este email'
                                },
                                'unsubscribe@goubi.com'
                            ],

                            // List-ID: "comment" <example.com>
                            id: {
                                url: 'mylist.example.com',
                                comment: 'This is my awesome list'
                            }
                        }
                    }
                    transporter.sendMail(message, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                }else if(result.ciudad == 'Riobamba'){
                    let message = {
                        from: 'goUBI <goubi@aplios.net>',
                        // Comma separated list of recipients
                        to: 'Braulio Grijalva <brauliogrijalva@gmail.com>, Juan Carlos Reyes <jackrom@live.com>',

                        // Subject of the message
                        subject: 'Se ha producido un nuevo pedido  ✔' + Date.now(),

                        // HTML body
                        html: `<p><b>En este momento se ha realizado un nuevo pedido, </b> Se ha adjuntado un archivo con los detalles completos del pedido </p>
        <p>A continuacion el resumen del pedido:<br/>` + nuevoPedido + `<br/><p><img src="cid:info@aplios.net"/></p>`,

                        // AMP4EMAIL
                        amp:
                            `<!doctype html>
                    <html ⚡4email>
                      <head>
                        <meta charset="utf-8">
                        <style amp4email-boilerplate>body{visibility:hidden}</style>
                        <script async src="https://cdn.ampproject.org/v0.js"></script>
                        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                      </head>
                      <body>
                        <p><b>Hola</b> Braulio <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                        <p>Han hecho un nuevo pedido en la plataforma con los siguientes detalles:<br/>` +
                            nuevoPedido +
                            `</p></body>
                    </html>`,
                        attachments: [
                            // String attachment
                            {
                                filename: 'notes.txt',
                                content: JSON.stringify(result),
                                contentType: 'text/plain' // optional, would be detected from the filename
                            },

                            // Binary Buffer attachment
                            {
                                filename: 'image.png',
                                content: Buffer.from(
                                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                                    '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                                    'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                                    'base64'
                                ),

                                cid: 'info@aplios.net' // should be as unique as possible
                            },

                            // File Stream attachment
                            {
                                filename: 'nyan cat ✔.gif',
                                // path: __dirname + '/nyan.gif',
                                path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5wZJit2cl6GsRTsWJ2NocxKZT6a1xEDRE_U8jH6Ju84cOypjY',
                                cid: 'info@aplios.net' // should be as unique as possible
                            }
                        ],

                        list: {
                            // List-Help: <mailto:admin@example.com?subject=help>
                            help: 'admin@aplios.net?subject=help',

                            // List-Unsubscribe: <http://example.com> (Comment)
                            unsubscribe: [
                                {
                                    url: 'http://goubi.aplios.net/unsubscribe',
                                    comment: 'No deseo recibir mas este email'
                                },
                                'unsubscribe@goubi.com'
                            ],

                            // List-ID: "comment" <example.com>
                            id: {
                                url: 'mylist.example.com',
                                comment: 'This is my awesome list'
                            }
                        }
                    }

                    transporter.sendMail(message, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                } else if(result.ciudad == 'Ambato'){
                    let message = {
                        from: 'goUBI <goubi@aplios.net>',
                        // Comma separated list of recipients
                        to: 'Braulio Grijalva <brauliogrijalva@gmail.com>, Juan Carlos Reyes <jackrom@live.com>',

                        // Subject of the message
                        subject: 'Se ha producido un nuevo pedido ✔' + Date.now(),

                        // HTML body
                        html: `<p><b>En este momento se ha realizado un nuevo pedido, </b> Se ha adjuntado un archivo con los detalles completos del pedido </p>
        <p>A continuacion el resumen del pedido:<br/>` + nuevoPedido + `<br/><p><img src="cid:info@aplios.net"/></p>`,

                        // AMP4EMAIL
                        amp:
                            `<!doctype html>
                    <html ⚡4email>
                      <head>
                        <meta charset="utf-8">
                        <style amp4email-boilerplate>body{visibility:hidden}</style>
                        <script async src="https://cdn.ampproject.org/v0.js"></script>
                        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                      </head>
                      <body>
                        <p><b>Hola</b> Braulio <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                        <p>Han hecho un nuevo pedido en la plataforma con los siguientes detalles:<br/>` +
                            nuevoPedido +
                            `</p></body>
                    </html>`,
                        attachments: [
                            // String attachment
                            {
                                filename: 'notes.txt',
                                content: JSON.stringify(result),
                                contentType: 'text/plain' // optional, would be detected from the filename
                            },

                            // Binary Buffer attachment
                            {
                                filename: 'image.png',
                                content: Buffer.from(
                                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                                    '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                                    'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                                    'base64'
                                ),

                                cid: 'info@aplios.net' // should be as unique as possible
                            },

                            // File Stream attachment
                            {
                                filename: 'nyan cat ✔.gif',
                                // path: __dirname + '/nyan.gif',
                                path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5wZJit2cl6GsRTsWJ2NocxKZT6a1xEDRE_U8jH6Ju84cOypjY',
                                cid: 'info@aplios.net' // should be as unique as possible
                            }
                        ],

                        list: {
                            // List-Help: <mailto:admin@example.com?subject=help>
                            help: 'admin@aplios.net?subject=help',

                            // List-Unsubscribe: <http://example.com> (Comment)
                            unsubscribe: [
                                {
                                    url: 'http://goubi.aplios.net/unsubscribe',
                                    comment: 'No deseo recibir mas este email'
                                },
                                'unsubscribe@goubi.com'
                            ],

                            // List-ID: "comment" <example.com>
                            id: {
                                url: 'mylist.example.com',
                                comment: 'This is my awesome list'
                            }
                        }
                    }

                    transporter.sendMail(message, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                }




                res.json(result);
                res.end();
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    });
    */

    /**
     * @api {get} /buscardeliverers Genera una matriz con los repartidores activos en la ciudad
     * @apiGroup Deliverers
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} ciudad Ciudad donde se quiere recuperar a los deliverers
     * @apiParamExample {json} Input
     *{
     *    "ciudad": Quito
     * }
     * @apiSuccess {String} nombres Nombres de usuario
     * @apiSuccess {String} cedula Cédula de Identidad del usuario
     * @apiSuccess {String} celular Número de teléfono celular del usuario
     * @apiSuccess {String} direccion Dirección fiscal del usuario para las facturas
     * @apiSuccess {String} ciudad Ciudad de registro del deliverer
     * @apiSuccess {String} email Correo electrónico del usuario
     * @apiSuccess {String} password Password del usuario
     * @apiSuccess {String} avatar Avatar identificativo del usuario
     * @apiSuccess {String} facebook Si el registro se realizo desde facebook login
     * @apiSuccess {String} push Código para notificaciones Push
     * @apiSuccess {String} token Token unico válido para registrar el dispositivo del usuario
     * @apiSuccess {String} version Version de la app con la cual se regsitra el usuario
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del deliverer
     * @apiSuccess {Date} createdAt Fecha de creación del deliverer
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "nombres": "raul",
     *    "cedula": "Raúl Castro",
     *    "celular": "raul@castro.net",
     *    "direccion": "123456",
     *    "ciudad": "Quito",
     *    "email": "raul@hotmail.com",
     *    "password": "12345",
     *    "avatar": "https://goubi.aplios.net/perfil.png",
     *    "push": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "token": "d75af91d-6454-4a3c-a044-03536bf4b891",
     *    "version": "0.0.0"
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} ningún pedido encontrado, no hay pedidos pendientes
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/notificar", (req, res) => {
        console.log(req.query);
        let message = {
            app_id: "7fd48813-65dd-43dd-b429-b2b1d61b559d",
            headings: {"en": req.query.titulo},
            contents: {"en": req.query.mensaje},
            include_player_ids: [req.query.to]
        };

        sendNotification(message);
    });

    /**
     * @api {get} /nuevasolicitud Crea un nuevo pedido
     * @apiGroup Pedidos
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} pedido Descripción del pedido realizado
     * @apiParam {String} address Dirección de entrega del pedido
     * @apiParam {String} latitud Coordenadas de latitud del cliente
     * @apiParam {String} longitud Coordenadas de longitud del cliente
     * @apiParam {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiParam {Number} cliente ID del cliente que solicita el pedido
     * @apiParam {Boolean} done Status del pedido, por defecto se establece en false
     * @apiParam {Date} updatedAt Fecha de la última modificación del pedido
     * @apiParam {Date} createdAt Fecha de creación del pedido
     * @apiParamExample {json} Input
     *{
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiSuccess {Number} id ID del pedido que se acaba de generar
     * @apiSuccess {String} pedido Descripción del pedido realizado
     * @apiSuccess {String} address Dirección de entrega del pedido
     * @apiSuccess {String} latitud Coordenadas de latitud del cliente
     * @apiSuccess {String} longitud Coordenadas de longitud del cliente
     * @apiSuccess {String} ciudad Ciudad desde donde se solicito el pedido
     * @apiSuccess {Number} cliente ID del cliente que solicita el pedido
     * @apiSuccess {Number} costo Indica el costo del pedido ingresado por el repartidor
     * @apiSuccess {Number} repartidor ID del repartidor asignado al pedido
     * @apiSuccess {String} telrepartidor Teléfono de contacto del repartidor disponible para el cliente
     * @apiSuccess {Number} cancelado Indica si el pedido fue cancelado por el cliente (1) o por el repartidor (2), por defecto se establece en 0
     * @apiSuccess {Boolean} done Status del pedido, por defecto se establece en false
     * @apiSuccess {Date} updatedAt Fecha de la última modificación del pedido
     * @apiSuccess {Date} createdAt Fecha de creación del pedido
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "id": 1,
     *    "pedido": "Una pizza mediana de champiñones",
     *    "address": "Av. 6 de Diciembre, n37-34 y Av. José Correa, Al lado de la casa",
     *    "latitud": "-1.6714657307879597",
     *    "longitud": "-78.63993287086487",
     *    "ciudad": "Quito",
     *    "cliente": 1,
     *    "costo": 20.00,
     *    "repartidor": 1,
     *    "telrepartidor": "0985675656",
     *    "cancelado": 0,
     *    "done": "false",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     * }
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.post("/facturas/savedocelectronico", (req, res) => {
        console.log(req.body.documento)
        Facturas.findAll({
            where: {
                secuencial: req.body.documento.secuencial
            }
        })
            .then(result => {
                if (result.data) {
                    console.log(result)
                    res.status(412).json({
                        error: true,
                        msg: 'El número de factura que intentas crear ya ha sido registrado, por favor, revisa el documento y el secuencial e intentalo de nuevo',
                        factura: result.data
                    });
                } else {
                    req.body.documento.razonSocialCliente = req.body.documento.razon_social_cliente
                    req.body.documento.correoCliente = req.body.documento.correo_cliente
                    req.body.documento.telefonoCliente = req.body.documento.telefono_cliente
                    req.body.documento.direccionCliente = req.body.documento.direccion_cliente
                    req.body.documento.guiaRemision = req.body.documento.guiaremision
                    req.body.documento.descuentoSolidario = req.body.documento.descuentosolidario
                    req.body.documento.informacionAdicional = JSON.stringify(req.body.documento.DatosAdicionalesList)
                    req.body.documento.productList = JSON.stringify(req.body.documento.productList)
                    req.body.documento.formaPagoList = JSON.stringify(req.body.documento.formaPagoList)

                    Facturas.create(req.body.documento)
                        .then(result => {
                            let respuesta = {
                                error: false,
                                msg: 'documento insertado correctamente',
                                data: result
                            }
                            res.json(respuesta)
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(412).json({msg: error.message});
                        });
                }
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })
};



let sendNotification = function(data) {
    let headers = {
        "Content-Type": "application/json; charset=utf-8"
    };

    let options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    const https = require('https');
    let req = https.request(options, function(res) {
        res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};

