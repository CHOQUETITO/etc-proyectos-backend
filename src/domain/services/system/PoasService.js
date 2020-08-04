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
  
  //METODO PARA LISTAR TODAS LAS POAS ACTIVAS
  async function findAll (params = {}) {
    debug('Lista de Poas|filtros');

    return PoasRepository.findAll(params);
  }

  //METODO PARA LISTAR POR ID
  async function findById (id = null) {
    debug('Lista de Poa|filtros');
    try {
      let respuestaPoa = await PoasRepository.findById(id);
      console.log('--->', respuestaPoa);
      if (!respuestaPoa){
        throw new Error ('No hay Valor');
      }
      if(respuestaPoa.estado === 'INACTIVO') {
        throw new Error('El Poa ya fue desactivado');
      }
      return respuestaPoa;
    } catch (error) {
      throw new Error (error.message);
    }
  }

  //METODO POST-PUT PARA GUARDAR Y MODIFICAR UN POA
  async function guardarPoa (dataPoa) {
    try {
      dataPoa._user_created = 1;
      const respuesta = await PoasRepository.createOrUpdate(dataPoa);
      if (!respuesta) {
        throw new Error('No se guardo exitosamente en la base de datos.');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //METODO DELETE PARA ELIMINAR UN POA DE LA VISTA 
  async function desactivarPoa (id) {
    try {
      const respuesta = await PoasRepository.deleteItem(id);
      if (!respuesta) {
        throw new Error('No se Eliminio de la vista Correctamente');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    findAll,
    findById,
    guardarPoa,
    desactivarPoa
  };
};
