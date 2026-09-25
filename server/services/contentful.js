export async function fetchContentfulEntries({ spaceId, accessToken, limit }) {
  const url = new URL(`https://cdn.contentful.com/spaces/${spaceId}/entries`);
  url.searchParams.set('access_token', accessToken);
  url.searchParams.set('limit', String(limit));

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
    total: entries.length,
    entries,
  };
}
