<script lang="ts">
  import type { PageData } from './$types';
  import { onMount, afterUpdate, tick } from 'svelte';
  import { page, navigating } from '$app/stores';
  import { quartInOut } from 'svelte/easing';
  import Loader from '../components/loader.svelte'; // Or whatever your component path is
	import { beforeNavigate } from '$app/navigation';
  import {urlFor} from '$lib/utils/image';

  $: scrollY = ""
  $: delayed = false;
  $: noTransition = false;
  $: resizeTimeout = "";

  beforeNavigate(() => {
    if ($page.url.pathname === "/menu" || $page.url.pathname === "/cookie-policy" || $page.url.pathname === "/privacy") {
      delayed = false;
    } else {
      delayed = true;
    }
	});

  function handleResize() {
		noTransition = true; // Set noTransition to true on resize
    clearTimeout(resizeTimeout); // Clear any existing timeout
    resizeTimeout = setTimeout(() => {
      noTransition = false; // Set noTransition back to false after a delay
    }, 200); // Adjust the delay time as needed
	}
  function loaderEnter(node, { delay, duration}) {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = quartInOut(t);
				return `
          // transform-origin: left;
          // transform: scaleX(${1 - eased});
				`;
			}
		};
	}
  function loaderLeave(node, { delay, duration}) {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = quartInOut(t);
				return `
          transform: scaleX(${eased});
				`;
			}
		};
	}
  function pageEnter(node, { delay, duration, offset=window.scrollY}) {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = quartInOut(t);
				return `
          opacity: ${eased};
          // transform: translateY(${(1 - eased) * innerHeight}px);
				`;
			}
		};
	}
  function pageLeave(node, { delay, duration, offset=window.scrollY}) {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = quartInOut(t);
				return `
          // padding-top: ${(1 - eased) * innerHeight}px;
          // transform: translateY(.${offset*(1-eased)}px);
          opacity: ${eased};
          margin-top: -${offset}px;
				`;
			}
		};
	}

  import { language } from "./language";
  let lang: string;
	language.subscribe((language) => {
		lang = language;
	});

  export let data: PageData;
  let svgContentYellow = data.siteSettings[0].logo.replace('<svg', '<svg fill="#FFAF22" display="block"');
  let svgContentBlack = data.siteSettings[0].logo.replace('<svg', '<svg fill="#000" display="block"');

  onMount(() => {
    checkLanguage();
    calculateFooterHeight();
  });

  $: languageChecked = false;
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
    languageChecked = true
  }

  function changeLanguage(setLanguage) {
    if (setLanguage === 'it' || setLanguage === 'en') {
      localStorage.setItem('userLanguage', setLanguage);
      language.set(setLanguage);
    }
  }

  let footerHeightCurrent: number = undefined;
  $: footerH = "";
  import { footerHeight } from "./footerHeight";
	footerHeight.subscribe((footerHeight) => {
		footerH = footerHeight;
	});
  function calculateFooterHeight(event) {
    footerHeight.set(footerHeightCurrent)
	}
  // Subscribe to footerHeight after each update to ensure it's set properly
  afterUpdate(async () => {
    await tick();
    calculateFooterHeight();
  });
</script>

<svelte:head>
  <title>{data.siteSettings[0].title}</title>
  <meta name="description" content="Our gourmet restaurant, offering a journey that unearths those cherished fragments nestled in our minds since the dawn of time.">
  <link rel="canonical" href={$page.url}>
  <meta name="robots" content="index,follow">
  <meta name="googlebot" content="index,follow">
  <meta property="og:title" content={data.siteSettings[0].title}>
  <meta property="og:description" content={data.siteSettings[0].description.lang}>
  <meta property="og:image" content={urlFor(data.siteSettings[0].SEOImage).width(2000).url()}>
  <meta property="og:url" content={$page.url}>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content={data.siteSettings[0].title}>
</svelte:head>

<svelte:window bind:scrollY={scrollY} on:resize={calculateFooterHeight, handleResize}/>

