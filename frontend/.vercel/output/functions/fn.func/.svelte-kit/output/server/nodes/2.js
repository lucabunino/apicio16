import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.FMlhZq6L.js","_app/immutable/chunks/language.7EGUj-pd.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/control.DjcsyY6t.js","_app/immutable/chunks/scheduler.CKgFKp5N.js","_app/immutable/chunks/index.qdqEzHHq.js","_app/immutable/chunks/index.BT1oR-yX.js"];
export const stylesheets = ["_app/immutable/assets/2.DOOWZzA8.css"];
export const fonts = [];
