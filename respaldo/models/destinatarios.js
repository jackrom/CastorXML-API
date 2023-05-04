module.exports = (sequelize, DataType) => {
    const Destinatarios = sequelize.define("Destinatarios", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        empresaId: {
            type: DataType.STRING,
            allowNull: false,
        },
        nombre: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        descripcion: {
            type: DataType.STRING,
            allowNull: true
        },
        ruc: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: true
        },
        direccion: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        telefono: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        ciudad: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        provincia: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        obligado_contabilidad: {
            type:   DataType.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        gerente: {
            type: DataType.STRING,
            allowNull: true
        },
        codigo: {
            type: DataType.STRING,
            allowNull: true
        },
        activo: {
            type: DataType.STRING,
            allowNull: true
        },
        contribuyenteespecial: {
            type:   DataType.ENUM,
            allowNull: true,
            values: ['si', 'no'],
            defaultValue: 'no'
        },
        numerocontribuyenteespecial: {
            type: DataType.STRING,
            allowNull: true
        },
        agenteretencion: {
            type: DataType.STRING,
            allowNull: true
        },
        regimenmicroempresas: {
            type: DataType.STRING,
            allowNull: true
        }
    });

    return Destinatarios;
};
