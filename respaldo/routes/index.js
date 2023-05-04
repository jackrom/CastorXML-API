module.exports = app => {
    app.enable('trust proxy');

    app.get("/", (req, res) => {
        res.json({status: "CastorXML API"});
    })

}
