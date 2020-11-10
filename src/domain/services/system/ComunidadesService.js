'use strict';

const debug = require('debug')('app:service:usuario');
const moment = require('moment');
const crypto = require('crypto');
const { text } = require('../../../common');
const { generateToken } = require('../../../application/lib/auth');
const Service = require('../Service');

module.exports = function comunidadesService (repositories, valueObjects, res) {

  const {ComunidadesRepository} = repositories;
  
  //METODO GET PARA LISTAR COMUNIDADES
  async function findAll (params = {}) {
    debug('Lista de Comunidades|filtros');

    return ComunidadesRepository.findAll(params);
  }

    //METODO GET PARA BUSCAR UNA CATEGORIA POR ID
    async function findById (id = null) {
      debug('Lista de Comunidades|filtros');
      try {
        let respuestaComunidad = await ComunidadesRepository.findById(id);
        console.log('--->', respuestaComunidad);
        if (!respuestaComunidad){
          throw new Error ('No hay Valor');
        }
        if(respuestaComunidad.estado === 'INACTIVO') {
          throw new Error('La Comunidad ya fue desactivada');
        }
        return respuestaComunidad;
      } catch (error) {
        throw new Error (error.message);
      }
    }

  return {
    findAll,
    findById
  };
};
