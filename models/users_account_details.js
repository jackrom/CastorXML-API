module.exports = (sequelize, DataType) => {
    const Usersaccountdetail = sequelize.define("Usersaccountdetail", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
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
        version: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            },
            defaultValue: '1.0.0'
        },
        opcionescontacto: {
            type: DataType.STRING(1000),
            defaultValue: null
        },
        about: {
            type: DataType.TEXT
        },
        empresa: {
            type: DataType.STRING(255)
        }
    })

    return Usersaccountdetail
};
