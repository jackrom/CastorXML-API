const bcrypt = require("bcrypt")

module.exports = (sequelize, DataType) => {
    const Usersfc = sequelize.define("Usersfc", {
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
        emailVerificated: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        roleId: {
            type:   DataType.INTEGER,
            allowNull: false,
            defaultValue: 2
        },
        ipregister: {
            type: DataType.STRING,
        },
        lastip: {
            type: DataType.STRING(1000),
        },
        lastlogin: {
            type: DataType.DATE,
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
        tokenpush: {
            type: DataType.STRING,
        },
        codigopush: {
            type: DataType.STRING,
        },
        codigo_referido: {
            type: DataType.STRING(50)
        }
    }, {
        hooks: {
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync()
                user.password = bcrypt.hashSync(user.password, salt)
                // console.log('password user from user model')
                // console.log(user.password)
                bcrypt.hash(user.password, salt).then(function(hash) {
                    // Store hash in your password DB.
                    // console.log(hash)
                    user.password = hash
                });
            }
        }
    })
    Usersfc.associate = function(models) {
        Usersfc.hasMany(models.Documentos, {
            foreignKey: 'clienteId',
            as: 'alldocumentos'
        });
        Usersfc.hasMany(models.Transferencias, {
            foreignKey: 'idCliente',
            as: 'transferencias'
        });
        Usersfc.hasMany(models.Transacciones, {
            foreignKey: 'idCliente',
            as: 'transacciones'
        });
        Usersfc.hasMany(models.CursosactivosFC, {
            foreignKey: 'user_id',
            as: 'cursos'
        });
        Usersfc.hasMany(models.Leccionesvistasfc, {
            foreignKey: 'userId',
            as: 'leccionesvistas'
        });
        Usersfc.hasMany(models.Tokensdatafastfc, {
            foreignKey: 'userId',
            as: 'tarjetas'
        });
        Usersfc.hasMany(models.Usersaccountdetail, {
            foreignKey: 'user_id',
            as: 'detalles'
        });
        Usersfc.belongsTo(models.Rolesfc, {
            foreignKey: 'roleId',
            as: 'role'
        });
        Usersfc.hasMany(models.Firebasefc, {
            foreignKey: 'user_id',
            as: 'firebase'
        });
        Usersfc.hasMany(models.AplicacionesToUserfc, {
            foreignKey: 'user_id',
            as: 'aplicaciones'
        });
        Usersfc.hasMany(models.SocialnetworksToUserfc, {
            foreignKey: 'user_id',
            as: 'redessociales'
        });
        Usersfc.hasMany(models.PlanToUserfc, {
            foreignKey: 'user_id',
            as: 'planes'
        });
        Usersfc.hasMany(models.Userslocationfc, {
            foreignKey: 'user_id',
            as: 'location'
        });
    }
    Usersfc.isPassword = function(encodedPassword, password) {
        console.log(bcrypt.compareSync(password, encodedPassword))
        return bcrypt.compareSync(password, encodedPassword)
    }
    return Usersfc
};
