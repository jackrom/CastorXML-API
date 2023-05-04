module.exports = (sequelize, DataType) => {
    const Facturas = sequelize.define("Facturas", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idClienteFirebase: {
            type: DataType.STRING,
            allowNull: true
        },
        secuencial: {
            type: DataType.STRING,
            allowNull: true
        },
        fechaEmision: {
            type: DataType.DATE,
            allowNull: true
        },
        razonSocialCliente: {
            type: DataType.STRING,
            allowNull: true
        },
        identificacionCliente: {
            type: DataType.STRING,
            allowNull: true
        },
        correoCliente: {
            type: DataType.STRING,
            allowNull: true
        },
        telefonoCliente: {
            type: DataType.STRING,
            allowNull: true
        },
        direccionCliente: {
            type: DataType.STRING,
            allowNull: true
        },
        guiaRemision: {
            type: DataType.STRING,
            allowNull: true
        },
        propina: {
            type: DataType.FLOAT,
            allowNull: true
        },
        descuentoSolidario: {
            type: DataType.STRING,
            allowNull: true
        },
        informacionAdicional: {
            type: DataType.STRING(2000),
            allowNull: true
        },
        productList: {
            type: DataType.TEXT,
            allowNull: true
        },
        formasPagoList: {
            type: DataType.TEXT,
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
        },
        estado: {
            type:   DataType.ENUM,
            values: ['pagada', 'no pagada'],
            defaultValue: 'no pagada',
            allowNull: true
        }
    });
    return Facturas;
};
