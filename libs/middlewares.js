const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const logger = require("./logger.js");
const path = require("path");
const fileUpload = require('express-fileupload')
const allowedOrigins = [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://facilcontabilidad.org',
    'http://localhost:4200',
    'http://databrain.online'
];
module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(message)
            }
        }
    }));
    /*
    app.use(morgan(function (tokens, req, res) {
        console.log( [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms'
        ].join(' '))
    }));
     */
    app.use(cors({
        credentials: true,
        origin: function(origin, callback) {
            // Permitir peticiones sin origen (por ejemplo, Postman y similares)
            if (!origin) return callback(null, true);

            // Comprobar si el origen de la petición está en nuestra lista de orígenes permitidos
            if (allowedOrigins.indexOf(origin) === -1) {
                let msg = `El origen CORS ${origin} no está permitido.`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token"],
        preflightContinue: true
    }));
    app.use(compression())
    app.use(helmet())
    app.use(bodyParser.json({limit: '1500mb', extended: true}))
    app.use(app.auth.initialize())
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    })
    // app.use(express.static("public"));
    app.use(express.static(path.join(__dirname, '../public')))
    app.use(fileUpload())
}
