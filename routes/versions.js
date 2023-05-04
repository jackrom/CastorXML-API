const request = require('request')
module.exports = app => {
    const Versiones = app.db.models.Versiones;
    /**
     * @api {get} /chequearversionapp Devuelve una matriz con la versión actual de la app
     * @apiGroup Versiones
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID de la version
     * @apiSuccess {String} version Versión actual de la app de clientes
     * @apiSuccess {Date} updatedAt Fecha de la última modificación
     * @apiSuccess {Date} createdAt Fecha de creación
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "version": "0.0.0",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} no hay ninguna versión creada, no existe
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/chequearversionapp", (req, res) => {
        if (req.headers.authorization) {
            if(app.auth.authenticate(req.headers.authorization.replace('Bearer ',''))) {
                Versiones.findAll({})
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
     * @api {get} /chequearversionapp Devuelve una matriz con la versión actual de la app
     * @apiGroup Versiones
     * @apiHeader {String} Token de autorización de usuario autenticado
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Number} id ID de la version
     * @apiSuccess {String} version Versión actual de la app de clientes
     * @apiSuccess {Date} updatedAt Fecha de la última modificación
     * @apiSuccess {Date} createdAt Fecha de creación
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *   {
     *    "id": 1,
     *    "version": "0.0.0",
     *    "updated_at": "2016-02-10T15:20:11.700Z",
     *    "created_at": "2016-02-10T15:29:11.700Z",
     *   }
     * ]
     * @apiErrorExample {json} no hay ninguna versión creada, no existe
     * HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     * HTTP/1.1 412 Precondition Failed
     */
    app.get("/chequearservidorsri", (req, res) => {
        const array = [
            "COMPROBANTE	SERIE_COMPROBANTE	RUC_EMISOR	RAZON_SOCIAL_EMISOR	FECHA_EMISION	FECHA_AUTORIZACION	TIPO_EMISION	IDENTIFICACION_RECEPTOR	CLAVE_ACCESO	NUMERO_AUTORIZACION",
            "IMPORTE_TOTAL",
            "Factura	003-006-000473967	0601293764001	CHAVEZ RIVERA HECTOR ALFONSO	29/10/2020	29/10/2020 16:15:12	NORMAL		1717962433	2910202001060129376400120030060004739671234567818	2910202001060129376400120030060004739671234567818",
            "6"
        ]
        const datos = {
            fileData: array,
            user: "yrsuarez@gmail.com",
            password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
        }
        let options = {
            'method': 'POST',
            'url': 'http://186.4.187.46/RestInvoiceIntegration/operation/GetXmlDocuments',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        }

        request(options, function (error, response) {
            if (error) throw new Error(error)
            if (response.body.length > 0) {
                let respuesta = JSON.parse(response.body)
                if (respuesta.Sucessful !== false) {
                    res.status(412).json({
                        msg: 'OnLine',
                        status: true
                    })
                } else {
                    res.status(412).json({
                        msg: respuesta.data,
                        status: false
                    })
                }
            } else {

            }
        })
    })
}
