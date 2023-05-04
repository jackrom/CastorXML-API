module.exports = (sequelize, DataType) => {
    const PlanToUserfc = sequelize.define("PlanToUserfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        planId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    PlanToUserfc.associate = function(models) {
        PlanToUserfc.belongsTo(models.Planesfc, {
            foreignKey: 'planId',
            as: 'planusuario'
        });
    }

    return PlanToUserfc
};