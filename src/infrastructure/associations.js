'use strict';

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
    comunidades
  } = models;

  // MODULO USUARIOS
  // Asociaciones tabla usuarios
  proyectos.belongsTo(comunidades, { foreignKey: { name: 'id_comunidad', allowNull: false }, as: 'comunidad' });
  comunidades.hasMany(proyectos, { foreignKey: { name: 'id_comunidad', allowNull: false }, as: 'comunidad' });

  proyectos.belongsTo(categorias, { foreignKey: { name: 'id_categoria', allowNull: false }, as: 'categoria' });
  categorias.hasMany(proyectos, { foreignKey: { name: 'id_categoria', allowNull: false }, as: 'categoria' });

  proyectos.belongsTo(poas, { foreignKey: { name: 'id_poa', allowNull: false }, as: 'poa' });
  poas.hasMany(proyectos, { foreignKey: { name: 'id_poa', allowNull: false }, as: 'poa' });

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
