module.exports = (sequelize, DataType) => {
    const Detalles_ProductosFC = sequelize.define("Detalles_productosfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productoId: {
            type: DataType.INTEGER,
        },
        detalle: {
            type: DataType.STRING(512),
            allowNull: true,
            validate: {
                notEmpty: false
            }
        }
    });

    return Detalles_ProductosFC;
};
