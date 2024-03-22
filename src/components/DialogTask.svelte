<script>
// @ts-nocheck
import { isOpenDialog } from '../store/OpenDialog'

export let task = {}
// {
//     "id": 2,
//     "title": "Исследование рынка",
//     "start": "2023-07-01",
//     "finish": "2023-12-31",
//     "finished": "2023-12-28",
//     "deadline": "2024-03-12 15:15",
//     "category": "Маркетинг",
//     "status": "done",
//     "importance": 1,
// }

let status = task.status;
let importance = task.importance;
let category = task.category;
let [date, time] = task.deadline.split(" ");

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={$isOpenDialog ? "widget" : "widget closing"} on:click|stopPropagation >


    <div class="mark">Title</div>
    <div class="title">
        <input type="text" value={task.title}>
    </div>


    <div class="mark">Importance</div>
    <div class="importance">
        {#each [["A", 1], ["B", 2], ["C", 3], ["×", 0]] as imp }
            <button 
                class={importance === imp[1] ? `imp-${imp[1]} active` : `imp-${imp[1]}`}
                on:click={e => importance = imp[1]}
                >{imp[0]}
            </button>
        {/each}
    </div>


    <div class="mark">Status</div>
    <div class="status-panel">
        {#each ["wait", "done", "fail"] as cst }
            <button 
                class={status === cst ? `${cst} active` : cst}
                on:click={e => status = cst}
                >{cst}
            </button>
        {/each}
    </div>
    

    <div class="mark">Category</div>
    <div class="categories">{`# ${category}`}</div>

    <div class="mark">Deadline</div>
    <div class="categories">
        <input type="date" value={date}>
        <input type="time" value={time}>
    </div>

</div>

<style>

.widget {
    font-size: 1.2rem;

    padding: 1em;

    cursor: default;

    color: var(--color-content-B);
    background-color: var(--color-block);
    border-radius: .8em;
    box-shadow: var(--color-block-shadow);

    animation-name: open-widget;
    animation-duration: 200ms;
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
    padding: .4em;
    background-color: transparent;
    color: var(--color-content-A);
    font-weight: 700;
}

.status-panel, 
.importance {
    display: flex;
    justify-content: space-between;

    font-size: .7em;
    margin: .4em 0;

    border: .15em solid transparent;
    border-radius: .8em;

    transition: border-color 200ms ease-out;
}

/* .status-panel:hover, 
.importance:hover {
    border-color: var(--color-content-C);
} */


.status-panel > button,
.importance > button {
    font-size: 1em;
    flex-grow: 1;
    user-select: none;
    margin: .2em;
    padding: .5em;
    border-radius: .6em;

    display: flex;
    justify-content: center;
    align-self: center;

    background-color: transparent;
    color: var(--color-content-B);

    transition: background-color 500ms ease-out;
}

.wait.active,
.done.active,
.fail.active,
.imp-1.active,
.imp-2.active,
.imp-3.active,
.imp-0.active {
    color: var(--color-block);
}

.wait.active,
.imp-3.active {
    background-color: var(--color-importance-C);
}

.done.active {
    background-color: var(--color-importance-D);
}

.fail.active,
.imp-1.active {
    background-color: var(--color-importance-A);
}

.imp-2.active {
    background-color: var(--color-importance-B);
}

.imp-0.active {
    background-color: var(--color-importance-X);
}

.categories {
    display: flex;
    justify-content: space-between;
}

.categories > input {
    font-size: 1em;
    padding: .4em;
    background-color: transparent;
    color: var(--color-content-A);
    filter: invert(0.5);
}

</style>