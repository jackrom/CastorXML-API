module.exports = (sequelize, DataType) => {
    const SocialnetworksToUserfc = sequelize.define("SocialnetworksToUserfc", {
        idNet: {
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
        socialnetworkId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        urlnetwork: {
            type: DataType.STRING(512),
            allowNull: true
        }
    })

    SocialnetworksToUserfc.associate = function(models) {
        SocialnetworksToUserfc.belongsTo(models.Socialnetworksfc, {
            foreignKey: 'user_id',
            as: 'redsocial'
        });
    };

    return SocialnetworksToUserfc
};