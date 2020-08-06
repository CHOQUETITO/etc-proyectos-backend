'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Catacora',
    descripcion: 'La comunidad de Catacora fue creado el 29 de abril de 1986. Su topografía está caracterizada por una zona montañosa y otra altiplánica. El clima es frio y seco',
  },
  {
    nombre: 'Pairumani Grande',
    descripcion: 'Comunidad Fronteriza 2',
  },
  {
    nombre: 'Tolacollo',
    descripcion: 'Comunidad Fronteriza 3',
  },
  {
    nombre: 'Parachi',
    descripcion: 'Comunidad Fronteriza 4',
  },
  {
    nombre: 'Pajchiri',
    descripcion: 'Comunidad Fronteriza 5',
  },
  {
    nombre: 'Llalagua',
    descripcion: 'Comunidad Fronteriza 6',
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
