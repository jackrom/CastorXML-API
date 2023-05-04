module.exports = (sequelize, DataType) => {
    const EcpAntTxt = sequelize.define("EcpAntTxt", {
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
        ecp_99_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_31_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_301_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_302_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_303_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30401_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30402_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30501_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30502_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30503_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30504_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30601_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30602_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30603_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30604_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30605_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30606_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30607_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30701_ant: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30702_ant: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return EcpAntTxt;
};
