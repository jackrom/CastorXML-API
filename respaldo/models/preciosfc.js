module.exports = (sequelize, DataType) => {
    const Preciosfc = sequelize.define("Preciosfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ispacket: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        productoId: {
            type: DataType.INTEGER,
        },
        producto: {
            type: DataType.STRING(255),
        },
        opcion: {
            type: DataType.STRING(255),
        },
        tipo: {
            type: DataType.STRING(255),
        },
        tieneofertaanual: {
            type: DataType.INTEGER,
        },
        tieneofertamensual: {
            type: DataType.INTEGER,
        },
        preciomensual: {
            type: DataType.FLOAT(10,2),
        },
        precioanual: {
            type: DataType.FLOAT(10,2),
        },
        ofertamensual: {
            type: DataType.FLOAT(10,2),
        },
        ofertaanual: {
            type: DataType.FLOAT(10,2),
        },
        aceptapagosmensuales: {
            type:   DataType.ENUM,
            allowNull: true,
            values: ['si', 'no'],
            defaultValue: 'no'
        },
        cantidadpagos: {
            type: DataType.INTEGER,
        },
        periodopago: {
            type: DataType.INTEGER,
        },
        formaspagomensual: {
            type: DataType.TEXT,
            allowNull: true,
            defaultValue: '["TRANSFERENCIA","PAYPHONE","PAYPAL","WESTERN UNION"]'
        },
        formaspagoanual: {
            type: DataType.TEXT,
            allowNull: true,
            defaultValue: '["TRANSFERENCIA","PAYPHONE","PAYPAL","WESTERN UNION"]'
        },
        idPlanPaypal: {
            type: DataType.STRING,
            allowNull: true,
        },
        aceptapagos: {
            type:   DataType.ENUM,
            allowNull: true,
            values: ['anuales', 'mensuales', 'ambos'],
            defaultValue: 'anuales'
        },
        showfirst: {
            type: DataType.ENUM,
            allowNull: true,
            values: ['anual', 'mensual'],
            defaultValue: 'anual'
        },
        active: {
            type: DataType.INTEGER,
        },
        aceptaafiliados: {
            type: DataType.BOOLEAN,
            allowNull: true,
        },
        tipocomisionafiliados: {
            type: DataType.ENUM,
            allowNull: true,
            values: ['porcentaje', 'tarifa fija'],
            defaultValue: null
        },
        comisionafiliados: {
            type: DataType.FLOAT(10,2),
            allowNull: true,
        },
        showindashboardafiliados: {
            type: DataType.STRING,
            allowNull: true,
        },
        cursosopcion: {
            type: DataType.TEXT,
            allowNull: true,
            defaultValue: null
        },
        caracteristicasadicionalesprecio: {
            type: DataType.TEXT,
            allowNull: true,
        },
        incluyeevaluacion: {
            type: DataType.ENUM,
            allowNull: true,
            values: ['si', 'no'],
            defaultValue: 'si'
        }
    });

    return Preciosfc;
};
