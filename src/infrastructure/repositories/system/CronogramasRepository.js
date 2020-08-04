'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function cronogramasRepository (models, Sequelize) {
  const { usuarios, roles, personas, cronogramas } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};

    query.where.estado = 'ACTIVO'

    const result = await cronogramas.findAndCountAll(query);
    return toJSON(result);
  }

  async function findById (id = null) {
    const result = await cronogramas.findByPk(id);
    return result;
  }
  
  return {
    findAll,
    findById,
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, cronogramas, t),
    deleteItem: (id, t) => Repository.deleteItem(id, cronogramas, t)
  };
};
