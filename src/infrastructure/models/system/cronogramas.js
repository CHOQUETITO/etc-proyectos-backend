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
    archivoCronograma: {
      type: DataTypes.BLOB,
      allowNull: false,
      xlabel: lang.t('fields.archivoCronograma')
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

    let Cronogramas = sequelize.define('cronogramas', fields, {
      timestamps: false,
      tableName: 'cronogramas'
    });

  return Cronogramas;
};