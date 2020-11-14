'use strict';

const { getQuery, errorHandler, toJSON } = require('../../lib/util');
const Repository = require('../Repository');
const { text } = require('../../../common');

module.exports = function personasRepository (models, Sequelize) {
  const { usuarios, roles, personas } = models;
  const Op = Sequelize.Op;

  //METODO GET PARA LISTAR PERSONAS
  async function findAll (params = {}) {
    let query = getQuery(params);
    query.attributes = [
      'id',
      'nombres',
      'primer_apellido',
      'segundo_apellido',
      'nro_documento',
      'documento_expedido',
      'fecha_nacimiento',
      'genero',
      'telefono',
      'email',
      'estado'
    ]
    query.where = {};

    if (params.nombre){
      query.where.nombre = {
        [Op.iLike] : `%${params.nombre}%`
      };
    }
    query.where.estado = 'ACTIVO'

    const result = await personas.findAndCountAll(query);
    return toJSON(result);
  }

  //METODO GET PARA BUSCAR UNA PERSONA POR ID
  async function findById (id = null) {
    const result = await personas.findByPk(id);
    return result;
  }
  return {
    findAll,
    findById,
    createOrUpdate: (item, t) => Repository.createOrUpdate(item, personas, t),
    deleteItem: (id, t) => Repository.deleteItem(id, personas, t)
  };
};
