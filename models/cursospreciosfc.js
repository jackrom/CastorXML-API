module.exports = (sequelize, DataType) => {
    const Cursospreciosfc = sequelize.define("Cursospreciosfc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productoId: {
            type: DataType.INTEGER,
        },
        opcion: {
            type: DataType.STRING(255),
        },
        tipo: {
            type: DataType.STRING(255),
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
        tieneofertaanual: {
            type: DataType.INTEGER,
        },
        precioanual: {
            type: DataType.FLOAT(10,2),
        },
        ofertaanual: {
            type: DataType.FLOAT(10,2),
        },
        formaspagoanual: {
            type: DataType.TEXT,
            allowNull: true,
            defaultValue: '["TRANSFERENCIA","PAYPHONE","PAYPAL","WESTERN UNION"]'
        },
        tieneofertamensual: {
            type: DataType.INTEGER,
        },
        preciomensual: {
            type: DataType.FLOAT(10,2),
        },
        ofertamensual: {
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
        idPlanPaypal: {
            type: DataType.STRING,
            allowNull: true,
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
        },
        active: {
            type: DataType.INTEGER,
        }
    });

    return Cursospreciosfc;
};
