const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json({ extended: true }))

const mysql = require('mysql')
const dbconnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'docsri'
})

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: '2525',
  auth: {
    user: '******',
    pass: '******'
  }
});

const jwt = require('jsonwebtoken')
const secret = 'ThisisaTest'

const cors = require('cors')
app.use(cors()) // Enable CORS for express

const soap = require('soap')
const soapURL = 'http://186.4.187.28/InvoiceService/ServiceEb.svc'
const date = new Date()

const bcrypt = require('bcrypt')
const saltRounds = 10

app.listen(port, () => console.log(`Example app listening at localhost:${port}`))

function paraVal(...args){

  let count = 0;
  for (i = 0; i < args.length; i++){
    if (args[i] != '') {
      count += 1;
    }
  }
  if (count === args.length) {
    return true
  }
  else { return false }
}

app.post('/users', function (req, response) {

  let nonblank = paraVal(req.body.email, req.body.password)

  if (nonblank) {
    dbconnection.query("Select * From users WHERE email = ?",
		       [req.body.email] ,
		       function (err, result) {

			 bcrypt.compare(req.body.password, result[0].password, function(error, res) {
			   if(err){
			     console.log(err);
			   }
			   if(res) {
			     let token = jwt.sign({ id: req.body.email }, secret, {
			       expiresIn: 86400 // expires in 24 hours
			     });
			     response.status(200).send({ auth: true, token: token });
			     console.log('Login completado, Token generada')
			   } else {
			     return response.status(401).send({ auth: false, message: 'No token provided.' });
			   }

			 })

		       })
  } else {
    response.status(401).send({ auth: false, message: 'A parameter is blank'})
  }
})

app.post('/register', function(req, res) {

  let datetime = new Date()
  let nonblank = paraVal(req.body.username, req.body.email, req.body.password)
  let mailOptions = {
    from: 'info@facilcontabilidad.com',
    to: req.body.email,
    subject: 'Confirma tu registro a Castor XML',
    html: '<p>Hola, te saludamos del <b>Equipo de Facilcontabilidad,</b></p><br/> <p>Para acceder a Castor XML, es necesario confirmar tu registro dando clic en el siguiente enlace: <br/></p> localhost:3001/emailverification/' + token

  }

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

    let values = [[req.body.username, req.body.email, hash, datetime, 0, req.body.name]]
    let token = jwt.sign({ id: req.body.email }, secret, { expiresIn: 86400 })

    transporter.sendMail(mailOptions, function(error, info){
      if (nonblank) {
	dbconnection.query("INSERT INTO users (username, email, password, created, emailVerificated, name) VALUES ?",
			   [values]),
	function (errors, result) {
	  response.status(200).send({ auth: true, token: token });
	}
	console.log('Email sent: ' + info.response + 'Register ended')
      } else {
	response.status(401).send({ auth: false, message: 'A parameter is blank'})
      }
    })
  })
})

app.post('/emailVerification', function(req, res) {

  let token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    res.status(200).send(decoded);
  });
})

app.put('/emailVerification', function(req, res) {

  jwt.verify(req.body.token, secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    dbconnection.query("Select * From users WHERE email = ?",
		       [req.body.email] ,
		       function (errors, result) {

			 if (req.body.email === result[0].email && result[0].email === decoded.id) {
			   dbconnection.query('UPDATE users SET emailVerificated = 1 WHERE email = ?',
					      [req.body.email],
					      function(error, results){
						console.log('Se ha verificado el mail');
					      });
			 }
		       });
  });
});

app.post('/reset', function(req, res) {

  dbconnection.query("Select * From users WHERE email = ?",
		     [req.body.email] ,
		     function (err, result) {

		       let token = jwt.sign({ id: req.body.email }, secret, {
			 expiresIn: 86400 // expires in 24 hours
		       })

		       let mailOptions = {
			 from: 'info@facilcontabilidad.com',
			 to: req.body.email,
			 subject: 'Sending Email using Node.js',
			 text: 'For resetting your password, enter this page, and enter your new passwords in the form: localhost:3001/resetpassword/' + token
		       }

		       transporter.sendMail(mailOptions, function(error, info){
			 if (error) {
			   console.log(error);
			 } else {
			   console.log('Email sent: ' + info.response);
			 }
		       })

		       if (err) {
			 console.log('Error: ', err)
			 res.status(400).json({
			   message: err,
			 })

		       }

		     })

})

