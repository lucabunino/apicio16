<div class="loader"></div>

<style>
  .loader {
    background-color: #FFAF22;
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: loaderAnimation 800ms; /* Animation for appearing */
    transform-origin: left;
  }

  @keyframes loaderAnimation {
    0% {
      width: 0; /* Start with width 0 */
    }
    100% {
      width: 100%; /* End with width 100% */
    }
  }
</style>