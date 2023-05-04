const logger = require("./logger.js");

module.exports = {
    database: "xplbhxmr_main",
    username: "xplbhxmr_jackrom",
    password: "10092558@Sissi",
    params: {
        dialect: "mysql",
        host: '162.0.220.89',
        port: 3306,
        logging: (sql) => {
            logger.info(`[${new Date()}] ${sql}`);
        },
        define: {
            underscored: false,
            freezeTableName: false,
            charset: 'utf8',
            timestamps: true
        },
        pool: {
            max: 20,
            idle: 30000
        },
        operatorsAliases: 0
    },
    jwtSecret: "castorXML_Dev_v1",
    jwtSession: {session: false}
};



