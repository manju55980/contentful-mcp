const { createClient } = require('@supabase/supabase-js');
const config = require('./config');
const service = require('./service');

let supabase;

const ExampleModule = {
  name: 'example',

  async init() {
    if (!config.enabled) {
      console.info(`[${this.name}] disabled — skipping init`);
      return;
    }
    supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
    service.init(supabase);
    console.info(`[${this.name}] initialized`);
  },

  async getAll(filters) {
    return service.getAll(filters);
  },

  async create(payload) {
    return service.create(payload);
  },

  async remove(id) {
    return service.remove(id);
  },

  async teardown() {
    console.info(`[${this.name}] torn down`);
  },
};

module.exports = ExampleModule;
