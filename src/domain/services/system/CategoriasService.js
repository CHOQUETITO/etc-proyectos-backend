'use strict';

const debug = require('debug')('app:service:usuario');
const moment = require('moment');
const crypto = require('crypto');
const { text } = require('../../../common');
const { generateToken } = require('../../../application/lib/auth');
const Service = require('../Service');

module.exports = function categoriasService (repositories, valueObjects, res) {

  const {CategoriasRepository} = repositories;
  
  //METODO GET PARA LISTAR CATEGORIAS
  async function findAll (params = {}) {
    debug('Lista de Categorias|filtros');

   return CategoriasRepository.findAll(params);
  }

  //METODO GET PARA BUSCAR UNA CATEGORIA POR ID
  async function findById (id = null) {
    debug('Lista de Categorias|filtros');
    try {
      let respuestaCategoria = await CategoriasRepository.findById(id);
      console.log('--->', respuestaCategoria);
      if (!respuestaCategoria){
        throw new Error ('No hay Valor');
      }
      if(respuestaCategoria.estado === 'INACTIVO') {
        throw new Error('La Categoria ya fue desactivada');
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
