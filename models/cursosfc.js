module.exports = (sequelize, DataType) => {
    const CursosFC = sequelize.define("Cursosfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPaypal: {
            type: DataType.STRING,
            allowNull: true,
        },
        categoriaId: {
            type: DataType.INTEGER
        },
        subcategoriaId: {
            type: DataType.INTEGER,
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
            type:   DataType.ENUM,
            allowNull: true,
            values: ['INDIVIDUAL', 'PACK'],
            defaultValue: 'INDIVIDUAL'
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
        incluyetutorias: {
            type: DataType.INTEGER,
        },
        activo: {
            type: DataType.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    });

    CursosFC.associate = function(models) {
        CursosFC.hasMany(models.Cursospreciosfc, {
            foreignKey: 'productoId',
            as: 'cursosprecios'
        });
        CursosFC.hasMany(models.Cursosseccionesfc, {
            foreignKey: 'cursoId',
            as: 'cursossecciones'
        })
        CursosFC.hasMany(models.Cursosleccionesfc, {
            foreignKey: 'cursoId',
            as: 'cursosseccioneslecciones'
        })
        CursosFC.hasMany(models.Cursosplanesfc, {
            foreignKey: 'productoId',
            as: 'cursosplanes'
        })
        CursosFC.hasMany(models.Cursosmodulosonlinefc, {
            foreignKey: 'cursoId',
            as: 'cursosmodulosonline'
        })
        CursosFC.hasMany(models.CursosactivosFC, {
            foreignKey: 'idCurso',
            as: 'cursosactivosporusuarios'
        });
        CursosFC.hasMany(models.Cursostocategoriasfc, {
            foreignKey: 'cursoId',
            as: 'categorias'
        });
        CursosFC.hasMany(models.Cursostosubcategoriasfc, {
            foreignKey: 'cursoId',
            as: 'subcategorias'
        });
        CursosFC.hasMany(models.Cursostopackfc, {
            foreignKey: 'packId',
            as: 'items'
        });
    };

    return CursosFC;
};
