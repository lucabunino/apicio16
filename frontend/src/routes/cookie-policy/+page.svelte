<script lang="ts">
  import type { PageData } from './$types';
  import { language } from "../language";
  import {PortableText} from '@portabletext/svelte'
  import portableTextStylePrivacy from '../../components/portableTextStylePrivacy.svelte';
  let lang: string;  
	language.subscribe((language) => {
		lang = language;
	});
  export let data: PageData;
</script>

<section id="cookies">
  <div>
  <PortableText 
    value={data.cookiePolicy[0].cookiePolicy[lang]}
    components={{
      block: {
        normal: portableTextStylePrivacy,
        h1: portableTextStylePrivacy,
        h2: portableTextStylePrivacy,
        h3: portableTextStylePrivacy,
        h4: portableTextStylePrivacy,
        h5: portableTextStylePrivacy,
      }
    }}
  />
  </div>
</section>

<style lang="css">
  section {
    background-color: #F7F5E5;
    padding-top: calc(var(--gutter)*6 + 8vw);
  }
  div {
    border-top: solid 1px #000;
    padding: calc(var(--gutter)*4) calc(var(--gutter)*6) calc(var(--gutter)*12);
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    background-color: #F7F5E5;
  }

  @media only screen and (max-width: 600px) {
    section {
      padding-top: calc(var(--gutter)*6 + 16vw);
    }
    div {
      padding: calc(var(--gutter)*2) calc(var(--gutter)) calc(var(--gutter)*12);
    }
  }
</style>