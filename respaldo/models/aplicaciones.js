module.exports = (sequelize, DataType) => {
    return sequelize.define("Aplicacionesfc", {
        idAplicacion: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreAplicacion: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })
};
