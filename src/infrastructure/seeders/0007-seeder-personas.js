'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombres: 'Administrador',
    primer_apellido: 'Ingeniería',
    segundo_apellido: 'Sistemas',
    nro_documento: '123456',
    documento_expedido: 'LP',
    fecha_nacimiento: new Date(1990, 0, 1),
    genero: 'M',
    telefono: '123456',
    email: 'administrador@gmail.com',
    estado: 'ACTIVO'
  },
  {
    nombres: 'KATHYUSKA',
    primer_apellido: 'PEREDO',
    segundo_apellido: 'DURAN',
    nro_documento: '154321',
    documento_expedido: 'LP',
    fecha_nacimiento: new Date(1990, 0, 1),
    genero: 'F',
    telefono: '123456',
    email: 'prueba@gmail.com',
    estado: 'ACTIVO'
  }
];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let personas = Array(9).fill().map((_, i) => {
    let item = {
      nombres: casual.first_name,
      primer_apellido: casual.last_name,
      segundo_apellido: casual.last_name,
      nro_documento: casual.integer(1, 20),
      documento_expedido: casual.random_element(['LP', 'CB', 'TR']),
      fecha_nacimiento: casual.date('YYYY-MM-DD'),
      genero: casual.random_element(['F', 'F', 'OTRO']),
      telefono: casual.phone,
      email: casual.email,
      estado: casual.random_element(['ACTIVO', 'INACTIVO'])
    };

    return item;
  });

  items = items.concat(personas);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_personas', items, {});
  },

  down (queryInterface, Sequelize) { }
};
