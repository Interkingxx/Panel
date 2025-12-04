import { z } from 'zod';
import GetAppText from './get-app-text';
import AESCrypt from '../../utils/crypto';
import GetAppConfig from './get-app-config';
import GetAppLayout from './get-app-layout';
import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';

// Schema de headers adaptado a KINGVPN
const headerSchema = z.object({
  password: z.string().optional(),
  'kingvpn-token': z.string(), //  kingvpn-token
  'kingvpn-update': z.enum(['app_config', 'app_layout', 'app_text']), //  kingvpn-update
  'user-agent': z.literal('KINGVPN (@KINGVPN, @KINGVPSGroup)'), // Kingvpn config
});

// Handlers sin cambios de lógica, solo nombres
const handler = {
  app_text: GetAppText,
  app_config: GetAppConfig,
  app_layout: GetAppLayout,
};

export default {
  url: '/api/kingvpn', // confi de /api/kingvpn
  method: 'GET',
  handler: async (req: FastifyRequest, reply: FastifyReply) => {
    // Key global, puedes reemplazarla si querés
    const password = 'KINGVPNSecret-API-1234567890abcdef';

    const headers = headerSchema.safeParse(req.headers);
    if (headers && !headers.success) return reply.send();

    const user_id = headers.data['kingvpn-token'];
    const response = await handler[headers.data['kingvpn-update']](user_id);

    if (headers.data.password == password) {
      if (['app_config', 'app_layout'].includes(headers.data['kingvpn-update'])) {
        return reply.send(response.map((data: any) => JSON.parse(data)));
      }
      return reply.send(response);
    }

    reply.send(AESCrypt.encrypt(password, JSON.stringify(response)));
  },
} as RouteOptions;