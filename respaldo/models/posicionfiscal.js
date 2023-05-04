module.exports = (sequelize, DataType) => {
    const PosicionFiscal = sequelize.define("Posicionesfiscales", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    return PosicionFiscal;
};
