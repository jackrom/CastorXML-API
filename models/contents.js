module.exports = (sequelize, DataType) => {
    const Contents = sequelize.define("Contents", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING(250)
        },
        md_content: {
            type: DataType.TEXT
        },
        code: {
            type: DataType.STRING(100)
        }
    });

    return Contents;
};
