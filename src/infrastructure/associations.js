'use strict';

const cronogramas = require("./models/system/cronogramas");

// Definiendo asociaciones de las tablas
module.exports = function associations (models) {
  const {
    roles,
    usuarios,
    empresas,
    modulos,
    permisos,
    personas,
    tokens,
    poas,
    categorias,
    proyectos,
    comunidades,
    cronogramas
  } = models;

  // MODULO USUARIOS
  // Asociaciones tabla proyectos-comunidades
  proyectos.belongsTo(comunidades, { foreignKey: { name: 'id_comunidad'}, as: 'comunidad' });
  comunidades.hasMany(proyectos, { foreignKey: { name: 'id_comunidad'}, as: 'comunidad' });

  // Asociaciones tabla proyectos-categorias
  proyectos.belongsTo(categorias, { foreignKey: { name: 'id_categoria' }, as: 'categoria' });
  categorias.hasMany(proyectos, { foreignKey: { name: 'id_categoria' }, as: 'categoria' });

  // Asociaciones tabla proyectos-poas
  proyectos.belongsTo(poas, { foreignKey: { name: 'id_poa' }, as: 'poa' });
  poas.hasMany(proyectos, { foreignKey: { name: 'id_poa' }, as: 'poa' });

  // Asociaciones tabla proyectos-empresas
  proyectos.belongsTo(empresas, { foreignKey: { name: 'id_empresa' }, as: 'empresa' });
  empresas.hasMany(proyectos, { foreignKey: { name: 'id_empresa' }, as: 'empresas' });

  // Asociaciones tabla proyectos-cronogramas
  proyectos.belongsTo(cronogramas, { foreignKey: { name: 'id_cronograma' }, as: 'cronograma' });
  cronogramas.hasMany(proyectos, { foreignKey: { name: 'id_cronograma' }, as: 'proyecto' });
 
  // Asociaciones tabla usuarios
  usuarios.belongsTo(roles, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });
  roles.hasMany(usuarios, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });

  usuarios.belongsTo(personas, { foreignKey: { name: 'id_persona' }, as: 'persona' });
  personas.hasMany(usuarios, { foreignKey: { name: 'id_persona' }, as: 'persona' });

  // Asociaciones tablas permisos - roles
  permisos.belongsTo(roles, { foreignKey: { name: 'id_rol', allowNull: false }, as: 'rol' });
  roles.hasMany(permisos, { foreignKey: { name: 'id_rol', allowNull: false } });

  // Asociaciones tablas permisos - modulos
  permisos.belongsTo(modulos, { foreignKey: { name: 'id_modulo', allowNull: false }, as: 'modulo' });
  modulos.hasMany(permisos, { foreignKey: { name: 'id_modulo', allowNull: false } });

  // Asociaciones tablas modulos - sección
  modulos.belongsTo(modulos, { foreignKey: 'id_modulo' });
  modulos.hasMany(modulos, { foreignKey: 'id_modulo' });
  modulos.belongsTo(modulos, { foreignKey: 'id_seccion' });
  modulos.hasMany(modulos, { foreignKey: 'id_seccion' });

  // Asociaciones tabla tokens
  tokens.belongsTo(usuarios, { foreignKey: { name: 'id_usuario' }, as: 'usuario' });
  usuarios.hasMany(tokens, { foreignKey: { name: 'id_usuario' } });

  //tokens.belongsTo(entidades, { foreignKey: { name: 'id_entidad' }, as: 'entidad' });
  //entidades.hasMany(tokens, { foreignKey: { name: 'id_entidad' } });

  return models;
};
