module.exports = (sequelize, DataType) => {
    const IngresosAntIfluc = sequelize.define("IngresosAntIfluc", {
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
        eri_401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40108_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40109_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010901_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010902_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090208_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4010903_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_401090304_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40110_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011001_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011002_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011003_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011004_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011005_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_4011006_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40112_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40113_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40114_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40115_ant: {
            type: DataType.DECIMAL(10,2)
        },
        eri_40116_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return IngresosAntIfluc;
};
