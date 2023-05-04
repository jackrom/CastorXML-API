module.exports = (sequelize, DataType) => {
    const CursostosubcategoriasFC = sequelize.define("Cursostosubcategoriasfc", {
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
        subcategoriaId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    CursostosubcategoriasFC.associate = function(models) {
        CursostosubcategoriasFC.belongsTo(models.Cursosfc, {
            foreignKey: 'cursoId',
            as: 'infosubcategoriacurso'
        });
        CursostosubcategoriasFC.belongsTo(models.Subcategoriasfc, {
            foreignKey: 'subcategoriaId',
            as: 'subcategory'
        });
    }

    return CursostosubcategoriasFC
};