module.exports = (sequelize, DataType) => {
    const CursosplanesFC =  sequelize.define("Cursosplanesfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productoId: {
            type: DataType.INTEGER
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
    });

    return CursosplanesFC
};
