module.exports = (sequelize, DataType) => {
    const PlanesFC =  sequelize.define("Planesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productoId: {
            type: DataType.INTEGER
        },
        productoName: {
            type: DataType.STRING
        },
        opcion: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        storage: {
            type: DataType.INTEGER
        },
        plan: {
            type: DataType.STRING
        },
        comprobantes: {
            type: DataType.STRING
        },
        empresasp: {
            type: DataType.INTEGER
        },
        incluye: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        ispacket: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    });

    PlanesFC.associate = (models) => {
        PlanesFC.belongsTo(models.CursosactivosFC, {
            foreignKey: 'productoId',
            as: 'cursosusuarios'
        });
    }

    return PlanesFC
};
