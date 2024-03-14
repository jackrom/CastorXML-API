const jwt = require("jsonwebtoken")
// const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const date = new Date()
const request = require('request')
const templates = require('../templates/email')
const Pop3Command = require('node-pop3')
const Imap = require('imap')
var MailParser = require("mailparser").MailParser
var Promise = require("bluebird")
Promise.longStackTraces()
const base64  = require('base64-stream')
const moment = require('moment')
inspect = require('util').inspect
let fs = require('fs')
Sequelize = require("sequelize")
module.exports = app => {
    const Users = app.db.models.Users
    const Documentos = app.db.models.Documentos
    const CursosactivosFC = app.db.models.CursosactivosFC
    const LeccionesvistasFC = app.db.models.Leccionesvistasfc
    const Tokensdatafastfc = app.db.models.Tokensdatafastfc

    const Usersfc = app.db.models.Usersfc
    const Usersaccountdetail = app.db.models.Usersaccountdetail
    const AplicacionesToUserfc = app.db.models.AplicacionesToUserfc
    const SocialnetworksToUserfc = app.db.models.SocialnetworksToUserfc
    const PlanToUserfc = app.db.models.PlanToUserfc

    const cfg = app.libs.config
    const Op = Sequelize.Op
    const nodeMailer = require('nodemailer')

    app.get("/getmailsgmail", (req, res) => {
        Users.findOne({
            include: [
                { model: CursosactivosFC, as: 'cursosactivos' }
            ],
            where: {
                id: req.body.id
            }
        })
        .then(result => {

            const imapConfig = {
                user: 'info@juassic.com',
                password: '6662115JcRc',
                host: 'mail.juassic.com',
                port: '993',
                tls: true,
                tlsOptions: {
                    secureProtocol: 'TLSv1_method',
                    rejectUnauthorized: false
                },
                authTimeout: 3000
            }
            const imap = Imap(imapConfig)

            imap.once("ready", execute)
            imap.once("error", function (err) {
                console.error("Connection error: " + err.stack)
            })

            imap.connect()

            function execute() {
                imap.openBox("INBOX", false, function (err, mailBox) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    imap.search([["ON", moment().format('YYYY-MM-DD')]], function (err, results) {
                        if (!results || !results.length) { console.log("No unread mails"); imap.end(); return; }
                        /* mark as seen
                        imap.setFlags(results, ['\\Seen'], function(err) {
                            if (!err) {
                                console.log("marked as read");
                            } else {
                                console.log(JSON.stringify(err, null, 2));
                            }
                        });*/
                        var f = imap.fetch(results, { bodies: "" });
                        f.on("message", processMessage);
                        f.once("error", function (err) {
                            return Promise.reject(err);
                        });
                        f.once("end", function () {
                            imap.end();
                        });
                    });
                });
            }

            function processMessage(msg, seqno) {

                let parser = new MailParser({ streamAttachments: true })
                parser.on("headers", function (headers) {
                    console.log(headers)
                });

                parser.on('data', data => {
                    if (data.type === 'text') {
                        console.log(seqno);
                        console.log(data.text);  /* data.html*/
                    }

                });
                let data = ""
                msg.on("body", function (stream) {
                    stream.on("data", function (chunk) {
                        data = data + chunk.toString("utf8");
                        parser.write(chunk.toString("utf8"));
                    });
                    stream.on("end", (chunk) => {
                    })
                });

                parser.on('attachment', async function (attachment, mail) {
                    let filepath = './download/';
                    let output = fs.createWriteStream(filepath + attachment.fileName);

                    attachment.stream.pipe(output).on("end", function () {
                        console.log("All the data in the file has been read");
                    }).on("close", function (err) {
                        console.log("Stream has been cloesd.");
                    });

                });

                msg.once("end", function () {
                    // console.log("Finished msg #" + seqno);
                    parser.end();
                });
            }
            // res.json(parser)
        })
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });

    app.post("/validarusuario", (req, res) => {
        Users.findOne({
            include: [
                { model: CursosactivosFC, as: 'cursos' },
                { model: LeccionesvistasFC, as: 'leccionesvistas' },
                { model: Tokensdatafastfc, as: 'tarjetas' },
                {
                    model: Documentos,
                    as: 'alldocumentos',
                    attributes: [
                        'idDocumento',
                        'clienteId',
                        'empresaIdCastor',
                        'Tipo'
                    ]
                }
            ],
            where: {
                email: req.body.email
            }
        })
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
                res.status(412).json({msg: 'usuario no registrado'});
            })
    })

    app.post("/chequearmails", (req, res) => {
        Users.findOne({
            include: [
                { model: CursosactivosFC, as: 'cursos' },
                { model: LeccionesvistasFC, as: 'leccionesvistas' },
                { model: Tokensdatafastfc, as: 'tarjetas' },
                {
                    model: Documentos,
                    as: 'alldocumentos',
                    attributes: [
                        'idDocumento',
                        'clienteId',
                        'empresaIdCastor',
                        'Tipo'
                    ]
                }
            ],
            where: {
                id: req.body.id
            }
        })
            .then(result => {
                let mensajes = []
                let imap = new Imap({
                    user: 'info@juassic.com',
                    password: '6662115JcRc',
                    host: 'mail.juassic.com',
                    port: 993,
                    tls: true,
                    tlsOptions: {
                        rejectUnauthorized: false
                    },
                    authTimeout: 3000
                }).once('error', function (err) {
                    console.log('Source Server Error:- ', err);
                });

                Promise.promisifyAll(imap)

                imap.once("ready", execute);
                imap.once("error", function(err) {
                    console.log("Connection error: " + err.stack);
                });

                imap.connect();

                function openInbox(cb) {
                    imap.openBox('INBOX', true, cb);
                }

                function processMessage(msg, seqno) {
                    let mensaje = {}
                    console.log("Processing msg #" + seqno);
                    // console.log(msg);

                    let parser = new MailParser();
                    parser.on("headers", function(headers) {
                        console.log("Header: " + JSON.stringify(headers));
                        mensaje.header = JSON.stringify(headers)
                    });

                    parser.on('data', data => {
                        if (data.type === 'text') {
                            console.log(seqno);
                            console.log('DATA TEXT')
                            console.log(data.text);  /* data.html*/
                            mensaje.body = data.text
                        }
                    });

                    msg.on("body", function(stream) {
                        stream.on("data", function(chunk) {
                            parser.write(chunk.toString("utf8"))
                        });
                    });
                    msg.once("end", function() {
                        parser.end();
                    });
                    mensajes.push(mensaje)
                }

                function execute() {
                    openInbox(function(err, box) {
                        if (err) throw err;
                        let f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
                        f.on("message", processMessage);
                        f.once('error', function(err) {
                            console.log('Fetch error: ' + err);
                            res.status(412).json({msg: err})
                        });
                        f.once('end', function() {
                            console.log('Recuperados todos los mensajes!');
                            imap.end();
                        });
                    });
                }

                setTimeout(() => {
                    res.json(mensajes)
                }, 2000)

                /*
                let mailing = new Promise((resolve, reject) => {
                    const pop3 = new Pop3Command({ host: 'mail.juassic.com' });
                    (async () => {

                        await pop3.connect();
                        await pop3.command('USER', 'jcarlosreyesc@juassic.com');
                        await pop3.command('PASS', '10092558@Sissi');
                        try{
                            const [info] = await pop3.command('STAT');
                            console.log(info); // 100 102400

                            const mail = await pop3.command('RETR', 1);
                            console.log(mail);
                            console.log(mail[0].Readable);
                            console.log(mail[0].buffer); // 1024 octets

                            const [tres] = await pop3.command('QUIT');
                            console.log(tres);
                            res.json(mail[1]._readableState.buffer.head)
                        }catch (err){
                            return console.log(err)
                        }
                    })();
                });
                 */

            })
            .catch(error => {
                res.status(412).json({msg: error.message})
            })
    })

    app.post("/chequearallmails", (req, res) => {
        Users.findOne({
            include: [
                { model: CursosactivosFC, as: 'cursos' },
                { model: LeccionesvistasFC, as: 'leccionesvistas' },
                { model: Tokensdatafastfc, as: 'tarjetas' },
                {
                    model: Documentos,
                    as: 'alldocumentos',
                    attributes: [
                        'idDocumento',
                        'clienteId',
                        'empresaIdCastor',
                        'Tipo'
                    ]
                }
            ],
            where: {
                id: req.body.id
            }
        })
        .then(result => {
            let mensajes = []
            let imap = new Imap({
                user: 'info@juassic.com',
                password: '6662115JcRc',
                host: 'mail.juassic.com',
                port: 993,
                tls: true,
                tlsOptions: {
                    rejectUnauthorized: false
                },
                authTimeout: 5000,
                connTimeout: 10000, // Default by node-imap
                debug: console.log, // Or your custom function with only one incoming argument. Default: null
                mailbox: "INBOX", // mailbox to monitor
                searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
                markSeen: true, // all fetched email willbe marked as seen and not fetched next time
                fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
                mailParserOptions: { streamAttachments: true }, // options to be passed to mailParser lib.
                attachments: true, // download attachments as they are encountered to the project directory
                attachmentOptions: { directory: "attachments/" } //
            }).once('error', function (err) {
                console.log('Source Server Error:- ', err);
            });

            function processMessage(msg, seqno) {
                let mensaje = {}

                let parser = new MailParser();
                parser.on("headers", function(headers) {
                    console.log("Header: " + JSON.stringify(headers));
                    mensaje.header = JSON.stringify(headers)
                });

                parser.on('data', data => {
                    if (data.type === 'text') {
                        console.log(seqno);
                        console.log('DATA TEXT')
                        console.log(data.text);  /* data.html*/
                        mensaje.body = data.text
                    }
                });

                msg.on("body", function(stream, info) {
                    stream.on("data", function(chunk) {
                        parser.write(chunk.toString("utf8"))
                    });
                });
                msg.once("end", function() {
                    parser.end();
                });
                mensajes.push(mensaje)
            }

            function toUpper(thing) {
                console.log('THING')
                console.log(thing)
                return thing && thing.toUpperCase ? thing.toUpperCase() : thing;
            }

            function findAttachmentParts(struct, attachments) {
                attachments = attachments ||  [];
                for (var i = 0, len = struct.length, r; i < len; ++i) {
                    if (Array.isArray(struct[i])) {
                        findAttachmentParts(struct[i], attachments);
                    } else {
                        if (struct[i].disposition && ['INLINE', 'ATTACHMENT'].indexOf(toUpper(struct[i].disposition.type)) > -1) {
                            attachments.push(struct[i]);
                        }
                    }
                }
                if (attachments && attachments.length > 0) {
                    buildAttMessageFunction(attachments)
                }
                return attachments;
            }

            function buildAttMessageFunction(attachment) {
                var filename = attachment.params.name;
                var encoding = attachment.encoding;
                // mensaje.attachment = attachment
                return function (msg, seqno) {
                    var prefix = '(#' + seqno + ') ';

                    msg.on('body', function(stream, info) {
                        //Create a write stream so that we can stream the attachment to file;
                        console.log(prefix + 'Streaming this attachment to file', filename, info);
                        var writeStream = fs.createWriteStream(filename);
                        writeStream.on('finish', function() {
                            console.log(prefix + 'Done writing to file %s', filename);
                        });

                        //stream.pipe(writeStream); this would write base64 data to the file.
                        //so we decode during streaming using
                        if (toUpper(encoding) === 'BASE64') {
                            //the stream is base64 encoded, so here the stream is decode on the fly and piped to the write stream (file)
                            stream.pipe(base64.decode()).pipe(writeStream);
                        } else  {
                            //here we have none or some other decoding streamed directly to the file which renders it useless probably
                            stream.pipe(writeStream);
                        }
                    });

                    msg.once('end', function() {
                        console.log(prefix + 'Finished attachment %s', filename);
                    });
                };
            }

            imap.once('ready', function() {
                imap.openBox('INBOX', true, function(err, box) {
                    let mensaje = {}
                    if (err) throw err;
                    let f = imap.seq.fetch('1:10', {
                        bodies: ['HEADER.FIELDS (SUBJECT, FROM TO SUBJECT DATE)','TEXT'],
                        struct: true
                    });

                    f.on("message", processMessage)

                    f.on('message', (msg, seqno) => {
                        console.log('Message #%d', seqno)
                        const prefix = `(#${seqno})`
                        var header = null
                        msg.on('body', (stream, info) => {
                            var buffer = ''
                            stream.on('data', (chunk) => { buffer += chunk.toString('utf8') });
                            stream.once('end', () => { header = Imap.parseHeader(buffer) })
                        });
                        msg.once('attributes', (attrs) => {
                            const attachments = findAttachmentParts(attrs.struct);
                            console.log(`${prefix} uid=${attrs.uid} Has attachments: ${attachments.length}`);
                            attachments.forEach((attachment) => {
                                /*
                                  RFC2184 MIME Parameter Value and Encoded Word Extensions
                                          4.Parameter Value Character Set and Language Information
                                  RFC2231 Obsoletes: 2184
                                  {
                                    partID: "2",
                                    type: "image",
                                    subtype: "jpeg",
                                    params: {
                            X         "name":"________20.jpg",
                                      "x-apple-part-url":"8C33222D-8ED9-4B10-B05D-0E028DEDA92A"
                                    },
                                    id: null,
                                    description: null,
                                    encoding: "base64",
                                    size: 351314,
                                    md5: null,
                                    disposition: {
                                      type: "inline",
                                      params: {
                            V           "filename*":"GB2312''%B2%E2%CA%D4%B8%BD%BC%FE%D2%BB%5F.jpg"
                                      }
                                    },
                                    language: null
                                  }   */
                                console.log(`${prefix} Fetching attachment $(attachment.params.name)`)
                                console.log(attachment.disposition.params["filename*"])
                                const filename = attachment.params.name  // need decode disposition.params['filename*'] !!!
                                const encoding = toUpper(attachment.encoding)
                                // A6 UID FETCH {attrs.uid} (UID FLAGS INTERNALDATE BODY.PEEK[{attachment.partID}])
                                const f = imap.fetch(attrs.uid, { bodies: [attachment.partID] })
                                mensaje.attachment = attachment
                                f.on('message', (msg, seqno) => {
                                    const prefix = `(#${seqno})`
                                    msg.on('body', (stream, info) => {
                                        const writeStream = fs.createWriteStream(filename);
                                        writeStream.on('finish', () => { console.log(`${prefix} Done writing to file ${filename}`) })
                                        if (encoding === 'BASE64') stream.pipe(base64.decode()).pipe(writeStream)
                                        else stream.pipe(writeStream)
                                    })
                                    msg.once('end', () => { console.log(`${prefix} Finished attachment file${filename}`) })
                                })
                                f.once('end', () => { console.log('WS: downloder finish') })
                            })
                        })
                        msg.once('end', () => { console.log(`${prefix} Finished email`); })
                    });
                    // mensajes.push(mensaje)
                    f.once('error', function(err) {
                        console.log('Fetch error: ' + err);
                    });
                    f.once('end', function() {
                        console.log('Done fetching all messages!');
                        imap.end();
                    });
                });
            });

            imap.once('error', function(err) {
                console.log(err);
            });

            imap.once('end', function() {
                console.log('Connection ended');
            });

            imap.connect();
            setTimeout(() => {
                res.json(mensajes)
            }, 10000)
        })
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
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

    app.get("/users", (req, res) => {
        Users.findAll({
            include: [
                {
                    model: Documentos,
                    as: 'alldocumentos',
                    attributes: [
                        'idDocumento'
                    ]
                }
            ],
            attributes: [
                'id',
                'username',
                'email',
                'password',
                'afiliadoId',
                'name',
                'direccion',
                'direccionformateada',
                'celular',
                'ruc',
                'ciudad',
                'provincia',
                'role',
                'plan',
                'storage',
                'storageff',
                'storagedc',
                'storageif',
                'lastip',
                'aplicaciones',
                'isActive',
                'isActiveFF',
                'isActiveDC',
                'isActiveIF',
                'isActiveAcademy'
            ],
            where: {
                isActive: {[Op.between]: [0, 1]},
                isActiveFF: {[Op.between]: [0, 1]},
                isActiveDC: {[Op.between]: [0, 1]},
                isActiveIF: {[Op.between]: [0, 1]},
                isActiveAcademy: {[Op.between]: [0, 1]}
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
    })

    app.get("/users/academy", (req, res) => {
        Users.findAll({
            include: [
                { model: CursosactivosFC, as: 'cursos' }
            ],
            attributes: [
                'id',
                'username',
                'afiliadoId',
                'email',
                'name',
                'direccion',
                'direccionformateada',
                'celular',
                'ruc',
                'ciudad',
                'provincia',
                'role',
                'ipregister',
                'lastip',
                'aplicaciones',
                'isActiveAcademy',
                'modopagoacademy',
                'valorpagoacademy',
                'periodopagoacademy',
                'fechapagoacademy',
                'createdAt',
                'updatedAt'
            ],
            where: {
                isActiveAcademy: {[Op.between]: [0, 1]}
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
    })

    app.get("/usersmin", (req, res) => {
        Users.findAll({
            attributes: [
                'id',
                'email',
                'name'
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
    })

    app.post("/users/academylist", (req, res) => {
        console.log(req.body)
        Users.findAll({
            include: [
                { model: CursosactivosFC, as: 'cursos' },
                { model: LeccionesvistasFC, as: 'leccionesvistas' }
            ],
            attributes: [
                'id',
                'username',
                'email',
                'afiliadoId',
                'name',
                'direccion',
                'direccionformateada',
                'celular',
                'ruc',
                'ciudad',
                'provincia',
                'role',
                'ipregister',
                'lastip',
                'aplicaciones',
                'isActiveAcademy',
                'modopagoacademy',
                'valorpagoacademy',
                'periodopagoacademy',
                'fechapagoacademy',
                'createdAt',
                'updatedAt'
            ],
            where: {
                isActiveAcademy: {[Op.between]: [0, 1]}
            },
            order: [
                ['id', 'DESC'],
            ],
            limit : 25,
            offset: req.body.options.offset
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })

    app.get("/users/academy/:id", (req, res) => {
        Users.findOne({
            include: [
                {
                    model: LeccionesvistasFC,
                    as: 'leccionesvistas',
                    attributes: [
                        'cursoId',
                        'leccion',
                        'seccionId',
                        'userId'
                    ]
                },
                { model: CursosactivosFC, as: 'cursos' }
            ],
            attributes: [
                'id',
                'username',
                'email',
                'password',
                'afiliadoId',
                'name',
                'direccion',
                'direccionformateada',
                'celular',
                'ruc',
                'ciudad',
                'provincia',
                'role',
                'cardtoken',
                'datacard',
                'metodo',
                'ipregister',
                'lastip',
                'version',
                'latitud',
                'longitud',
                'aplicaciones',
                'isActiveAcademy',
                'modopagoacademy',
                'valorpagoacademy',
                'periodopagoacademy',
                'fechapagoacademy',
                'createdAt',
                'updatedAt',
                'status',
                'codigo_referido'
            ],
            where: {
                id: req.params.id
            }
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })

    app.post("/users", (req, res) => {
        let url = 'localhost:3001'
        const salt = bcrypt.genSaltSync()
        const password = bcrypt.hashSync(req.body.password, salt)
        const payload = {
            id: req.body.email
        }
        let token = jwt.sign(payload, cfg.jwtSecret)
        let u = req.body.email
        let us = u.split('@')
        let ips = [req.body.ipregister]
        let values = {
            username: us[0],
            email: req.body.email,
            password: req.body.password,
            emailVerificated: 0,
            name: req.body.name,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            ipregister: req.body.ipregister,
            lastip: JSON.stringify(ips),
            latitud: req.body.latitud,
            longitud: req.body.longitud,
            direccionformateada: req.body.direccionformateada,
            aplicaciones: JSON.stringify(req.body.aplicaciones),
            plan: req.body.plan,
            storage: req.body.storage
        }
        Users.create(values)
            .then(result => {
                res.json({
                    auth: true,
                    response:result,
                    token: token
                })
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })

    app.post("/users/academy", (req, res) => {
        // console.log(req.body.usuario)
        let url = 'localhost:3001'
        const salt = bcrypt.genSaltSync()
        const password = bcrypt.hashSync(req.body.usuario.password, salt)
        const payload = {
            id: req.body.usuario.email
        }
        let token = jwt.sign(payload, cfg.jwtSecret)
        let u = req.body.usuario.email
        let us = u.split('@')
        let ips = [req.body.usuario.ipregister]
        let values = {
            username: us[0],
            email: req.body.usuario.email,
            password: req.body.usuario.password,
            afiliadoId: req.body.usuario.afiliadoId,
            emailVerificated: 0,
            name: req.body.usuario.name,
            direccion: (req.body.usuario.direccion) ? req.body.usuario.direccion : null,
            direccionformateada: (req.body.usuario.direccionformateada) ? req.body.usuario.direccionformateada : null,
            celular: (req.body.usuario.celular) ? req.body.usuario.celular : null,
            ruc: (req.body.usuario.ruc) ? req.body.usuario.ruc : null,
            ciudad: req.body.usuario.ciudad,
            ipregister: req.body.usuario.ipregister,
            lastip: JSON.stringify(ips),
            latitud: req.body.usuario.latitud,
            longitud: req.body.usuario.longitud,
            aplicaciones: JSON.stringify(req.body.usuario.aplicaciones),
            plan: req.body.usuario.plan,
            isActiveAcademy: 1
        }
        // console.log('values', values)
        Users.create(values)
            .then(result => {
                // console.log('result', result)
                res.json({
                    auth: true,
                    response:result,
                    token: token
                })
            })
            .catch(error => {
                // console.log('error', error)
                res.json({
                    auth: false,
                    msg: error.message,
                    response: null,
                    token: null,
                    error
                });
            });
    })

    app.post("/users/new", (req, res) => {
        let url = 'localhost:3001'
        const salt = bcrypt.genSaltSync()
        const password = bcrypt.hashSync(req.body.usuario.password, salt)
        const payload = {
            id: req.body.usuario.email
        }
        let token = jwt.sign(payload, cfg.jwtSecret)
        let u = req.body.usuario.email
        let us = u.split('@')
        let ips = [req.body.usuario.ipregister]
        let values = {
            username: us[0],
            email: req.body.usuario.email,
            password: req.body.usuario.password,
            afiliadoId: req.body.usuario.afiliadoId,
            emailVerificated: 0,
            name: req.body.usuario.name,
            direccion: req.body.usuario.direccion,
            ciudad: req.body.usuario.ciudad,
            provincia: req.body.usuario.provincia,
            metodo: req.body.usuario.metodo,
            ruc: req.body.usuario.ruc,
            datacard: JSON.stringify(req.body.usuario.datospago),
            celular: req.body.usuario.celular,
            ipregister: req.body.usuario.ipregister,
            lastip: JSON.stringify(ips),
            latitud: req.body.usuario.latitud,
            longitud: req.body.usuario.longitud,
            direccionformateada: req.body.usuario.direccionformateada,
            aplicaciones: JSON.stringify(req.body.usuario.aplicaciones),
            plan: JSON.stringify(req.body.usuario.plan),
            storage: req.body.usuario.storage,
            storageff: req.body.usuario.storageff,
            storagedc: req.body.usuario.storagedc,
            storageif: req.body.usuario.storageif,
            modopago: req.body.usuario.modopago,
            modopagocx: req.body.usuario.modopagocx,
            modopagodc: req.body.usuario.modopagodc,
            modopagoif: req.body.usuario.modopagoif,
            modopagoacademy: req.body.usuario.modopagoacademy,
            valorpago: req.body.usuario.valorpago,
            periodopago: req.body.usuario.periodopago,
            fechapago: req.body.usuario.fechapago,
            valorpagocx: req.body.usuario.valorpagocx,
            periodopagocx: req.body.usuario.periodopagocx,
            fechapagocx: req.body.usuario.fechapagocx,
            valorpagodc: req.body.usuario.valorpagodc,
            periodopagodc: req.body.usuario.periodopagodc,
            fechapagodc: req.body.usuario.fechapagodc,
            valorpagoif: req.body.usuario.valorpagoif,
            periodopagoif: req.body.usuario.periodopagoif,
            fechapagoif: req.body.usuario.fechapagoif,
            valorpagoacademy: req.body.usuario.valorpagoacademy,
            periodopagoacademy: req.body.usuario.periodopagoacademy,
            fechapagoacademy: req.body.usuario.fechapagoacademy,
            productosacademy: req.body.usuario.productosacademy,
            usuarioFirebase: JSON.stringify(req.body.usuario.userFirebase),
            dataFirebase: req.body.usuario.dataFirebase
        }
        // console.log('valores', values)
        Users.create(values)
            .then(result => {
                // console.log('resultados ', result)
                res.json({
                    auth: true,
                    response:result,
                    token: token
                })
            })
            .catch(error => {
                console.log('error ', error)
                res.status(412).json({msg: error.message});
            });
    })

    app.post("/users/update", (req, res) => {
        // console.log('req.body.usuario', req.body.usuario)
        let values = {
            ciudad: req.body.usuario.ciudad,
            provincia: req.body.usuario.provincia,
            metodo: req.body.usuario.metodo,
            datacard: JSON.stringify(req.body.usuario.datospago),
            latitud: req.body.usuario.latitud,
            longitud: req.body.usuario.longitud,
            aplicaciones: JSON.stringify(req.body.usuario.aplicaciones),
            plan: JSON.stringify(req.body.usuario.plan),
            storage: req.body.usuario.storage,
            storageff: req.body.usuario.storageff,
            storagedc: req.body.usuario.storagedc,
            storageif: req.body.usuario.storageif,
            modopago: req.body.usuario.modopago,
            modopagocx: req.body.usuario.modopagocx,
            modopagodc: req.body.usuario.modopagodc,
            modopagoif: req.body.usuario.modopagoif,
            valorpago: req.body.usuario.valorpago,
            periodopago: req.body.usuario.periodopago,
            fechapago: req.body.usuario.fechapago,
            valorpagocx: req.body.usuario.valorpagocx,
            periodopagocx: req.body.usuario.periodopagocx,
            fechapagocx: req.body.usuario.fechapagocx,
            valorpagodc: req.body.usuario.valorpagodc,
            periodopagodc: req.body.usuario.periodopagodc,
            fechapagodc: req.body.usuario.fechapagodc,
            valorpagoif: req.body.usuario.valorpagoif,
            periodopagoif: req.body.usuario.periodopagoif,
            fechapagoif: req.body.usuario.fechapagoif
        }
        // console.log('values ', values)
        Users.update(values, {
            where: {
                id: req.body.usuario.user.id
            }
        })
            .then(result => {
                res.json({
                    auth: true,
                    response:result
                })
            })
            .catch(error => {
                console.log(error)
                res.json({
                    auth: false,
                    message: error.message
                })
                // res.status(412).json({msg: error.message});
            });
    })

    app.post("/users/insertarnuevatarjeta", (req, res) => {
        let values = {
            cards: req.body.usuario.cards
        }
        Users.update(values, {
            where: {
                id: req.body.usuario.id
            }
        })
            .then(result => {
               res.json({
                    auth: true,
                    response:result
                })
            })
            .catch(error => {
                console.log(error)
                res.json({
                    auth: false,
                    message: error.message
                })
                // res.status(412).json({msg: error.message});
            });
    })

    app.post("/users/activarlicencia", (req, res) => {
        Users.update(req.body.usuario, {
            where: {
                id: req.body.usuario.id
            }
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                res.json({
                    auth: false,
                    message: error.message
                })
                // res.status(412).json({msg: error.message});
            });
    })

    app.post("/users/quitaraccesoproducto", (req, res) => {
        Users.update(req.body.usuario, {
            where: {
                id: req.body.usuario.id
            }
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                res.json({
                    auth: false,
                    message: error.message
                })
                // res.status(412).json({msg: error.message});
            });
    })

    app.post("/users/limpiarips", (req, res) => {
        const datos = {
            lastip: '[]'
        }
        Users.update(datos, {
            where: {
                id: req.body.usuario
            }
        })
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            })
    })

    app.post("/users/updateinfogeneral", (req, res) => {
        Users.update(req.body.params, {
            where: {
                id: req.body.params.id
            }
        })
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            })
    })

    app.post("/users/updatepassword", (req, res) => {
        const salt = bcrypt.genSaltSync()
        const passwordencriptado = bcrypt.hashSync(req.body.params.password, salt)
        let datos = {
            password: passwordencriptado
        }
        Users.findOne({ where: {
                email: req.body.params.email,
            }})
            .then(user => {
                // console.log(user)
                if(Users.isPassword(user.password, req.body.params.oldpass)) {
                    // console.log('is password')
                    Users.update(datos, {
                        where: {
                            id: req.body.params.id
                        }
                    })
                        .then(result => {
                            res.json(result)
                        })
                        .catch(err => {
                            console.log(err)
                            res.json(err)
                        })
                } else {
                    res.json({message: 'El password actual es incorrecto'})
                }
            })

    })

    app.post("/users/updateinfo", (req, res) => {
        Users.update(req.body.params, {
            where: {
                id: req.body.params.id
            }
        })
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            })
    })

    app.put("/users", (req, res) => {
        let cliente = req.body.cliente
        let datosfactura = req.body.datosfactura
        let datostransferencia = req.body.datacard
        let datos = {
            plan: JSON.stringify(req.body.plan),
            cardtoken: (req.body.metodo === 'TARJETA DÉBITO/CRÉDITO')?req.body.cardtoken:JSON.parse(datostransferencia).numero,
            datacard: req.body.datacard,
            storage: req.body.storage,
            celular: JSON.parse(datosfactura).celular,
            provincia: JSON.parse(datosfactura).provincia,
            metodo: req.body.metodo,
            isActive: (req.body.metodo === 'TARJETA DÉBITO/CRÉDITO' || req.body.metodo === 'CUENTA FREE')?1:0,
            ciudad: JSON.parse(datosfactura).ciudad,
            direccion: JSON.parse(datosfactura).direccion,
            ruc: JSON.parse(datosfactura).ruc,
            modopagocx: req.body.modopagocx,
            valorpagocx: req.body.valorpagocx,
            periodopagocx: req.body.periodopagocx,
            fechapagocx: req.body.fechapagocx
        }
        Users.update(datos, {
            where: {
                id: JSON.parse(cliente).id
            }
        })
            .then(result => {
                let planadquirido = req.body.plan
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
                if(req.body.metodo === 'TARJETA DÉBITO/CRÉDITO') {
                    template = templates().registrocc
                } else {
                    template = templates().registrotransfer
                    let cuentaactiva = (datos.isActive)?'Cuenta se encuentra activa':'Cuenta Inactiva esperando comprobación de datos'
                }
                let notificacion = transporter.sendMail({
                    from: 'Castor X <info@facilcontabilidad.com>', // sender address
                    to: JSON.parse(cliente).email, // list of receivers
                    subject: "Registro CastorX ✔", // Subject line
                    // html: "<p>Haz click <a href='https://localhost:3000/pages/recover-password/'" + token + ">aquí</a> para continuar el proceso de recuperación</p><p><p><img src='https://juassic.com/castor.png' width='150px' /></p>",
                    html: template
                }, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
                setTimeout(() => {
                    let message = {
                        from: 'facilContabilidad <info@facilcontabilidad.com>',
                        // Comma separated list of recipients
                        to: 'ventas <ventas@facilcontabilidad.com>, Juan Carlos Reyes <jackrom@live.com>, Facil Contabilidad <info@facilcontabilidad.com>, Rowilled <wgranenterprises@gmail.com>',

                        // Subject of the message
                        subject: 'Nueva venta realizada CastorX ✔',

                        // HTML body
                        html: `<table data-module="notification_default_xs_icon" data-thumb="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2017/10/16/4pId6zuQoxceDO0FnBKAPq38/notifications/thumbnails/171.png" data-visible="false" class="email_section" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody>
                                <tr>
                                  <td class="email_bg bg_light px py_lg" data-bgcolor="Light" style="font-size: 0;text-align: center;line-height: 100%;background-color: #d1deec;padding-top: 64px;padding-bottom: 64px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                    <!--[if (mso)|(IE)]>
                                    <table role="presentation" width="416" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                      <tbody>
                                      <tr>
                                        <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                    <![endif]-->
                                    <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><table class="content_section_xs ui-resizable" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 416px;margin: 0 auto;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                    <tbody>
                                    <tr>
                                      <td class="content_cell bg_white brounded bt_primary px py_md" data-bgcolor="White" data-border-top-color="Border Primary" style="font-size: 0;text-align: center;background-color: #ffffff;border-top: 4px solid #EA5455;border-radius: 4px;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                        <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                          <tbody>
                                          <tr>
                                            <td class="column_cell px py_xs text_primary text_center" data-color="Primary" style="vertical-align: top;color: #EA5455; text-align: center;padding-top: 8px;padding-bottom: 8px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                              <p class="img_inline" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-size: 16px;line-height: 100%;clear: both;"><a href="#" data-color="Primary" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;text-decoration: none;color: #EA5455;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;"><img src="https://juassic.com/castor.png" width="250" height="" alt="Castor X" style="max-width: 300px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"></a></p>
                                            </td>
                                          </tr>
                                          </tbody>
                                        </table>
                                        <div class="column_row" style="font-size: 0;text-align: center;max-width: 624px;margin: 0 auto;">
                                          <!--[if (mso)|(IE)]>
                                          <table role="presentation" width="312" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                            <tbody>
                                            <tr>
                                              <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                          <![endif]-->
                                          <div class="col_2" style="vertical-align: top;display: inline-block;width: 100%;max-width: 312px;">
                                            <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                              <tbody>
                                              <tr>
                                                <td class="column_cell bb_light" height="32" data-border-bottom-color="Border Light" style="vertical-align: top;border-bottom: 1px solid #dee0e1;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">&nbsp;</td>
                                              </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <!--[if (mso)|(IE)]>
                                          </td>
                                          </tr>
                                          </tbody>
                                          </table>
                                          <![endif]-->
                                        </div>
                                        <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                          <tbody>
                                          <tr>
                                            <td class="column_cell px py_md text_dark text_center" data-color="Dark" style="vertical-align: top;color: #333333;text-align: center;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                              <table class="column column_inline" role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;width: auto;margin: 0 auto;clear: both;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                <tbody>
                                                <tr>
                                                  <td class="column_cell bg_primary brounded_circle px py text_white text_center" data-bgcolor="Primary" data-color="White" style="vertical-align: top;background-color: #ffffff;color: #ffffff;border-radius: 50%;text-align: center;padding-top: 16px;padding-bottom: 16px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                    <p class="img_full" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-size: 0 !important;line-height: 100%;clear: both;"><img src="https://toppng.com/uploads/preview/red-dollar-sign-png-dollar-sign-icon-red-11562972811vigpzht27u.png" width="70" height="70" alt="" style="max-width: 48px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;display: block;width: 100%;margin: 0px auto;"></p>
                                                  </td>
                                                </tr>
                                                </tbody>
                                              </table>
                                              <h2 class="mt mb_xs" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 16px;margin-bottom: 8px;word-break: break-word;font-size: 28px;line-height: 38px;font-weight: bold;">Nueva venta</h2>
                                              <p class="text_lead text_secondary mb_md" data-color="Secondary" style="color: #959ba0;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 10px;word-break: break-word;font-size: 19px;line-height: 31px;">Datos para factura</p>
                                              <table>
                                                  <tbody>
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> RUC</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datosfactura).ruc +`</td>
                                                    </tr>
                                                
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> NOMBRE</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(cliente).name +`</td>
                                                    </tr>
                                                
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> EMAIL</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(cliente).email +`</td>
                                                    </tr>
                                                
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> DIRECCIÓN</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datosfactura).direccion +`</td>
                                                    </tr>
                                                
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> CIUDAD</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datosfactura).ciudad +`</td>
                                                    </tr>
                                                
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> PROVINCIA</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datosfactura).provincia +`</td>
                                                    </tr>
                                                    
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> TELEFONO</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datosfactura).celular +`</td>
                                                    </tr>
                                                  
                                                  </tbody>
                                              </table>
                                              
                                              <p class="text_lead text_secondary mb_md" data-color="Secondary" style="color: #959ba0;font-family: Arial, Helvetica, sans-serif;margin-top: 32px;margin-bottom: 10px;word-break: break-word;font-size: 19px;line-height: 31px;">Datos de pago</p>
                                              <table>
                                                  <tbody>
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> Método</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ req.body.metodo +`</td>
                                                    </tr>
                                                
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> Número de transferencia</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datostransferencia).numero +`</td>
                                                    </tr>
                                                
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> Valor de la transferencia</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datostransferencia).valor +`</td>
                                                    </tr>
                                                
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> Banco de procedencia</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datostransferencia).banco +`</td>
                                                    </tr>
                                                
                                                    <tr>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> Quien transfiere</td>
                                                      <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datostransferencia).ordenante +`</td>
                                                    </tr>
                                                  
                                                  </tbody>
                                              </table>
                                              <table role="presentation" class="ebutton" align="center" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0 auto;">
                                                <tbody>
                                                <tr></tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="content_cell" style="font-size: 0;text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                        <div class="column_row" style="font-size: 0;text-align: center;max-width: 624px;margin: 0 auto;">
                                          <!--[if (mso)|(IE)]>
                                          <table role="presentation" width="624" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                            <tbody>
                                            <tr>
                                              <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                          <![endif]-->
                                          <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                            <tbody>
                                            <tr>
                                              <td class="column_cell px py_md text_secondary text_center" data-color="Secondary" style="vertical-align: top;color: #959ba0;text-align: center;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                <p class="mb_xs text_link" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 8px;word-break: break-word;font-size: 16px;line-height: 26px;">©2020 Rowilled.</p>
                                              </td>
                                            </tr>
                                            </tbody>
                                          </table>
                                          <!--[if (mso)|(IE)]>
                                          </td>
                                          </tr>
                                          </tbody>
                                          </table>
                                          <![endif]-->
                                        </div>
                                      </td>
                                    </tr>
                                    </tbody>
                                  </table>
                                    <!--[if (mso)|(IE)]>
                                    </td>
                                    </tr>
                                    </tbody>
                                    </table>
                                    <![endif]-->
                                  </td>
                                </tr>
                                </tbody>
                              </table>`,

                        attachments: [
                            // String attachment
                            {
                                filename: 'pedido.txt',
                                content: nuevoPedido,
                                contentType: 'text/plain' // optional, would be detected from the filename
                            },
                        ],

                        list: {
                            // List-Help: <mailto:admin@example.com?subject=help>
                            help: 'help@facilcontabilidad.com?subject=help',

                            // List-Unsubscribe: <http://example.com> (Comment)
                            unsubscribe: [
                                {
                                    url: 'http://facilcontabilidad.com/unsubscribe',
                                    comment: 'No deseo recibir mas este tipo de email'
                                },
                                'unsubscribe@facilcontabilidad.com'
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
                    })
                }, 1500)
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                res.status(412).json({
                    msg: error.message
                });
            });
    })

    app.get("/users/:id", (req, res) => {
        Users.findOne({
            include: [
                {
                    model: LeccionesvistasFC,
                    as: 'leccionesvistas',
                    attributes: [
                        'cursoId',
                        'leccion',
                        'seccionId',
                        'userId'
                    ]
                },
                { model: CursosactivosFC, as: 'cursos' },
                { model: Tokensdatafastfc, as: 'tarjetas' },
                {
                    model: Documentos,
                    as: 'alldocumentos',
                    attributes: [
                        'idDocumento',
                        'clienteId',
                        'empresaIdCastor',
                        'Tipo'
                    ]
                }
            ],
            attributes: [
                'id',
                'username',
                'email',
                'password',
                'afiliadoId',
                'name',
                'direccion',
                'direccionformateada',
                'celular',
                'ruc',
                'ciudad',
                'provincia',
                'role',
                'plan',
                'cardtoken',
                'datacard',
                'storage',
                'storageff',
                'storagedc',
                'storageif',
                'metodo',
                'ipregister',
                'lastip',
                'version',
                'latitud',
                'longitud',
                'new_password_key',
                'new_password_request',
                'isBanned',
                'banReason',
                'aplicaciones',
                'isActive',
                'isActiveFF',
                'isActiveDC',
                'isActiveIF',
                'isActiveAcademy',
                'modopago',
                'modopagocx',
                'modopagodc',
                'modopagoif',
                'modopagoacademy',
                'valorpago',
                'periodopago',
                'fechapago',
                'valorpagocx',
                'periodopagocx',
                'fechapagocx',
                'valorpagodc',
                'periodopagodc',
                'fechapagodc',
                'valorpagoif',
                'periodopagoif',
                'fechapagoif',
                'valorpagoacademy',
                'periodopagoacademy',
                'fechapagoacademy',
                'tokenpush',
                'codigopush',
                'pop3_user',
                'pop3_password',
                'pop3_server',
                'smtp_do_authorization',
                'smtp_user',
                'smtp_password',
                'smtp_server',
                'email_from_address',
                'email_from_name',
                'createdAt',
                'updatedAt',
                'status',
                'userFirebase',
                'dataFirebase',
                'empresa',
                'codigo_referido'
            ],
            where: {
                id: req.params.id
            }
        })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })

    app.get("/users/afiliado/:serial", (req, res) => {
        console.log(req.params.serial)
        Users.findOne({
            attributes: [
                'id',
                'username',
                'email',
                'afiliadoId',
                'name',
                'direccion',
                'celular',
                'ruc',
                'ciudad',
                'provincia'
            ],
            where: {
                afiliadoId: req.params.serial
            }
        })
            .then(result => {
                console.log(result)
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                res.status(412).json({msg: error.message});
            });
    })

    app.delete("/users/:id", (req, res) => {
        Users.destroy({where: {id: req.params.id}})
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.json({msg: error.message})
            });
    })

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

    app.put("/user", (req, res) => {
        console.log(req.body)
        Users.update(req.body.user, {
            where: {
                email: req.body.user.email
            }
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                res.status(412).json({
                    msg: error.message
                });
            })
    })

    app.put("/user/update", (req, res) => {
        console.log(req.body.user)

        if (req.body.user.password) {
            const salt = bcrypt.genSaltSync()
            req.body.user.password = bcrypt.hashSync(req.body.user.password, salt)
        }

        Users.update(req.body.user, {
            where: {
                email: req.body.user.email
            }
        })
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                res.status(412).json({
                    msg: error.message
                });
            })
    })

    app.put("/user/agregarcanales", (req, res) => {
        let canales = req.body.user.canales
        let canalesUsers = (req.body.user.canalesUsers && req.body.user.canalesUsers.length > 0) ? req.body.user.canalesUsers : []
        canales.forEach((obj) => {
            let channels;
            obj.users.forEach((item) => {
                if (req.body.user.userId === item) {
                    console.log('coinciden')
                } else {
                    canalesUsers = [
                        {
                            channel: obj.channel,
                            user: obj.users
                        }
                    ]
                }
                const miscanales = {
                    canales: JSON.stringify(canalesUsers)
                }
                Users.update(miscanales, {
                    where: {
                        id: item
                    }
                })
                    .then(result => {
                        console.log(result)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        })
        res.json(true)
    })

        /**
         * @api {post} /chequearmails Chequea si un email dado esta o no regsitrado
         * @apiGroup Users
         * @apiHeader {String} Token de autorización de usuario autenticado
         * @apiHeaderExample {json} Header
         * {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {email} email Email a revisar
         * @apiParamExample {json} Input
         * {
         *   "email": "raul@hotmail.com"
         * }
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
         * @apiErrorExample {json} Email no encontrado, disponible
         * HTTP/1.1 404 Not Found
         * @apiErrorExample {json} Delete error
         * HTTP/1.1 412 Precondition Failed
         */

    app.post("/chequearmails", (req, res) => {
        Users.findAll({
            where: {
                email: req.body.email
            }
        })
            .then(result => {
                if (result) {
                    res.json(result);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
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

    app.post("/descargar_documentos", (req, res) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace('Bearer ','')
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDM1Njg3NDIsImRhdGEiOiJqYWNrcm9tQGxpdmUuY29tIiwiaWF0IjoxNjAzNTY1MTQyfQ.hMS7goRrq_hoarhN6hXRd_E4bCnjAJL_Ziuhh_yjcAM"
                const datos = {
                    fileData: req.body.datos.documentos,
                    user: "yrsuarez@gmail.com",
                    password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
                }
                let options = {
                    'method': 'POST',
                    'url': 'http://181.39.193.148/RestInvoiceIntegration/operation/GetXmlDocuments',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                };
                request(options, function (error, response) {
                    // console.log(response.body)
                    if (error) {
                        console.log(error)
                        // throw new Error(error)
                    }
                    // console.log(response)
                    if(response && response.body.length > 0) {
                        let respuesta = JSON.parse(response.body)
                        if (respuesta.Sucessful !== false) {
                            let docs = []
                            respuesta.forEach((obj) => {
                                Documentos.findAndCountAll({
                                    where: {
                                        Tipo: obj.Tipo,
                                        RazonSocialEmisor: obj.RazonSocialEmisor,
                                        RucEmisor: obj.RucEmisor,
                                        RazonSocialCliente: obj.RazonSocialCliente,
                                        ClaveAcceso: obj.ClaveAcceso
                                    }
                                })
                                    .then(result => {
                                        if (result.count > 0) {
                                            obj.isDownloable = false
                                            obj.tag = result.rows[0].tag
                                        } else {
                                            obj.isDownloable = true
                                            obj.tag = 0
                                        }
                                        docs.push(obj)
                                        if (docs.length === respuesta.length) {
                                            res.json(JSON.stringify(docs))
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            })
                        } else {
                            res.status(412).json({msg: respuesta.data})
                        }
                    } else {
                        res.status(412).json({msg: 'Ha sucedido un error en su consulta,no se obtuvo una respuesta'})
                    }
                });
            } else {
                res.status(401).json({msg: 'Su sessión ha expirado, por favor inicia sesión nuevamente'})
            }
        } else {
            res.status(401).json({msg: 'Permiso denegado, debe iniciar sesión nuevamente'});
        }
    })

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

    app.post("/sendRecovery", (req, res) => {
        // console.log(req.body.email)
        let token = jwt.sign(req.body.email, cfg.jwtSecret);
        Users.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(result => {
                // console.log('result', result)
                let fecha = new Date()
                datos = {
                    new_password_key: token,
                    new_password_request: Date.now()
                }
                if (result != null) {
                    Users.update(datos, {
                        where: {
                            email: req.body.email
                        }
                    })
                        .then(resultados => {
                            let transporter = nodeMailer.createTransport({
                                host: "smtp.elasticemail.com",
                                port: 587,
                                secure: false,
                                // port : 465,
                                // secure: true, // true for 465, false for other ports
                                auth: {
                                    user: "info@facilcontabilidad.com",
                                    pass: "CC9800D31C6435095E42E5BEA7CC710B4191",
                                },
                            });

                            let template = `<table data-module="notification_default_xs_icon" data-thumb="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2017/10/16/4pId6zuQoxceDO0FnBKAPq38/notifications/thumbnails/171.png" data-visible="false" class="email_section" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td class="email_bg bg_light px py_lg" data-bgcolor="Light" style="font-size: 0;text-align: center;line-height: 100%;background-color: #d1deec;padding-top: 64px;padding-bottom: 64px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                        <!--[if (mso)|(IE)]>
                                                        <table role="presentation" width="416" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                                          <tbody>
                                                          <tr>
                                                            <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                                        <![endif]-->
                                                            <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div>
                                                            <table class="content_section_xs ui-resizable" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 416px;margin: 0 auto;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                <tbody>
                                                                    <tr>
                                                                      <td class="content_cell bg_white brounded bt_primary px py_md" data-bgcolor="White" data-border-top-color="Border Primary" style="font-size: 0;text-align: center;background-color: #ffffff;border-top: 4px solid #ea5455; border-radius: 4px;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                        <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                          <tbody>
                                                                              <tr>
                                                                                <td class="column_cell px py_xs text_primary text_center" data-color="Primary" style="vertical-align: top;color: #ea5455;text-align: center;padding-top: 8px;padding-bottom: 8px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                                  <p class="img_inline" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-size: 16px;line-height: 100%;clear: both;">
                                                                                      <a href="https://facilcontabilidad.org/" data-color="Primary" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;text-decoration: none;color: #EA5455;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;">
                                                                                        <img src="https://facilcontabilidad.org/logos/logo.png" width="260" height="" alt="FacilContabilidad" style="max-width: 260px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;">
                                                                                      </a>
                                                                                  </p>
                                                                                </td>
                                                                              </tr>
                                                                          </tbody>
                                                                        </table>
                                                                        <div class="column_row" style="font-size: 0;text-align: center;max-width: 624px;margin: 0 auto;">
                                                                          <!--[if (mso)|(IE)]>
                                                                          <table role="presentation" width="312" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                                                            <tbody>
                                                                            <tr>
                                                                              <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                                                          <![endif]-->
                                                                          <div class="col_2" style="vertical-align: top;display: inline-block;width: 100%;max-width: 312px;">
                                                                            <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                              <tbody>
                                                                                  <tr>
                                                                                    <td class="column_cell bb_light" height="32" data-border-bottom-color="Border Light" style="vertical-align: top;border-bottom: 1px solid #dee0e1;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">&nbsp;</td>
                                                                                  </tr>
                                                                              </tbody>
                                                                            </table>
                                                                          </div>
                                                                          <!--[if (mso)|(IE)]>
                                                                          </td>
                                                                          </tr>
                                                                          </tbody>
                                                                          </table>
                                                                          <![endif]-->
                                                                        </div>
                                                                        <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                          <tbody>
                                                                              <tr>
                                                                                <td class="column_cell px py_md text_dark text_center" data-color="Dark" style="vertical-align: top;color: #333333;text-align: center;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                                  <table class="column column_inline" role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;width: auto;margin: 0 auto;clear: both;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                          <td class="column_cell bg_primary brounded_circle px py text_white text_center" data-bgcolor="Primary" data-color="White" style="vertical-align: top;background-color: #ea5455;color: #ffffff;border-radius: 50%;text-align: center;padding-top: 16px;padding-bottom: 16px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                                            <p class="img_full" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-size: 0 !important;line-height: 100%;clear: both;"><img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2017/10/16/4pId6zuQoxceDO0FnBKAPq38/notifications/images/lock_white.png" width="48" height="48" alt="" style="max-width: 48px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;display: block;width: 100%;margin: 0px auto;"></p>
                                                                                          </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                  </table>
                                                                                  <h2 class="mt mb_xs" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 16px;margin-bottom: 8px;word-break: break-word;font-size: 28px;line-height: 38px;font-weight: bold;">Olvidaste tu password?</h2>
                                                                                  <p class="text_lead text_secondary mb_md" data-color="Secondary" style="color: #959ba0;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 32px;word-break: break-word;font-size: 19px;line-height: 31px;">No pasa nada. no es gran cosa!</p>
                                                                                  <p class="mb_md" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 32px;word-break: break-word;font-size: 16px;line-height: 26px;">Para crear una nueva contraseña haz click en el boton abajo</p>
                                                                                  <table role="presentation" class="ebutton" align="center" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0 auto;">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                          <td class="bg_primary" data-bgcolor="Primary" style="background-color: #ea5455;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 16px;padding: 13px 24px;border-radius: 4px;line-height: normal;text-align: center;font-weight: bold;-webkit-transition: box-shadow .25s;transition: box-shadow .25s;">
                                                                                            <a href="https://dynopagos.com/?action=recoverypassword&email=`+ req.body.email +`&token=`+ token +`" data-color="White" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;text-decoration: none;color: #ffffff;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-weight: bold;">
                                                                                                <span data-color="White" style="color: #ffffff;text-decoration: none;">Resetear Password</span>
                                                                                            </a>
                                                                                          </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                  </table>
                                                                                  <p style="color: #959ba0;">Recibiste este correo electrónico porque fue solicitado por un usuario de alguna de las aplicaciones contable de FacilContabilidad. Esto es parte del procedimiento para crear una nueva contraseña en el sistema. Si NO solicitó una nueva contraseña, ignore este correo electrónico y su contraseña seguirá siendo la misma.</p>
                                                                                </td>
                                                                              </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td class="content_cell" style="font-size: 0;text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                        <div class="column_row" style="font-size: 0;text-align: center;max-width: 624px;margin: 0 auto;">
                                                                          <!--[if (mso)|(IE)]>
                                                                          <table role="presentation" width="624" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                                                            <tbody>
                                                                            <tr>
                                                                              <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                                                          <![endif]-->
                                                                          <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                            <tbody>
                                                                                <tr>
                                                                                  <td class="column_cell px py_md text_secondary text_center" data-color="Secondary" style="vertical-align: top;color: #959ba0;text-align: center;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                                    <p class="mb_xs text_link" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 8px;word-break: break-word;font-size: 16px;line-height: 26px;">©2020 Rowilled.</p>
                                                                                  </td>
                                                                                </tr>
                                                                            </tbody>
                                                                          </table>
                                                                          <!--[if (mso)|(IE)]>
                                                                          </td>
                                                                          </tr>
                                                                          </tbody>
                                                                          </table>
                                                                          <![endif]-->
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!--[if (mso)|(IE)]>
                                                            </td>
                                                            </tr>
                                                            </tbody>
                                                            </table>
                                                            <![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>`

                            // send mail with defined transport object
                            let message = transporter.sendMail({
                                from: 'FacilContabilidad <info@facilcontabilidad.com>', // sender address
                                to: req.body.email, // list of receivers
                                subject: "Recupera tu contraseña ✔", // Subject line
                                // html: "<p>Haz click <a href='https://localhost:3000/pages/recover-password/'" + token + ">aquí</a> para continuar el proceso de recuperación</p><p><p><img src='https://juassic.com/castor.png' width='150px' /></p>",
                                html: template
                            }, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message %s sent: %s', info.messageId, info.response);
                            });
                        })
                    res.json(result)
                } else {
                    res.json(result)
                }
            })
            .catch(error => {
                res.status(412).json({msg: error.message})
            })
    })

    app.post("/sendRecoveryAcademy", (req, res) => {
        // console.log(req.body.email)
        let token = jwt.sign(req.body.email, cfg.jwtSecret);
        Users.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(result => {
                // console.log('result', result)
                let fecha = new Date()
                datos = {
                    new_password_key: token,
                    new_password_request: Date.now()
                }
                if (result != null) {
                    Users.update(datos, {
                        where: {
                            email: req.body.email
                        }
                    })
                        .then(resultados => {
                            let transporter = nodeMailer.createTransport({
                                host: "smtp.elasticemail.com",
                                port: 587,
                                secure: false,
                                // port : 465,
                                // secure: true, // true for 465, false for other ports
                                auth: {
                                    user: "info@facilcontabilidad.com",
                                    pass: "CC9800D31C6435095E42E5BEA7CC710B4191",
                                },
                            });

                            let template = `<table data-module="notification_default_xs_icon" data-thumb="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2017/10/16/4pId6zuQoxceDO0FnBKAPq38/notifications/thumbnails/171.png" data-visible="false" class="email_section" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                            <tr>
                                              <td class="email_bg bg_light px py_lg" data-bgcolor="Light" style="font-size: 0;text-align: center;line-height: 100%;background-color: #d1deec;padding-top: 64px;padding-bottom: 64px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                <!--[if (mso)|(IE)]>
                                                <table role="presentation" width="416" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                                  <tbody>
                                                  <tr>
                                                    <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                                <![endif]-->
                                                <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><table class="content_section_xs ui-resizable" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 416px;margin: 0 auto;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                <tbody>
                                                <tr>
                                                  <td class="content_cell bg_white brounded bt_primary px py_md" data-bgcolor="White" data-border-top-color="Border Primary" style="font-size: 0;text-align: center;background-color: #ffffff;border-top: 4px solid #ea5455; border-radius: 4px;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                    <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                      <tbody>
                                                      <tr>
                                                        <td class="column_cell px py_xs text_primary text_center" data-color="Primary" style="vertical-align: top;color: #ea5455;text-align: center;padding-top: 8px;padding-bottom: 8px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                          <p class="img_inline" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-size: 16px;line-height: 100%;clear: both;"><a href="https://facilcontabilidad.org/" data-color="Primary" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;text-decoration: none;color: #EA5455;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;"><img src="https://facilcontabilidad.org/logos/logo.png" width="210" height="" alt="FacilContabilidad" style="max-width: 210px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"></a></p>
                                                        </td>
                                                      </tr>
                                                      </tbody>
                                                    </table>
                                                    <div class="column_row" style="font-size: 0;text-align: center;max-width: 624px;margin: 0 auto;">
                                                      <!--[if (mso)|(IE)]>
                                                      <table role="presentation" width="312" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                                        <tbody>
                                                        <tr>
                                                          <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                                      <![endif]-->
                                                      <div class="col_2" style="vertical-align: top;display: inline-block;width: 100%;max-width: 312px;">
                                                        <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                          <tbody>
                                                          <tr>
                                                            <td class="column_cell bb_light" height="32" data-border-bottom-color="Border Light" style="vertical-align: top;border-bottom: 1px solid #dee0e1;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">&nbsp;</td>
                                                          </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                      <!--[if (mso)|(IE)]>
                                                      </td>
                                                      </tr>
                                                      </tbody>
                                                      </table>
                                                      <![endif]-->
                                                    </div>
                                                    <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                      <tbody>
                                                      <tr>
                                                        <td class="column_cell px py_md text_dark text_center" data-color="Dark" style="vertical-align: top;color: #333333;text-align: center;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                          <table class="column column_inline" role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;width: auto;margin: 0 auto;clear: both;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                            <tbody>
                                                            <tr>
                                                              <td class="column_cell bg_primary brounded_circle px py text_white text_center" data-bgcolor="Primary" data-color="White" style="vertical-align: top;background-color: #ea5455;color: #ffffff;border-radius: 50%;text-align: center;padding-top: 16px;padding-bottom: 16px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                <p class="img_full" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-size: 0 !important;line-height: 100%;clear: both;"><img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2017/10/16/4pId6zuQoxceDO0FnBKAPq38/notifications/images/lock_white.png" width="48" height="48" alt="" style="max-width: 48px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;display: block;width: 100%;margin: 0px auto;"></p>
                                                              </td>
                                                            </tr>
                                                            </tbody>
                                                          </table>
                                                          <h2 class="mt mb_xs" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 16px;margin-bottom: 8px;word-break: break-word;font-size: 28px;line-height: 38px;font-weight: bold;">Olvidaste tu password?</h2>
                                                          <p class="text_lead text_secondary mb_md" data-color="Secondary" style="color: #959ba0;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 32px;word-break: break-word;font-size: 19px;line-height: 31px;">No pasa nada. no es gran cosa!</p>
                                                          <p class="mb_md" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 32px;word-break: break-word;font-size: 16px;line-height: 26px;">Para crear una nueva contraseña haz click en el boton abajo</p>
                                                          <table role="presentation" class="ebutton" align="center" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0 auto;">
                                                            <tbody>
                                                            <tr>
                                                              <td class="bg_primary" data-bgcolor="Primary" style="background-color: #ea5455;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 16px;padding: 13px 24px;border-radius: 4px;line-height: normal;text-align: center;font-weight: bold;-webkit-transition: box-shadow .25s;transition: box-shadow .25s;">
                                                                <a href="https://academy.facilcontabilidad.org/pages/authentication/reset-password-v2?action=recoverypassword&email=`+ req.body.email +`&token=`+ token +`" data-color="White" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;text-decoration: none;color: #ffffff;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-weight: bold;">
                                                                    <span data-color="White" style="color: #ffffff;text-decoration: none;">Resetear Password</span>
                                                                </a>
                                                              </td>
                                                            </tr>
                                                            </tbody>
                                                          </table>
                                                          <p style="color: #959ba0;">Recibiste este correo electrónico porque fue solicitado por un usuario de Castor X. Esto es parte del procedimiento para crear una nueva contraseña en el sistema. Si NO solicitó una nueva contraseña, ignore este correo electrónico y su contraseña seguirá siendo la misma.</p>
                                                        </td>
                                                      </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="content_cell" style="font-size: 0;text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                    <div class="column_row" style="font-size: 0;text-align: center;max-width: 624px;margin: 0 auto;">
                                                      <!--[if (mso)|(IE)]>
                                                      <table role="presentation" width="624" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                                        <tbody>
                                                        <tr>
                                                          <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                                      <![endif]-->
                                                      <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                        <tbody>
                                                            <tr>
                                                              <td class="column_cell px py_md text_secondary text_center" data-color="Secondary" style="vertical-align: top;color: #959ba0;text-align: center;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                <p class="mb_xs text_link" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 8px;word-break: break-word;font-size: 16px;line-height: 26px;">©2020 Rowilled.</p>
                                                              </td>
                                                            </tr>
                                                        </tbody>
                                                      </table>
                                                      <!--[if (mso)|(IE)]>
                                                      </td>
                                                      </tr>
                                                      </tbody>
                                                      </table>
                                                      <![endif]-->
                                                    </div>
                                                  </td>
                                                </tr>
                                                </tbody>
                                              </table>
                                                <!--[if (mso)|(IE)]>
                                                </td>
                                                </tr>
                                                </tbody>
                                                </table>
                                                <![endif]-->
                                              </td>
                                            </tr>
                                            </tbody>
                                          </table>`

                            // send mail with defined transport object
                            let message = transporter.sendMail({
                                from: 'FacilContabilidad <info@facilcontabilidad.com>', // sender address
                                to: req.body.email, // list of receivers
                                subject: "Recupera tu contraseña ✔", // Subject line
                                // html: "<p>Haz click <a href='https://localhost:3000/pages/recover-password/'" + token + ">aquí</a> para continuar el proceso de recuperación</p><p><p><img src='https://juassic.com/castor.png' width='150px' /></p>",
                                html: template
                            }, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message %s sent: %s', info.messageId, info.response);
                            });
                        })
                    res.json(result)
                } else {
                    res.json(result)
                }
            })
            .catch(error => {
                res.status(412).json({msg: error.message})
            })
    })

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

    app.post("/resetPassword", (req, res) => {
        // console.log(req.body)
        Users.findAll({
            where: {
                email: req.body.email,
                new_password_key: req.body.token
            }
        })
            .then(result => {
                // console.log(result)
                if(result) {
                    let cliente = result[0]
                    if((parseInt(cliente.new_password_request) + 86400000) > Date.now()) {
                        const salt = bcrypt.genSaltSync()
                        const password = bcrypt.hashSync(req.body.password, salt)
                        let datos = {
                            password: password,
                            new_password_key: '',
                            new_password_request: ''
                        }
                        Users.update(datos, {
                            where: {
                                email: req.body.email
                            }
                        })
                            .then(resultados => {
                                let transporter = nodeMailer.createTransport({
                                    host: "smtp.elasticemail.com",
                                    port: 587,
                                    secure: false,
                                    // port : 465,
                                    // secure: true, // true for 465, false for other ports
                                    auth: {
                                        user: "info@facilcontabilidad.com",
                                        pass: "CC9800D31C6435095E42E5BEA7CC710B4191",
                                    },
                                });

                                let template = `<table data-module="notification_default_xs_icon" data-thumb="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2017/10/16/4pId6zuQoxceDO0FnBKAPq38/notifications/thumbnails/171.png" data-visible="false" class="email_section" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0">
                                            <tbody>
                                            <tr>
                                              <td class="email_bg bg_light px py_lg" data-bgcolor="Light" style="font-size: 0;text-align: center;line-height: 100%;background-color: #d1deec;padding-top: 64px;padding-bottom: 64px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                <!--[if (mso)|(IE)]>
                                                <table role="presentation" width="416" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                                  <tbody>
                                                  <tr>
                                                    <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                                <![endif]-->
                                                <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><table class="content_section_xs ui-resizable" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 416px;margin: 0 auto;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                <tbody>
                                                <tr>
                                                  <td class="content_cell bg_white brounded bt_primary px py_md" data-bgcolor="White" data-border-top-color="Border Primary" style="font-size: 0;text-align: center;background-color: #ffffff;border-top: 4px solid #ea5455; border-radius: 4px;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                    <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                      <tbody>
                                                      <tr>
                                                        <td class="column_cell px py_xs text_primary text_center" data-color="Primary" style="vertical-align: top;color: #ea5455;text-align: center;padding-top: 8px;padding-bottom: 8px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                          <p class="img_inline" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-size: 16px;line-height: 100%;clear: both;"><a href="https://facilcontabilidad.org/" data-color="Primary" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;text-decoration: none;color: #EA5455;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;"><img src="https://facilcontabilidad.org/logos/logo.png" width="210" height="" alt="FacilContabilidad" style="max-width: 210px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"></a></p>
                                                        </td>
                                                      </tr>
                                                      </tbody>
                                                    </table>
                                                    <div class="column_row" style="font-size: 0;text-align: center;max-width: 624px;margin: 0 auto;">
                                                      <!--[if (mso)|(IE)]>
                                                      <table role="presentation" width="312" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                                        <tbody>
                                                        <tr>
                                                          <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                                      <![endif]-->
                                                      <div class="col_2" style="vertical-align: top;display: inline-block;width: 100%;max-width: 312px;">
                                                        <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                          <tbody>
                                                          <tr>
                                                            <td class="column_cell bb_light" height="32" data-border-bottom-color="Border Light" style="vertical-align: top;border-bottom: 1px solid #dee0e1;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">&nbsp;</td>
                                                          </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                      <!--[if (mso)|(IE)]>
                                                      </td>
                                                      </tr>
                                                      </tbody>
                                                      </table>
                                                      <![endif]-->
                                                    </div>
                                                    <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                      <tbody>
                                                      <tr>
                                                        <td class="column_cell px py_md text_dark text_center" data-color="Dark" style="vertical-align: top;color: #333333;text-align: center;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                          <table class="column column_inline" role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;width: auto;margin: 0 auto;clear: both;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                            <tbody>
                                                            <tr>
                                                              <td class="column_cell bg_primary brounded_circle px py text_white text_center" data-bgcolor="Primary" data-color="White" style="vertical-align: top;background-color: #ea5455;color: #ffffff;border-radius: 50%;text-align: center;padding-top: 16px;padding-bottom: 16px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                                <p class="img_full" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-size: 0 !important;line-height: 100%;clear: both;"><img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2017/10/16/4pId6zuQoxceDO0FnBKAPq38/notifications/images/lock_white.png" width="48" height="48" alt="" style="max-width: 48px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;display: block;width: 100%;margin: 0px auto;"></p>
                                                              </td>
                                                            </tr>
                                                            </tbody>
                                                          </table>
                                                          <h2 class="mt mb_xs" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 16px;margin-bottom: 8px;word-break: break-word;font-size: 28px;line-height: 38px;font-weight: bold;">Nueva contraseña creada</h2>
                                                          <p class="text_lead text_secondary mb_md" data-color="Secondary" style="color: #959ba0;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 32px;word-break: break-word;font-size: 19px;line-height: 31px;">Has cambiado de forma correcta tu contraseña</p>
                                                          <p class="mb_md" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 32px;word-break: break-word;font-size: 16px;line-height: 26px;">Ya puedes acceder a la sección de login y escribir tu email y nueva contraseña para acceder a todo tu contenido y las funcionalidades de tus aplicaciones FacilContabilidad</p>
                                                          <table role="presentation" class="ebutton" align="center" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0 auto;">
                                                            <tbody>
                                                            <tr>
                                                              <td class="bg_primary" data-bgcolor="Primary" style="background-color: #ea5455;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;font-size: 16px;padding: 13px 24px;border-radius: 4px;line-height: normal;text-align: center;font-weight: bold;-webkit-transition: box-shadow .25s;transition: box-shadow .25s;"><a href="https://pagosfc.facilcontabilidad.org" data-color="White" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;text-decoration: none;color: #ffffff;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-weight: bold;"><span data-color="White" style="color: #ffffff;text-decoration: none;">Ir a tus aplicaciones</span></a></td>
                                                            </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="content_cell" style="font-size: 0;text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                    <div class="column_row" style="font-size: 0;text-align: center;max-width: 624px;margin: 0 auto;">
                                                      <!--[if (mso)|(IE)]>
                                                      <table role="presentation" width="624" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                                        <tbody>
                                                        <tr>
                                                          <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                                      <![endif]-->
                                                      <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                        <tbody>
                                                        <tr>
                                                          <td class="column_cell px py_md text_secondary text_center" data-color="Secondary" style="vertical-align: top;color: #959ba0;text-align: center;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                            <p class="mb_xs text_link" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 8px;word-break: break-word;font-size: 16px;line-height: 26px;">©2020 Rowilled.</p>
                                                          </td>
                                                        </tr>
                                                        </tbody>
                                                      </table>
                                                      <!--[if (mso)|(IE)]>
                                                      </td>
                                                      </tr>
                                                      </tbody>
                                                      </table>
                                                      <![endif]-->
                                                    </div>
                                                  </td>
                                                </tr>
                                                </tbody>
                                              </table>
                                                <!--[if (mso)|(IE)]>
                                                </td>
                                                </tr>
                                                </tbody>
                                                </table>
                                                <![endif]-->
                                              </td>
                                            </tr>
                                            </tbody>
                                          </table>`

                                // send mail with defined transport object
                                let message = transporter.sendMail({
                                    from: 'Castor X <info@facilcontabilidad.com>',
                                    to: cliente.email, // list of receivers
                                    subject: "Cambio de contraseña ✔",
                                    html: template
                                }, (error, info) => {
                                    if (error) {
                                        return console.log(error);
                                    }
                                    console.log('Message %s sent: %s', info.messageId, info.response);
                                });
                                res.json(resultados);
                            })
                    } else {
                        console.log('Token vencido, solicita un nuevo token de cambio de contraseña')
                        res.status(412).json({msg: 'Token vencido, solicita un nuevo token de cambio de contraseña'});
                    }
                } else {
                    res.sendStatus(404)
                }
            })
            .catch(error => {
                console.log('error', error);
                res.status(412).json({msg: error.message});
            });
    })

    app.put("/users/facturafull", (req, res) => {
        let cliente = req.body.cliente
        let datosfactura = req.body.datosfactura
        let datostransferencia = req.body.datacard
        let datos = {
            plan: JSON.stringify(req.body.plan),
            cardtoken: req.body.cardtoken,
            datacard: req.body.datacard,
            storageff: req.body.storageff,
            celular: JSON.parse(datosfactura).celular,
            provincia: JSON.parse(datosfactura).provincia,
            metodo: req.body.metodo,
            isActiveFF: req.body.isActiveFF,
            ciudad: JSON.parse(datosfactura).ciudad,
            direccion: JSON.parse(datosfactura).direccion,
            ruc: JSON.parse(datosfactura).ruc,
            modopago: req.body.modopago,
            valorpago: req.body.valorpago,
            periodopago: req.body.periodopago,
            fechapago: req.body.fechapago
        }
        Users.update(datos, {
            where: {
                id: JSON.parse(cliente).id
            }
        })
            .then(result => {
                let planadquirido = req.body.plan
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
                if (req.body.metodo === 'TARJETA DÉBITO/CRÉDITO') {
                    template = templates().registrocc
                } else {
                    template = templates().registrotransfer
                    let cuentaactiva = (datos.isActive)?'Cuenta se encuentra activa':'Cuenta Inactiva esperando comprobación de datos'
                }
                let notificacion = transporter.sendMail({
                    from: 'Factura Full <info@facilcontabilidad.com>', // sender address
                    to: JSON.parse(cliente).email, // list of receivers
                    subject: "Registro Factura Full ✔", // Subject line
                    // html: "<p>Haz click <a href='https://localhost:3000/pages/recover-password/'" + token + ">aquí</a> para continuar el proceso de recuperación</p><p><p><img src='https://juassic.com/castor.png' width='150px' /></p>",
                    html: template
                }, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
                setTimeout(() => {
                    let message = {
                        from: 'facilContabilidad <info@facilcontabilidad.com>',
                        // Comma separated list of recipients
                        to: 'ventas <ventas@facilcontabilidad.com>, Juan Carlos Reyes <jackrom@live.com>, Facil Contabilidad <info@facilcontabilidad.com>, Rowilled <wgranenterprises@gmail.com>',

                        // Subject of the message
                        subject: 'Nueva venta realizada Factura Full ✔',

                        // HTML body
                        html: `<table data-module="notification_default_xs_icon" data-thumb="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2017/10/16/4pId6zuQoxceDO0FnBKAPq38/notifications/thumbnails/171.png" data-visible="false" class="email_section" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                            <tr>
                              <td class="email_bg bg_light px py_lg" data-bgcolor="Light" style="font-size: 0;text-align: center;line-height: 100%;background-color: #d1deec;padding-top: 64px;padding-bottom: 64px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                <!--[if (mso)|(IE)]>
                                <table role="presentation" width="416" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                  <tbody>
                                  <tr>
                                    <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                <![endif]-->
                                <div class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div><table class="content_section_xs ui-resizable" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 416px;margin: 0 auto;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                <tbody>
                                <tr>
                                  <td class="content_cell bg_white brounded bt_primary px py_md" data-bgcolor="White" data-border-top-color="Border Primary" style="font-size: 0;text-align: center;background-color: #ffffff;border-top: 4px solid #2A4F89;border-radius: 4px;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                    <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                      <tbody>
                                      <tr>
                                        <td class="column_cell px py_xs text_primary text_center" data-color="Primary" style="vertical-align: top;color: #2A4F89; text-align: center;padding-top: 8px;padding-bottom: 8px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                          <p class="img_inline" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-size: 16px;line-height: 100%;clear: both;"><a href="#" data-color="Primary" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;text-decoration: none;color: #2A4F89;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;"><img src="https://juassic.com/castor.png" width="250" height="" alt="Factura Full" style="max-width: 300px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"></a></p>
                                        </td>
                                      </tr>
                                      </tbody>
                                    </table>
                                    <div class="column_row" style="font-size: 0;text-align: center;max-width: 624px;margin: 0 auto;">
                                      <!--[if (mso)|(IE)]>
                                      <table role="presentation" width="312" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                        <tbody>
                                        <tr>
                                          <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                      <![endif]-->
                                      <div class="col_2" style="vertical-align: top;display: inline-block;width: 100%;max-width: 312px;">
                                        <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                          <tbody>
                                          <tr>
                                            <td class="column_cell bb_light" height="32" data-border-bottom-color="Border Light" style="vertical-align: top;border-bottom: 1px solid #dee0e1;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">&nbsp;</td>
                                          </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <!--[if (mso)|(IE)]>
                                      </td>
                                      </tr>
                                      </tbody>
                                      </table>
                                      <![endif]-->
                                    </div>
                                    <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                      <tbody>
                                      <tr>
                                        <td class="column_cell px py_md text_dark text_center" data-color="Dark" style="vertical-align: top;color: #333333;text-align: center;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                          <table class="column column_inline" role="presentation" align="center" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;width: auto;margin: 0 auto;clear: both;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                            <tbody>
                                            <tr>
                                              <td class="column_cell bg_primary brounded_circle px py text_white text_center" data-bgcolor="Primary" data-color="White" style="vertical-align: top;background-color: #ffffff;color: #ffffff;border-radius: 50%;text-align: center;padding-top: 16px;padding-bottom: 16px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                <p class="img_full" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 0px;word-break: break-word;font-size: 0 !important;line-height: 100%;clear: both;"><img src="https://toppng.com/uploads/preview/red-dollar-sign-png-dollar-sign-icon-red-11562972811vigpzht27u.png" width="70" height="70" alt="" style="max-width: 48px;-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;display: block;width: 100%;margin: 0px auto;"></p>
                                              </td>
                                            </tr>
                                            </tbody>
                                          </table>
                                          <h2 class="mt mb_xs" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 16px;margin-bottom: 8px;word-break: break-word;font-size: 28px;line-height: 38px;font-weight: bold;">Nueva venta</h2>
                                          <p class="text_lead text_secondary mb_md" data-color="Secondary" style="color: #959ba0;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 10px;word-break: break-word;font-size: 19px;line-height: 31px;">Datos para factura</p>
                                          <table>
                                              <tbody>
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> RUC</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datosfactura).ruc +`</td>
                                                </tr>
                                            
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> NOMBRE</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(cliente).name +`</td>
                                                </tr>
                                            
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> EMAIL</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(cliente).email +`</td>
                                                </tr>
                                            
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> DIRECCIÓN</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datosfactura).direccion +`</td>
                                                </tr>
                                            
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> CIUDAD</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datosfactura).ciudad +`</td>
                                                </tr>
                                            
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> PROVINCIA</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datosfactura).provincia +`</td>
                                                </tr>
                                                
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> TELEFONO</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datosfactura).celular +`</td>
                                                </tr>
                                              
                                              </tbody>
                                          </table>
                                          
                                          <p class="text_lead text_secondary mb_md" data-color="Secondary" style="color: #959ba0;font-family: Arial, Helvetica, sans-serif;margin-top: 32px;margin-bottom: 10px;word-break: break-word;font-size: 19px;line-height: 31px;">Datos de pago</p>
                                          <table>
                                              <tbody>
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> Método</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ req.body.metodo +`</td>
                                                </tr>
                                            
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> Número de transferencia</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datostransferencia).numero +`</td>
                                                </tr>
                                            
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> Valor de la transferencia</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datostransferencia).valor +`</td>
                                                </tr>
                                            
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> Banco de procedencia</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datostransferencia).banco +`</td>
                                                </tr>
                                            
                                                <tr>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"> Quien transfiere</td>
                                                  <td style="vertical-align: top;color: #212121;text-align: center;padding-left: 16px;padding-right: 16px;padding-top: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">`+ JSON.parse(datostransferencia).ordenante +`</td>
                                                </tr>
                                              
                                              </tbody>
                                          </table>
                                          <table role="presentation" class="ebutton" align="center" border="0" cellspacing="0" cellpadding="0" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0 auto;">
                                            <tbody>
                                            <tr></tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="content_cell" style="font-size: 0;text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                    <div class="column_row" style="font-size: 0;text-align: center;max-width: 624px;margin: 0 auto;">
                                      <!--[if (mso)|(IE)]>
                                      <table role="presentation" width="624" border="0" cellspacing="0" cellpadding="0" align="center" style="vertical-align:top;Margin:0 auto;">
                                        <tbody>
                                        <tr>
                                          <td align="center" style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;vertical-align:top;">
                                      <![endif]-->
                                      <table class="column" role="presentation" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" style="vertical-align: top;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                        <tbody>
                                        <tr>
                                          <td class="column_cell px py_md text_secondary text_center" data-color="Secondary" style="vertical-align: top;color: #959ba0;text-align: center;padding-top: 32px;padding-bottom: 32px;padding-left: 16px;padding-right: 16px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                            <p class="mb_xs text_link" style="color: inherit;font-family: Arial, Helvetica, sans-serif;margin-top: 0px;margin-bottom: 8px;word-break: break-word;font-size: 16px;line-height: 26px;">©2020 Rowilled.</p>
                                          </td>
                                        </tr>
                                        </tbody>
                                      </table>
                                      <!--[if (mso)|(IE)]>
                                      </td>
                                      </tr>
                                      </tbody>
                                      </table>
                                      <![endif]-->
                                    </div>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                                <!--[if (mso)|(IE)]>
                                </td>
                                </tr>
                                </tbody>
                                </table>
                                <![endif]-->
                              </td>
                            </tr>
                            </tbody>
                          </table>`,

                        attachments: [
                            // String attachment
                            {
                                filename: 'pedido.txt',
                                content: nuevoPedido,
                                contentType: 'text/plain' // optional, would be detected from the filename
                            },
                        ],

                        list: {
                            // List-Help: <mailto:admin@example.com?subject=help>
                            help: 'help@facilcontabilidad.com?subject=help',

                            // List-Unsubscribe: <http://example.com> (Comment)
                            unsubscribe: [
                                {
                                    url: 'http://facilcontabilidad.com/unsubscribe',
                                    comment: 'No deseo recibir mas este tipo de email'
                                },
                                'unsubscribe@facilcontabilidad.com'
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
                    })
                }, 1500)
                res.json(result)
            })
            .catch(error => {
                console.log(error)
                console.log(error.response)
                res.status(412).json({
                    msg: error.message
                });
            });
    })

    app.put("/users/registrocliente", (req, res) => {
        const payload = {
            id: req.body.email
        }
        let token = jwt.sign(payload, cfg.jwtSecret)
        let ips = [req.body.ipregister]
        let values = {
            ipregister: req.body.ipregister,
            lastip: JSON.stringify(ips),
            aplicaciones: JSON.stringify(req.body.aplicaciones)
        }
        Users.update(values, {
            where: {
                id: req.body.uid
            }
        })
            .then(result => {
                res.json({
                    auth: true,
                    response:result,
                    token: token
                })
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })

    app.get("/usuarios", (req, res) => {
        Users.findAll({
            include: [
                { model: CursosactivosFC, as: 'cursos' }
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
    })

    app.get("/reparartablausuarios", (req, res) => {
        Users.findAll({
            where: {
                id: {[Op.gt]: [0]}
            },
            order: [
                ['id', 'ASC'],
            ],
            limit: 50
        })
            .then(results => {
                let productosusuarios = []
                if (results && results.length > 0) {
                    results.forEach((obj, index) => {
                        let productos = obj.productosacademy
                        productosusuarios.push(productos)
                    })
                }
                res.json(productosusuarios)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })

    app.get("/copiarpasswordtotabla", (req, res) => {
        Users.findAll({
            where: {
                id: {[Op.gt]: [0]}
            },
            order: [
                ['id', 'ASC'],
            ]
        })
            .then(results => {
                if (results && results.length > 0) {
                    results.forEach((obj, index) => {
                        let user = {
                            password: obj.password
                        }
                        console.log(obj.password)
                        Usersfc.update(user, {
                            where: {
                                id: obj.id
                            }})
                            .then(result => {
                                // console.log(result)
                                // res.json(result)
                            })
                            .catch(error => {
                                console.log(error.response)
                            });
                    })
                }
                res.json(results)
            })
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
    })
}
