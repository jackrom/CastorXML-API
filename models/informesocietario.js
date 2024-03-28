module.exports = (sequelize, DataType) => {
    const InformeSocietariofc = sequelize.define("InformeSocietariofc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: true
        },
        periodoId: {
            type: DataType.INTEGER,
            allowNull: true
        },
        empresaId: {
            type: DataType.STRING,
            allowNull: true
        },
        reporteId: {
            type: DataType.INTEGER,
            allowNull: true
        },
        lugaryfechaaprobaciongerente: {
            type: DataType.STRING,
            allowNull: true
        },
        lugaryfechaaprobacioncomisario: {
            type: DataType.STRING,
            allowNull: true
        },
        lugaryfechaaprobacionacta: {
            type: DataType.STRING,
            allowNull: true
        },
        horaaprobacionacta: {
            type: DataType.STRING,
            allowNull: true
        },
        nombreapellidoscomisario: {
            type: DataType.STRING,
            allowNull: true
        },
        nombreapellidosgerente: {
            type: DataType.STRING,
            allowNull: true
        },
        nombreapellidospresidente: {
            type: DataType.STRING,
            allowNull: true
        },
        nombreapellidossecretario: {
            type: DataType.STRING,
            allowNull: true
        },
        direccion: {
            type: DataType.STRING,
            allowNull: true
        },
        md_informe_gerente: {
            type: DataType.TEXT,
            allowNull: true
        },
        md_informe_comisario: {
            type: DataType.TEXT,
            allowNull: true
        },
        md_acta_junta_general_bloque1: {
            type: DataType.TEXT,
            allowNull: true
        },
        md_acta_junta_general_bloque2: {
            type: DataType.TEXT,
            allowNull: true
        },
        md_acta_junta_general_bloque3: {
            type: DataType.TEXT,
            allowNull: true
        },
    })

    return InformeSocietariofc
};
