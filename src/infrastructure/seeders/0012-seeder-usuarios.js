'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');
const { text } = require('../../common');
const contrasena = text.encrypt('123456');

// Datos de producción
let items = [
  {
    usuario: 'admin',
    contrasena,
    email: 'admin@catacora.gob.bo',
    estado: 'ACTIVO',
    cargo: 'Catacora comunidad x',
    id_persona: 1,
    id_rol: 1,
    direccion:'saavedra'
  },
  {
    usuario: 'ciudadano',
    contrasena,
    email: 'catacora@catacora.gob.bo',
    estado: 'ACTIVO',
    cargo: '',
    id_persona: 2,
    id_rol: 3,
    direccion:'saavedra'
  }
];

// Agregando datos aleatorios para desarrollo
if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV !== 'production') {
  let usuarios = Array(19).fill().map((_, i) => {
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
