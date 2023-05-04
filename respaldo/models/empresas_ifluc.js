module.exports = (sequelize, DataType) => {
    const EmpresasIfluc = sequelize.define("EmpresasIfluc", {
        id: {
            type: DataType.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        id_sri: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: '00000000'
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        nombre: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        nombre_comercial: {
            type: DataType.STRING,
            allowNull: true
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
        direccion_emisor: {
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
        logo: {
            type: DataType.STRING,
            allowNull: true
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
        tipo_emision: {
            type:   DataType.INTEGER,
            allowNull: true
        },
        ambiente: {
            type:   DataType.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        dir_P12: {
            type: DataType.STRING,
            allowNull: true
        },
        password_P12: {
            type: DataType.STRING,
            allowNull: true
        },
        passsri: {
            type: DataType.STRING(255),
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
        },
        useradmin: {
            type: DataType.TEXT,
            allowNull: true
        },
        origen: {
            type: DataType.STRING,
            allowNull: true,
            defaultValue: null
        }
    });

    EmpresasIfluc.associate = function(models) {
        EmpresasIfluc.hasMany(models.PeriodosIfluc, {
            foreignKey: 'empresaId',
            as: 'periodosifluc'
        });
    };

    return EmpresasIfluc;

};
