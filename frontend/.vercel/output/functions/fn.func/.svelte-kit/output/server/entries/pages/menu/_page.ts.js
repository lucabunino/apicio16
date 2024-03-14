import { b as getMenu } from "../../../chunks/sanity.js";
import { e as error } from "../../../chunks/index.js";
const load = async () => {
  const menu = await getMenu();
  if (menu) {
    return {
      menu
    };
  }
  throw error(404, "Not found");
};
export {
  load
};
