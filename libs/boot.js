const https = require("https");
const fs = require("fs");

/*
module.exports = app => {
    if(process.env.NODE_ENV !== "test"){
        const credentials = {
            key: fs.readFileSync("coriscobranzas.key", "utf8"),
            cert: fs.readFileSync("coriscobranzas.cert", "utf8")
        }
        app.db.sequelize.sync().done(() => {
            https.createServer(credentials, app)
                .listen(app.get("port"), () => {
                    //console.log(`goUBI_API API - Port ${app.get("port")}`);
                });
        });
    }
};
*/

module.exports = app => {
    if(process.env.NODE_ENV !== "test") {
        app.db.sequelize.sync().then(() => {

            const IP = '192.168.100.8';
            const PORT = process.env.PORT || app.get("port");

            app.listen(PORT, () => {
                console.log(`facilContabilidad API - Port  http://${IP}:${PORT}`)
            });
        });
    }
};
