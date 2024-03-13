<script lang="ts">
  import type { PageData } from './$types';
  import {urlFor} from '$lib/utils/image';
  import { onMount } from 'svelte';
  import {PortableText} from '@portabletext/svelte'
  import portableTextStyle from '../components/portableTextStyle.svelte';
  export let data: PageData;

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
			// navigation: {
			// 	nextEl: '.swiper-button-next',
			// 	prevEl: '.swiper-button-prev',
			// },
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
		};

		// now we need to assign all parameters to Swiper element
		Object.assign(swiperEl, swiperParams);
		swiperEl.initialize();
	});
</script>

{#if data.homepage}
  {#each data.homepage[0].contents as block}
    <section class={block.kind}>
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
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->
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
      <picture>
        <img
        src={urlFor(data.siteSettings[0].footerImage).url()}
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
    {#if lang == "en"}
      <form action="">
        <input type="text" id="fname" name="fname" placeholder="First name (required)">
        <input type="text" id="lname" name="lname" placeholder="Last name (required)">
        <input type="email" id="email" name="email" placeholder="E-mail (required)">
        <input type="tel" id="phone" name="phone" placeholder="Phone">
        <textarea type="text" id="message" name="message" placeholder="Message" maxlength="400"></textarea>
      </form>
    {:else if lang == "it"}
      <form action="">
        <input type="text" id="fname" name="fname" placeholder="Nome (obbligatorio)">
        <input type="text" id="lname" name="lname" placeholder="Cognome (obbligatorio)">
        <input type="email" id="email" name="email" placeholder="E-mail (obbligatorio)">
        <input type="tel" id="phone" name="phone" placeholder="Telefono">
        <textarea type="text" id="message" name="message" placeholder="Messaggio" maxlength="400"></textarea>
      </form>
    {/if}
  </div>
  <button id="submit" class="btn" href="/menu">{#if lang == "en"}Submit{:else if lang == "it"}Invia{/if}</button>
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
    height: 100vh;
  }
  section.slider>picture>img {
    width: 50%;
    height: 100%;
    position: absolute;
    right: 0;
    object-fit: cover;
  }
  swiper-container {
    width: 25%;
    height: 60vh;
    left: 12.5%;
    top: 20vh;
    position: absolute;
    z-index: 0;
  }
  swiper-slide>picture.slide>img {
    width: 100%;
    height: 50vh;
    position: relative;
    object-fit: cover;
  }
  swiper-container::part(bullet) {
    background: transparent;
    border: solid 1px #000;
    width: 6px;
    height: 6px;
    opacity: 1;
  }
  swiper-container::part(bullet-active) {
    background: #000;
    border: solid 1px #000;
    width: 6px;
    height: 6px;
    opacity: 1;
  }
  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    height: 50vh;
    width: 12.5%;
    top: 15vh;
    z-index: 2;
    opacity: 0;
    cursor: pointer;
  }
  .swiper-button-prev {
    left: 12.5%;
  }
  .swiper-button-next {
    left: 25%;
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
    max-width: 800px;
    text-align: center;
    margin: auto;
    padding: 100px 0;
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
    padding: 40px 0;
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
    background-color: #FFAF22;
  }
  #form>p {
    margin: 0;
    padding: var(--gutter) calc(var(--gutter)*1.75);
    font-size: 18px;
    line-height: 25.2px;
  }
  input, textarea {
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
    font-family: 'GoodSans-Regular';
    font-weight: 400;
  }
  textarea{
    min-height: 150px;
    resize: none;
    margin-bottom: 56px;
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
  }
</style>