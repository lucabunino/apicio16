// src/routes/+layout.js
import { getSiteSettings } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

/** @type {import('@sveltejs/kit').Load} */
export const load:any = (async ({ url }) => {
  const { pathname } = url;
  const siteSettings = await getSiteSettings();
  const initLocale = 'it'; // get from cookie, user session, ...
  // await loadTranslations(initLocale, pathname); // keep this just before the `return`
  if (siteSettings) {
		return {
			siteSettings,
		};
	}
  throw error(404, 'Not found');
}) satisfies PageLoad;

// export const load:any = (async () => {
// 	const siteSettings = await getSiteSettings();
// 	if (siteSettings) {
// 		return {
// 			siteSettings,
// 		};
// 	}
// 	throw error(404, 'Not found');
// }) satisfies PageLoad;