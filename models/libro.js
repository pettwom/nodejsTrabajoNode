'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Libro extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Autor, {
                as: 'autors',
                foreignKey: 'autor_id'
            })
        }
        static associate(models) {
            this.hasMany(models.Libro_Carrito, {
                as: 'libro_carritos',
                foreignKey: 'libro_id'
            })
        }
    };
    Libro.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        sequelize,
        modelName: 'Libro',
    });
    return Libro;
};