<!-- CustomHeading (blockStyle) -->
<script lang="ts">
  import type {BlockComponentProps} from '@portabletext/svelte'

  export let portableText: BlockComponentProps

  $: ({indexInParent, global, value} = portableText)
  $: ({ptBlocks} = global)
  $: ({style} = value)

  $: precededByHeading = ['h1', 'h2', 'h3', 'h4', 'h5'].includes(ptBlocks[indexInParent - 1]?.style)

  $: anchorId = `heading-${value._key}`
</script>

<!-- If preceded by heading, have a higher margin top -->
{#if style === 'normal'}
  <p class="paragraph {precededByHeading ? 'marginTop' : ''}"><slot /></p>
{:else if style === 'h1'}
  <h1 class=""><slot /></h1>
{:else if style === 'h2'}
  <h2 class=""><slot /></h2>
{:else if style === 'h3'}
  <h3 class=""><slot /></h3>
{:else}
  <h4 class=""><slot /></h4>
{/if}
<style>
  p {
    margin-top: 36px;
    margin-bottom: 0;
  }
  p.marginTop {
    margin-top: 0;
    margin-bottom: 18px;
  }
  h1 {
    color: red;
    font-weight: 400;
  }
  h2 {
    color: red;
    font-weight: 400;
  }
  h3 {
    color: red;
    font-weight: 400;
  }
  h4 {
    text-transform: uppercase;
    font-weight: 400;
    margin: 0;
  }
</style>