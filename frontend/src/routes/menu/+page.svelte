<script lang="ts">
  import type { PageData } from './$types';

  import { language } from "../language";
  let lang: string;
	language.subscribe((language) => {
		lang = language;
	}); 
  
  export let data: PageData;
  console.log(data);

  let open = false
  const openMenu = () => open = !open

  $: innerWidth = 0
	$: innerHeight = 0
  $: logoHeight = innerWidth
</script>

<svelte:window bind:innerWidth bind:innerHeight/>
<div class="menuContentDivider" class:open></div>
{#each data.menu[0].menuContents as content}
  <section class="meal" style:height={`${(innerHeight - logoHeight)/data.menu[0].menuContents.length}px`}>
    <h2>{content.meal[lang]} <span class:open>↓</span></h2>
    <div class="course">
      <h3>STARTERS</h3>
      <div class="dish">
        <h4>CAPRESE<sup>Numero allergene</sup></h4>
        <p class="dishDescription">Caprese with buffalo milk mozzarella, yellow and red cherry tomatoes, basil oil and basil</p>
        <p class="dishPrice">PRICE</p>
      </div>
      <div class="dish">
        <h3>CAPRESE<sup>Numero allergene</sup></h3>
        <p class="dishDescription">Caprese with buffalo milk mozzarella, yellow and red cherry tomatoes, basil oil and basil</p>
        <p class="dishPrice">PRICE</p>
      </div>
      <p class="allergens">1-Ficius coriatquatem res aut erumquo ommo cus aut ut pe corit moloritaspis as quibus, occae et ra de dolorepudae exceatibus volendel molupta tisquodis re, officim intiat la et, atur?<br>2-Mod et eossi delias es que dolesci delluptae vitasim sequatetur autent minus estion pliqui doluptatem nem volorem res alignimodit apellendae nobis ni nusda cone nonesti</p>
    </div>
  </section>
  <div class="menuContentDivider" class:open></div>
{/each}

<style lang="css">
  h1, h2, h3, h4, h5, p{
    margin: 0;
  }
  .meal {
    background-color: #FFAF22;
    display: grid;
    align-items: center;
  }
  h2 {
    text-align: center;
    font-weight: 400;
    text-transform: uppercase;
  }
  h2>span {
    display: inline-block;
    transition: var(--transition);
  }
  h2>span.open {
    transform: rotate(180deg);
  }
  .course {
    height: 0;
    overflow: hidden;
  }
  .menuContentDivider {
    height: 1px;
    background-color: #000;
    width: 100%;
    transition: all ease-in-out .6s;
  }
</style>