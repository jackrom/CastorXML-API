module.exports = (sequelize, DataType) => {
    const Datafast = sequelize.define("Datafast", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCliente: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        amount: {
            type: DataType.STRING,
            allowNull: true
        },
        billing: {
            type: DataType.TEXT,
            allowNull: true
        },
        buildNumber: {
            type: DataType.STRING,
            allowNull: true
        },
        card: {
            type: DataType.TEXT,
            allowNull: true
        },
        cart: {
            type: DataType.TEXT,
            allowNull: true
        },
        currency: {
            type: DataType.STRING,
            allowNull: true
        },
        customParameters: {
            type: DataType.TEXT,
            allowNull: true
        },
        customer: {
            type: DataType.TEXT,
            allowNull: true
        },
        descriptor: {
            type: DataType.STRING,
            allowNull: true
        },
        responseId: {
            type: DataType.STRING,
            allowNull: true
        },
        merchantTransactionId: {
            type: DataType.STRING,
            allowNull: true
        },
        ndc: {
            type: DataType.STRING,
            allowNull: true
        },
        paymentBrand: {
            type: DataType.STRING,
            allowNull: true
        },
        paymentType: {
            type: DataType.STRING,
            allowNull: true
        },
        recurring: {
            type: DataType.TEXT,
            allowNull: true
        },
        recurringType: {
            type: DataType.STRING,
            allowNull: true
        },
        registrationId: {
            type: DataType.STRING,
            allowNull: true
        },
        result: {
            type: DataType.TEXT,
            allowNull: true
        },
        resultDetails: {
            type: DataType.TEXT,
            allowNull: true
        },
        risk: {
            type: DataType.TEXT,
            allowNull: true
        },
        shipping: {
            type: DataType.TEXT,
            allowNull: true
        },
        fecha: {
            type: DataType.DATE,
            allowNull: true
        },
        contenidoCompra: {
            type: DataType.TEXT,
            allowNull: true
        },
        solicitudDevolucion: {
            type: DataType.INTEGER,
            defaultValue: null,
            allowNull: true
        },
        fechaSolicitudDevolucion: {
            type: DataType.DATE,
            defaultValue: null,
            allowNull: true
        },
        estadoDevolucion: {
            type:   DataType.ENUM,
            values: ['procesada', 'no procesada'],
            defaultValue: null,
            allowNull: true
        },
        fechaDevolucion: {
            type: DataType.DATE,
            defaultValue: null,
            allowNull: true
        },
        devolucionRealizadaPor: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null
        },
        objDevolucion: {
            type: DataType.TEXT,
            allowNull: true,
            defaultValue: null
        },
        recurrenciaactiva: {
            type: DataType.INTEGER(1),
        }
    });

    return Datafast;
};