app.put('/reset', function (req,res) {

  jwt.verify(req.body.token, secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});

    bcrypt.hash(req.body.password, saltRounds, function(error, hash) {
      dbconnection.query('UPDATE users SET password = ? WHERE email = ?',
			 [hash, decoded.id],
			 function(errors, result){
			   console.log('The password has changed')
			 })
    })
  })
})

app.post('/sriFactura', function (req, response) {

  let factura = {
    // FacturaViewModel
    invoice: {
      identificacionCliente: ["3915"],
      secuencial: '001-007-000021802',
      fechaEmision: date.toISOString(),
      razon_social_cliente: "9",
      correo_cliente: "yrsuarez@gmail.com",
      telefono_cliente: null,
      direccion_cliente: null,
      guiaremision: null,
      propina: null,
      descuentosolidario: null,
      // Datos adicionales
      DatosAdicionalesList: {
	CampoAdicional: {
	  nombre: 'D.A.E.',
	  valor: '642247'
	},
	CampoAdicional: {
	  nombre: 'REFERENCIA',
	  valor: '9659'
	},
	CampoAdicional: {
	  nombre: 'GUIA MADRE',
	  valor: '172-35751564'
	},
	CampoAdicional: {
	  nombre: 'GUIAS HIJAS',
	  valor: 'EBF1663682'
	}
      },
      // Product List
      ProductList: {
	ProductoViewModel: {
	  cod_producto: "667",
	  nom_producto: "SPRAY ROSE, ASSORTED",
	  cantidad: 105,
	  valor_producto: parseFloat("4"),
	  descuento_producto: 0,
	  ProductoImpuestos: { cod_tipo: "2", cod_imp: "0" }
	},
      },
      // Forma de pago
      FormaPagoList: {
	Plazo: 0,
	UnidadTiempo: "DIAS",
	Total: parseFloat("420"),
	Codigo: "1"
      }
    },
    user: "yrsuarez@gmail.com",
    password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
  }

  soap.createClient(soapURL,
		    function(err, client) {
		      client.InsertInvoice(factura, function(err, result) {
			console.log(result);
		      });

		    });

})

app.post('/sriRetencion', function (req, response) {
  let retencion = {
    // FacturaViewModel
    retention: {
      secuencial: "001-002-000089232",
      fechaEmision: new Date(),
      identificacionCliente: "1790898431001",
      razon_social_cliente: "FRIO Y EXPORTACION S.A FRIOEXPORT",
      correo_cliente: "yrsuarez@gmail.com",
      telefono_cliente: null,
      direccion_cliente: null,
      // Datos adicionales
      DatosAdicionalesList: {
        CampoAdicional: {
          nombre: 'EMPRESA',
          valor: 'EXPORTADOR HABITUAL DE BIENES'
        },
      },
      // Detalles List
      DetalleList: {
        DetalleRetencionViewModel: {
          cod_producto: "667",
          nom_producto: "SPRAY ROSE, ASSORTED",
          cantidad: 105,
          valor_producto: parseFloat("4"),
          descuento_producto: 0,
          ProductoImpuestos: { cod_tipo: "2", cod_imp: "0" }
        },
        DetalleRetencionViewModel: {
          BaseImponible: parseFloat("46,76"),
          Porcentaje: parseFloat("100"),
          Documento: "001-002-000005365",
          CodDocumento: "1",
          Fecha: new Date(),
          CodRetencion: "3",
          Codigo: "2"
        },
      },
      // Forma de pago
      FormaPagoList: {
        Plazo: 0,
        UnidadTiempo: "DIAS",
        Total: parseFloat("420"),
        Codigo: "1"
      }
    },
    user: "yrsuarez@gmail.com",
    password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
  }

  soap.createClient(soapURL,
  		    function(err, client) {
  		      client.InsertRetention(retencion, function(err, result) {
  			console.log(result);
  		      });

  		    });

})

