module.exports = (sequelize, DataType) => {
    const Tags = sequelize.define("Tags", {
        idTag: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tag: {
            type: DataType.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        color: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        alcance: {
            type:   DataType.ENUM,
            values: ['general', 'particular'],
            allowNull: true,
            defaultValue: 'particular',
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
    });

    Tags.associate = function(models) {
        Tags.hasMany(models.Documentos, {
            foreignKey: 'tag',
            as: 'tagsdocument'
        })
    };

    return Tags;
};
