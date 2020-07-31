'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      xlabel: lang.t('fields.nombre')
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
      xlabel: lang.t('fields.descripcion')
    },
    idComunidad: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.idComunidad'),
      field: 'id_comunidad'
    },
    idPoa: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.idPoa'),
      field: 'id_poa'
    },
    idEmpresa: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.idEmpresa'),
      field: 'id_empresa'
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.idCategoria'),
      field: 'id_categoria'
    },
    idCronograma: {
      type: DataTypes.INTEGER,
      xlabel: lang.t('fields.idCronograma'),
      field: 'id_cronograma'
    },
    fechaInicio: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fechaInicio'),
      field: 'fecha_inicio'
    },
    fechaFinal: {
      type: DataTypes.DATE,
      xlabel: lang.t('fields.fechaFinal'),
      field: 'fecha_final'
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    }
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Proyectos = sequelize.define('proyectos', fields, {
    timestamps: false,
    tableName: 'proyectos'
  });
  return Proyectos;
};
