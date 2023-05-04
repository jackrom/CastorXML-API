module.exports = (sequelize, DataType) => {
    const Rolesfc = sequelize.define("Rolesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        default: {
            type:   DataType.INTEGER
        },
        permissions: {
            type: DataType.TEXT,
            allowNull: true
        }
    })

    return Rolesfc
};