'use strict';

const path = require('path');

const app = {
  host: {
    server: 'http://localhost:3000/',
    path: path.join(__dirname, './') // Root
  },
};

module.exports = app;
