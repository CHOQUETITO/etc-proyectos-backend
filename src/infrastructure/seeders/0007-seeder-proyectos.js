'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'Construccion de infraestructura productiva para ganado camelido',
    descripcion: 'Apoyo Nacional a la Produccion y Empleo (hasta Bs. 200.000) - ANPE',
    id_comunidad: 1,
    id_poa: 1,
    id_empresa: 1,
    id_categoria: 1,
    id_cronograma: 1,
    fecha_inicio: '2015-01-02',
    fecha_final: '2018-01-01'
  },
  {
    nombre: 'Construccion casa cultural marka pajchiri',
    descripcion: 'Apoyo Nacional a la Produccion y Empleo (de Bs. 200.001 adelante) - ANPP',
    id_comunidad: 2,
    id_poa: 2,
    id_empresa: 2,
    id_categoria: 2,
    id_cronograma: 2,
    fecha_inicio: '2019-09-09',
    fecha_final: '2020-01-01'
  }
];

// Agregando datos aleatorios para desarrollo

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('proyectos', items, {});
  },

  down (queryInterface, Sequelize) { }
};
