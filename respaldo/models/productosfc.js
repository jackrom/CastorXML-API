module.exports = (sequelize, DataType) => {
    const ProductosFC = sequelize.define("Productosfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPaypalProduct: {
            type: DataType.STRING,
            allowNull: true,
        },
        categoriaId: {
            type: DataType.INTEGER
        },
        categoriaName: {
            type: DataType.STRING
        },
        subcategoriaId: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        subcategoriaName: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        keywords: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        tipo: {
            type: DataType.INTEGER
        },
        productoPadreId: {
            type: DataType.INTEGER
        },
        productoPadreNombre: {
            type: DataType.STRING
        },
        nombre: {
            type: DataType.STRING(255),
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        nombre_comercial: {
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
        resumen: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        detalles: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        videourl: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        configuraciones: {
            type: DataType.STRING
        },
        urlimagen: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        urlthumbimage: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        metatitle: {
            type: DataType.STRING,
        },
        metakeyword: {
            type: DataType.STRING,
        },
        metadescripcion: {
            type: DataType.STRING,
        },
        author: {
            type: DataType.INTEGER,
        },
        certificados: {
            type: DataType.INTEGER,
        },
        urlhojadeventa: {
            type: DataType.STRING(512),
        },
        modalidad: {
            type: DataType.STRING,
        },
        pais: {
            type: DataType.STRING,
        },
        callback: {
            type: DataType.STRING,
        },
        grupowhatsapp: {
            type: DataType.STRING(1000),
        },
        visibilidad: {
            type: DataType.INTEGER,
        },
        listas: {
            type: DataType.TEXT,
            allowNull: true,
        },
        orden: {
            type: DataType.INTEGER,
        },
        activo: {
            type: DataType.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    });

    ProductosFC.associate = function(models) {
        ProductosFC.hasMany(models.Preciosfc, {
            foreignKey: 'productoId',
            as: 'precios'
        });
        ProductosFC.hasMany(models.Seccionesfc, {
            foreignKey: 'cursoId',
            as: 'secciones'
        })
        ProductosFC.hasMany(models.Planesfc, {
            foreignKey: 'productoId',
            as: 'planes'
        })
        ProductosFC.hasMany(models.Modulosonlinefc, {
            foreignKey: 'cursoId',
            as: 'modulosonline'
        })
        ProductosFC.hasMany(models.CursosactivosFC, {
            foreignKey: 'idCurso',
            as: 'cursosactivosusuarios'
        });
    };

    return ProductosFC;
};
