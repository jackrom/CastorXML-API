module.exports = (sequelize, DataType) => {
    const KeywordsFC = sequelize.define("Keywordsfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoria: {
            type: DataType.INTEGER
        },
        subcategoria: {
            type: DataType.INTEGER
        },
        nombre: {
            type: DataType.STRING(255),
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        descripcion: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        }
    });

    return KeywordsFC;
};
