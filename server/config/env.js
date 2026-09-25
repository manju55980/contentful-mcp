import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({
  path: fileURLToPath(new URL('../../.env', import.meta.url)),
});

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error(
    'Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN in .env',
  );
}

export const config = {
  contentful: {
    spaceId,
    accessToken,
  },
};
