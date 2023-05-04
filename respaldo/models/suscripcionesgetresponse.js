module.exports = (sequelize, DataType) => {
    return sequelize.define("SuscripcionesGetResponsefc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        promoId: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        productoId: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        campaignId: {
            type: DataType.STRING,
            allowNull: true,
        },
        href: {
            type: DataType.STRING
        },
        name: {
            type: DataType.STRING(255),
            allowNull: true
        },
        techName: {
            type: DataType.STRING
        },
        description: {
            type: DataType.STRING,
            allowNull: true
        },
        languageCode: {
            type: DataType.INTEGER
        },
        isDefault: {
            type: DataType.STRING
        },
        createdOn: {
            type: DataType.DATE,
            allowNull: true
        }
    });
};
