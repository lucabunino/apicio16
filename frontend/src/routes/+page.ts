// src/routes/+page.js
import { getHomepage } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load:any = (async () => {
	const homepage = await getHomepage();
	if (homepage) {
		return {
			homepage,
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;