
// src/routes/+page.js
import { getMenu } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load:any = (async () => {
	const menu = await getMenu();
	if (menu) {
		return {
			menu,
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;