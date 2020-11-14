'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Educación',
    descripcion: 'Proyectos de construcciones de aulas en diferentes comunidades',
  },
  {
    nombre: 'Salud',
    descripcion: 'Proyectos de construcciones de establecimientos de salud en diferentes comunidades',
  },
  {
    nombre: 'Vivienda y Urbanización',
    descripcion: 'Proyectos de construcciones habitacionales y de urbanización en diferentes comunidades',
  },
  {
    nombre: 'Productivos',
    descripcion: 'Proyectos productivos para diferentes comunidades',
  },
  {
    nombre: 'Sociales-Comunitarios',
    descripcion: 'Proyectos sociales comunitarios para diferentes comunidades',
  },
];

// Agregando datos aleatorios para desarrollo

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categorias', items, {});
  },

  down (queryInterface, Sequelize) { }
};
