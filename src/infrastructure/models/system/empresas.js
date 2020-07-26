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
    sigla: {
      type: DataTypes.STRING(20),
      xlabel: lang.t('fields.sigla')
    },
    email: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.email')
    },
    telefonos: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.telefonos')
    },
    direccion: {
      type: DataTypes.TEXT,
      xlabel: lang.t('fields.direccion')
    },
    web: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.web')
    },
    info: {
      type: DataTypes.JSON,
      xlabel: lang.t('fields.info')
    },
    nit: {
      type: DataTypes.STRING(20),
      unique: true,
      xlabel: lang.t('fields.nit')
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

  let Empresas = sequelize.define('empresas', fields, {
    timestamps: false,
    tableName: 'empresas'
  });

  return Empresas;
};
