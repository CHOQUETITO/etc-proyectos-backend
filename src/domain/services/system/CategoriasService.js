'use strict';

const debug = require('debug')('app:service:usuario');
const moment = require('moment');
const crypto = require('crypto');
const { text } = require('../../../common');
const { generateToken } = require('../../../application/lib/auth');
const ClienteNotificaciones = require('app-notificaciones');
const Service = require('../Service');

module.exports = function categoriasService (repositories, valueObjects, res) {

  const {CategoriasRepository} = repositories;
  
  async function findAll (params = {}, rol, idEntidad) {
    debug('Lista de Categorias|filtros');

   return CategoriasRepository.findAll();
  }

  return {
    findAll
  };
};
