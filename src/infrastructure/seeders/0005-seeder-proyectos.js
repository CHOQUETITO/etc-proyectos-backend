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
    // id_cronograma: 1,
    fecha_inicio: '2015-01-02',
    fecha_final: '2018-01-01'
  },
  {
    nombre: 'Construccion de coliseo Canton Pairumani Grande',
    descripcion: 'Apoyo Nacional a la Produccion y Empleo (hasta Bs. 200.000) - ANPE',
    id_comunidad: 2,
    id_poa: 2,
    id_empresa: 1,
    id_categoria: 1,
    // id_cronograma: 1,
    fecha_inicio: '2015-01-02',
    fecha_final: '2018-01-01'
  },
  {
    nombre: 'Construccion casa cultural marka pajchiri',
    descripcion: 'Apoyo Nacional a la Produccion y Empleo (de Bs. 200.001 adelante) - ANPP',
    id_comunidad: 5,
    id_poa: 3,
    id_empresa: 2,
    id_categoria: 2,
    // id_cronograma: 2,
    fecha_inicio: '2019-09-09',
    fecha_final: '2020-01-01'
  },
  {
    nombre: 'Construccion sede cultural casa de gobierno marka catacora',
    descripcion: 'Apoyo Nacional a la Produccion y Empleo (hasta Bs. 200.000) - ANPE',
    id_comunidad: 1,
    id_poa: 1,
    id_empresa: 3,
    id_categoria: 2,
    // id_cronograma: 3,
    fecha_inicio: '2020-01-10',
    fecha_final: '2021-06-20'
  },
  {
    nombre: 'Construccion cancha y muro perimetral en el tinglado u.e pairumani grande',
    descripcion: 'Apoyo Nacional a la Produccion y Empleo (de Bs. 200.001 adelante) - ANPP',
    id_comunidad: 2,
    id_poa: 3,
    id_empresa: 5,
    id_categoria: 3,
    // id_cronograma: 1,
    fecha_inicio: '2020-06-05',
    fecha_final: '2021-06-05'
  },
  {
    nombre: 'Construccion muro perimetral c.s. parachi',
    descripcion: 'Apoyo Nacional a la Produccion y Empleo (hasta Bs. 200.000) - ANPE',
    id_comunidad: 4,
    id_poa: 3,
    id_empresa: 4,
    id_categoria: 3,
    // id_cronograma: 1,
    fecha_inicio: '2019-02-20',
    fecha_final: '2020-06-20'
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
