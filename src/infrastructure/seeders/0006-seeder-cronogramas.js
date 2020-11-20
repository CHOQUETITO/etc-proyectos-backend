'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    id_proyecto: '1',
    nombre: 'Primera Fase',
    actividad: 'Señalizacion y seguridad vial',
    fec_ini_cronograma: '2020-01-20',
    fec_fin_cronograma: '2020-01-30',
    observacion: ''
  },
  {
    id_proyecto: '1',
    nombre: 'Segunda Fase',
    actividad: 'Visita y levantamiento tipografico',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '1',
    nombre: 'Segunda Fase',
    actividad: 'Elaboración de bases para la ejecución de la obra de infraestructura',
    fec_ini_cronograma: '2020-01-01',
    fec_fin_cronograma: '2020-01-10',
    observacion: ''
  },
  {
    id_proyecto: '1',
    nombre: 'Segunda Fase',
    actividad: 'Obras provisionales',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 1: Obras preliminares',
    actividad: 'Instalación de faenas',
    fec_ini_cronograma: '2019-01-01',
    fec_fin_cronograma: '2019-01-10',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 1: Obras preliminares',
    actividad: 'Trazado del proyecto',
    fec_ini_cronograma: '2019-01-10',
    fec_fin_cronograma: '2019-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 1: Obras preliminares',
    actividad: 'Letrero de obras',
    fec_ini_cronograma: '2019-01-20',
    fec_fin_cronograma: '2019-01-22',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 1: Obras preliminares',
    actividad: 'Limpieza general de la obra',
    fec_ini_cronograma: '2020-01-22',
    fec_fin_cronograma: '2020-01-25',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 2: Ingenieria Estructural',
    actividad: 'Excavación (0-2 M) S. semiduro',
    fec_ini_cronograma: '2020-01-30',
    fec_fin_cronograma: '2020-02-10',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 2: Ingenieria Estructural',
    actividad: 'Relleno y compactado con material comun',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 2: Ingenieria Estructural',
    actividad: 'Base de hormigon pobre',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 2: Ingenieria Estructural',
    actividad: 'Hormigon armado de zapatas',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 2: Ingenieria Estructural',
    actividad: 'Hormigon Armado de columnas',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 2: Ingenieria Estructural',
    actividad: 'Hormigon Armado de vigas',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 3: Arquitectura',
    actividad: 'Impermeabilizacion de sobrecimientos',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 3: Arquitectura',
    actividad: 'Muro de ladrillo visto 18H (2CARA)',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 3: Arquitectura',
    actividad: 'Dintel de ladrillo de 6 huecos armando',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 3: Arquitectura',
    actividad: 'Bota aguas de H "A" (25X25CM)',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 3: Arquitectura',
    actividad: 'Contrapiso de piedra cemento H 1:2:4',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 3: Arquitectura',
    actividad: 'Enlucido de cemento E=1 CM',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 4: Ingenieria Sanitaria',
    actividad: 'Replanteo y trazado de eje',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 4: Ingenieria Sanitaria',
    actividad: 'Excavación de 0 A 1 M S/agotamiento terrenal',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 4: Ingenieria Sanitaria',
    actividad: 'Material de apoyo para tuberias',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 4: Ingenieria Sanitaria',
    actividad: 'Provisión y tendido de tuberias de desague PVC',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 4: Ingeniería Eléctrica',
    actividad: 'Picado muro de ladrillo para colocado de tuberias',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 4: Ingeniería Eléctrica',
    actividad: 'Ducto conduit antiflama 3/4',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 4: Ingeniería Eléctrica',
    actividad: 'Luminaria Fluorecente 2X20 W',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 5: Items adicionales',
    actividad: 'Viga de arrioste de HºAº',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 5: Items adicionales',
    actividad: 'Acera perimetral + cuneta de HºCº',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '2',
    nombre: 'FASE 5: Items adicionales',
    actividad: 'Poste metalico de voleibol + encamisado',
    fec_ini_cronograma: '2020-01-10',
    fec_fin_cronograma: '2020-01-20',
    observacion: ''
  },
  {
    id_proyecto: '3',
    nombre: 'Primera Fase',
    actividad: 'Inicio de ejución de la obra',
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
