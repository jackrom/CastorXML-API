module.exports = (sequelize, DataType) => {
    const CursostocategoriasFC = sequelize.define("Cursostocategoriasfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cursoId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        categoriaId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    CursostocategoriasFC.associate = function(models) {
        CursostocategoriasFC.belongsTo(models.Cursosfc, {
            foreignKey: 'cursoId',
            as: 'infocurso'
        });
        CursostocategoriasFC.belongsTo(models.Categoriasfc, {
            foreignKey: 'categoriaId',
            as: 'category'
        });
    }

    return CursostocategoriasFC
};