'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'EMPRESA CONSTRUCTORA Y CONSULTORA',
    descripcion: 'Empresa que realiza actividades profesionales cientificas y técnicas, construcción, medio ambiente y demas',
    sigla: 'ECC',
    email: 'ecc.gob.bo',
    telefonos: '2234857',
    direccion: 'Psje Peatonal Río Orthon # 216, Barrio 1ro de Diciembre RIBERALTA - BENI',
    web: 'ecc.gob.bo',
    nit: '5151694010',
    estado: 'ACTIVO'
  },
  {
    nombre: 'ROYAL ARROW LIGHTING BOLIVIA S.R.L.',
    descripcion: 'Venta e instalación de material de iluminación led de ultima generación, alumbrado industrial público',
    sigla: 'RALB.SRL',
    email: 'royalalb.gob.bo',
    telefonos: '223434546',
    direccion: 'La Paz, calle loayza nº233 edif. Mcal de ayacucho piso7 of 714',
    web: 'www.royalarrowbolivialed.com',
    nit: '233038028',
    estado: 'ACTIVO'
  }
];

// Agregando datos aleatorios para desarrollo

// Asignando datos de log y timestamps a los datos
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('empresas', items, {});
  },

  down (queryInterface, Sequelize) { }
};
