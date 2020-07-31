'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function empresasRepository (models, Sequelize) {
  const { usuarios, roles, personas, empresas } = models;
  const Op = Sequelize.Op;

  async function findAll (params = {}) {
    let query = getQuery(params);
    query.where = {};
    const result = await empresas.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll
  };
};
