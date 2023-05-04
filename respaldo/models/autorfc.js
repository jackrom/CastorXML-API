module.exports = (sequelize, DataType) => {
    const ProductosFC = sequelize.define("Productosfc", {
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
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        urlimagenprofile: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        facebooklink: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        linkedinlink: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        youtubelink: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        twitterlink: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        pinterestlink: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        googlelink: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        instagramlink: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        }
    });

    return ProductosFC;
};
