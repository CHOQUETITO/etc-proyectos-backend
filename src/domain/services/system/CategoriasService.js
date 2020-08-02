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
  
  async function findAll (params = {}) {
    debug('Lista de Categorias|filtros');

   return CategoriasRepository.findAll(params);
  }

  async function findById (id = null) {
    debug('Lista de Categorias|filtros');
    try {
      let respuestaCategoria = await CategoriasRepository.findById(id);
      console.log('--->', respuestaCategoria);
      if (!respuestaCategoria){
        throw new Error ('No hay Valor');
      }
      return respuestaCategoria;
      
    } catch (error) {
      throw new Error (error.message);
    }
  }

  return {
    findAll,
    findById
  };
};
