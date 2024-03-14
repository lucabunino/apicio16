import { g as getSiteSettings } from "../../chunks/sanity.js";
import { e as error } from "../../chunks/index.js";
const load = async ({ url }) => {
  const { pathname } = url;
  const siteSettings = await getSiteSettings();
  if (siteSettings) {
    return {
      siteSettings,
      pathname
    };
  }
  throw error(404, "Not found");
};
export {
  load
};
