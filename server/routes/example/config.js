const config = {
  enabled: process.env.EXAMPLE_MODULE_ENABLED !== 'false',
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

module.exports = config;
