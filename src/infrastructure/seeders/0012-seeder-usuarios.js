'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');
const { text } = require('../../common');
const contrasena = text.encrypt('123456');

// Datos de producción
let items = [
  {
    usuario: 'superadmin',
    contrasena,
    email: 'superadmin@gmail.com',
    estado: 'ACTIVO',
    cargo: 'Catacora comunidad',
    id_persona: 1,
    id_rol: 1,
  },
  {
    usuario: 'admin',
    contrasena,
    email: 'admin@gmail.com',
    estado: 'ACTIVO',
    cargo: 'Catacora comunidad x',
    id_persona: 2,
    id_rol: 2,
  },
  {
    usuario: 'funcionario',
    contrasena,
    email: 'funcionario@gmail.com',
    estado: 'ACTIVO',
    cargo: 'funcionario',
    id_persona: 3,
    id_rol: 3,
  }
];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let usuarios = Array(2).fill().map((_, i) => {
    let item = {
      usuario: casual.username,
      contrasena,
      email: casual.email,
      estado: casual.random_element(['ACTIVO', 'INACTIVO']),
      id_persona: casual.integer(3, 10),
      id_rol: casual.integer(2, 3),
    };

    return item;
  });

  items = items.concat(usuarios);
}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_usuarios', items, {});
  },

  down (queryInterface, Sequelize) { }
};
