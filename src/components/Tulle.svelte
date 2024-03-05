
<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="tulle" on:click={event => {dispatch('closeDialog', event)}}>
    <slot></slot>
</div>


<style>
    .tulle {
        position: fixed;
        top:0;
        bottom: 0;
        right: 0;
        left: 0;

        animation-name: tulle-down;
	    animation-duration: 200ms;
        animation-fill-mode: forwards;
        z-index: 10;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
    }

    @keyframes tulle-down {
	    from {  
            background-color: transparent;
            backdrop-filter: blur(0px);
            /* transform: translate(0, 0) scale(1) rotate(0); */
        }
        to {
            background-color: var(--color-tulle);
            backdrop-filter: blur(2px);
            /* transform: translate(75%, -40%) scale(1.2) rotate(35deg); */
        }
    }
</style>