module.exports = (sequelize, DataType) => {
    const Retenciones = sequelize.define("Retenciones", {
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
        numeroDocMod: {
            type: DataType.STRING,
            allowNull: true
        },
        valorretenidoiva: {
            type: DataType.STRING,
            allowNull: true
        },
        valorretenidorenta: {
            type: DataType.STRING,
            allowNull: true
        },
        informacionAdicional: {
            type: DataType.STRING(2000),
            allowNull: true
        },
        impuestos: {
            type: DataType.STRING(2000),
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
    return Retenciones;
};
