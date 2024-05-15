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
{:else}
  <h4 class=""><slot /></h4>
{/if}
<style>
  * {
    max-width: 640px;
  }
  p {
    margin-top: 0;
    margin-bottom: 0;
  }
  p.marginTop {
    margin-top: 0;
    margin-bottom: 36px;
  }
  h4 {
    font-size: 18px;
    line-height: 18px;
    text-transform: uppercase;
    font-weight: 400;
    margin: 0;
  }
  @media only screen and (max-width: 600px) {
    p {
      font-size: 16px;
      line-height: 18px;
    }
  }
</style>