'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            markdown.belongsTo(models.user, {foreignKey: 'doctorId'})
        }
    };
    markdown.init({
        contentHTML: DataTypes.TEXT('long'),
        contentMD: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        doctorId: DataTypes.INTEGER,
        specialityId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'markdown',
    });
    return markdown;
};