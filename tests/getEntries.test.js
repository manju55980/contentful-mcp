import { describe, it, mock, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { fetchContentfulEntries } from '../server/services/contentful.js';
import { registerGetContentfulEntriesTool } from '../server/tools/getEntries.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const serverEntry = path.join(rootDir, 'server', 'index.js');

function getToolInputSchema() {
  const registered = [];
  const fakeServer = {
    registerTool(name, config, handler) {
      registered.push({ name, config, handler });
    },
  };

  registerGetContentfulEntriesTool(fakeServer, {
    spaceId: 'test-space',
    accessToken: 'test-token',
  });

  assert.equal(registered.length, 1);
  assert.equal(registered[0].name, 'get_contentful_entries');
  return registered[0].config.inputSchema;
}

function runServerWithEnv(envOverrides) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [serverEntry], {
      cwd: rootDir,
      env: {
        ...process.env,
        ...envOverrides,
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stderr = '';
    let stdout = '';

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    const timer = setTimeout(() => {
      child.kill();
      resolve({
        code: child.exitCode,
        signal: 'SIGTERM',
        stderr,
        stdout,
        timedOut: true,
      });
    }, 3000);

    child.on('close', (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal, stderr, stdout, timedOut: false });
    });
  });
}

describe('get_contentful_entries', () => {
  afterEach(() => {
    mock.restoreAll();
  });

  it('AC1: fetches and maps Contentful entries with limit', async () => {
    const fetchMock = mock.method(globalThis, 'fetch', async (url) => {
      assert.match(String(url), /spaces\/space-123\/entries/);
      assert.match(String(url), /access_token=token-abc/);
      assert.match(String(url), /limit=5/);

      return {
        ok: true,
        async json() {
          return {
            items: [
              {
                sys: {
                  id: 'entry-1',
                  contentType: { sys: { id: 'article' } },
                  createdAt: '2026-01-01T00:00:00.000Z',
                  updatedAt: '2026-01-02T00:00:00.000Z',
                },
                fields: { title: 'Hello' },
              },
            ],
          };
        },
      };
    });

    const result = await fetchContentfulEntries({
      spaceId: 'space-123',
      accessToken: 'token-abc',
      limit: 5,
    });

    assert.equal(fetchMock.mock.callCount(), 1);
    assert.deepEqual(result, {
      total: 1,
      entries: [
        {
          id: 'entry-1',
          contentType: 'article',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-02T00:00:00.000Z',
          fields: { title: 'Hello' },
        },
      ],
    });
  });

  it('AC2: Zod input validation rejects invalid limits', () => {
    const inputSchema = getToolInputSchema();

    assert.equal(inputSchema.safeParse({ limit: 0 }).success, false);
    assert.equal(inputSchema.safeParse({ limit: 101 }).success, false);
    assert.equal(inputSchema.safeParse({ limit: 1.5 }).success, false);
    assert.equal(inputSchema.safeParse({ limit: '10' }).success, false);

    assert.equal(inputSchema.safeParse({ limit: 1 }).success, true);
    assert.equal(inputSchema.safeParse({ limit: 100 }).success, true);
    assert.equal(inputSchema.safeParse({}).success, true);
  });

  it('AC3: startup fails when credentials are missing', async () => {
    const result = await runServerWithEnv({
      CONTENTFUL_SPACE_ID: '',
      CONTENTFUL_ACCESS_TOKEN: '',
    });

    assert.equal(result.timedOut, false);
    assert.notEqual(result.code, 0);
    assert.match(
      result.stderr,
      /Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN/,
    );
  });

  it('AC4: throws descriptive error on Contentful API failure', async () => {
    mock.method(globalThis, 'fetch', async () => ({
      ok: false,
      status: 401,
      async text() {
        return 'Unauthorized';
      },
    }));

    await assert.rejects(
      () =>
        fetchContentfulEntries({
          spaceId: 'bad-space',
          accessToken: 'bad-token',
          limit: 10,
        }),
      (error) => {
        assert.equal(error instanceof Error, true);
        assert.match(error.message, /Contentful API error 401: Unauthorized/);
        return true;
      },
    );
  });
});
