module.exports = (sequelize, DataType) => {
    const EcpTxt = sequelize.define("EcpTxt", {
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
        ecp_99_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_99_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9901_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_9902_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990101_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990102_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990103_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990201_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990202_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990203_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990204_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990205_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990206_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990207_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990208_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990209_30702: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_31: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_301: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_302: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_303: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30401: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30402: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30501: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30502: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30503: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30504: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30601: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30602: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30603: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30604: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30605: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30606: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30607: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30701: {
            type: DataType.DECIMAL(10,2)
        },
        ecp_990210_30702: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return EcpTxt;
};
