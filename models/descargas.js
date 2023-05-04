module.exports = (sequelize, DataType) => {
    const Descargas = sequelize.define("Descargas", {
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
        documentos: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        mes: {
            type: DataType.STRING,
            allowNull: false,
        },
        mesNumero: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        anioNumero: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    });

    return Descargas;
};
