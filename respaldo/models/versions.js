module.exports = (sequelize, DataType) => {
    const Versiones = sequelize.define("Versiones", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        version: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    return Versiones;
};
