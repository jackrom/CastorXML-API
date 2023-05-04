module.exports = (sequelize, DataType) => {
    const Productos = sequelize.define("Productos", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        empresaId: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        activo: {
            type:   DataType.BOOLEAN,
            defaultValue: true
        },
        apareceen: {
            type:   DataType.ENUM,
            values: ['Compras', 'Ventas', 'Ventas y Compras'],
            defaultValue: 'Ventas'
        },
        codigo: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        codigoAuxiliar: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        costo: {
            type: DataType.FLOAT(10,2),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        cuentaCompras: {
            type: DataType.STRING
        },
        cuentaVentas: {
            type: DataType.STRING
        },
        descripcion: {
            type: DataType.STRING(1024),
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        fechaEmision: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        esGastoDirecto: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        inventariable: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        precio: {
            type: DataType.FLOAT(10,2),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        tienemovimientos: {
            type: DataType.BOOLEAN,
            defaultValue: false
        },
        tipo: {
            type: DataType.STRING,
            allowNull: true
        },
        tipoice_compra: {
            type: DataType.STRING(1000),
            allowNull: true
        },
        tipoice_venta: {
            type: DataType.STRING(1000),
            allowNull: true
        },
        tipoirbpnr_compra: {
            type: DataType.STRING(1000),
            allowNull: true
        },
        tipoirbpnr_venta: {
            type: DataType.STRING(1000),
            allowNull: true
        },
        tipoiva_compra: {
            type: DataType.STRING(1000),
            allowNull: true
        },
        tipoiva_venta: {
            type: DataType.STRING(1000),
            allowNull: true
        },
        uid: {
            type: DataType.STRING(100),
            allowNull: true
        }
    });
    return Productos;
};
