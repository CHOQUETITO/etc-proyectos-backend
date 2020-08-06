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
  
  //METODO PARA LISTAR PROYECTOS
  async function findAll (params = {}) {
    debug('Lista de Proyectos|filtros');

   return ProyectosRepository.findAll(params);
  }

  //METODO PARA BUSCAR UN PROYECTO POR ID
  async function findById (id = null) {
    debug('Lista de Proyecto|filtros');
    try {
      let respuestaProyecto = await ProyectosRepository.findById(id);
      console.log('--->', respuestaProyecto);
      if (!respuestaProyecto){
        throw new Error ('No hay Valor');
      }
      if(respuestaProyecto.estado === 'INACTIVO') {
        throw new Error('El proyecto ya fue desactivado');
      }
      return respuestaProyecto;
    } catch (error) {
      throw new Error (error.message);
    }
  }
  
  //METODO POST-PUT PARA GUARDAR Y MODIFICAR UN PROYECTO
  async function guardarProyecto (dataProyecto) {
    try {
      dataProyecto._user_created = 1;
      const respuesta = await ProyectosRepository.createOrUpdate(dataProyecto);
      if (!respuesta) {
        throw new Error('No se guardo exitosamente en la base de datos.');
      }
      return respuesta;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //METODO DELETE PARA ELIMINAR UN PROYECTO DE LA VISTA 
  async function desactivarProyecto (id) {
    try {
      const respuesta = await ProyectosRepository.deleteItem(id);
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
    guardarProyecto,
    desactivarProyecto
  };
};
