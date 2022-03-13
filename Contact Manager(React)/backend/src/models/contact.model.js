const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    const Contacts = sequelize.define("contacts", {       
        user_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone_no: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['phone_no']
            },
        ]
    });

    return Contacts;
};