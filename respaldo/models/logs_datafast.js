module.exports = (sequelize, DataType) => {
    const Logsdatafast = sequelize.define("Logsdatafast", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCliente: {
            type: DataType.STRING,
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
        }
    });

    return Logsdatafast;
};
