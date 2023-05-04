const soap = require('soap')
const soapURL = 'http://186.4.187.28/InvoiceService/ServiceEb.svc?singleWsdl'
const date = new Date()

let factura = {
  // FacturaViewModel
  invoice: {
    identificacionCliente: ["3915"],
    secuencial: "001-007-000021802",
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
	tipo_producto: "BIEN",
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
