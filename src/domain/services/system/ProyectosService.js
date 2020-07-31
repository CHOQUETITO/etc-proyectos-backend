'use strict';

const debug = require('debug')('app:service:usuario');
const moment = require('moment');
const crypto = require('crypto');
const { text } = require('../../../common');
const { generateToken } = require('../../../application/lib/auth');
const ClienteNotificaciones = require('app-notificaciones');
const Service = require('../Service');

module.exports = function proyectosService (repositories, valueObjects, res) {

  const {ProyectosRepository} = repositories;
  
  async function findAll (params = {}, rol, idEntidad) {
    debug('Lista de Proyectos|filtros');

   return ProyectosRepository.findAll();
  }

  return {
    findAll
  };
};
