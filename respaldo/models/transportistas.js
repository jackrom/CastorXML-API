module.exports = (sequelize, DataType) => {
    const Transportistas = sequelize.define("Transportistas", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        empresaId: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        identificacion_transportista: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        razon_social_transportista: {
            type: DataType.STRING(250),
            allowNull: true
        },
        correo_transportista: {
            type: DataType.STRING(250),
            allowNull: true
        },
        placa: {
            type: DataType.STRING(250),
            allowNull: true
        }
    });

    return Transportistas;
};
