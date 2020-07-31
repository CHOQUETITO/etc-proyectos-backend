'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Econotec',
    descripcion: 'Desarrollo de Software',
    sigla: 'Econotec',
    email: 'econotec.gob.bo',
    telefonos: '2234857',
    direccion: 'Plaza Alonzo de Mendoza N15804',
    web: 'econotec.gob.bo',
    estado: 'ACTIVO',
    nit: '1233243'
  },
  {
    nombre: 'Tesicon',
    descripcion: 'Construcción de Caminos',
    sigla: 'Tes',
    email: 'tesicon.gob.bo',
    telefonos: '223434546',
    direccion: 'Plaza el Minero Nº 234',
    web: 'agetic.gob.bo',
    estado: 'ACTIVO',
    nit: '123324345'
  }
];

// Agregando datos aleatorios para desarrollo

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('empresas', items, {});
  },

  down (queryInterface, Sequelize) { }
};
