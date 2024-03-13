<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  import { navigating } from '$app/stores';
  $: if($navigating) checkPage();

  import { language } from "./language";
  let lang: string;
	language.subscribe((language) => {
		lang = language;
	});

  export let data: PageData;
  $: logoColor=""
  let svgContentYellow = data.siteSettings[0].logo.replace('<svg', '<svg fill="#FFAF22" display="block"');
  let svgContentBlack = data.siteSettings[0].logo.replace('<svg', '<svg fill="#000" display="block"');

  let isHomepage = true;
  let isMenu = true;

  onMount(() => {
    checkPage()
    checkLanguage()
  });

  function checkPage() {
    console.log("navigating");
  }

  function checkLanguage() {
    // Check if userLanguage is stored in localStorage
    const storedLanguage = localStorage.getItem('userLanguage');
    if (storedLanguage && (storedLanguage === 'it' || storedLanguage === 'en')) {
      language.set(storedLanguage);
    } else {
      // If not stored or invalid, get the user's preferred language from userAgent
      const userAgentLanguage = navigator.language.substr(0, 2); // Get the first two characters for language code
      // Set the user's preferred language in localStorage if it's 'it' or 'en'
      if (userAgentLanguage === 'it' || userAgentLanguage === 'en') {
        localStorage.setItem('userLanguage', userAgentLanguage);
        language.set(userAgentLanguage);
      } else {
        localStorage.setItem('userLanguage', 'it'); // Set default language if language is not 'it' or 'en'
        language.set('it');
      }
    }
  }

  function changeLanguage(setLanguage) {
    if (setLanguage === 'it' || setLanguage === 'en') {
      localStorage.setItem('userLanguage', setLanguage);
      language.set(setLanguage);
    }
  }
</script>

{#if $navigating}
    <div style="display:block; background-color:yellow; position:fixed; z-index:999; top:0; left:0; width:100%; height:100%">LOADERRRRRR</div>
{/if}

<header>
  {#if data.siteSettings[0].logo}
    <a class="logo" href="/" class:menu="{$page.url.pathname === "/menu"}">
      {#if $page.url.pathname === "/"}
        {@html svgContentYellow}
      {:else}
        {@html svgContentBlack}
      {/if}
    </a>
  {/if}
  <ul id="languageSwitch">
    <button class:active="{lang === 'it'}" on:click={() => changeLanguage('it')}>IT</button> / <button class:active="{lang === 'en'}" on:click={() => changeLanguage('en')}>EN</button>
  </ul>
</header>

<slot></slot>
<footer>
  {#if isHomepage}
    <a class="menuItem" target="" href="/menu">{#if lang == "en"}Today's menu{/if}{#if lang == "it"}Menu di oggi{/if}</a>
  {:else if isMenu}
    <a class="menuItem" target="" href="/">Back to website</a>
  {/if}
  {#if data.siteSettings[0].mail}
    <a class="maps" target="_blank" href="{data.siteSettings[0].mapsLink}">{data.siteSettings[0].maps}</a>
  {/if}
  <div>
    {#if data.siteSettings[0].facebook}
      <a class="" target="_blank" href="{data.siteSettings[0].facebookLink}">{data.siteSettings[0].facebook}</a>
    {/if}
    {#if data.siteSettings[0].phone}
      <a class="" target="_blank" href="callto:{data.siteSettings[0].phone}">{data.siteSettings[0].phone}</a>
    {/if}
  </div>
</footer>

<style lang="css">
  .logo {
    position: fixed;
    left: 30vw;
    top: calc(var(--gutter)*3);
    width: 40vw;
    z-index: 1;
    transition: width ease-in-out .4s, left ease-in-out .4s, opacity ease-in-out .1s;
  }
  .logo.menu {
    left: 40vw;
    width: 20vw;
  }
  #languageSwitch {
    font-size: 12px;
  }
  ul {
    position: absolute;
    z-index: 1;
    top: calc(var(--gutter)*3);
    right: calc(var(--gutter)*1.75);
    margin: 0;
  }
  ul>button {
    text-decoration: none;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  ul>button:hover {
    opacity: .7;
  }
  ul>button.active {
    text-decoration: underline;
  }
  a {
    text-decoration: none;
  }
  img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #F7F5E5;
    width: calc(100% - var(--gutter)*1.75*2);
    z-index: 2;
    display: flex;
    justify-content: space-between;
    padding: calc(var(--gutter)*.75) calc(var(--gutter)*1.75);
    font-size: 12px;
    text-transform: uppercase;
  }
  footer > a, footer > div > a {
    color: #000;
  }
  footer > a:hover, footer > div > a:hover {
    opacity: .7;
  }
  footer > div {
    display: flex;
    gap: var(--gutter);
  }  
  a.menuItem {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  a.maps::after{
    content: " ↗";
  }
</style>