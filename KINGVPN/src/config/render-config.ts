import path from 'path';
import { eta } from '../http';
import AESCrypt from '../utils/crypto';
import { FastifyRequest, FastifyReply } from 'fastify';

// Carpeta donde están las páginas HTML
const paginas = path.resolve(__dirname, '../../frontend/pages');

// Contraseña para descifrar archivos (si se activa)
const PASSWORD = '7223fd56-e21d-4191-8867-f3c67601122a';

export class Render {
  static async pagina(req: FastifyRequest, reply: FastifyReply, archivo: string, opciones?: object) {
    const file = path.join(paginas, archivo);
    const contenido = eta.readFile(file);

    // Si querés activar descifrado:
    // if (process.env.ENCRYPT_FILES !== PASSWORD) {
    //   const descifrado = AESCrypt.decrypt(PASSWORD, contenido);
    //   if (!descifrado) {
    //     return reply.send({ message: 'No se pudo descifrar el archivo' });
    //   }
    //   contenido = descifrado;
    // }

    const res = eta.renderString(contenido, { ...opciones });
    reply.header('Content-Type', 'text/html');
    reply.send(res);
  }
}