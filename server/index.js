import { config } from './config/env.js';
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { registerGetContentfulEntriesTool } from './tools/getEntries.js';

const { spaceId, accessToken } = config.contentful;
if (!spaceId || !accessToken) {
  throw new Error(
    'Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN in .env',
  );
}

const server = new McpServer({
  name: 'contentful-mcp',
  version: '1.0.0',
});

registerGetContentfulEntriesTool(server, { spaceId, accessToken });

serveStdio(() => server);
