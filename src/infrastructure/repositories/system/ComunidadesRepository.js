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
    query.where = {};

    query.where.estado = 'ACTIVO'
    
    const result = await comunidades.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll
  };
};
