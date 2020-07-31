'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Cronograma Primera Fase',
    archivoCronograma: 'jpg',
  },
  {
    nombre: 'Cronograma Segunda Fase',
    archivoCronograma: 'bmp',
  },
  {
    nombre: 'Cronograma Tercera Fase',
    archivoCronograma: 'jpg',
  }
];

// Agregando datos aleatorios para desarrollo

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cronogramas', items, {});
  },

  down (queryInterface, Sequelize) { }
};
