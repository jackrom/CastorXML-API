const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const logger = require("./logger.js");
const path = require("path");
const fileUpload = require('express-fileupload')
module.exports = app => {
    app.set("port", 8080);
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
        origin: "*",
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
