'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Cronograma Primera Fase',
    descripcion: 'Elaborado por C&C',
  },
  {
    nombre: 'Cronograma Segunda Fase',
    descripcion: 'Elaborado por M&M',
  },
  {
    nombre: 'Cronograma Tercera Fase',
    descripcion: 'Elaborado por J&J',
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
