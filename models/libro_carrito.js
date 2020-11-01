'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Libro_Carrito extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Carrito, {
                as: 'carritos',
                foreignKey: 'cart_id'
            });
            this.belongsTo(models.Libro, {
                as: 'libros',
                foreignKey: 'libro_id'
            });
        }
    };
    Libro_Carrito.init({
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Libro_Carrito',
    });
    return Libro_Carrito;
};