<script lang="ts">
  import type { PageData } from './$types';
  
  
  import { slide } from 'svelte/transition';
  import { quadInOut } from 'svelte/easing';
  import { quartInOut } from 'svelte/easing';
  import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
  import { beforeNavigate } from '$app/navigation';

  $: footerH = ""
  import { footerHeight } from "../footerHeight";
	footerHeight.subscribe((footerHeight) => {
		footerH = footerHeight;
	});
  $: mealHeight = (innerHeight - (gutter*6 + innerWidth/100*8) - (footerH+1) - data.menu[0].menuContents.length)/data.menu[0].menuContents.length

  let ready = false;
  onMount(() => {
		ready = true;
    footerHeight.set(footerH);
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', handleClick);
    });
	});
  function handleClick(event) {
    open = null
  }
	onDestroy(() => {
    ready = false;
  });
  beforeNavigate(() => {
		ready = false;
	});
  function menuEnter(node, { delay, duration }) {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = quartInOut(t);
				return `
          transform: translateY(${(1 - eased) * innerHeight}px);
				`;
			}
		};
	}
  function menuLeave(node, { delay, duration }) {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = quartInOut(t);
				return `
          transform: translateY(-${(1 - eased) * innerHeight * 1.1}px);
				`;
			}
		};
	}

  import { language } from "../language";
  import Layout from '../+layout.svelte';
  let lang: string;  
	language.subscribe((language) => {
		lang = language;
	});
  
  export let data: PageData;
  console.log(data);
  

  let open: string | null = null;
  let openDishes = new Set();

  function openMeal(content: string) {
    if (openDishes.size != 0) {
      if (open === content) {
        openDishes = null;
        openDishes = new Set(openDishes);
        setTimeout(() => {
          open = null;
        }, 200);
      } else {
        openDishes = null;
        openDishes = new Set(openDishes);
        setTimeout(() => {
          open = content;
        }, 200);
      }
    } else {
      if (open === content) {
        open = null;
        openDishes = new Set(openDishes);
      } else {
        open = content;
      }
    }
  }

  function toggleDish(meal: string) {
    if (openDishes.has(meal)) {
      openDishes.delete(meal);
    } else {
      openDishes.add(meal);
    }
    openDishes = new Set(openDishes);
  }  
  
  $: innerWidth = 0
	$: innerHeight = 0

  let gutter = 12;
  const allergenNumbers = new Set<string>();
</script>

<svelte:window bind:innerWidth bind:innerHeight/>

