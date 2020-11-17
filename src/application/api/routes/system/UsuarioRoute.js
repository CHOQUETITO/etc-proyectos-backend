'use strict';

const guard = require('express-jwt-permissions')();

module.exports = function setupUsuario (api, controllers) {
  const { UsuarioController } = controllers;

  api.get('/persona-segip/:ci', guard.check(['personas:read']), UsuarioController.personaSegip);
  api.patch('/cambiar_pass', guard.check(['usuarios:update']), UsuarioController.cambiarPass);
  api.patch('/desactivar_cuenta', guard.check(['usuarios:update']), UsuarioController.desactivarCuenta);
  api.get('/menu', guard.check(['modulos:read']), UsuarioController.obtenerMenu);
  api.get('/regenerar_password/:id', guard.check(['usuarios:read']), UsuarioController.regenerarPassword);
  api.get('/usuario', UsuarioController.findAll);

 // api.get('', UsuarioController.findAll);
  // api.get('/:id', UsuarioController.findById);
  api.post('', UsuarioController.guardar);
  // api.put('/:id', UsuarioController.actualizar);
  // api.delete('/:id', UsuarioController.desactivar);

  return api;
};
