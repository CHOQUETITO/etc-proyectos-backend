'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function comunidadesRepository (models, Sequelize) {
  const { usuarios, roles, personas, comunidades } = models;
  const Op = Sequelize.Op;

  //METODO GET PARA LISTAR UNA COMUNIDAD
  async function findAll (params = {}) {
    let query = getQuery(params);
    query.attributes = [
      'id',
      'nombre',
      'descripcion',
      'estado'
    ]
    //query.where = {};
    query.where = {};
    if (params.nombre){
      query.where.nombre = {
        [Op.iLike] : `%${params.nombre}%`
      };
    }

    query.where.estado = 'ACTIVO'
    
    const result = await comunidades.findAndCountAll(query);
    return toJSON(result);
  }

  //METODO GET PARA BUSCAR UNA CATEGORIA POR ID
  async function findById (id = null) {
    const result = await comunidades.findByPk(id);
    return result;
  }

  return {
    findAll,
    findById
  };
};
