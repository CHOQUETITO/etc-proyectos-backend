'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Poa 1',
    descripcion: 'Recursos propios municipales',
    gestion:'2019',
    monto:'80000'
  },
  {
    nombre: 'Poa 2',
    descripcion: 'Recursos de Coparticipación tributaria - Participación popular',
    gestion:'2019',
    monto:'31926'
  },
  {
    nombre: 'Poa 3',
    descripcion: 'Recursos regalia minera',
    gestion:'2019',
    monto:'105897'
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
