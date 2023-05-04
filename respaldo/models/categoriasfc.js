module.exports = (sequelize, DataType) => {
    const CategoriasFC = sequelize.define("Categoriasfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    CategoriasFC.associate = function(models) {
        CategoriasFC.hasMany(models.Cursosfc, {
            foreignKey: 'cursoId',
            as: 'cursoscategorias'
        });
    }

    return CategoriasFC;
};
