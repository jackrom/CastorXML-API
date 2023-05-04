module.exports = (sequelize, DataType) => {
    const Ventasafiliado = sequelize.define("Ventasafiliado", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idAfiliadoVendedor: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        idUserComprador: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        idProductoComercializado: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        formaDePago: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        comisionafiliado: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type:   DataType.ENUM,
            values: ['pendiente', 'procesada', 'anulada'],
            defaultValue: 'pendiente'
        },
        procesada: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        procesada_por: {
            type:   DataType.ENUM,
            values: ['cliente', 'sistema'],
            allowNull: true,
            defaultValue: null
        },
        estado: {
            type:   DataType.ENUM,
            values: ['pagada', 'no pagada'],
            defaultValue: 'no pagada',
            allowNull: true
        }
    });

    Ventasafiliado.associate = function(models) {
        Ventasafiliado.belongsTo(models.Users, {
            foreignKey: 'idAfiliadoVendedor',
            as: 'vendedor'
        });
        Ventasafiliado.belongsTo(models.Users, {
            foreignKey: 'idUserComprador',
            as: 'comprador'
        });
        Ventasafiliado.belongsTo(models.Productosfc, {
            foreignKey: 'idProductoComercializado',
            as: 'producto'
        });
    };

    return Ventasafiliado;
};
