module.exports = (sequelize, DataType) => {
    const ProductosToPromocionesfc = sequelize.define("ProductosToPromocionesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productoId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        promoId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    ProductosToPromocionesfc.associate = function(models) {
        ProductosToPromocionesfc.belongsTo(models.Productosfc, {
            foreignKey: 'productoId',
            as: 'detallescurso'
        });
    }

    return ProductosToPromocionesfc
};