'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Libros',
            'autor_id', {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Autors'
                    },
                    key: 'id',
                    allownull: false,
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            }
        );
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Libros',
            'autor_id' // este es el key que se quiere borrar
        );
    }
};