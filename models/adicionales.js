module.exports = (sequelize, DataType) => {
    const Adicionales = sequelize.define("Adicionales", {
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
        nombre: {
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

    return Adicionales;
};
