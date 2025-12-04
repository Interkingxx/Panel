const os = require('os');
const path = require('path');
const dotenv = require('dotenv');

const cpus = os.cpus().length;
const instances = (cpus > 2) ? Math.floor(cpus / 2) : 1;

// Cargar variables de entorno desde .env
dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

module.exports = {
  apps: [
    {
      name: 'KINGVPN',           // Branding cambiado
      script: './build/index.js',
      instances,
      exec_mode: 'cluster',       // Ejecutar en modo cluster
    },
  ],
};