module.exports = (sequelize, DataType) => {
    const OperacionesdiscontinuadasIfluc = sequelize.define("OperacionesdiscontinuadasIfluc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reporteId: {
            type: DataType.INTEGER
        },
        userId: {
            type: DataType.INTEGER
        },
        empresaId: {
            type: DataType.STRING
        },
        periodoId: {
            type: DataType.INTEGER
        },
        eri_700: {
            type: DataType.DECIMAL(10,2)
        },
        eri_701: {
            type: DataType.DECIMAL(10,2)
        },
        eri_702: {
            type: DataType.DECIMAL(10,2)
        },
        eri_703: {
            type: DataType.DECIMAL(10,2)
        },
        eri_704: {
            type: DataType.DECIMAL(10,2)
        },
        eri_705: {
            type: DataType.DECIMAL(10,2)
        },
        eri_706: {
            type: DataType.DECIMAL(10,2)
        },
        eri_707: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return OperacionesdiscontinuadasIfluc;
};
