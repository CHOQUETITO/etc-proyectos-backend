'use strict';

const casual = require('casual');
const { setTimestampsSeeder } = require('../lib/util');

// Datos de producción
let items = [
  {
    nombre: 'FABER INGENIERÍA y CONSTRUCCIÓN',
    descripcion: 'Construcciones de obra gruesa y fina, edificaciones, replanteo en obra gruesa y obra fina.',
    sigla: 'FABER',
    email: 'faberconstrucciones.gob.bo',
    telefonos: '77768205',
    direccion: 'La Paz, Av. Mecapaca 6731, Obrajes',
    web: 'www.faberconstrucciones.com',
    nit: '2147485643',
    estado: 'ACTIVO'
  },
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
    telefonos: '3434546',
    direccion: 'La Paz, calle loayza nº233 edif. Mcal de ayacucho piso7 of 714',
    web: 'www.royalarrowbolivialed.com',
    nit: '233038028',
    estado: 'ACTIVO'
  },
  {
    nombre: 'CONSTRUCCION Y MONTAJE DE ESTRUCTURAS METALICAS SMEM S.R.L.',
    descripcion: 'SMEM S.R.L., realiza todo tipo construcción en estructuras metalicas',
    sigla: 'SMEM S.R.L.',
    email: 'smemsrl.gob.bo',
    telefonos: '3598252',
    direccion: 'Santa Cruz, Calle Froiland Cecilio Jordan # 136',
    web: 'www.smemsrl.com',
    nit: '192780025',
    estado: 'ACTIVO'
  },
  {
    nombre: 'ARQUITEC CONFE',
    descripcion: 'Construcciones de obra gruesa y fina, edificaciones, replanteo en obra gruesa y obra fina.',
    sigla: 'CONFE S.R.L.',
    email: 'confesrl.gob.bo',
    telefonos: '76280667',
    direccion: 'La Paz, Av. 6 de Marzo Esq. Calle 1 N 100 Edif. Genesis, Piso 1 Of. 109',
    web: 'www.confesrl.com',
    nit: '2147483647',
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
