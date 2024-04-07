<script>
import { isOpenDialog } from '../store/OpenDialog'
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={$isOpenDialog ? "widget" : "widget closing"} on:click|stopPropagation>
    <div class="message"><slot /></div>
    <div class="btns">
        <button 
            class="yes"
            on:click={e => {
                isOpenDialog.set(false);
                setTimeout(() => {
                    dispatch('confirm')
                }, 200)
            }}
            >Yes
        </button>
        <button 
            class="no"
            on:click={e => {
                isOpenDialog.set(false);
                setTimeout(() => {
                    dispatch('noConfirm')
                }, 200)
            }}
            >No
        </button>
    </div>
</div>


<style>

.widget {
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    animation-name: open-widget;
    animation-duration: 200ms;

    font-size: 1.2rem;
    padding: 1em;
    cursor: default;

    color: var(--color-content-B);
    background-color: var(--color-block);
    border-radius: .8em;
    box-shadow: var(--color-block-shadow);

    width: 20em;
    height: 10em;

    overflow: hidden;
}

.closing {
    animation-name: close-widget;
    animation-duration: 200ms;
    animation-fill-mode: both;
}

@keyframes open-widget {
    from {  
        transform: translate(0, -3em) scale(.7);
    }
    to {
        transform: translate(0,0) scale(1);
    }
}

@keyframes close-widget {
    from {  
        transform: translate(0,0) scale(1);
    }
    to {
        transform: translate(0, -3em) scale(.7);
        opacity: 0;
    }
}


.btns {
    text-align: center;
}

.yes, .no {
    font-size: 1em;
    padding: .2em 1em;
    border-radius: .4em;
    position: relative;
    overflow: hidden;
    transition: transform 200ms ease-out;
}

.yes {
    background-color: var(--color-importance-A);
    color: var(--color-canvas);
    font-weight: 700;
    transform: scale(.7);
}

.no {
    background-color: transparent;
    color: var(--color-content-B);
    border: .1em solid var(--color-content-C);
    font-weight: 400;
    transform: scale(1.2);
}

.no:hover {
    transform: scale(1.25);
}

.yes:hover {
    transform: scale(.75);
}

.no::before,
.yes::before {
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    background-color: var(--color-content-C);
    opacity: 0;
    transition: opacity 200ms ease-out;
}

.no:hover::before,
.yes:hover::before {
    opacity: .5;
}


</style>