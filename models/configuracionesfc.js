module.exports = (sequelize, DataType) => {
    return sequelize.define("Configuracionesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING(512),
            unique: true,
        },
        value: {
            type: DataType.TEXT
        }
    });
};
