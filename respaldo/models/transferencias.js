module.exports = (sequelize, DataType) => {
    const Transferencias = sequelize.define("Transferencias", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCliente: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        numero: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        valor: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        cuenta: {
            type:   DataType.ENUM,
            values: ['Ahorros', 'Corriente'],
            defaultValue: 'Ahorros'
        },
        banco: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        ruc: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        ordenante: {
            type: DataType.STRING,
            allowNull: true
        },
        estado: {
            type:   DataType.ENUM,
            values: ['procesada', 'no procesada'],
            defaultValue: 'no procesada',
            allowNull: true
        }
    });
    Transferencias.associate = function(models) {
        Transferencias.belongsTo(models.Users, {
            foreignKey: 'idCliente',
            as: 'cliente'
        });
    };
    return Transferencias;
};
