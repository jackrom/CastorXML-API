module.exports = (sequelize, DataType) => {
    const PromocionesFC =  sequelize.define("Promocionesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPaypalPromo: {
            type: DataType.STRING,
            allowNull: true,
        },
        nombre: {
            type: DataType.STRING
        },
        nombre_comercial: {
            type: DataType.STRING(255),
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        descripcion: {
            type: DataType.STRING
        },
        resumen: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        categoriaId: {
            type: DataType.INTEGER
        },
        categoriaName: {
            type: DataType.STRING
        },
        productos: {
            type: DataType.TEXT,
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
        activo: {
            type: DataType.INTEGER
        },
        fechainicio: {
            type: DataType.DATE
        },
        fechafinal: {
            type: DataType.DATE
        },
        duracionpromo: {
            type: DataType.INTEGER
        },
        tiempoacceso: {
            type:   DataType.ENUM,
            allowNull: true,
            values: ['0', '30', '60', '90', '120', '180', '360', '720', '1080'],
            defaultValue: null
        },
        urlhojadeventa: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        urlimagenpromocional: {
            type: DataType.STRING,
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
        certificados: {
            type: DataType.INTEGER,
        },
        modalidad: {
            type:   DataType.ENUM,
            allowNull: true,
            values: ['ONLINE', 'PRESENCIAL', 'GRABADO', 'COMBINADO', 'APLICACION'],
            defaultValue: null
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
            type:   DataType.ENUM,
            allowNull: true,
            values: ['PÚBLICO', 'PRIVADO'],
            defaultValue: 'PRIVADO'
        },
        incluyetutorias: {
            type: DataType.INTEGER,
        },
        listas: {
            type: DataType.TEXT,
            allowNull: true,
        },
        orden: {
            type: DataType.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    });

    PromocionesFC.associate = function(models) {
        PromocionesFC.hasMany(models.Preciosfc, {
            foreignKey: 'productoId',
            as: 'precios'
        });
        PromocionesFC.hasMany(models.Planesfc, {
            foreignKey: 'productoId',
            as: 'planes'
        });
        PromocionesFC.hasMany(models.Modulosonlinefc, {
            foreignKey: 'cursoId',
            as: 'modulosonline'
        });
        PromocionesFC.hasMany(models.ProductosToPromocionesfc, {
            foreignKey: 'promoId',
            as: 'allproductos'
        })
        PromocionesFC.hasMany(models.SuscripcionesGetResponsefc, {
            foreignKey: 'promoId',
            as: 'listasgetresponse'
        })
        PromocionesFC.hasMany(models.CursosactivosFC, {
            foreignKey: 'idCurso',
            as: 'promocionesactivasusuarios'
        });
    };

    return PromocionesFC;
};
