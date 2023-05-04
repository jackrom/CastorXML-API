module.exports = (sequelize, DataType) => {
    const GuiasDeRemision = sequelize.define("Guiasderemision", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCliente: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        secuencial: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        dir_partida: {
            type: DataType.STRING(250),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        dir_establecimiento: {
            type: DataType.STRING(250),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        fechaEmision: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        fecha_inicio: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        fecha_fin: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        transportista: {
            type: DataType.STRING(2000),
            allowNull: true
        },
        detallesList: {
            type: DataType.STRING(5000),
            allowNull: true
        },
        informacionAdicionalList: {
            type: DataType.STRING(2000),
            allowNull: true
        },
        status: {
            type:   DataType.ENUM,
            values: ['creada', 'recibida', 'autorizada', 'rechazada', 'no autorizada'],
            defaultValue: 'creada'
        },
        cancelada: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        cancel_by: {
            type:   DataType.ENUM,
            values: ['cliente', 'sistema'],
            allowNull: true
        }
    });
    return GuiasDeRemision;
};
