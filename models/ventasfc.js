module.exports = (sequelize, DataType) => {
    const VentasFC = sequelize.define("Ventasfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuarioId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        usuarioName: {
            type: DataType.STRING
        },
        usuario: {
            type: DataType.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        productos: {
            type: DataType.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        cantProductos: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        datospago: {
            type: DataType.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        valor: {
            type: DataType.FLOAT(10,2),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        formaDePago: {
            type: DataType.STRING(255),
            allowNull: true
        },
        modopago: {
            type: DataType.STRING(100),
            allowNull: true
        },
        estado: {
            type:   DataType.ENUM,
            values: ['procesada', 'no procesada'],
            defaultValue: 'no procesada',
            allowNull: true
        },
        status: {
            type:   DataType.ENUM,
            values: ['activa', 'inactiva'],
            defaultValue: 'inactiva',
            allowNull: true
        },
        origen: {
            type:   DataType.ENUM,
            values: ['facilcontabilidad', 'asociados', 'referidos'],
            defaultValue: null
        },
        codigo: {
            type: DataType.STRING(25)
        },
        afiliado: {
            type: DataType.STRING(512),
            allowNull: true,
            defaultValue: null
        }
    });

    VentasFC.associate = function(models) {
        VentasFC.belongsTo(models.Users, {
            foreignKey: 'usuarioId',
            as: 'user'
        });
    };

    return VentasFC;
};
