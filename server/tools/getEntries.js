import * as z from 'zod/v4';
import { fetchContentfulEntries } from '../services/contentful.js';

export function registerGetContentfulEntriesTool(server, { spaceId, accessToken }) {
  server.registerTool(
    'get_contentful_entries',
    {
      description: 'Get entries from the configured Contentful space',
      inputSchema: z.object({
        limit: z.number().int().min(1).max(100).default(100),
      }),
    },
    async ({ limit }) => {
      const result = await fetchContentfulEntries({ spaceId, accessToken, limit });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    },
  );
}