<div id="meals">
  {#each data.menu[0].menuContents as content, i (content)}
    {#if ready}
      <section class="meal" in:menuEnter={{delay: 800 + i*50, duration: 1000}} out:menuLeave={{delay: i*50, duration: 800}}>
          <div class={open == content ? 'open' : ''} on:click={openMeal(content)} style:height={innerWidth > 600 ? `${mealHeight}px` : '180px'}>
            <h2 class={open == content ? 'open' : ''} >{content.meal[lang]} <span>&#8595;</span></h2>
          </div>
          {#if open === content}
            <div class="course" transition:slide={{duration: 200, easing: quadInOut}}>
              {#each content.mealContent as meal}
                <h3 class={openDishes.has(meal) ? 'open' : ''} on:click={() => { toggleDish(meal); open == content; }}>{meal.course[lang]} <span>&#8595;</span></h3>
                {#if openDishes.has(meal)}
                <div transition:slide={{duration: 200, easing: quadInOut}}>
                  <div class="dishes">
                    {#each meal.dishes as dish}
                      <div class="dish">
                        {#if dish.dishReference.title}
                          <h4>{dish.dishReference.title[lang] ? dish.dishReference.title[lang] : dish.dishReference.title['it']}
                            {#if dish.dishReference.allergens}
                              {#each dish.dishReference.allergens as allergene}
                                <sup>{allergene.number}{#if dish.dishReference.allergens.indexOf(allergene) < dish.dishReference.allergens.length - 1}–{/if}</sup>
                              {/each}
                            {/if}
                          </h4>
                        {/if}
                        {#if dish.dishReference.description}
                          <p class="dishDescription">{dish.dishReference.description[lang]}</p>
                        {/if}
                        {#if dish.dishReference.price}
                        <p class="dishPrice">€ {dish.dishReference.price}</p>
                        {/if}
                      </div>
                    {/each}
                    {#if meal.dishes.some(dish => dish.dishReference && dish.dishReference.allergens && dish.dishReference.allergens.length > 0)}
                      <p class="allergens">
                        <span><strong>{lang == 'it' ? 'Il nostro staff è a disposizione per maggiori informazioni in caso di allergie ed intolleranze' : 'For further information about allergens in our dishes, please ask our staff'}</strong></span>
                        <br>                    
                        {#each data.allergens as allergen, i}
                          <span>
                            {#if i > 0}, {/if}{allergen.number}–{allergen.title[lang]}{#if allergen.description}: {allergen.description[lang]}{/if}
                          </span>
                        {/each}
                        <br>
                        <span>{lang == 'it' ? 'Il pesce servito crudo è stato sottoposto ad abbattimento rapido (Reg.CE 853/04)' : 'Our fresh fishery products has been blast chilled (Reg.CE 853/04)'}</span>
                      </p>
                    {/if}
                  </div>
                </div>
                {/if}
              {/each}
            {#if content.mealNotes}
              <p class="notes">{content.mealNotes[lang]}</p>
            {/if}
            </div>
          {/if}
      </section>
    {/if}
  {/each}
</div>

<style lang="css">
  h1, h2, h3, h4, h5, p{
    margin: 0;
  }
  #meals {
    padding-top: calc(var(--gutter)*6 + 8vw);
  }
  .meal {
    display: -ms-grid;
    display: grid;
    border-top: solid 1px #000;
    position: relative;
  }
  .meal:last-of-type {
    border-bottom: solid 1px #000;
    margin-bottom: var(--footerHeight);
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }
  .meal>div{
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    display: -ms-grid;
    display: grid;
    cursor: pointer;
  }
  .meal>div.open{
    background-color: #F7F5E5;
  }
  h2 {
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
  }
  h2>span,
  h3>span {
    display: inline-block;
    -webkit-transition: var(--transition);
    -o-transition: var(--transition);
    transition: var(--transition);
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    -o-transition-property: transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    /* font-family: 'GoodSans-Regular'; */
  }
  h2.open>span,
  h3.open>span {
    -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
            transform: rotate(180deg);
    /* font-family: 'GoodSans-Regular'; */
  }
  .meal>div:hover>h2 {
    color: #F7F5E5;
  }
  .meal>div.open:hover>h2 {
    color: #000;
  }
  .course {
    background-color: #F7F5E5;
  }
  .course:first-of-type {
    border-top: none;
  }
  h3 {
    font-weight: 400;
    text-transform: uppercase;
    border-top: solid 1px #000;
    font-size: 18px;
    line-height: 18px;
    padding: calc(var(--gutter)*1.25) calc(var(--gutter)*1.75);
  }
  h3:hover {
    opacity: .7;
  }
  h3:first-of-type {
    /* border:none; */
  }
  .dishes {
    cursor: default;
    padding: 57px calc(var(--gutter)*2) 27px;
    border-top: solid 1px #000;
    text-align: center;
    display: -ms-grid;
    display: grid;
  }
  .dish {
    max-width: 640px;
    -ms-grid-column-align: center;
        justify-self: center;
    margin-top: 36px;
  }
  .dish:first-of-type {
    margin-top: 0;
  }
  h4 {
    font-size: 18px;
    line-height: 18px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .dish>p{
    font-size: 14px;
    line-height: 18px;
  }
  sup {
    font-size: 10px;
  }
  .allergens {
    margin-top: 48px;
    font-size: 12px;
    line-height: 15px;
    padding: 0 calc(var(--gutter)*1.75);
  }
  .allergens>span {
    /* display: block; */
  }
  .notes {
    font-weight: 400;
    border-top: solid 1px #000;
    padding: calc(var(--gutter)* 1.25) calc(var(--gutter)* 1.75);
    cursor: default;
  }
  .menuContentDivider {
    height: 1px;
    background-color: #000;
    width: 100%;
    -webkit-transition: all ease-in-out .6s;
    -o-transition: all ease-in-out .6s;
    transition: all ease-in-out .6s;
  }

  @media only screen and (max-width: 600px) {
    #meals {
      padding-top: calc(var(--gutter)*6 + 16vw);
    }
    h3 {
      padding: calc(var(--gutter)*3) calc(var(--gutter)*1.75)
    }
    .dishes {
      padding: 36px calc(var(--gutter)*2) 18px;
    }
    .meal>div:hover>h2 {
      color: #000;
    }
  }
</style>