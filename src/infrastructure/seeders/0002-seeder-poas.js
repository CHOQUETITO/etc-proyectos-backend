'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Poa 1',
    descripcion: 'Mi agua 1',
    gestion:'2018',
    monto:'5435345'
  },
  {
    nombre: 'Poa2',
    descripcion: 'Mi Agua 2',
    gestion:'2015',
    monto:'543534445'
  }
];

// Agregando datos aleatorios para desarrollo

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('poas', items, {});
  },

  down (queryInterface, Sequelize) { }
};
