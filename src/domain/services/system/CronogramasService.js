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
  
  async function findAll (params = {}) {
    debug('Lista de Cronogramas|filtros');

   return CronogramasRepository.findAll(params);
  }

  async function findById (id = null) {
    debug('Lista de Cronogramas|filtros');
    try {
      let respuestaCronograma = await CronogramasRepository.findById(id);
      console.log('--->', respuestaCronograma);
      if (!respuestaCronograma){
        throw new Error ('No hay Valor');
      }
      if(respuestaCronograma.estado === 'INACTIVO') {
        throw new Error('El Cronograma ya fue desactivado');
      }
      return respuestaCronograma;
    } catch (error) {
      throw new Error (error.message);
    }
  }

  //METODO POST-PUT PARA GUARDAR Y MODIFICAR UN CRONOGRAMA
  async function guardarCronograma (dataCronograma) {
    try {
      dataCronograma._user_created = 1;
      const respuesta = await CronogramasRepository.createOrUpdate(dataCronograma);
      if (!respuesta) {
        throw new Error('No se guardo exitosamente en la base de datos.');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //METODO DELETE PARA ELIMINAR UN CRONOGRAMA DE LA VISTA 
  async function desactivarCronograma (id) {
    try {
      const respuesta = await CronogramasRepository.deleteItem(id);
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
    guardarCronograma,
    desactivarCronograma
  };
};
