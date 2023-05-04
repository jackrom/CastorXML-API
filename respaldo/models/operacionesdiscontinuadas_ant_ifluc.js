module.exports = (sequelize, DataType) => {
    const OperacionesdiscontinuadasAntIfluc = sequelize.define("OperacionesdiscontinuadasAntIfluc", {
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
        eri_700_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_703_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_704_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_705_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_706_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_707_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return OperacionesdiscontinuadasAntIfluc;
};