app.post('/sriPurchase', function (req, response) {

  let purchase = {
    // FacturaViewModel
    purchaseLiquidation: {
      secuencial: "001-002-000028521",
      fechaEmisionArg: new Date(),
      identificacionProveedorArg: "809317357B01",
      razonSocialCompradorArg: "ESMERALDA BREEDING BV.",
      correo_proveedor: "yrsuarez@gmail.com",

      ProductList: [
        {
          cod_producto: "1",
          nom_producto: "REGALIAS 4TO TRIMESTRE AÑO 2019",
          cantidad: 1,
          precioSinsubsidio: parseFloat("18916.71"),
          valor_producto: parseFloat("18916.71"),
          descuento_producto: 0,
          ProductoImpuestos: { cod_tipo: "2", cod_imp: "2" }
        },
      ],
      DatosAdicionalesList: [
        {
          nombre: 'FINCA',
          valor: 'GENEVIV'
        }
      ],
      DetalleList: [
        {
          cod_producto: "667",
          nom_producto: "SPRAY ROSE, ASSORTED",
          cantidad: 105,
          valor_producto: parseFloat("4"),
          descuento_producto: 0,
          ProductoImpuestos: { cod_tipo: "2", cod_imp: "0" }
        },
        {
          BaseImponible: parseFloat("46,76"),
          Porcentaje: parseFloat("100"),
          Documento: "001-002-000005365",
          CodDocumento: "1",
          Fecha: new Date(),
          CodRetencion: "3",
          Codigo: "2"
        },
      ],
      FormaPagoList: {
        Plazo: 0,
        UnidadTiempo: "DIAS",
        Total: parseFloat("420"),
        Codigo: "1"
      }
    },
    user: "yrsuarez@gmail.com",
    password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="
  }

  soap.createClient(soapURL,
  		    function(err, client) {
  		      client.InsertPurchaseLiquidation(purchase, function(err, result) {
  			console.log(result);
  		      });

  		    });

})

app.post('/sriGuide', function (req, response) {

  let guide = {
    // FacturaViewModel
    guide: {
      secuencial: "001-002-000028530",
      dir_partida: "LA MORA",
      dir_establecimiento: "AV. INTEROceánica S/N Y CALLE SIENA"
      fechaEmision: new Date()
      fecha_inicio: new Date()
      fecha_fin: new Date()
      razonSocialCompradorArg: "ESMERALDA BREEDING BV.",
      correo_proveedor: "yrsuarez@gmail.com",

      ProductList: {
        ProductoViewModel: {
          cod_producto: "CAJAS",
              nom_producto: "369-7744-5233 MIA LA MORA",
              cantidad: 430
        },
	    ProductoViewModel: {
          cod_producto : "CAJAS",
          nom_producto :  "369-7744-5233  MIA ESM SUN",
          cantidad :  215
        },
        ProductoViewModel: {
          cod_producto : "CAJAS",
          nom_producto :  "729-6337-9864 MIA ESM SUN",
          cantidad :  35
        },
	    ProductoViewModel: {
          cod_producto : "CAJAS",
          nom_producto :  "729-6337-9864 MIA LA MORA",
          cantidad :  1290
        }
      }
    },
    Transportista: {
      identificacion_transportista: "1711308294",
      razon_social_transportista: "VASQUEZ RIOS JOSE FRANCISCO",
      correo_transportista: "",
      placa: "CBG-0923"
    },
    // Datos adicionales
    DatosAdicionalesList: {
      CampoAdicional: {
        nombre: 'FINCA',
        valor: 'GENEVIV'
      },
    },
    // Detalles List
    DetalleList: {
      identificacion_destinatario: "1791807820001",
      nombre_destinatario: "SERVIPALLET",
      correos_destinatario: "yrsuarez@mail.com",
      dir_destino: "TABABELA SERVI PALET",
      motivo: "EXPORTACION",
    },
    // Forma de pago
    FormaPagoList: {
      Plazo: 0,
      UnidadTiempo: "DIAS",
      Total: parseFloat("420"),
      Codigo: "1"
    }
  },
      user: "yrsuarez@gmail.com",
      password: "ANt0XfwpMUutXzuMGP9Drp4baYeks6ud9di4e9VbGYl0uMmVQSTcyYRlppgjfwKPnw=="


  soap.createClient(soapURL,
  		    function(err, client) {
  		      client.InsertPurchaseLiquidation(purchase, function(err, result) {
  			console.log(result);
  		      });

  		    });

})



