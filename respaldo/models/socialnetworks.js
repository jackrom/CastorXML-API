module.exports = (sequelize, DataType) => {
    const Socialnetworksfc = sequelize.define("Socialnetworksfc", {
        idNetwork: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreNetwork: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    return Socialnetworksfc
};