'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombres: 'Absalon',
    primer_apellido: 'Conurana',
    segundo_apellido: 'Surco',
    nro_documento: '4023456',
    documento_expedido: 'LP',
    fecha_nacimiento: new Date(1982, 8, 1),
    genero: 'M',
    telefono: '7623456',
    //email: 'administrador@gmail.com',
    estado: 'ACTIVO'
  },
  {
    nombres: 'Alvaro',
    primer_apellido: 'Choque',
    segundo_apellido: 'Mamani',
    nro_documento: '10154321',
    documento_expedido: 'LP',
    fecha_nacimiento: new Date(1990, 1, 29),
    genero: 'M',
    telefono: '6123456',
    //email: 'russell@gmail.com',
    estado: 'ACTIVO'
  },
  {
    nombres: 'Evana',
    primer_apellido: 'Choque',
    segundo_apellido: 'Mamani',
    nro_documento: '11054321',
    documento_expedido: 'LP',
    fecha_nacimiento: new Date(1992, 11, 24),
    genero: 'F',
    telefono: '7203456',
    //email: 'sharon@gmail.com',
    estado: 'ACTIVO'
  }
];

// Agregando datos aleatorios para desarrollo
// if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  // let personas = Array(2).fill().map((_, i) => {
    // let item = {
      // nombres: casual.first_name,
      // primer_apellido: casual.last_name,
      // segundo_apellido: casual.last_name,
      // nro_documento: casual.integer(1, 20),
      // documento_expedido: casual.random_element(['LP', 'CB', 'TR']),
      // fecha_nacimiento: casual.date('YYYY-MM-DD'),
      // genero: casual.random_element(['F', 'F', 'OTRO']),
      // telefono: casual.phone,
      // email: casual.email,
      // estado: casual.random_element(['ACTIVO', 'INACTIVO'])
    // };

    // return item;
  // });

  // items = items.concat(personas);
// }

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_personas', items, {});
  },

  down (queryInterface, Sequelize) { }
};
