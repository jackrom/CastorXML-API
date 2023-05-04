module.exports = (sequelize, DataType) => {
    const CursostopackFC = sequelize.define("Cursostopackfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        packId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        cursoId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    CursostopackFC.associate = function(models) {
        CursostopackFC.belongsTo(models.Cursosfc, {
            foreignKey: 'cursoId',
            as: 'infopack'
        });
    }

    return CursostopackFC
};