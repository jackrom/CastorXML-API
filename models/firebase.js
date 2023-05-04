module.exports = (sequelize, DataType) => {
    const Firebasefc = sequelize.define("Firebasefc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userFirebase: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        uid: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        identificacion: {
            type: DataType.STRING(50),
            allowNull: true
        },
        nombre: {
            type: DataType.STRING(150),
            allowNull: true
        },
        email: {
            type: DataType.STRING(100),
            allowNull: true
        },
        verificado: {
            type: DataType.INTEGER
        },
        empresasp: {
            type: DataType.INTEGER
        },
        empresa: {
            type: DataType.STRING(100),
            allowNull: true
        },
        activo: {
            type: DataType.INTEGER(1)
        },
        asistentesp: {
            type: DataType.INTEGER(2)
        },
        periodosp: {
            type: DataType.INTEGER(2)
        },
        plan: {
            type: DataType.STRING(100),
            allowNull: true
        },
        parent: {
            type: DataType.STRING,
            allowNull: true
        },
        aniolic: {
            type: DataType.INTEGER(4)
        },
        meslic: {
            type: DataType.STRING(10),
            allowNull: true
        },
        dialic: {
            type: DataType.INTEGER(2)
        },
        comprobantescomprap: {
            type: DataType.INTEGER(10)
        },
        comprobantesventap: {
            type: DataType.INTEGER(10)
        },
        pertenece: {
            type: DataType.STRING,
            allowNull: true
        },
        modfacturaciondc: {
            type: DataType.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        modcostosdc: {
            type: DataType.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        modflujosefectivodc: {
            type: DataType.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        moddescargacomprobantesdc: {
            type: DataType.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        modnominadc: {
            type: DataType.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        modinventariodc: {
            type: DataType.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        modproducciondc: {
            type: DataType.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
    })

    Firebasefc.associate = function(models) {
        Firebasefc.hasMany(models.Documentos, {
            foreignKey: 'clienteId',
            as: 'alldocumentos'
        });
    }

    return Firebasefc
};