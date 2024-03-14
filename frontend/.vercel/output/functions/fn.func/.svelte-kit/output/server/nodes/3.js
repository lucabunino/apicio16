import * as universal from '../entries/pages/menu/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/menu/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/menu/+page.ts";
export const imports = ["_app/immutable/nodes/3.BB8GrEkf.js","_app/immutable/chunks/language.7EGUj-pd.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/control.DjcsyY6t.js","_app/immutable/chunks/scheduler.CKgFKp5N.js","_app/immutable/chunks/index.qdqEzHHq.js","_app/immutable/chunks/index.BT1oR-yX.js","_app/immutable/chunks/entry.DUF7COIA.js"];
export const stylesheets = ["_app/immutable/assets/3.Cc7z17Vd.css"];
export const fonts = [];
