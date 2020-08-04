'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function poasRepository (models, Sequelize) {
  const { usuarios, roles, personas, poas } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};
    
    query.where.estado = 'ACTIVO'

    const result = await poas.findAndCountAll(query);
    return toJSON(result);
  }

  async function findById (id = null) {
    const result = await poas.findByPk(id);
    return result;
  }

  return {
    findAll,
    findById,
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, poas, t),
    deleteItem: (id, t) => Repository.deleteItem(id, poas, t)
  };
};
