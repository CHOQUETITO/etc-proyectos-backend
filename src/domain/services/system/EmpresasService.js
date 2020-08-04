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
      if (!respuestaEmpresa){
        throw new Error ('No hay Valor');
      }
      if(respuestaEmpresa.estado === 'INACTIVO') {
        throw new Error('La Empresa ya fue desactivada');
      }
      return respuestaEmpresa;
    } catch (error) {
      throw new Error (error.message);
    }
  }
  async function guardarEmpresa (dataEmpresa) {
    try {
      dataEmpresa._user_created = 1;
      const respuesta = await EmpresasRepository.createOrUpdate(dataEmpresa);
      if (!respuesta) {
        throw new Error('No se guardo exitosamente en la base de datos.');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async function desactivarEmpresa (id) {
    try {
      const respuesta = await EmpresasRepository.deleteItem(id);
      if (!respuesta) {
        throw new Error('No se guardo exitosamente en la base de datos.');
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
    guardarEmpresa,
    desactivarEmpresa
  };
};
