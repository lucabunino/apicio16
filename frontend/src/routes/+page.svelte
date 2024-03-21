<script lang="ts">
  import type { PageData } from './$types';
  import {urlFor} from '$lib/utils/image';
  import { onMount } from 'svelte';
  import {PortableText} from '@portabletext/svelte'
  import portableTextStyle from '../components/portableTextStyle.svelte';
  export let data: PageData;
  export let form;
  import { enhance } from '$app/forms';  

  // import function to register Swiper custom elements
  import { register } from 'swiper/element/bundle';
  // register Swiper custom elements
  register();

  import { language } from "./language";
  let lang: string;
	language.subscribe((language) => {
		lang = language;
	});
  
  export let open = false;
  import { slide } from 'svelte/transition';
  import { quadInOut } from 'svelte/easing';
	const openMenu = () => open = !open

  onMount(() => {
		// swiper element
		const swiperEl = document.querySelector('swiper-container');
		

		// swiper parameters
		const swiperParams = {
			slidesPerView: 1,
			loop: true,
			simulateTouch: true,
			navigation: true,
			pagination: {
        bullets: true,
        clickable: true,
      },
			effect: "slide",
			autoplay: {
				delay: 4000,
				disableOnInteraction: true,
				waitForTransition: true,
			},
			removeClippedSubviews: false,
			observer: true,
			observeParents: true,
			speed: 400,
			keyboard: true,
			direction: "horizontal",
			hashNavigation: true,
			breakpoints: {
				600: {
					
				},
			},	
      injectStyles: [
        `
        .swiper-button-next>svg,
        .swiper-button-prev>svg {
          display:none;
        }
        `,
      ],		
		};

		// now we need to assign all parameters to Swiper element
		Object.assign(swiperEl, swiperParams);
		swiperEl.initialize();
	});
</script>

<svelte:window/>

