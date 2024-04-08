<script>
import { isOpenDialog } from '../store/OpenDialog'

export let task = {
    "id": -1, // если (-1) значит отображается создаваемая сейчас задача
    "title": "new task",
    "status": "wait",
    "type": "vector", 
};

</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={$isOpenDialog ? "widget" : "widget closing"} on:click|stopPropagation >


    <div class="main-area">


        <div class="mark">Title</div>
        <div class="title">
            <input 
                type="text" 
                bind:value={task.title} 
                on:change={e => {
                    if (task.title.length === 0) 
                    task.title = `task ${task.id}`
                }}
                placeholder="new task"
            >
        </div>


        <div class="mark">Status</div>
        <div class="status-panel">
            {#each ["wait", "done", "fail"] as cst }
                <button 
                    class={task.status === cst ? `${cst} active` : cst}
                    on:click={e => task.status = cst}
                    >{cst}
                </button>
            {/each}
        </div>


    </div>
</div>


<style>

.widget {
    display: flex;

    animation-name: open-widget;
    animation-duration: 200ms;
}

.main-area {
    font-size: 1.2rem;

    padding: 1em;

    cursor: default;

    color: var(--color-content-B);
    background-color: var(--color-block);
    border-radius: .8em;
    box-shadow: var(--color-block-shadow);

    width: 20em;

    display: flex;
    flex-direction: column;

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

.mark {
    margin-top: 1em;
    font-size: .5em;
    font-weight: 700;
    opacity: .5;
    user-select: none;
}

.mark:first-child {
    margin-top: 0;
}

.title {
    font-size: .8em;
    min-width: 20em;
    display: flex;
}

.title > input {
    flex-grow: 1;
    font-size: 1.2em;
    padding: .6em .4em .4em .6em;
    background-color: transparent;
    color: var(--color-content-A);
    font-weight: 700;
    border-radius: .6em;
    transition: box-shadow 500ms ease-out;
}

.title > input:focus {
    box-shadow: var(--color-block-shadow-inset);
}

.status-panel {
    display: grid;
    grid-auto-rows: 2.5em;
    grid-gap: .3em;

    font-size: .7em;
    margin: .4em 0;

    border: .15em solid transparent;
    border-radius: .8em;

    transition: border-color 200ms ease-out;
}

.status-panel {
    grid-template-columns: repeat(3, 1fr);
}

.status-panel > button {
    font-size: 1em;
    user-select: none;

    position: relative;
    overflow: hidden;

    background-color: transparent;
    color: var(--color-content-B);

    border: .14em solid var(--color-content-C);
    border-radius: .6em;

    transition: background-color 500ms ease-out;
}

.status-panel > button::after {
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

.status-panel > button:hover::after {
    opacity: .3;
}

.wait.active,
.done.active,
.fail.active {
    color: var(--color-block);
}

.wait.active {
    background-color: var(--color-importance-C);
}

.done.active {
    background-color: var(--color-importance-D);
}

.fail.active {
    background-color: var(--color-importance-A);
}
</style>
    