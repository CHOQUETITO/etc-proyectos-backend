'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function proyectosRepository (models, Sequelize) {
  const { usuarios, roles, personas, proyectos } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};

    if (params.nombre){
      query.where.nombre = {
        [Op.iLike] : `%${params.nombre}%`
      };
    }
    
    query.where.estado = 'ACTIVO'

    const result = await proyectos.findAndCountAll(query);
    return toJSON(result);
  }

  async function findById (id = null) {
    const result = await proyectos.findByPk(id);
    return result;
  }


  return {
    findAll,
    findById
  };
};
