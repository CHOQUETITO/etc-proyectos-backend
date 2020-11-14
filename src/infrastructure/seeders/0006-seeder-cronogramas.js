'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    id_proyecto: '1',
    nombre: 'Primera Fase',
    actividad: 'Elaboración de bases para la ejecución de la obra de infraestructura',
    fec_ini_cronograma: '2020-01-01',
    fec_fin_cronograma: '2020-01-10',
    observacion: ''
  },
  {
    id_proyecto: '1',
    nombre: 'Primera Fase',
    actividad: 'Obras provisionales',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '1',
    nombre: 'Segunda Fase',
    actividad: 'Inicio de ejución de la obra',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'Primera Fase',
    actividad: 'Señalizacion y seguridad vial',
    fec_ini_cronograma: '2020-01-20',
    fec_fin_cronograma: '2020-01-30',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'Segunda Fase',
    actividad: 'Visita y levantamiento tipografico',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
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
