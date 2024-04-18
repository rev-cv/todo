<script>
// @ts-nocheck
import Tulle from './Tulle.svelte'
import DialogTask from './DialogTask.svelte'
let isOpenNewTaskDialog = false;
</script>


<button class="btn-new-task" on:click={e => isOpenNewTaskDialog = true}>
    <svg><use xlink:href="#ico-add" /></svg>
</button>


{#if isOpenNewTaskDialog}
    <Tulle on:closeDialog={e => isOpenNewTaskDialog = false} >
        <DialogTask on:closeDialog={e => isOpenNewTaskDialog = false} />
    </Tulle>
{/if}


<svelte:window on:keydown={e => {
    if (e.altKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        isOpenNewTaskDialog = true;
    }
}} />


<style>
.btn-new-task {
    font-size: .9rem;
    position: absolute;

    --size: 4em;
    --margin: 2em;

    width: var(--size);
    height: var(--size);
    border-radius: 50%;

    bottom: var(--margin);
    right: var(--margin);

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--color-block);
    box-shadow: var(--color-block-shadow);

    overflow: hidden;
    z-index: 8;
}

.btn-new-task > svg {
    --svg-size: calc(var(--size) / 4 * 1.8);
    width: var(--svg-size);
    height: var(--svg-size);

    scale: 1;
    transition: scale 200ms  ease-out;
}

.btn-new-task:hover > svg {
    scale: 1.15;
}

button.btn-new-task::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--color-content-C);

    opacity: 0;
    transition: opacity 200ms ease-out;
}

button.btn-new-task:hover::after {
    opacity: .25;
}
</style>