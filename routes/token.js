const jwt = require("jsonwebtoken")
// const jwt = require("jwt-simple")
const bcrypt = require("bcrypt")
const cors = require('cors')
const { OAuth2Client } = require('google-auth-library');
const oauthServer = require('oauth2-server');

module.exports = app => {

    const cfg = app.libs.config;
    const Usersfc = app.db.models.Usersfc;
    const Users_ifluc = app.db.models.Users_ifluc;
    const CursosactivosFC = app.db.models.CursosactivosFC;
    const LeccionesvistasFC = app.db.models.Leccionesvistasfc;
    const Documentos = app.db.models.Documentos;
    const Tokensdatafastfc = app.db.models.Tokensdatafastfc
    const Usersaccountdetail = app.db.models.Usersaccountdetail
    const PlanToUserfc = app.db.models.PlanToUserfc
    const PlanesFC = app.db.models.Planesfc
    const AplicacionesToUserfc = app.db.models.AplicacionesToUserfc

    const client = new OAuth2Client(cfg.googleClientId);

    /*
    request.post({
        url: 'https://provider.com/oauth2/token',
        form: {
            code: req.body.code,
            redirect_uri: 'TU_REDIRECT_URI',
            client_id: 'TU_CLIENT_ID',
            client_secret: 'TU_CLIENT_SECRET',
            grant_type: 'authorization_code'
        }
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);

            // Aquí manejarías la creación/actualización del usuario en tu base de datos
            // y la generación de tu propio JWT si es necesario.

            res.json({ token: 'TU_JWT_GENERADO', user: 'INFORMACION_DEL_USUARIO' });
        } else {
            // Manejar errores
            res.status(500).json({ error: 'Error al intercambiar el código de autorización' });
        }
    });
    */


    /**
     * @api {post} /token Crear token de Autenticacion de usuarios
     * @apiGroup Autenticacion
     * @apiParam {String} email Email del usuario
     * @apiParam {String} password Password del usuario
     * @apiParamExample {json} Input
     *{
     * "email": "john@connor.net",
     * "password": "123456"
     *}
     * @apiSuccessExample { json } token Token de autenticación de usuarios
     * HTTP/1.1 200 OK
     * {"token": "xyz.abc.123.hgf"
     *  {
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
     *  }
     * }
     * @apiErrorExample {json} Authentication error
     * HTTP/1.1 401 Unauthorized
     */
    app.post("/token", (req, res) => {
        // console.log(req.query)
        let emailUser, passwordUser, ip
        if (req.query && req.query.email !== undefined) {
            emailUser = req.query.email
            passwordUser = req.query.password
            ip = req.query.ip
        } else {
            emailUser = req.body.email
            passwordUser = req.body.password
            ip = req.body.ip
        }
        Usersfc.findOne({
            include: [
                {
                    model: Documentos,
                    as: 'alldocumentos',
                    attributes: [
                        'idDocumento',
                        'clienteId',
                        'empresaIdCastor',
                        'Tipo'
                    ],
                    limit: 2000,
                    order: [
                        ['idDocumento', 'DESC']
                    ]
                },
                {
                    model: PlanToUserfc,
                    as: 'planes',
                    include: [
                        {
                            model: PlanesFC,
                            as: 'planusuario'
                        }
                    ]
                },
                {
                    model: AplicacionesToUserfc,
                    as: 'aplicaciones'
                },
                /*
                {
                    model: CursosactivosFC,
                    as: 'cursos',
                },
                 */
                {
                    model: Usersaccountdetail,
                    as: 'detalles',
                },
                /*
                {
                    model: Tokensdatafastfc,
                    as: 'tarjetas'
                },
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
                 */
            ],
            attributes: [
                'id',
                'username',
                'email',
                'password',
                'afiliadoId',
                'lastip',
                'roleId'
            ],
            where: {
                email: emailUser,
            }
        })
        .then(user => {
            // console.log(user)
            const payload = { id: user.email }
            let ips = JSON.parse(user.lastip)
            if (Usersfc.isPassword(user.password, passwordUser)) {
                const payload = {
                    id: user.id,
                    email: user.email
                }
                // console.log(payload)
                let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (240 * 60),
                    data: payload
                }, cfg.jwtSecret)

                const abilities = [
                    {
                        action: 'manage',
                        subject: 'all',
                    },
                ]

                if (ips.indexOf(ip) === -1) {
                    if (ips.length > 100) {
                        res.json({
                            auth: false,
                            message: 'Has superado el límite de IP´s permitidas por la aplicación, tu usuario se encuentra bloqueado, comunicate con los administradores para desbloquear tu usuario'
                        })
                    } else {
                        ips.push(ip)
                        Usersfc.update({lastip: JSON.stringify(ips)}, {where: {email: emailUser}})
                            .then(result => {
                                res.json({
                                    userAbilities: abilities,
                                    token: token,
                                    user: user,
                                    auth: true,
                                })
                            })
                    }
                } else {
                    if (ips.length > 100) {
                        res.json({
                            auth: false,
                            message: 'Has superado el límite de IP´s permitidas por la aplicación, tu usuario se encuentra bloqueado, comunicate con los administradores para desbloquear tu usuario'
                        })
                    } else {
                        res.cookie('session_id', 'valorDeLaSesion', { httpOnly: true, secure: true, domain: '.facilcontabilidad.org' });
                        res.json({
                            userAbilities: abilities,
                            token: token,
                            user: user,
                            auth: true,
                        })
                    }
                }
            } else {
                res.json({
                    auth: false,
                    message: 'El email o la contraseña tienen errores o usted no tiene una cuenta de FC'
                })
            }
        })
        .catch(error => {
            console.log(error)
            console.log(error.response)
            res.status(401).json({msg: 'Esta cuenta no existe en nuestros registros, por favor registrate para poder acceder'});
        });
    });

    app.post("/tokengoogle", async (req, res) => {
        let { email, password, googleToken } = req.body;

        try {
            if (googleToken) {
                // Verificar token de Google y obtener el email
                const ticket = await client.verifyIdToken({
                    idToken: googleToken,
                    audience: cfg.googleClientId,
                });
                const payload = ticket.getPayload();
                email = payload['email'];
            }

            // Buscar usuario por email
            const user = await Usersfc.findOne({ where: { email: email } });
            if (!user) {
                return res.status(401).json({ auth: false, message: 'Usuario no encontrado.' });
            }

            // Verificar contraseña (saltar si es autenticación de Google)
            if (password && !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ auth: false, message: 'Contraseña incorrecta.' });
            }

            // Crear payload y generar token
            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, cfg.jwtSecret, { expiresIn: '1h' });

            // Emitir token
            res.json({
                auth: true,
                token: token,
                user: { id: user.id, email: user.email }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ auth: false, message: 'Error al procesar la autenticación.' });
        }
    });


    app.post("/loginByEmail", (req, res) => {
        let emailUser = req.query.email;
        let passwordUser = req.query.password;
        if (emailUser && passwordUser) {
            Usersfc.findOne({where: {email: emailUser}})
                .then(user => {
                    if (bcrypt.compareSync(passwordUser, user.password)) {
                        const payload = {id: user.email};
                        res.json({
                            token: jwt.encode(payload, cfg.jwtSecret),
                            user: user
                        });
                    } else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.sendStatus(401);
                });
        } else {
            res.sendStatus(401)
        }
    });


    app.post("/loginByUsernameIfluc", (req, res) => {
        let usernameUser = req.query.email;
        let passwordUser = req.query.password;
        // console.log(req.query)
        if (usernameUser && passwordUser) {
            Usersfc.findOne({where: {login: usernameUser}})
                .then(user => {
                    // console.log(user)
                    const payload = {id: user.id};
                    res.json({
                        token: jwt.encode(payload, cfg.jwtSecret),
                        user: user
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.sendStatus(401);
                });
        } else {
            res.sendStatus(401)
        }
    });

    app.post("/loginByEmailIfluc", (req, res) => {
        let emailUser = req.query.email;
        let passwordUser = req.query.password;
        // console.log(req.query)
        if (emailUser && passwordUser) {
            Users_ifluc.findOne({where: {email: emailUser}})
                .then(user => {
                    // console.log(user)
                    const payload = {id: user.id};
                    res.json({
                        user: user
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.sendStatus(401);
                });
        } else {
            res.sendStatus(401)
        }
    });

    app.post("/loginIfluc", (req, res) => {
        let emailUser = req.query.email;
        let passwordUser = req.query.password;
        // console.log(req.query)
        if (emailUser && passwordUser) {
            Users_ifluc.findOne({where: {email: emailUser}})
                .then(user => {
                    // console.log(user)
                    // console.log(Users_ifluc.isPassword(user.password, passwordUser))
                    if (Users_ifluc.isPassword(user.password, passwordUser)) {
                        const payload = {
                            id: user.id,
                            email: user.email
                        }

                        let token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (240 * 60),
                            data: payload
                        }, cfg.jwtSecret)


                        res.json({
                            token: token,
                            user: user
                        });
                    } else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.sendStatus(401);
                });
        } else {
            res.sendStatus(401)
        }
    });


};
