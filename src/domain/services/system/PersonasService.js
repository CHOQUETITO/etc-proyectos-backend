'use strict';

const debug = require('debug')('app:service:personas');
const moment = require('moment');
const crypto = require('crypto');
const { text } = require('../../../common');
const { generateToken } = require('../../../application/lib/auth');
const Service = require('../Service');

module.exports = function personasService (repositories, valueObjects, res) {

  const {PersonasRepository} = repositories;
  
  //METODO GET PARA LISTAR PERSONAS
  async function findAll (params = {}) {
    debug('Lista de Personas|filtros');

    return PersonasRepository.findAll(params);
  }

  //METODO GET PARA BUSCAR UNA PERSONA POR ID
  async function findById (id = null) {
    debug('Lista de Personas|filtros');
    try {
      let respuestaPersona = await PersonasRepository.findById(id);
      if (!respuestaPersona){
        throw new Error ('No hay Valor');
      }
      if(respuestaPersona.estado === 'INACTIVO') {
        throw new Error('La Persona ya fue desactivada');
      }
      return respuestaPersona;
    } catch (error) {
      throw new Error (error.message);
    }
  }

  //METODO POST-PUT PARA GUARDAR Y MODIFICAR UNA PERSONA
  async function guardarPersona (dataPersona) {
    try {
      dataPersona._user_created = 1; //arreglar tito
      const respuesta = await PersonasRepository.createOrUpdate(dataPersona);
      if (!respuesta) {
        throw new Error('No se guardo exitosamente en la base de datos.');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //METODO DELETE PARA DESACTIVAR UNA PERSONA
  async function desactivarPersona (id) {
    try {
      const respuesta = await PersonasRepository.deleteItem(id);
      if (!respuesta) {
        throw new Error('No se desactivo exitosamente en la base de datos.');
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
    guardarPersona,
    desactivarPersona
  };
};
