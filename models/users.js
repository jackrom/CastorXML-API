const bcrypt = require("bcrypt")

module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        afiliadoId: {
            type: DataType.STRING(512),
            allowNull: true,
            defaultValue: null
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        genero: {
            type:   DataType.ENUM,
            values: ['mujer', 'hombre', 'indeterminado'],
            defaultValue: 'indeterminado'
        },
        userFirebase: {
            type: DataType.STRING,
        },
        dataFirebase: {
            type: DataType.TEXT,
        },
        emailVerificated: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        direccion: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        direccionformateada: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        celular: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        ruc: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        nacimiento: {
            type: DataType.DATE
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
        avatar: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        role: {
            type:   DataType.ENUM,
            allowNull: false,
            values: ['cliente', 'administrador', 'colaborador'],
            defaultValue: 'colaborador'
        },
        plan: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        cardtoken: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        datacard: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        cards: {
            type: DataType.TEXT
        },
        storage: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            defaultValue: 0
        },
        storageff: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            defaultValue: 0
        },
        storagedc: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            defaultValue: 0
        },
        storageif: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            defaultValue: 0
        },
        metodo: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
        },
        ipregister: {
            type: DataType.STRING,
        },
        lastip: {
            type: DataType.STRING(1000),
        },
        version: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            defaultValue: '1.0.0'
        },
        latitud: {
            type: DataType.STRING,
        },
        longitud: {
            type: DataType.STRING,
        },
        new_password_key: {
            type: DataType.STRING,
        },
        new_password_request: {
            type: DataType.STRING,
        },
        status: {
            type: DataType.INTEGER(1),
            defaultValue: 1
        },
        isBanned: {
            type: DataType.INTEGER,
        },
        banReason: {
            type: DataType.STRING,
        },
        aplicaciones: {
            type: DataType.STRING,
        },
        isActive: {
            type: DataType.INTEGER(1),
            allowNull: false,
            validate: {
                notEmpty: false
            },
            defaultValue: '0'
        },
        isActiveFF: {
            type: DataType.INTEGER(1),
            allowNull: false,
            validate: {
                notEmpty: false
            },
            defaultValue: '0'
        },
        isActiveDC: {
            type: DataType.INTEGER(1),
            allowNull: false,
            validate: {
                notEmpty: false
            },
            defaultValue: '0'
        },
        isActiveIF: {
            type: DataType.INTEGER(1),
            allowNull: false,
            validate: {
                notEmpty: false
            },
            defaultValue: '0'
        },
        modopago: {
            type:   DataType.ENUM,
            allowNull: false,
            values: ['Anual', 'Mensual', 'Ninguno'],
            defaultValue: 'Ninguno'
        },
        modopagocx: {
            type:   DataType.ENUM,
            allowNull: false,
            values: ['Anual', 'Mensual', 'Ninguno'],
            defaultValue: 'Ninguno'
        },
        modopagodc: {
            type:   DataType.ENUM,
            allowNull: false,
            values: ['Anual', 'Mensual', 'Ninguno'],
            defaultValue: 'Ninguno'
        },
        modopagoif: {
            type:   DataType.ENUM,
            allowNull: false,
            values: ['Anual', 'Mensual', 'Ninguno'],
            defaultValue: 'Ninguno'
        },
        valorpago: {
            type: DataType.FLOAT(10,2)
        },
        periodopago: {
            type: DataType.INTEGER
        },
        fechapago: {
            type: DataType.DATE
        },
        valorpagocx: {
            type: DataType.FLOAT(10,2)
        },
        periodopagocx: {
            type: DataType.INTEGER
        },
        fechapagocx: {
            type: DataType.DATE
        },
        valorpagodc: {
            type: DataType.FLOAT(10,2)
        },
        periodopagodc: {
            type: DataType.INTEGER
        },
        fechapagodc: {
            type: DataType.DATE
        },
        valorpagoif: {
            type: DataType.FLOAT(10,2)
        },
        periodopagoif: {
            type: DataType.INTEGER
        },
        fechapagoif: {
            type: DataType.DATE
        },
        isActiveAcademy: {
            type: DataType.INTEGER(1),
            allowNull: true,
            defaultValue: '0'
        },
        modopagoacademy: {
            type:   DataType.ENUM,
            allowNull: true,
            values: ['Anual', 'Mensual', 'Ninguno'],
            defaultValue: 'Ninguno'
        },
        valorpagoacademy: {
            type: DataType.FLOAT(10,2)
        },
        periodopagoacademy: {
            type: DataType.INTEGER
        },
        fechapagoacademy: {
            type: DataType.DATE
        },
        productosacademy: {
            type: DataType.TEXT,
            defaultValue: null
        },
        tokenpush: {
            type: DataType.STRING,
        },
        codigopush: {
            type: DataType.STRING,
        },
        pop3_user: {
            type: DataType.STRING,
        },
        pop3_password: {
            type: DataType.STRING,
        },
        pop3_server: {
            type: DataType.STRING,
        },
        smtp_do_authorization: {
            type: DataType.BOOLEAN,
            defaultValue: true
        },
        smtp_user: {
            type: DataType.STRING,
        },
        smtp_password: {
            type: DataType.STRING,
        },
        smtp_server: {
            type: DataType.STRING,
        },
        email_from_address: {
            type: DataType.STRING,
        },
        email_from_name: {
            type: DataType.STRING,
        },
        permisos: {
            type: DataType.TEXT,
            defaultValue: null
        },
        opcionescontacto: {
            type: DataType.STRING(1000),
            defaultValue: null
        },
        twitter: {
            type: DataType.STRING(500),
            defaultValue: null
        },
        facebook: {
            type: DataType.STRING(500),
            defaultValue: null
        },
        youtube: {
            type: DataType.STRING(500),
            defaultValue: null
        },
        instagram: {
            type: DataType.STRING(500),
            defaultValue: null
        },
        slack: {
            type: DataType.STRING(500),
            defaultValue: null
        },
        github: {
            type: DataType.STRING(500),
            defaultValue: null
        },
        canales: {
            type: DataType.TEXT
        },
        about: {
            type: DataType.TEXT
        },
        codigo_referido: {
            type: DataType.STRING(50)
        },
        empresa: {
            type: DataType.STRING(255)
        },
        user_id: {
            type: DataType.INTEGER
        }
    }, {
        hooks: {
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync()
                user.password = bcrypt.hashSync(user.password, salt)
                console.log('password user from user model')
                console.log(user.password)
                bcrypt.hash(user.password, salt).then(function(hash) {
                    // Store hash in your password DB.
                    console.log(hash)
                    user.password = hash
                });
            }
        }
    })
    /*
    Users.associate = function(models) {
        Users.hasMany(models.Documentos, {
            foreignKey: 'clienteId',
            as: 'alldocumentos'
        });
        Users.hasMany(models.Transferencias, {
            foreignKey: 'id',
            as: 'cliente'
        });
        Users.hasMany(models.Transacciones, {
            foreignKey: 'id',
            as: 'clientetarjeta'
        });
        Users.hasMany(models.CursosactivosFC, {
            foreignKey: 'user_id',
            as: 'cursos'
        });
        Users.hasMany(models.Leccionesvistasfc, {
            foreignKey: 'userId',
            as: 'leccionesvistas'
        });
        Users.hasMany(models.Tokensdatafastfc, {
            foreignKey: 'userId',
            as: 'tarjetas'
        });
        Users.hasMany(models.PlanToUserfc, {
            foreignKey: 'user_id',
            as: 'planes'
        });
    }

     */
    Users.isPassword = function(encodedPassword, password) {
        console.log(bcrypt.compareSync(password, encodedPassword))
        return bcrypt.compareSync(password, encodedPassword)
    }
    return Users
};
