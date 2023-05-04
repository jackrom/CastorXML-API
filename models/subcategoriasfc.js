module.exports = (sequelize, DataType) => {
    const SubcategoriasFC = sequelize.define("Subcategoriasfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoria: {
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
        },
        urlimagen:{
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        }
    });

    return SubcategoriasFC;
};
