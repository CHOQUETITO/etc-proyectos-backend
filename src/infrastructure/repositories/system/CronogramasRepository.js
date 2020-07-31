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
    const result = await cronogramas.findAndCountAll(query);
    return toJSON(result);
  }

  return {
    findAll
  };
};
