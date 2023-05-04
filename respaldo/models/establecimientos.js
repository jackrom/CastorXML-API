module.exports = (sequelize, DataType) => {
    const Establecimientos = sequelize.define("Establecimientos", {
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
            type: DataType.INTEGER,
            allowNull: false,
        },
        nombre_comercial: {
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
        descripcion: {
            type: DataType.STRING,
            allowNull: true
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
        logo: {
            type: DataType.STRING,
            allowNull: true
        },
        gerente: {
            type: DataType.STRING,
            allowNull: true
        },
        matriz: {
            type: DataType.STRING,
            allowNull: true
        }
    });

    return Establecimientos;
};
