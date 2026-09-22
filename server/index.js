import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';

dotenv.config({
  path: fileURLToPath(new URL('../.env', import.meta.url)),
});

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error(
    'Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN in .env',
  );
}

const server = new McpServer({
  name: 'contentful-mcp',
  version: '1.0.0',
});

server.registerTool(
  'get_contentful_entries',
  {
    description: 'Get entries from the configured Contentful space',
    inputSchema: z.object({
      limit: z.number().int().min(1).max(100).default(100),
    }),
  },
  async ({ limit }) => {
    const url =
      `https://cdn.contentful.com/spaces/${spaceId}/entries` +
      `?access_token=${encodeURIComponent(accessToken)}&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Contentful API error ${response.status}: ${await response.text()}`,
      );
    }

    const data = await response.json();

    const entries = (data.items ?? []).map(entry => ({
      id: entry.sys?.id,
      contentType: entry.sys?.contentType?.sys?.id,
      createdAt: entry.sys?.createdAt,
      updatedAt: entry.sys?.updatedAt,
      fields: entry.fields,
    }));

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ total: entries.length, entries }, null, 2),
        },
      ],
    };
  },
);

serveStdio(() => server);
