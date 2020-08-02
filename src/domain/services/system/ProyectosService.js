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
  
  async function findAll (params = {}) {
    debug('Lista de Proyectos|filtros');

   return ProyectosRepository.findAll(params);
  }

  async function findById (id = null) {
    debug('Lista de Proyecto|filtros');
    try {
      let respuestaProyecto = await ProyectosRepository.findById(id);
      console.log('--->', respuestaProyecto);
      if (!respuestaProyecto){
        throw new Error ('No hay Valor');
      }
      return respuestaProyecto;
      
    } catch (error) {
      throw new Error (error.message);
    }
  }

  return {
    findAll,
    findById
  };
};
