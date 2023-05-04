module.exports = (sequelize, DataType) => {
    const Cuponesfc = sequelize.define("Cuponesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataType.STRING,
            allowNull: true
        },
        codigo: {
            type: DataType.STRING,
            allowNull: true
        },
        status: {
            type:   DataType.ENUM,
            values: ['disabled', 'enabled'],
            defaultValue: null,
            allowNull: true
        },
        tipo_descuento: {
            type:   DataType.ENUM,
            values: ['precio', 'porcentaje','free-shipping'],
            defaultValue: null,
            allowNull: true
        },
        descuento: {
            type: DataType.STRING,
            allowNull: true
        },
        amortizable_desde: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        fecha_amortizacion_desde: {
            type: DataType.DATE,
            allowNull: true
        },
        amortizable_hasta: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        fecha_amortizacion_hasta: {
            type: DataType.DATE,
            allowNull: true
        },
        auto_aplicable_afiliados: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        afiliado_id: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        deshabilitar_por_cant_usuarios: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        cant_usuarios_permitidos: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        deshabilitar_por_cant_usos: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        cant_usos_permitidos: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        aplicado_a: {
            type:   DataType.ENUM,
            values: ['producto', 'promo', 'todos'],
            defaultValue: null,
            allowNull: true
        },
        contenido: {
            type: DataType.TEXT,
            allowNull: true
        },
        opcion: {
            type: DataType.STRING,
            allowNull: true
        },
        url: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null
        },
    });

    Cuponesfc.associate = function(models) {
        Cuponesfc.hasMany(models.Usoscuponesfc, {
            foreignKey: 'cuponId',
            targetKey: 'cuponId',
            as: 'usos'
        })
    };

    return Cuponesfc;
};
