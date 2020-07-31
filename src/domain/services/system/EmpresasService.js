'use strict';

const debug = require('debug')('app:service:usuario');
const moment = require('moment');
const crypto = require('crypto');
const { text } = require('../../../common');
const { generateToken } = require('../../../application/lib/auth');
const ClienteNotificaciones = require('app-notificaciones');
const Service = require('../Service');

module.exports = function empresasService (repositories, valueObjects, res) {

  const {EmpresasRepository} = repositories;
  
  async function findAll (params = {}, rol, idEntidad) {
    debug('Lista de Empresas|filtros');

    return EmpresasRepository.findAll();
  }

  return {
    findAll
  };
};
