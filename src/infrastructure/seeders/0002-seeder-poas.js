'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Poa Canton Catacora 2019',
    descripcion: 'Recursos de Coparticipación tributaria - Participación popular',
    gestion:'2019',
    monto:'31926'
  },
  {
    nombre: 'Poa Canton Pairumani Grande 2019',
    descripcion: 'Recursos propios municipales',
    gestion:'2019',
    monto:'800000'
  },
  {
    nombre: 'Poa Canton Parachi 2019',
    descripcion: 'Recursos regalia minera',
    gestion:'2019',
    monto:'105897'
  },
  {
    nombre: 'Poa Canton Tolacollo 2019',
    descripcion: 'Recursos propios de la comunidad fucionado con poa de la gestión 2018',
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
