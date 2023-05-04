module.exports = (sequelize, DataType) => {
    const ComentariosFC =  sequelize.define("Comentariosfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cursoId: {
            type: DataType.INTEGER,
            allowNull: true,
        },
        cursoName: {
            type: DataType.STRING,
            allowNull: true,
        },
        seccionId: {
            type: DataType.INTEGER
        },
        seccionName: {
            type: DataType.STRING
        },
        userId: {
            type: DataType.INTEGER
        },
        userName: {
            type: DataType.STRING
        },
        userEmail: {
            type: DataType.STRING
        },
        leccionName: {
            type: DataType.STRING
        },
        comentario: {
            type: DataType.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        comentarioId: {
            type: DataType.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: false
            },
            defaultValue: null
        },
        respuestas: {
            type: DataType.TEXT
        },
        ip: {
            type: DataType.STRING
        },
        aplicacion: {
            type:   DataType.ENUM,
            allowNull: true,
            values: ['CASTORX', 'FACTURAFULL', 'IFLUC', 'DIGITALCONTABLE', 'ACADEMY'],
            defaultValue: null
        }
    });

    return ComentariosFC;
};
