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
  
  async function findAll (params = {}) {
    debug('Lista de Empresas|filtros');

    return EmpresasRepository.findAll(params);
  }

  async function findById (id = null) {
    debug('Lista de Empresa|filtros');
    try {
      let respuestaEmpresa = await EmpresasRepository.findById(id);
      console.log('--->', respuestaEmpresa);
      if (!respuestaEmpresa){
        throw new Error ('No hay Valor');
      }
      return respuestaEmpresa;
      
    } catch (error) {
      throw new Error (error.message);
    }
  }

  return {
    findAll,
    findById
  };
};
