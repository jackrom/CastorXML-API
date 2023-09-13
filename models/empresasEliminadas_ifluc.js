module.exports = (sequelize, DataType) => {
    return sequelize.define("EmpresasEliminadasIfluc", {
        id: {
            type: DataType.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        ruc: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        nombre: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        ciudad: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        provincia: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false,
        },
        fechaCreacion: {
            type: DataType.DATE,
        }
    });
};
