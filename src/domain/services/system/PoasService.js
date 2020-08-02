'use strict';

const debug = require('debug')('app:service:usuario');
const moment = require('moment');
const crypto = require('crypto');
const { text } = require('../../../common');
const { generateToken } = require('../../../application/lib/auth');
const ClienteNotificaciones = require('app-notificaciones');
const Service = require('../Service');

module.exports = function poasService (repositories, valueObjects, res) {

  const {PoasRepository} = repositories;
  
  async function findAll (params = {}) {
    debug('Lista de Poas|filtros');

    return PoasRepository.findAll(params);
  }

  async function findById (id = null) {
    debug('Lista de Poa|filtros');
    try {
      let respuestaPoa = await PoasRepository.findById(id);
      console.log('--->', respuestaPoa);
      if (!respuestaPoa){
        throw new Error ('No hay Valor');
      }
      return respuestaPoa;
      
    } catch (error) {
      throw new Error (error.message);
    }
  }

  return {
    findAll,
    findById
  };
};
