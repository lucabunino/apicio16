import { createClient } from "@sanity/client";
import groq from "groq";
const PUBLIC_SANITY_PROJECT_ID = "56lqtkew";
const PUBLIC_SANITY_DATASET = "production";
const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  useCdn: false,
  // `false` if you want to ensure fresh data
  apiVersion: "2024-03-09"
  // date of setup
});
async function getHomepage() {
  return await client.fetch(
    groq`*[_type == "homepage"]{
			...,
			} | order(year desc)`
  );
}
async function getSiteSettings() {
  return await client.fetch(
    groq`*[_type == "siteSettings"]{
			...,
			} | order(year desc)`
  );
}
async function getMenu() {
  return await client.fetch(
    groq`*[_type == "menu"] {
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
				}
			}
		} | order(year desc)`
  );
}
export {
  getHomepage as a,
  getMenu as b,
  client as c,
  getSiteSettings as g
};
