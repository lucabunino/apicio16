<script lang="ts">
  import type { PageData } from './$types';
  import { slide } from 'svelte/transition';
  import { quadInOut } from 'svelte/easing';
  import { quartInOut } from 'svelte/easing';
  import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
  import { beforeNavigate, afterNavigate } from '$app/navigation';

  let ready = false;
  onMount(() => ready = true);
	onDestroy(() => ready = false);
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
          transform: translateY(-${(1 - eased) * innerHeight}px);
				`;
			}
		};
	}

  import { language } from "../language";
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
        console.log("close with delay");
        openDishes = null;
        openDishes = new Set(openDishes);
        setTimeout(() => {
          open = null;
        }, 200);
      } else {
        console.log("open with delay");
        openDishes = null;
        openDishes = new Set(openDishes);
        setTimeout(() => {
          open = content;
        }, 200);
      }
    } else {
      if (open === content) {
        console.log("close");
        open = null;
        openDishes = new Set(openDishes);
      } else {
        console.log("open");
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
  
  let allAllergens: Allergen[] = [];
  // Collect all allergens from the data
  data.menu.forEach(menu => {
    menu.menuContents.forEach(content => {
      content.mealContent.forEach(meal => {
        meal.dishes.forEach(dish => {
          dish.dishReference.allergens.forEach(allergen => {
            if (!allAllergens.some(a => a.number === allergen.number)) {
              allAllergens.push(allergen);
            }
          });
        });
      });
    });
  });
  console.log(allAllergens);
  
  
  $: innerWidth = 0
	$: innerHeight = 0

  let gutter = 12;
  const allergenNumbers = new Set<string>();
  
  function calculate(event) {
		console.log(gutter*6 + innerWidth/100*8);
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight on:resize={calculate}/>

{#if ready}
  <!-- <div id="bg" in:bgEnter={{duration: 1000}}></div> -->
{/if}
<div id="meals">
  {#each data.menu[0].menuContents as content, i (content)}
    {#if ready}
      <section class="meal" in:menuEnter={{delay: 800 + i*50, duration: 1000}} out:menuLeave={{delay: i*50, duration: 800}}>
          <div on:click={openMeal(content)} style:height={`${(innerHeight - (gutter*6 + innerWidth/100*8) - 37 - data.menu[0].menuContents.length)/data.menu[0].menuContents.length}px`}>
            <h2 class={open == content ? 'open' : ''} >{content.meal[lang]} <span>↓</span></h2>
          </div>
          {#if open === content}
            <div class="menuContentDivider"></div>
            <div class="course" transition:slide={{duration: 200, easing: quadInOut}}>
              {#each content.mealContent as meal}
                <h3 class={openDishes.has(meal) ? 'open' : ''} on:click={() => { toggleDish(meal); open == content; }}>{meal.course[lang]} <span>↓</span></h3>
                {#if openDishes.has(meal)}
                <div transition:slide={{duration: 200, easing: quadInOut}}>
                  <div class="dishes">
                    {#each meal.dishes as dish}
                      <div class="dish">
                        <h4>{dish.dishReference.title[lang]}
                          {#each dish.dishReference.allergens as allergene}
                            <sup>{allergene.number}{#if dish.dishReference.allergens.indexOf(allergene) < dish.dishReference.allergens.length - 1}–{/if}</sup>
                          {/each}
                        </h4>
                        <p class="dishDescription">{dish.dishReference.description[lang]}</p>
                        <p class="dishPrice">€ {dish.dishReference.price}</p>
                      </div>
                    {/each}
                    {#if allAllergens}
                      <p class="allergens">
                        {#each allAllergens as allergen}
                          <span>{allergen.number}–{allergen.title[lang]}: {allergen.description[lang]}</span>
                        {/each}
                      </p>
                    {/if}
                  </div>
                </div>
                {/if}
              {/each}
            </div>
          {/if}
      </section>
    {/if}
  {/each}
</div>

<style lang="css">
  #bg {
    z-index: -2;
    background-color: #FFAF22;
    width: 100vw;
    height: 100%;
    top: 0;
    position: fixed;
  }
  h1, h2, h3, h4, h5, p{
    margin: 0;
  }
  #meals {
    padding-top: calc(var(--gutter)*6 + 8vw);
  }
  .meal {
    display: grid;
    border-top: solid 1px #000;
    position: relative;
  }
  .meal:last-of-type {
    border-bottom: solid 1px #000;
    margin-bottom: 36px;
    box-sizing: border-box;
  }
  .meal>div{
    align-items: center;
    display: grid;
    cursor: pointer;
  }
  h2 {
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
  }
  h2>span,
  h3>span {
    display: inline-block;
    transition: var(--transition);
    transition-property: transform;
  }
  h2.open>span,
  h3.open>span {
    transform: rotate(180deg);
  }
  .meal>div:hover>h2,
  h2.open {
    color: #F7F5E5;
  }
  .course {
    /* height: 0; */
    /* overflow: hidden; */
    background-color: #F7F5E5;
  }
  .course:first-of-type {
    border-top: none;
    /* height: 0; */
    /* overflow: hidden; */
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
    border:none;
  }
  .dishes {
    cursor: default;
    padding: 57px 0 27px;
    border-top: solid 1px #000;
    text-align: center;
    display: grid;
  }
  .dish {
    max-width: 640px;
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
    display: block;
  }
  .menuContentDivider {
    height: 1px;
    background-color: #000;
    width: 100%;
    transition: all ease-in-out .6s;
  }
</style>


<!-- $: open = ""
function openMeal(content) {
  if (open === content) {
    open = ""
  } else {
    open = content
  }
  openDishes = new Set();
}


{#if !allergenNumbers.has(allergene.number)}
  {(() => {
    {allergenNumbers.add(allergene.number)}
    return ''; // return empty string so Svelte does not print it
  })()}
{/if} -->