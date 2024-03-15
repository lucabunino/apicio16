// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

import { getSiteSettings } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load:any = (async () => {
	const siteSettings = await getSiteSettings();
	if (siteSettings) {
		return {
			siteSettings,
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;