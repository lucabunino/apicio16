// src/routes/+page.js
import { getMenu } from '$lib/utils/sanity';
import { getAllergens } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load:any = (async () => {
	const menu = await getMenu();
	const allergens = await getAllergens();
	if (menu && allergens) {
		return {
			menu,
			allergens,
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;