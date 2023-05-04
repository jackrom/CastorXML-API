module.exports = (sequelize, DataType) => {
    return sequelize.define("Usoscuponesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cuponId: {
            type: DataType.INTEGER,
            allowNull: true
        },
        cuponCodigo: {
            type: DataType.STRING,
            allowNull: true
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: true
        },
        ventaId: {
            type: DataType.INTEGER,
            allowNull: true
        },
        productoId: {
            type: DataType.INTEGER,
            allowNull: true
        },
        ispacket: {
            type: DataType.INTEGER,
            allowNull: true
        },
        generaDividendosAfiliado: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        afiliadoId: {
            type: DataType.INTEGER,
            allowNull: true
        }
    });
};
