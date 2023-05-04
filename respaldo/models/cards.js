module.exports = (sequelize, DataType) => {
    const CardsFC = sequelize.define("Cardsfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER
        },
        bin: {
            type: DataType.STRING
        },
        message: {
            type: DataType.STRING
        },
        expirymonth: {
            type: DataType.STRING
        },
        expiryyear: {
            type: DataType.STRING
        },
        origin: {
            type: DataType.STRING
        },
        status: {
            type: DataType.STRING
        },
        number: {
            type: DataType.STRING
        },
        token: {
            type: DataType.STRING
        },
        transactionreference: {
            type: DataType.STRING
        },
        type: {
            type: DataType.STRING
        },
    });

    return CardsFC;
};
