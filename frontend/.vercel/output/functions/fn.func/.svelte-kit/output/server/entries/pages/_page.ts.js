import { a as getHomepage } from "../../chunks/sanity.js";
import { e as error } from "../../chunks/index.js";
const load = async () => {
  const homepage = await getHomepage();
  if (homepage) {
    return {
      homepage
    };
  }
  throw error(404, "Not found");
};
export {
  load
};