{#if data.homepage}
  {#each data.homepage[0].contents as block}
    <section class={block.kind}>
      {#if block.sliderImages}
      <swiper-container init="false">
        {#each block.sliderImages as sliderImage}
          <swiper-slide>
            <picture class="slide">
              <img
              src={urlFor(sliderImage.sliderImage).url()}
              alt="Halfscreen of Apicio16"
              />
            </picture>
            <p class="caption">{sliderImage.sliderCaption[lang]}</p>
          </swiper-slide>
        {/each}
      </swiper-container>
      {/if}
      {#if block.image}
        <picture>
          <img
          src={urlFor(block.image).url()}
          alt="Fullscreen of Apicio16"
          />
        </picture>
      {/if}
      {#if block.text}
        <h2>{block.text[lang]}</h2>
      {/if}
      {#if block.menuTitle}
        <h3 on:click={openMenu} class:open>{block.menuTitle[lang]} <span>↓</span></h3>
          <div class="menuContent">
            {#if open}
              <div transition:slide={{duration: 200, easing: quadInOut}}>
                <div class="menuContentChild">
                  <PortableText 
                    value={block.menuContent[lang]}
                    components={{
                      block: {
                        normal: portableTextStyle,
                        h1: portableTextStyle,
                        h2: portableTextStyle,
                        h3: portableTextStyle,
                        h4: portableTextStyle,
                        h5: portableTextStyle,
                      }
                    }}
                  />
                </div>
              </div>
            {/if}
          </div>
      {/if}
    </section>
  {/each}
{:else}
	<p>No blocks found.</p>
{/if}

<section id="preFooter">
  <div>
    {#if data.siteSettings[0].footerImage}
      <picture class="desktopOnly">
        <img
        src={urlFor(data.siteSettings[0].footerImage).url()}
        alt="Outsides of Apicio16"
        />
      </picture>
    {/if}
    {#if data.siteSettings[0].footerImageMobile}
      <picture class="mobileOnly">
        <img
        src={urlFor(data.siteSettings[0].footerImageMobile).url()}
        alt="Outsides of Apicio16"
        />
      </picture>
    {/if}
    <div id="cta">
      <a class="btn" href="mailto:{data.siteSettings[0].mail}">Book a table</a>
      <a class="btn" href="/menu">Read the menu</a>
    </div>
  </div>
  <div id="form">
    <p>{#if lang == "en"}Get in touch with us by filling out the contact form, and we'll get back to you as soon as possible.{:else if lang == "it"}Mettiti in contatto con noi compilando il modulo di contatto e ti risponderemo il prima possibile.{/if}</p>
    <form
    action="?/create"
    method="POST"
    use:enhance
    >
      <input type="text" id="fname" name="fname" value={form?.fname ?? ''} placeholder={lang == "en" ? `First name (required)` : 'Nome (obbligatorio)'} required>
      <input type="text" id="lname" name="lname" value={form?.lname ?? ''} placeholder={lang == "en" ? `Last name (required)` : 'Cognome (obbligatorio)'} required>
      <input type="email" id="email" name="email" value={form?.email ?? ''} placeholder={lang == "en" ? `E-mail (required)` : 'E-mail (obbligatorio)'} required>
      <input type="tel" id="phone" name="phone" value={form?.phone ?? ''} placeholder={lang == "en" ? `Phone` : 'Numero di telefono'}>
      <div class="textarea-container">
        <textarea type="text" id="message" name="message" placeholder={lang == "en" ? `Message` : 'Messaggio'} maxlength="400"></textarea>
      </div>
      <button id="submit" type="submit" class="btn" href="/menu">
        {#if lang === "en"}
          {#if form?.success}
            Message submitted
          {:else if form?.success == false}
            Something went wrong, retry!
          {:else}
            Submit
          {/if}
        {:else if lang === "it"}
          {#if form?.success}
            Messaggio inviato
          {:else if form?.success == false}
            Qualcosa è andato storto, riprova!
          {:else}
            Invia
          {/if}
        {/if}
      </button>
    </form>
  </div>
</section>

<style lang="css">
  h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
  }
  section {
    display: block;
    position: relative;
    width: 100%;
  }
  section.media {
    height: 100vh;
  }
  section.media>picture>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  section.slider {
    width: 100%;
    max-height: 100vh;
    background-color: #F7F5E5;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
  }
  section.slider>picture {
    width: 100%;
    height: 100%;
    display: block;
  }
  section.slider>picture>img {
    width: 100%;
    height: 100%;
    position: relative;
    object-fit: cover;
    display: block;
  }
  swiper-container {
    width: 25vw;
    height: auto;
    position: relative;
    z-index: 0;
  }
  swiper-slide {
    cursor: grab;
  }
  swiper-slide:active {
    cursor: grabbing;
  }
  swiper-slide>picture.slide {
    display: grid;
  }
  swiper-slide>picture.slide>img {
    aspect-ratio: 2/3;
    max-width: 100%;
    max-height: 75vh;
    object-fit: cover;
    object-position: center;
    align-self: center;
    justify-self: center;
  }
  swiper-container::part(button-prev),
  swiper-container::part(button-next) {
    opacity: 1;
    top: 0;
    margin: 0;
    width: 50%;
    max-width: 12.5vw;
    height: calc(25vw/2*3);
    max-height: 75vh;
  }
  swiper-container::part(button-prev) {
    left: 0;
    cursor: w-resize;
  }
  swiper-container::part(button-next) {
    right: 0;
    cursor: e-resize;
  }
  swiper-container::part(bullet),
  swiper-container::part(bullet-active) {
    background: transparent;
    border: solid 1px #000;
    width: 5px;
    height: 5px;
    opacity: 1;
    margin: 0 3px;
  }
  swiper-container::part(bullet-active) {
    background: #000;
  }
  swiper-container::part(pagination) {
    margin-top: var(--gutter);
    position: relative;
  }
  .caption {
    font-size: 12px;
    text-align: center;
    margin: 0;
    margin-top: calc(var(--gutter)/2);
  }
  section.text {
    background-color: #FFAF22;
    height: auto;
    z-index: 2;
  }
  h2 {
    line-height: 25.2px;
    max-width: 900px;
    text-align: center;
    margin: auto;
    padding: 100px 20px;
    font-size: 18px;
  }
  section.menu {
    height: auto;
    background-color: #FFAF22;
    z-index: 2;
  }
  h3 {
    line-height: 25.2px;
    max-width: 800px;
    text-align: center;
    margin: auto;
    padding: 100px 0;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 18px;
  }
  h3:hover, h3.open {
    color: #F7F5E5;
  }
  h3>span {
    display: inline-block;
    transition: var(--transition);
    transition-property: transform;
    /* font-family: 'GoodSans-Regular'; */
  }
  h3.open>span {
    transform: rotate(180deg);
  }
  .menuContent {
    text-align: center;
  }
  .menuContentChild {
    border-top: solid 1px #000;
    margin: auto;
    padding: 40px calc(var(--gutter)*2);
    box-sizing: border-box;
    line-height: 18px;
    display: grid;
    justify-content: center;
  }
  #preFooter {
    z-index: 2;
    display: block;
    position: relative;
    width: 100%;
    z-index: 2;
    background-color: #F7F5E5;
    padding-bottom: var(--footerHeight);
  }
  #preFooter>div,
  #preFooter>div>picture {
    display: block;
    height: auto;
    position: relative;
  }
  #preFooter>div>picture>img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
    object-fit: cover;
  }
  #cta {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    width: auto;
    transform: translateX(-50%) translateY(-50%);
    gap: var(--gutter);
  }
  .btn {
    padding: 1rem;
    background-color: #FFAF22;
    color: #000;
    border-radius: 100px;
    text-decoration: none;
    text-align: center;
    font-size: 13px;
    text-transform: uppercase;
    padding: 17px 0;
    width: 200px;
    letter-spacing: -0.01em;
    border: none;
  }
  .btn:hover {
    background-color: #F7F5E5;
  }
  #form {
    /* background-color: #FFAF22; */
  }
  #form>p {
    margin: 0;
    padding: var(--gutter) calc(var(--gutter)*1.75);
    font-size: 18px;
    line-height: 25.2px;
    background-color: #FFAF22;
    border-top: solid 1px #FFAF22;
  }
  input {
    margin: 0;
    padding: var(--gutter) calc(var(--gutter)*1.75);
    font-size: 18px;
    line-height: 25.2px;
    border: none;
    display: block;
    width: calc(100% - var(--gutter)*3.5);
    border-top: solid 1px #000;
    background-color: #F7F5E5;
    color: #000;
    font-family: 'GoodSans-Regular', Arial, Helvetica, sans-serif;
    font-weight: 400;
    border-radius: 0;
  }
  .textarea-container {
    margin: 0;
    width: 100%;
    border-top: solid 1px #000;
    background-color: #F7F5E5;
    display: block;
  }
  textarea {
    max-width: 900px;
    margin: 0;
    padding: var(--gutter) calc(var(--gutter)*1.75);
    width: calc(100% - var(--gutter)*3.5);
    border: none;
    background-color: #F7F5E5;
    color: #000;
    font-family: 'GoodSans-Regular', Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 25.2px;
    min-height: 150px;
    resize: none;
    border-radius: 0;
  }
  input[type="search"] {
    -webkit-appearance: none;
  }
  textarea:focus, input:focus{
    outline: none;
  }
  ::placeholder {
    color: #000;
    opacity: 1; /* Firefox */
  }
  ::-ms-input-placeholder { /* Edge 12 -18 */
    color: #000;
  }
  #submit {
    width: auto;
    padding-left: 39px;
    padding-right: 39px;
    position: absolute;
    right: calc(var(--gutter)*1.75);
    bottom: 0%;
    cursor: pointer;
    margin-bottom: calc(var(--gutter)*2);
  }
  .mobileOnly {
    display: none !important;
  }
  /* #form-message {
    display: block;
    position: absolute;
    left: 0;
    font-size: 13px;
  } */


  
  @media only screen and (max-width: 600px) {
    .logo {
      top: calc(var(--gutter)*3.5);
      width: 70vw;
      left: 15vw;
    }
    h2 {
      padding: 85px 20px;
    }
    h3 {
      padding: 85px 20px;
    }
    section.slider {
      height: auto;
      grid-template-columns: repeat(1, 1fr);
    }
    section.slider>picture {
      display: none;
    }
    swiper-container {
      width: 100%;
      height: auto;
      padding: 0;
      position: relative;
      left: 0;
      top: 0;
      padding: calc(var(--gutter)*3) 0;
      overflow: auto;
    }
    swiper-slide {
      width: 100%;
    }
    swiper-slide>picture {
      width: calc(100% - var(--gutter)*6);
      padding: 0 calc(var(--gutter)*3);
      display: block;
    }
    swiper-slide>picture.slide>img {
      height: auto;
      aspect-ratio: 2/3;
    }
    swiper-container::part(button-prev),
    swiper-container::part(button-next) {
      display: none;
    }
    .caption {
      font-size: 14px;
      line-height: 18px;
      margin-top: calc(var(--gutter)*2);
      /* padding-bottom: calc(var(--gutter)*2.5); */
    }
    .desktopOnly {
      display: none !important;
    }
    .mobileOnly {
      display: block !important;
    }
    #cta {
      flex-direction: column;
      gap: 60px;
    }
    input, textarea {
      padding: calc(var(--gutter)*2.75) calc(var(--gutter)*1.75);
    }
    textarea{
      border-bottom: solid 1px #000;
      margin-bottom: 20px;
    }
    #submit {
      /* position: relative;
      margin-bottom: 0;
      right: unset;
      display: block;
      margin: auto; */
      position: relative;
      margin-bottom: var(--gutter);
      right: unset;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>