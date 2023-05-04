module.exports = (sequelize, DataType) => {
    const FormasPagoSRI = sequelize.define("Formaspagosri", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        nombre: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        descripcion: {
            type: DataType.STRING(250),
            allowNull: true
        }
    });

    return FormasPagoSRI;
};
