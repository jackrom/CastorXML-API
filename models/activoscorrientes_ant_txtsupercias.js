module.exports = (sequelize, DataType) => {
    const ActivoscorrientesAntTxt = sequelize.define("ActivoscorrientesAntTxt", {
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
        esf_1_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010208_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010209_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010210_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010211_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010212_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010213_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010214_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010215_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010216_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010217_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010218_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010219_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010220_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010221_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010222_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010223_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102010304_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020208_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020209_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020210_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020211_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020212_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020213_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020214_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020215_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020216_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020217_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020218_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020219_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020220_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020221_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020222_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102020223_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030208_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030209_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030210_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030211_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030212_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030213_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030214_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030215_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030216_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030217_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030218_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030219_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030220_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030221_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030222_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102030223_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020403_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010205_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050101_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050102_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050201_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050202_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050203_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050204_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050208_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050209_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050210_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050211_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050212_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050213_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050214_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050215_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050216_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050217_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050218_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050219_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050220_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10102050221_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010206_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_101020604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010207_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10103_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010304_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010305_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010306_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010307_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010308_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010309_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010310_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010311_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010312_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010313_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10104_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010403_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010404_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10105_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_1010503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10106_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10107_ant: {
            type: DataType.DECIMAL(10,2)
        },
        esf_10108_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return ActivoscorrientesAntTxt;
};
