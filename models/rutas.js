module.exports = (sequelize, DataType) => {
    const Rutas = sequelize.define("Rutas", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        empresaId: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        codigo: {
            type: DataType.STRING,
            allowNull: false,
        },
        ruta: {
            type: DataType.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    return Rutas;
};
