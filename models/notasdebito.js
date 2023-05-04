module.exports = (sequelize, DataType) => {
    const NotasDeDebito = sequelize.define("Notasdedebito", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idClienteFirebase: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        secuencial: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        fechaEmision: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        razonSocialCliente: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        identificacionCliente: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        correoCliente: {
            type: DataType.STRING,
            allowNull: false
        },
        telefonoCliente: {
            type: DataType.STRING,
            allowNull: true
        },
        direccionCliente: {
            type: DataType.STRING,
            allowNull: true
        },
        num_doc_modif: {
            type: DataType.STRING,
            allowNull: true
        },
        cod_doc_modif: {
            type: DataType.STRING,
            allowNull: true
        },
        fecha_doc_modif: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        descuentoSolidario: {
            type: DataType.STRING,
            allowNull: true
        },
        informacionAdicional: {
            type: DataType.STRING(2000),
            allowNull: true
        },
        detalleList: {
            type: DataType.STRING(5000),
            allowNull: true
        },
        formasPagoList: {
            type: DataType.STRING(2000),
            allowNull: true
        },
        impuestos: {
            type: DataType.STRING(2000),
            allowNull: true
        },
        subtotal0: {
            type: DataType.INTEGER,
            allowNull: true
        },
        subtotal12: {
            type: DataType.INTEGER,
            allowNull: true
        },
        subtotalNoObjetoDeIva: {
            type: DataType.INTEGER,
            allowNull: true
        },
        subtotalExcentoDeIva: {
            type: DataType.INTEGER,
            allowNull: true
        },
        subtotal: {
            type: DataType.INTEGER,
            allowNull: true
        },
        iva12: {
            type: DataType.INTEGER,
            allowNull: true
        },
        ice: {
            type: DataType.INTEGER,
            allowNull: true
        },
        irbpnr: {
            type: DataType.INTEGER,
            allowNull: true
        },
        Total: {
            type: DataType.INTEGER,
            allowNull: true
        },
        numero: {
            type: DataType.STRING,
            allowNull: true
        },
        registrosri: {
            type: DataType.STRING,
            allowNull: true
        },
        status: {
            type:   DataType.ENUM,
            values: ['creada', 'recibida', 'autorizada', 'rechazada', 'no autorizada'],
            defaultValue: 'creada'
        },
        cancelada: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        cancel_by: {
            type:   DataType.ENUM,
            values: ['cliente', 'sistema'],
            allowNull: true
        }
    });
    return NotasDeDebito;
};
