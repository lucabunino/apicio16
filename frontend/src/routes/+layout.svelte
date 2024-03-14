<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { page, navigating } from '$app/stores';
  import { quartInOut } from 'svelte/easing';
  import Loader from '../components/loader.svelte'; // Or whatever your component path is
	import { beforeNavigate, afterNavigate } from '$app/navigation';

  $: scrollY = ""
	$: isLoading = false;
  $: delayed = false;
  $: noTransition = false;
  $: resizeTimeout = "";

  beforeNavigate(() => {
    if ($page.url.pathname === "/menu") {
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
    checkLanguage()
  });

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

<svelte:window bind:scrollY={scrollY} on:resize={handleResize}/>

<header>
  {#if data.siteSettings[0].logo}
    <a class="logo" href="/" aria-current={$page.url.pathname === '/'} class:off="{$page.url.pathname === "/menu"}" class:reset={$navigating} class:noTransition={noTransition} style={$page.url.pathname === "/menu" ? `transform: translateY(-${scrollY}px)` : ''}>
      {@html svgContentYellow}
    </a>
    <a class="logo menu" href="/" aria-current={$page.url.pathname === '/about'} class:on="{$page.url.pathname === "/menu"}" class:reset={$navigating} class:noTransition={noTransition} style={$page.url.pathname === "/menu" ? `transform: translateY(-${scrollY}px)` : ''}>
      {@html svgContentBlack}
    </a>
  {/if}
  <ul id="languageSwitch">
    <button class:active="{lang === 'it'}" on:click={() => changeLanguage('it')}>IT</button> / <button class:active="{lang === 'en'}" on:click={() => changeLanguage('en')}>EN</button>
  </ul>
</header>

{#key data.pathname}
  <div style="overflow: hidden;" in:pageEnter={{ duration: 400, delay: delayed ? 800 : 1600 }} out:pageLeave={{ duration: 400, delay: delayed ? 0 : 800 }}>
    <slot></slot>
  </div>
{/key}

<footer class:menu="{$page.url.pathname === "/menu"}">
  {#if $navigating}
    <div id="loader" out:loaderLeave={{ duration: 800, delay: 800}}>
      <Loader />
    </div>
  {/if}
  {#if $page.url.pathname === "/"}
    <a class="menuItem" target="" href="/menu">
      {#if lang == "en"}Today's menu{/if}
      {#if lang == "it"}Menu di oggi{/if}
    </a>
  {:else}
    <a class="menuItem" target="" href="/">
      {#if lang == "en"}Back to website{/if}
      {#if lang == "it"}Torna al sito{/if}
    </a>
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
  /* .loader {
    background-color: #FFAF22;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: loaderAnimation 1s forwards;
    animation-delay: 1s;
  } */
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
    transition: opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, transform cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms;
    opacity: 1;
  }
  .logo.off {
    left: 40vw;
    width: 20vw;
    transition: opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms 1600ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms;
    opacity: 0;
  }
  .logo.menu {
    transition: opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms 1600ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, transform cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms;
    opacity: 0;
  }
  .logo.menu.on {
    transition: opacity cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 400ms, left cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms, width cubic-bezier( 0.770,  0.000,  0.175,  1.000 ) 800ms 800ms;
    left: 40vw;
    width: 20vw;
    opacity: 1;
  }
  .logo.noTransition,
  .logo.menu.noTransition {
    transition: none;
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
  footer.menu {
    /* border-top: solid 1px #000; */
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