const bcrypt = require("bcrypt")

module.exports = (sequelize, DataType) => {
    const Users_ifluc = sequelize.define("Users_ifluc", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataType.STRING,
            allowNull: true
        },
        last_name: {
            type: DataType.STRING,
            allowNull: true
        },
        login: {
            type: DataType.STRING,
            allowNull: true,
            unique: true
        },
        email: {
            type: DataType.STRING,
            allowNull: true,
            unique: true
        },
        password: {
            type: DataType.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        activation_code: {
            type: DataType.STRING(255)
        },
        persist_code: {
            type: DataType.STRING(255)
        },
        reset_password_code: {
            type: DataType.STRING(255)
        },
        permissions: {
            type: DataType.TEXT,
        },
        is_activated: {
            type: DataType.INTEGER,
            allowNull: true
        },
        role_id: {
            type: DataType.INTEGER
        },
        activated_at: {
            type: DataType.DATE
        },
        last_login: {
            type: DataType.DATE
        },
        is_superuser: {
            type: DataType.INTEGER,
            defaultValue: 0
        },
        limit_enterprises: {
            type: DataType.INTEGER,
            defaultValue: 0
        },
        limit_periods: {
            type: DataType.INTEGER,
            defaultValue: 0
        },
        limit_assistants: {
            type: DataType.INTEGER,
            defaultValue: 1
        },
        membership: {
            type: DataType.DATE
        },
        unlimited_enterprises: {
            type: DataType.INTEGER,
            defaultValue: 0
        },
        unlimited_periods: {
            type: DataType.INTEGER,
            defaultValue: 0
        },
        newversionupdated: {
            type: DataType.INTEGER,
            defaultValue: 0
        }
    },/* {
        hooks: {
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync()
                user.password = bcrypt.hashSync(user.password, salt)
                console.log('password user from user model')
                console.log(user.password)
                bcrypt.hash(user.password, salt).then(function(hash) {
                    // Store hash in your password DB.
                    console.log(hash)
                    user.password = hash
                });
            }
        }
    } */
    )
    /*
    Users_ifluc.isPassword = function(encodedPassword, password) {
        console.log(bcrypt.compareSync(password, encodedPassword))
        return bcrypt.compareSync(password, encodedPassword)
    }
     */
    return Users_ifluc
};
