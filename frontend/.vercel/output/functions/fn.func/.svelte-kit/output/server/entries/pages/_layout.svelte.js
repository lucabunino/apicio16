import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, v as validate_component } from "../../chunks/ssr.js";
import { p as page, n as navigating } from "../../chunks/stores.js";
import "../../chunks/client.js";
import { l as language } from "../../chunks/language.js";
const css$1 = {
  code: ".loader.svelte-1cg9lte{background-color:#FFAF22;position:absolute;z-index:-1;bottom:0;left:0;width:100%;height:100%;animation:svelte-1cg9lte-loaderAnimation 800ms;transform-origin:left}@keyframes svelte-1cg9lte-loaderAnimation{0%{width:0}100%{width:100%}}",
  map: null
};
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="loader svelte-1cg9lte"></div>`;
});
const css = {
  code: '#loader.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:-1;transform-origin:right}@keyframes svelte-1ctvftm-loaderAnimation{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}.logo.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{position:fixed;left:30vw;top:calc(var(--gutter)*3);width:40vw;z-index:1;transition:opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, transform cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms;opacity:1}.logo.off.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{left:40vw;width:20vw;transition:opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms 1600ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms;opacity:0}.logo.menu.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{transition:opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms 1600ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, transform cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms;opacity:0}.logo.menu.on.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{transition:opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms;left:40vw;width:20vw;opacity:1}.logo.noTransition.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm,.logo.menu.noTransition.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{transition:none}#languageSwitch.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{font-size:12px}ul.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{position:absolute;z-index:1;top:calc(var(--gutter)*3);right:calc(var(--gutter)*1.75);margin:0}ul.svelte-1ctvftm>button.svelte-1ctvftm.svelte-1ctvftm{text-decoration:none;padding:0;border:none;background:transparent;cursor:pointer}ul.svelte-1ctvftm>button.svelte-1ctvftm.svelte-1ctvftm:hover{opacity:.7}ul.svelte-1ctvftm>button.active.svelte-1ctvftm.svelte-1ctvftm{text-decoration:underline}a.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{text-decoration:none}footer.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{position:fixed;left:0;bottom:0;background-color:#F7F5E5;width:calc(100% - var(--gutter)*1.75*2);z-index:2;display:flex;justify-content:space-between;padding:calc(var(--gutter)*.75) calc(var(--gutter)*1.75);font-size:12px;text-transform:uppercase}footer.svelte-1ctvftm>a.svelte-1ctvftm.svelte-1ctvftm,footer.svelte-1ctvftm>div.svelte-1ctvftm>a.svelte-1ctvftm{color:#000}footer.svelte-1ctvftm>a.svelte-1ctvftm.svelte-1ctvftm:hover,footer.svelte-1ctvftm>div.svelte-1ctvftm>a.svelte-1ctvftm:hover{opacity:.7}footer.svelte-1ctvftm>div.svelte-1ctvftm.svelte-1ctvftm{display:flex;gap:var(--gutter)}a.menuItem.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm{position:absolute;left:50%;transform:translateX(-50%)}a.maps.svelte-1ctvftm.svelte-1ctvftm.svelte-1ctvftm::after{content:" ↗"}',
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let scrollY;
  let noTransition;
  let $page, $$unsubscribe_page;
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let lang;
  language.subscribe((language2) => {
    lang = language2;
  });
  let { data } = $$props;
  let svgContentYellow = data.siteSettings[0].logo.replace("<svg", '<svg fill="#FFAF22" display="block"');
  let svgContentBlack = data.siteSettings[0].logo.replace("<svg", '<svg fill="#000" display="block"');
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  scrollY = "";
  noTransition = false;
  $$unsubscribe_page();
  $$unsubscribe_navigating();
  return ` <header>${data.siteSettings[0].logo ? `<a class="${[
    "logo svelte-1ctvftm",
    ($page.url.pathname === "/menu" ? "off" : "") + " " + ($navigating ? "reset" : "") + " " + (noTransition ? "noTransition" : "")
  ].join(" ").trim()}" href="/"${add_attribute("aria-current", $page.url.pathname === "/", 0)}${add_attribute(
    "style",
    $page.url.pathname === "/menu" ? `transform: translateY(-${scrollY}px)` : "",
    0
  )}><!-- HTML_TAG_START -->${svgContentYellow}<!-- HTML_TAG_END --></a> <a class="${[
    "logo menu svelte-1ctvftm",
    ($page.url.pathname === "/menu" ? "on" : "") + " " + ($navigating ? "reset" : "") + " " + (noTransition ? "noTransition" : "")
  ].join(" ").trim()}" href="/"${add_attribute("aria-current", $page.url.pathname === "/about", 0)}${add_attribute(
    "style",
    $page.url.pathname === "/menu" ? `transform: translateY(-${scrollY}px)` : "",
    0
  )}><!-- HTML_TAG_START -->${svgContentBlack}<!-- HTML_TAG_END --></a>` : ``} <ul id="languageSwitch" class="svelte-1ctvftm"><button class="${["svelte-1ctvftm", lang === "it" ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-5ggyp2">IT</button> / <button class="${["svelte-1ctvftm", lang === "en" ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-1ih6kts">EN</button></ul></header> <div style="overflow: hidden;">${slots.default ? slots.default({}) : ``}</div> <footer class="${["svelte-1ctvftm", $page.url.pathname === "/menu" ? "menu" : ""].join(" ").trim()}">${$navigating ? `<div id="loader" class="svelte-1ctvftm">${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}</div>` : ``} ${$page.url.pathname === "/" ? `<a class="menuItem svelte-1ctvftm" target="" href="/menu">${lang == "en" ? `Today&#39;s menu` : ``} ${lang == "it" ? `Menu di oggi` : ``}</a>` : `<a class="menuItem svelte-1ctvftm" target="" href="/">${lang == "en" ? `Back to website` : ``} ${lang == "it" ? `Torna al sito` : ``}</a>`} ${data.siteSettings[0].mail ? `<a class="maps svelte-1ctvftm" target="_blank"${add_attribute("href", data.siteSettings[0].mapsLink, 0)}>${escape(data.siteSettings[0].maps)}</a>` : ``} <div class="svelte-1ctvftm">${data.siteSettings[0].facebook ? `<a class=" svelte-1ctvftm" target="_blank"${add_attribute("href", data.siteSettings[0].facebookLink, 0)}>${escape(data.siteSettings[0].facebook)}</a>` : ``} ${data.siteSettings[0].phone ? `<a class=" svelte-1ctvftm" target="_blank" href="${"callto:" + escape(data.siteSettings[0].phone, true)}">${escape(data.siteSettings[0].phone)}</a>` : ``}</div> </footer>`;
});
export {
  Layout as default
};
