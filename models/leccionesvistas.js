module.exports = (sequelize, DataType) => {
    const LeccionesvistasFC = sequelize.define("Leccionesvistasfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataType.INTEGER,
        },
        userEmail: {
            type: DataType.STRING
        },
        cursoId: {
            type: DataType.INTEGER,
        },
        curso: {
            type: DataType.TEXT
        },
        seccionId: {
            type: DataType.INTEGER,
        },
        seccion: {
            type: DataType.TEXT
        },
        leccion: {
            type: DataType.STRING()
        }
    });

    LeccionesvistasFC.associate = function (models) {
        LeccionesvistasFC.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'usuario'
        })
    }

    return LeccionesvistasFC;
};
