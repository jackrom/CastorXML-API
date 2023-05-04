module.exports = (sequelize, DataType) => {
    const PasivosnocorrientesAntIfluc = sequelize.define("PasivosnocorrientesAntIfluc", {
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
        esf_202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202020203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202040204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020505_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202070201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_202070202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20208_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20209_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020901_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2020902_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20210_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return PasivosnocorrientesAntIfluc;
};
