import { createClient } from '@sanity/client';
import groq from 'groq';

import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: true, // `false` if you want to ensure fresh data
	apiVersion: '2024-03-09' // date of setup
});

export async function getHomepage(): Promise<Homepage[]> {
	return await client.fetch(
		groq`*[_type == "homepage"]{
			...,
			} | order(year desc)`
	);
}

export async function getSiteSettings(): Promise<Settings[]> {
	return await client.fetch(
		groq`*[_type == "siteSettings"]{
			...,
			} | order(year desc)`
	);
}

export async function getPrivacyPolicy(): Promise<PrivacyPolicy[]> {
	return await client.fetch(
		groq`*[_type == "siteSettings"]{
			privacyPolicy,
			}`
	);
}

export async function getCookiePolicy(): Promise<CookiePolicy[]> {
	return await client.fetch(
		groq`*[_type == "siteSettings"]{
			cookiePolicy,
			}`
	);
}

export async function getMenu(): Promise<Settings[]> {
	return await client.fetch(
		groq`*[_type == "menu" && !(_id in path('drafts.**'))]{
			title,
			from,
			to,
			menuContents[] {
				meal,
				mealContent[] {
					course,
					dishes[] {
						dishReference->{
							title,
							description,
							price,
							allergens[]->{
								number,
								title,
								description
							}
						}
					}
				},
				mealNotes,
			}
		} | order(year desc)`
	);
}