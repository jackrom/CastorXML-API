module.exports = (sequelize, DataType) => {
    const Documentos = sequelize.define("Documentos", {
        idDocumento: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        clienteId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        empresaIdCastor: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        Tipo: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        AditionalList: {
            type: DataType.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        ClaveAcceso: {
            type: DataType.STRING(250),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        ContribuyenteEspecial: {
            type: DataType.STRING,
            allowNull: true
        },
        Descripcion: {
            type: DataType.TEXT,
            allowNull: true
        },
        DireccionComprador: {
            type: DataType.STRING,
            allowNull: true
        },
        CorreoComprador: {
            type: DataType.STRING,
            allowNull: true
        },
        TelefonoComprador: {
            type: DataType.STRING,
            allowNull: true
        },
        DireccionEstablecimiento: {
            type: DataType.STRING,
            allowNull: true
        },
        DireccionMatriz: {
            type: DataType.STRING,
            allowNull: true
        },
        DocModificado: {
            type: DataType.STRING,
            allowNull: true
        },
        Empresa: {
            type: DataType.STRING,
            allowNull: true
        },
        FechaAutorizacion: {
            type: DataType.STRING,
            allowNull: true
        },
        GuiaRemision: {
            type: DataType.STRING,
            allowNull: true
        },
        ICE: {
            type: DataType.STRING,
            allowNull: true
        },
        IRBPNR: {
            type:   DataType.STRING,
            allowNull: true
        },
        IdentificacionCliente: {
            type: DataType.STRING,
            allowNull: true
        },
        ImpIce: {
            type: DataType.STRING,
            allowNull: true
        },
        ImpIva0: {
            type: DataType.STRING,
            allowNull: true
        },
        ImpIva12: {
            type: DataType.STRING,
            allowNull: true
        },
        ImpIva14: {
            type: DataType.STRING(255)
        },
        ImpNoOnjDeIva: {
            type: DataType.STRING,
            allowNull: true
        },
        ImporteTotal: {
            type: DataType.STRING,
            allowNull: true
        },
        Numero: {
            type: DataType.STRING,
            allowNull: true,
            unique: true
        },
        NumeroAutorizacion: {
            type: DataType.STRING,
            allowNull: true
        },
        ObligadoContabilidad: {
            type: DataType.STRING,
            allowNull: true
        },
        Origen: {
            type: DataType.STRING,
            allowNull: true
        },
        PeriodoFiscal: {
            type: DataType.STRING,
            allowNull: true
        },
        ProductList: {
            type: DataType.TEXT,
            allowNull: true
        },
        Propina: {
            type: DataType.STRING,
            allowNull: true
        },
        RazonSocialCliente: {
            type: DataType.STRING,
            allowNull: true
        },
        RazonSocialEmisor: {
            type: DataType.STRING,
            allowNull: true
        },
        RetentionItems: {
            type: DataType.TEXT,
            allowNull: true
        },
        RucEmisor: {
            type: DataType.STRING,
            allowNull: true
        },
        SubTotalExentoDeIva: {
            type: DataType.STRING,
            allowNull: true
        },
        SubTotalNoObjetoDeIva: {
            type: DataType.STRING,
            allowNull: true
        },
        SubTotalIRBPNR: {
            type: DataType.STRING,
            allowNull: true
        },
        SubTotalIce: {
            type: DataType.STRING,
            allowNull: true
        },
        SubTotalIva0: {
            type: DataType.STRING,
            allowNull: true
        },
        SubTotalIva12: {
            type: DataType.STRING,
            allowNull: true
        },
        SubTotalIva14: {
            type: DataType.STRING(255)
        },
        TipoDocList: {
            type: DataType.STRING,
            allowNull: true
        },
        TipoOrigenList: {
            type: DataType.STRING,
            allowNull: true
        },
        TotalDescuento: {
            type: DataType.STRING,
            allowNull: true
        },
        TotalSinImp: {
            type: DataType.STRING,
            allowNull: true
        },
        fechaEmision: {
            type: DataType.STRING,
            allowNull: true
        },
        id: {
            type: DataType.INTEGER,
            allowNull: true
        },
        id_empresa: {
            type: DataType.STRING,
            allowNull: true
        },
        valorRetIva: {
            type: DataType.STRING,
            allowNull: true
        },
        valorRetRenta: {
            type: DataType.STRING,
            allowNull: true
        },
        origenDocumento: {
            type:   DataType.ENUM,
            allowNull: false,
            values: ['emitidas', 'recibidas'],
            defaultValue: 'recibidas'
        },
        docXML: {
            type: DataType.TEXT,
            allowNull: true
        },
        impNotaDebito: {
            type: DataType.TEXT,
            allowNull: true
        },
        destinatarios: {
            type: DataType.TEXT,
            allowNull: true
        },
        codDocReembolso: {
            type: DataType.STRING,
            allowNull: true
        },
        fechaEmisionDocSustento: {
            type: DataType.STRING,
            allowNull: true
        },
        fechaFinTransporte: {
            type: DataType.STRING,
            allowNull: true
        },
        fechaIniTransporte: {
            type: DataType.STRING,
            allowNull: true
        },
        impivaExento: {
            type: DataType.STRING,
            allowNull: true
        },
        listaDetalleReembolso: {
            type: DataType.TEXT,
            allowNull: true
        },
        listamaquinaFiscal: {
            type: DataType.TEXT,
            allowNull: true
        },
        procesado: {
            type: DataType.STRING,
            allowNull: true
        },
        motivosND: {
            type: DataType.TEXT,
            allowNull: true
        },
        placa: {
            type: DataType.STRING,
            allowNull: true
        },
        totalBaseImponibleReembolso: {
            type: DataType.STRING,
            allowNull: true
        },
        totalComprobanteReembolso: {
            type: DataType.STRING,
            allowNull: true
        },
        totalImpuestoReembolso: {
            type: DataType.STRING,
            allowNull: true
        },
        baseImponibleReembolso: {
            type: DataType.STRING,
            allowNull: true
        },
        codDocModificado: {
            type: DataType.STRING,
            allowNull: true
        },
        tag: {
            type: DataType.INTEGER,
            allowNull: true,
            defaultValue: 5
        },
        Transportista: {
            type: DataType.TEXT,
        },
        FormaPago: {
            type: DataType.TEXT,
        },
        Historial: {
            type: DataType.TEXT,
        },
        Estado: {
            type: DataType.STRING(),
        }
    });

    Documentos.associate = function(models) {
        Documentos.belongsTo(models.Empresas, {
            foreignKey: 'empresaIdCastor',
            as: 'detallesempresa'
        });
        Documentos.belongsTo(models.Users, {
            foreignKey: 'clienteId',
            as: 'alldocumentos'
        });
        Documentos.belongsTo(models.Tags, {
            foreignKey: 'tag',
            as: 'tagsdocument'
        });
    };
    return Documentos;
};
