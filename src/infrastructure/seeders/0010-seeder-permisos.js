'use strict';

const { setTimestampsSeeder } = require('../lib/util');

let items = [];

// Este bloque se debe reemplazar cuando se tengan los permisos definidos para cada módulo por rol
const iniModules = 1;
const nroModules = 15;
const rolSuperAdmin = 1;
const rolAdmin = 2;
const rolFuncionario = 3;
const modulosSuperAdmin = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const modulosAdmin = [1, 2, 3, 9];
const modulosFuncionario = [4 ,5, 6, 7, 8, 9];

for (let i = 0; i < modulosSuperAdmin.length; i++ ) {
  // para admin
  items.push({
    create: true,
    read: true,
    update: true,
    delete: true,
    firma: false,
    csv: false,
    id_modulo: modulosSuperAdmin[i],
    id_rol: rolSuperAdmin
  });

}

for (let i = 0; i < modulosAdmin.length; i++ ) {
  // para admin
  items.push({
    create: true,
    read: true,
    update: true,
    delete: true,
    firma: false,
    csv: false,
    id_modulo: modulosAdmin[i],
    id_rol: rolAdmin
  });

}


for (let i = 0; i < modulosFuncionario.length; i++ ) {
  // para funcioanrio
  items.push({
    create: true,
    read: true,
    update: true,
    delete: true,
    firma: false,
    csv: false,
    id_modulo: modulosFuncionario[i],
    id_rol: rolFuncionario
  });

}

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_permisos', items, {});
  },

  down (queryInterface, Sequelize) { }
};
