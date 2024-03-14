import { c as create_ssr_component, o as onDestroy, d as each, f as add_styles, e as escape, n as null_to_empty } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { l as language } from "../../../chunks/language.js";
const css = {
  code: "h2.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx,h3.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx,h4.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx,p.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{margin:0}#meals.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{padding-top:calc(var(--gutter)*6 + 8vw)}.meal.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{display:grid;border-top:solid 1px #000;position:relative}.meal.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx:last-of-type{border-bottom:solid 1px #000;margin-bottom:36px;box-sizing:border-box}.meal.svelte-61wfvx>div.svelte-61wfvx.svelte-61wfvx{align-items:center;display:grid;cursor:pointer}h2.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{text-align:center;font-weight:400;text-transform:uppercase}h2.svelte-61wfvx>span.svelte-61wfvx.svelte-61wfvx,h3.svelte-61wfvx>span.svelte-61wfvx.svelte-61wfvx{display:inline-block;transition:var(--transition);transition-property:transform}h2.open.svelte-61wfvx>span.svelte-61wfvx.svelte-61wfvx,h3.open.svelte-61wfvx>span.svelte-61wfvx.svelte-61wfvx{transform:rotate(180deg)}.meal.svelte-61wfvx>div.svelte-61wfvx:hover>h2.svelte-61wfvx,h2.open.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{color:#F7F5E5}.course.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{background-color:#F7F5E5}.course.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx:first-of-type{border-top:none}h3.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{font-weight:400;text-transform:uppercase;border-top:solid 1px #000;font-size:18px;line-height:18px;padding:calc(var(--gutter)*1.25) calc(var(--gutter)*1.75)}h3.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx:hover{opacity:.7}h3.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx:first-of-type{border:none}.dishes.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{cursor:default;padding:57px 0 27px;border-top:solid 1px #000;text-align:center;display:grid}.dish.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{max-width:640px;justify-self:center;margin-top:36px}.dish.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx:first-of-type{margin-top:0}h4.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{font-size:18px;line-height:18px;font-weight:400;text-transform:uppercase}.dish.svelte-61wfvx>p.svelte-61wfvx.svelte-61wfvx{font-size:14px;line-height:18px}sup.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{font-size:10px}.allergens.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{margin-top:48px;font-size:12px;line-height:15px;padding:0 calc(var(--gutter)*1.75)}.allergens.svelte-61wfvx>span.svelte-61wfvx.svelte-61wfvx{display:block}.menuContentDivider.svelte-61wfvx.svelte-61wfvx.svelte-61wfvx{height:1px;background-color:#000;width:100%;transition:all ease-in-out .6s}",
  map: null
};
let gutter = 12;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerWidth;
  let innerHeight;
  let ready = false;
  onDestroy(() => ready = false);
  let lang;
  language.subscribe((language2) => {
    lang = language2;
  });
  let { data } = $$props;
  console.log(data);
  let open = null;
  let openDishes = /* @__PURE__ */ new Set();
  let allAllergens = [];
  data.menu.forEach((menu) => {
    menu.menuContents.forEach((content) => {
      content.mealContent.forEach((meal) => {
        meal.dishes.forEach((dish) => {
          dish.dishReference.allergens.forEach((allergen) => {
            if (!allAllergens.some((a) => a.number === allergen.number)) {
              allAllergens.push(allergen);
            }
          });
        });
      });
    });
  });
  console.log(allAllergens);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  innerWidth = 0;
  innerHeight = 0;
  return ` ${ready ? `` : ``} <div id="meals" class="svelte-61wfvx">${each(data.menu[0].menuContents, (content, i) => {
    return `${ready ? `<section class="meal svelte-61wfvx"><div class="svelte-61wfvx"${add_styles({
      "height": `${(innerHeight - (gutter * 6 + innerWidth / 100 * 8) - 37 - data.menu[0].menuContents.length) / data.menu[0].menuContents.length}px`
    })}><h2 class="${escape(null_to_empty(open == content ? "open" : ""), true) + " svelte-61wfvx"}">${escape(content.meal[lang])} <span class="svelte-61wfvx" data-svelte-h="svelte-1nbea6p">↓</span></h2></div> ${open === content ? `<div class="menuContentDivider svelte-61wfvx"></div> <div class="course svelte-61wfvx">${each(content.mealContent, (meal) => {
      return `<h3 class="${escape(null_to_empty(openDishes.has(meal) ? "open" : ""), true) + " svelte-61wfvx"}">${escape(meal.course[lang])} <span class="svelte-61wfvx" data-svelte-h="svelte-1nbea6p">↓</span></h3> ${openDishes.has(meal) ? `<div><div class="dishes svelte-61wfvx">${each(meal.dishes, (dish) => {
        return `<div class="dish svelte-61wfvx"><h4 class="svelte-61wfvx">${escape(dish.dishReference.title[lang])} ${each(dish.dishReference.allergens, (allergene) => {
          return `<sup class="svelte-61wfvx">${escape(allergene.number)}${dish.dishReference.allergens.indexOf(allergene) < dish.dishReference.allergens.length - 1 ? `–` : ``}</sup>`;
        })}</h4> <p class="dishDescription svelte-61wfvx">${escape(dish.dishReference.description[lang])}</p> <p class="dishPrice svelte-61wfvx">€ ${escape(dish.dishReference.price)}</p> </div>`;
      })} ${allAllergens ? `<p class="allergens svelte-61wfvx">${each(allAllergens, (allergen) => {
        return `<span class="svelte-61wfvx">${escape(allergen.number)}–${escape(allergen.title[lang])}: ${escape(allergen.description[lang])}</span>`;
      })} </p>` : ``}</div> </div>` : ``}`;
    })} </div>` : ``} </section>` : ``}`;
  })}</div>  `;
});
export {
  Page as default
};
