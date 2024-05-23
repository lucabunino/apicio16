// src/routes/+page.js
import { getCookiePolicy } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load:any = (async () => {
	const cookiePolicy = await getCookiePolicy();
	if (cookiePolicy) {
		return {
			cookiePolicy,
		};
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;