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
  
  async function findAll (params = {}, rol, idEntidad) {
    debug('Lista de Poas|filtros');

    return PoasRepository.findAll();
  }

  return {
    findAll
  };
};
