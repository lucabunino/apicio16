import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DIo3E8PL.js","_app/immutable/chunks/language.7EGUj-pd.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/control.DjcsyY6t.js","_app/immutable/chunks/scheduler.CKgFKp5N.js","_app/immutable/chunks/index.qdqEzHHq.js","_app/immutable/chunks/stores.DZLq78GK.js","_app/immutable/chunks/entry.DUF7COIA.js"];
export const stylesheets = ["_app/immutable/assets/0.B71M3Ad9.css"];
export const fonts = [];
