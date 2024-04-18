
<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
import { isOpenDialog } from '../store/OpenDialog'

export let escTrue = true;
// ↑ некоторые диалоговые окна самостоятельно управляют поведением Esc
// escTrue дает возможность отключать управление Esc отсюда

isOpenDialog.set(true);

function removeTulle(){
    isOpenDialog.set(false);
    setTimeout(() => {
        dispatch('closeDialog')
    }, 200)
}
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={$isOpenDialog ? "tulle" : "tulle closing"} on:click={removeTulle} >
    <slot/>
</div>


<svelte:window on:keydown={e => {
    if (escTrue && e.key.toLowerCase() === "escape") 
        removeTulle()
}} />


<style>
.tulle {
    position: fixed;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;


    animation-name: tulle-down;
    animation-duration: 200ms;
    animation-fill-mode: both;
}

.closing {
    animation-name: tulle-down-2;
    animation-duration: 200ms;
    animation-fill-mode: both;
    
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

@keyframes tulle-down-2 {
    from {  
        background-color: var(--color-tulle);
        backdrop-filter: blur(2px);
    }
    to {
        background-color: transparent;
        backdrop-filter: blur(0px);
    }
}
</style>