{#if languageChecked}
  <header>
    {#if data.siteSettings[0].logo}
      <a class="logo" href="/" aria-current={$page.url.pathname === '/'} class:off="{$page.url.pathname === "/menu" || $page.url.pathname === "/cookie-policy" || $page.url.pathname === "/privacy"}" class:reset={$navigating} class:noTransition={noTransition} style={$page.url.pathname === "/menu" ? `transform: translateY(-${scrollY}px)` : ''}>
        {@html svgContentYellow}
      </a>
      <a class="logo menu" href="/" class:on="{$page.url.pathname === "/menu" || $page.url.pathname === "/cookie-policy" || $page.url.pathname === "/privacy"}" class:reset={$navigating} class:noTransition={noTransition} style={$page.url.pathname === "/menu" ? `transform: translateY(-${scrollY}px)` : ''}>
        {@html svgContentBlack}
      </a>
    {/if}
    <ul id="languageSwitch">
      <button class:active="{lang === 'it'}" on:click={() => changeLanguage('it')}>IT</button> / <button class:active="{lang === 'en'}" on:click={() => changeLanguage('en')}>EN</button>
    </ul>
  </header>

  {#key data.pathname}
    <div style={`--footerHeight: ${footerH}px; overflow: hidden;`} in:pageEnter={{ duration: 400, delay: delayed ? 800 : 1600 }} out:pageLeave={{ duration: 400, delay: delayed ? 0 : 800 }}>
      <slot></slot>
    </div>
  {/key}


  <footer class:menu="{$page.url.pathname === "/menu"}" bind:clientHeight={footerHeightCurrent} on:loadeddata={calculateFooterHeight}>
    {#if $navigating}
      <div id="loader" out:loaderLeave={{ duration: 800, delay: 800}}>
        <Loader />
      </div>
    {/if}
    {#if $page.url.pathname === "/"}
      <a class="menuItem" target="" href="/menu">
        <!-- {#if lang == "en"}Today's menu{/if}
        {#if lang == "it"}Menu del giorno{/if} -->
        {#if lang == "en"}Discover our menus{/if}
        {#if lang == "it"}Scopri i nostri menù{/if}
      </a>
    {:else}
      <a class="menuItem" target="" href="/">
        {#if lang == "en"}Back to website{/if}
        {#if lang == "it"}Torna al sito{/if}
      </a>
    {/if}
    {#if data.siteSettings[0].mail}
      <a class="maps" target="_blank" href="{data.siteSettings[0].mapsLink}">{data.siteSettings[0].maps} <span>&#8599;</span></a>
    {/if}
    {#if data.siteSettings[0].phone}
      <a class="phone" target="_blank" href="tel:{data.siteSettings[0].phone.replace(/\s/g, '')}">{data.siteSettings[0].phone}</a>
    {/if}
    {#if data.siteSettings[0].facebookLink}
      <a class="facebookLink" target="_blank" href="{data.siteSettings[0].facebookLink}">FB</a>
    {/if}
    {#if data.siteSettings[0].instagramLink}
      <a class="instagramLink" target="_blank" href="{data.siteSettings[0].instagramLink}">IG</a>
    {/if}
    {#if data.siteSettings[0].mail}
      <a class="mail" target="_blank" href="mailto:{data.siteSettings[0].mail}">{data.siteSettings[0].mail}</a>
    {/if}
    <div class="flexDivider"></div>
  </footer>
{/if}

<style lang="css">
  #loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    transform-origin: right;
  }
  @keyframes loaderAnimation {
    0% {
      transform: scaleX(0); /* Start with width 0 */
    }
    100% {
      transform: scaleX(1); /* End with width 100% */
    }
  }
  .logo {
    position: fixed;
    left: 30vw;
    top: calc(var(--gutter)*3);
    width: 40vw;
    z-index: 1;
    transition: opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, top cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, transform cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms;
    opacity: 1;
  }
  .logo.off {
    left: 40vw;
    width: 20vw;
    transition: opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms 1600ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, top cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms;
    opacity: 0;
  }
  .logo.menu {
    transition: opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms 1600ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, top cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, transform cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms;
    opacity: 0;
  }
  .logo.menu.on {
    transition: opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, top cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms;
    left: 40vw;
    width: 20vw;
    opacity: 1;
  }
  .logo.noTransition,
  .logo.menu.noTransition {
    transition: none;
  }
  #languageSwitch,
  #languageSwitch>button {
    color: #000;
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
    column-gap: var(--gutter);
    flex-wrap: wrap;
    justify-content: space-between;
    padding: calc(var(--gutter)*.75) calc(var(--gutter)*1.75);
    font-size: 14px;
    text-transform: uppercase;
  }
  footer > a {
    color: #000;
  }
  footer > a:hover {
    opacity: .7;
  }
  .phone {
    margin-right: auto;
  }
  a.menuItem {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .flexDivider {
    display: none;
    margin: 0;
    padding: 0;
  }
  
  @media only screen and (max-width: 1000px) {
    footer {
      justify-content: center;
    }
    a.menuItem {
      position: relative;
      margin-bottom: 2em;
      text-align: center;
      left: unset;
      transform: none;
      width: 100%;
    }
    .maps {
      order: 1;
    }
    .phone {
      order: 5;
      margin: 0;
    }
    .facebookLink {
      order: 2;
    }
    .instagramLink {
      order: 3;
    }
    .mail {
      order: 6;
    }
    .flexDivider {
      display: block;
      order: 4;
      width: 0;
      flex-basis: 100%;
    }
  }
  
  @media only screen and (max-width: 600px) {
    .logo {
      top: calc(var(--gutter)*3.5);
      width: 70vw;
      left: 15vw;
    }
    .logo.off,
    .logo.menu.on {
      left: 21vw;
      width: 58vw;
      top: calc(var(--gutter)*2);
    }
    .logo.menu {
      opacity: 0;
    }
    ul {
      top: calc(var(--gutter));
      right: calc(var(--gutter)*1.5);
    }
    #languageSwitch,
    #languageSwitch>button {
      font-size: 15px;
    }
  }

  @media only screen and (max-width: 350px) {
    footer > div {
      flex-direction: column;
      gap: 0;
    }
  }
</style>