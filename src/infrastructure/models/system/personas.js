'use strict';

const lang = require('../../lang');
const util = require('../../lib/util');

module.exports = (sequelize, DataTypes) => {
  let fields = {
    id: util.pk,
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
      xlabel: lang.t('fields.nombres')
    },
    primer_apellido: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.primer_apellido')
    },
    segundo_apellido: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.segundo_apellido')
    },
    nro_documento: {
      type: DataTypes.NUMERIC(20),
      xlabel: lang.t('fields.nro_documento')
    },
    documento_expedido: {
      type: DataTypes.STRING(5),
      allowNull: false,
      xlabel: lang.t('fields.documento_expedido')
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      xlabel: lang.t('fields.fecha_nacimiento')
    },
    genero: {
      type: DataTypes.ENUM,
      values: ['M', 'F', 'OTRO'],
      xlabel: lang.t('fields.genero')
    },
    telefono: {
      type: DataTypes.STRING(50),
      xlabel: lang.t('fields.telefono')
    },
    email: {
      type: DataTypes.STRING(100),
      xlabel: lang.t('fields.email')
    },
    estado: {
      type: DataTypes.ENUM,
      values: ['ACTIVO', 'INACTIVO'],
      defaultValue: 'ACTIVO',
      allowNull: false,
      xlabel: lang.t('fields.estado')
    },
  };

  // Agregando campos para el log
  fields = util.setTimestamps(fields);

  let Personas = sequelize.define('personas', fields, {
    timestamps: false,
    tableName: 'sys_personas'
  });

  return Personas;
};
