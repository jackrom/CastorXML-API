const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

let db = null;

module.exports = app => {
    if(!db){
        const config = app.libs.config;
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
        db = {
            sequelize,
            Sequelize,
            models: {}
        };
        // console.log(db)
        const dir = path.join(__dirname, "models");
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            // const model = sequelize.import(modelDir);
            const model = require(modelDir)(sequelize, Sequelize.DataTypes);
            db.models[model.name] = model;
        });
        Object.keys(db.models).forEach(key => {
            // console.log(db.models[key])
            if (db.models[key].hasOwnProperty('associate')){
                db.models[key].associate(db.models);
            }
            // db.models[key].associate(db.models);
            /*
            if (db.models[key].hasOwnProperty('associate')){
                db.models[key].associate(db.models);
            }
             */
        });

    }
    return db;
};
