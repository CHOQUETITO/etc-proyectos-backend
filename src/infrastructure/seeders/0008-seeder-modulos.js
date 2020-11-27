'use strict';

const { setTimestampsSeeder } = require('../lib/util');

let items = [
  // USUARIOS
  {
    label: 'Administración de Usuarios',
    ruta: 'usuarios',
    orden: 1,
    estado: 'ACTIVO',
    visible: true,
    icono: 'people'
  },
  {
    label: 'Gestion de Roles',
    ruta: 'roles',
    orden: 2,
    estado: 'ACTIVO',
    visible: false, 
    icono: 'transfer_within_a_station'
  },
  {
    label: 'Logs del sistema',
    ruta: 'logs',
    orden: 3,
    estado: 'ACTIVO',
    visible: false,
  },
  {
    label: 'Gestión de Proyectos',
    ruta: 'proyectos',
    orden: 4,
    estado: 'ACTIVO',
    visible: true,
    icono: 'assignment'
  },
  {
    label: 'Catálogo de Empresas',
    ruta: 'empresas',
    orden: 5,
    estado: 'ACTIVO',
    visible: true,
    icono: 'home_work'
  },
  {
    label: 'Gestión de Poas',
    ruta: 'poas',
    orden: 6,
    estado: 'ACTIVO',
    visible: true,
    icono: 'dns'
  },
  {
    label: 'Cronograma de Actividades',
    ruta: 'cronogramas',
    orden: 7,
    estado: 'ACTIVO',
    visible: true,
    icono: 'calendar_today'
  },
  {    
    label: 'Reportes',
    ruta: 'reportes',
    orden: 8,
    estado: 'ACTIVO',
    visible: false,
    icono: 'assignment'
  },
  {
    label: 'Dashboard',
    ruta: 'dashboard',
    orden: 9,
    estado: 'ACTIVO',
    visible: true,
    icono: 'ballot'
  },
];

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_modulos', items, {});
  },

  down (queryInterface, Sequelize) { }
};
