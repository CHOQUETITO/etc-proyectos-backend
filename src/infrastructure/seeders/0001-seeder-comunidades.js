'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Catacora',
    descripcion: 'Comunidad Fronteriza',
  },
  {
    nombre: 'Pairumani Grande',
    descripcion: 'Comunidad Fronteriza 2',
  }
];

// Agregando datos aleatorios para desarrollo

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comunidades', items, {});
  },

  down (queryInterface, Sequelize) { }
};
