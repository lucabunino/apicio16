<!-- CustomHeading (blockStyle) -->
<script lang="ts">
  import type {BlockComponentProps} from '@portabletext/svelte'

  export let portableText: BlockComponentProps

  $: ({indexInParent, global, value} = portableText)
  $: ({ptBlocks} = global)
  $: ({style} = value)

  $: precededByHeading = ['h1', 'h2', 'h3', 'h4', 'h5'].includes(ptBlocks[indexInParent - 1]?.style)
</script>

<!-- If preceded by heading, have a higher margin top -->
{#if style === 'normal'}
  <p class="paragraph {precededByHeading ? 'marginTop' : ''}"><slot /></p>
{:else if style === 'h1'}
  <h1 class=""><slot /></h1>
{:else}
  <h2 class=""><slot /></h2>
{/if}
<style>
  * {
    max-width: 800px;
    width: 100%;
  }
  p {
    margin-top: 18px;
    margin-bottom: 0;
    overflow-wrap: break-word;
  }
  h1, h2 {
    font-size: inherit;
    line-height: inherit;
    text-transform: uppercase;
    font-weight: 400;
    margin: 0;
  }
  h2 {
    margin-top: 36px;
  }
</style>