module.exports = (sequelize, DataType) => {
    const Impuestos = sequelize.define("Impuestos", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        codigo_impuesto: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        porcentaje: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        porcentaje_retencion: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        tipo_impuesto: {
            type: DataType.STRING,
            allowNull: true
        },
        descripcion: {
            type: DataType.STRING(250),
            allowNull: true
        },
        fecha_inicio: {
            type: DataType.DATE,
            allowNull: true
        },
        fecha_fin: {
            type: DataType.DATE,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        codigo_adm: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        marca_porcentaje_libre: {
            type: DataType.STRING,
            allowNull: true
        },
    });

    return Impuestos;
};
