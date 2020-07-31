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
  
  async function findAll (params = {}, rol, idEntidad) {
    debug('Lista de Cronogramas|filtros');

   return CronogramasRepository.findAll();
  }

  return {
    findAll
  };
};
