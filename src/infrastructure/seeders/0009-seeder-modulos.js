'use strict';

const { setTimestampsSeeder } = require('../lib/util');

let items = [
  // USUARIOS
  {
    label: 'Administración del Sistema',
    ruta: 'config',
    icono: 'settings',
    orden: 1,
    estado: 'ACTIVO',
    visible: true
  },
  /*{
    label: 'Entidades',
    ruta: 'entidades',
    orden: 2,
    estado: 'ACTIVO',
    visible: false,
    id_modulo: 1    
  },*/
  {
    label: 'Personas',
    ruta: 'personas',
    orden: 2,
    estado: 'ACTIVO',
    visible: true,
    id_modulo: 1
  },
  {
    label: 'Usuarios',
    ruta: 'usuarios',
    orden: 3,
    estado: 'ACTIVO',
    visible: true,
    id_modulo: 1
  },
  {
    label: 'Módulos y permisos',
    ruta: 'modulos',
    orden: 4,
    estado: 'ACTIVO',
    visible: true,
    id_modulo: 1
  },
  {
    label: 'Preferencias',
    ruta: 'parametros',
    orden: 5,
    estado: 'ACTIVO',
    visible: false,
    id_modulo: 1
  },
  {
    label: 'Permisos',
    ruta: 'permisos',
    orden: 6,
    estado: 'ACTIVO',
    visible: true,
    id_modulo: 1
  },
  {
    label: 'Roles',
    ruta: 'roles',
    orden: 7,
    estado: 'ACTIVO',
    visible: true,
    id_modulo: 1
  },
  {
    label: 'Logs del sistema',
    ruta: 'logs',
    orden: 8,
    estado: 'ACTIVO',
    visible: false,
    id_modulo: 1
  },
  {
    label: 'Servicios Iop',
    ruta: 'serviciosIop',
    orden: 9,
    estado: 'ACTIVO',
    visible: false,
    id_modulo: 1
  },
  {
    label: 'Gestión de Proyectos',
    ruta: 'proyectos',
    orden: 10,
    estado: 'ACTIVO',
    visible: true,
    icono: 'assignment'
  },
  {
    label: 'Catálogo de Empresas',
    ruta: 'empresas',
    orden: 11,
    estado: 'ACTIVO',
    visible: true,
    icono: 'home_work'
  },
  {
    label: 'Gestión de Poas',
    ruta: 'poas',
    orden: 12,
    estado: 'ACTIVO',
    visible: true,
    icono: 'dns'
  },
  {
    label: 'Cronograma de Actividades',
    ruta: 'cronogramas',
    orden: 13,
    estado: 'ACTIVO',
    visible: true,
    icono: 'calendar_today'
  },
  {
    label: 'Dashboard',
    ruta: 'dashboard',
    orden: 14,
    estado: 'ACTIVO',
    visible: true,
    icono: 'ballot'
  },
  {    
    label: 'Reportes',
    ruta: 'reportes',
    orden: 15,
    estado: 'ACTIVO',
    visible: true,
    icono: 'assignment'
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
