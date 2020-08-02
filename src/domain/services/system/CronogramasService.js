'use strict';

const debug = require('debug')('app:service:usuario');
const moment = require('moment');
const crypto = require('crypto');
const { text } = require('../../../common');
const { generateToken } = require('../../../application/lib/auth');
const ClienteNotificaciones = require('app-notificaciones');
const Service = require('../Service');

module.exports = function cronogramasService (repositories, valueObjects, res) {

  const {CronogramasRepository} = repositories;
  
  async function findAll (params = {}) {
    debug('Lista de Cronogramas|filtros');

   return CronogramasRepository.findAll(params);
  }

  async function findById (id = null) {
    debug('Lista de Cronogramas|filtros');
    try {
      let respuestaCronograma = await CronogramasRepository.findById(id);
      console.log('--->', respuestaCronograma);
      if (!respuestaCronograma){
        throw new Error ('No hay Valor');
      }
      return respuestaCronograma;
      
    } catch (error) {
      throw new Error (error.message);
    }
  }

  return {
    findAll,
    findById
  };
};
