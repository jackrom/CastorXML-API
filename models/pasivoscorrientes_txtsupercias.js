module.exports = (sequelize, DataType) => {
    const PasivoscorrientesTxt = sequelize.define("PasivoscorrientesTxt", {
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
        esf_201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010301: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010302: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201030203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20104: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010401: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010402: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20105: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010501: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010502: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20106: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010601: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010602: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010603: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010604: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010605: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20107: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010701: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010702: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010703: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010704: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010705: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010706: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010707: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20108: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010801: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080101: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080102: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080103: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080104: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2010802: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080203: {
            type: DataType.DECIMAL(10,2)
        },
        esf_201080204: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20109: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20110: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011001: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011002: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20111: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20112: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011201: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011202: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20113: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011301: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011302: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011303: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011304: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011305: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011306: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011307: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011308: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011309: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011310: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011311: {
            type: DataType.DECIMAL(10,2)
        },
        esf_2011312: {
            type: DataType.DECIMAL(10,2)
        },
        esf_20114: {
            type: DataType.DECIMAL(10,2)
        },
    });

    return PasivoscorrientesTxt;
};
