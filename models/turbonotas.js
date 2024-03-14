module.exports = (sequelize, DataType) => {
    const TurboNotasfc = sequelize.define("TurboNotasfc", {
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
            type: DataType.INTEGER,
            allowNull: true
        },
        reporteId: {
            type: DataType.INTEGER,
            allowNull: true
        },
        nombre: {
            type: DataType.STRING,
            allowNull: true
        },
        ruc: {
            type: DataType.STRING,
            allowNull: true
        },
        pais: {
            type: DataType.STRING,
            allowNull: true
        },
        domicilio: {
            type: DataType.STRING,
            allowNull: true
        },
        formaLegal: {
            type: DataType.STRING,
            allowNull: true
        },
        representanteLegal: {
            type: DataType.STRING,
            allowNull: true
        },
        descripcionEmpresa: {
            type: DataType.TEXT,
            allowNull: true
        },
        descripcionRepresentanteLegal: {
            type: DataType.TEXT,
            allowNull: true
        },
        estructuraOrganizacional: {
            type: DataType.TEXT,
            allowNull: true
        },
        fechaJunta: {
            type: DataType.DATE,
            allowNull: true
        },
        tasaimpuesto: {
            type: DataType.STRING,
            allowNull: true
        },
        lineanegocio: {
            type: DataType.TEXT,
            allowNull: true
        },
        accionistas: {
            type: DataType.TEXT,
            allowNull: true
        },
        periodoactual: {
            type: DataType.INTEGER,
            allowNull: true
        },
        periodoanterior: {
            type: DataType.INTEGER,
            allowNull: true
        },
        md_policies_accounting: {
            type: DataType.TEXT,
            allowNull: true
        },
        md_gestion_riesgos: {
            type: DataType.TEXT,
            allowNull: true
        },
        md_estimaciones_juicios_administracion: {
            type: DataType.TEXT,
            allowNull: true
        },
        md_sanciones: {
            type: DataType.TEXT,
            allowNull: true
        },
    })

    return TurboNotasfc
};
