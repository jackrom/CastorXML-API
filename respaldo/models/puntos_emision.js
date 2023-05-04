module.exports = (sequelize, DataType) => {
    const PuntosEmision = sequelize.define("PuntosEmision", {
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
        nombre_punto: {
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
        encargado: {
            type: DataType.STRING,
            allowNull: true
        },
        matriz: {
            type: DataType.STRING,
            allowNull: true
        }
    });

    return PuntosEmision;
};
