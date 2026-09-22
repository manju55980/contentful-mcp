let db;

function init(supabaseClient) {
  db = supabaseClient;
}

async function getAll(filters = {}) {
  const { data, error } = await db.from('example').select('*').match(filters);
  if (error) throw new Error(`[example/service] getAll failed: ${error.message}`);
  return data;
}

async function create(payload) {
  const { data, error } = await db.from('example').insert(payload).select().single();
  if (error) throw new Error(`[example/service] create failed: ${error.message}`);
  return data;
}

async function remove(id) {
  const { error } = await db.from('example').delete().eq('id', id);
  if (error) throw new Error(`[example/service] remove failed: ${error.message}`);
}

module.exports = { init, getAll, create, remove };
