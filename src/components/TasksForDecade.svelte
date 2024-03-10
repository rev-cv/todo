<script>
import { tasklist } from '../store/TestTaskList'
</script>


<div class="task-list">
    {#each $tasklist as task }
        <div class={`task ${task.status}`}>

            <div class={`importance importance-${task.importance}`}></div>

            <button class="check-status">
                <svg><use xlink:href={`#ico-check-${task.status}`}/></svg>
            </button>

            <button class="object-task">
                <span>{task.name}</span>
            </button>

            <div class="deadline">
                2024, 12 Aug
            </div>
            
        </div>
    {/each}
</div>


<style>
    .task {
        display: flex;
        align-items: center;
        /* margin: .8em 0; */
        padding: .4em 0;
        position: relative;
        border-radius: .1em 1em 1em .1em;
        overflow: hidden;
    }

    .task > .object-task {
        font-size: .9em;
        color: var(--color-content);
        background-color: transparent;

        padding: 0 .4em;
        text-align: left;

        display: flex;
        align-items: center;

        transition: transform 300ms ease-out 200ms;
        transform-origin: left;

        z-index: 2;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .task > .check-status {
        font-size: .9em;
        background-color: transparent;

        display: flex;
        align-items: center;
        margin-right: .4em;

        padding: 0 .2em;

        z-index: 2;
    }

    .task > .check-importance {
        font-size: .6em;
        display: flex;
        text-transform: capitalize;

        z-index: 2;
    }

    .importance {
        min-width: .2em;
        height: .92em;
        border-radius: .2em;
        margin-right: .6em;
        transition: height 300ms ease-out;
    }

    .importance-1 {
        background-color: var(--color-importance-A);
    }

    .importance-2 {
        background-color: var(--color-importance-B);
    }
    .importance-3 {
        background-color: var(--color-importance-C);
    }

    .task > .check-status > svg {
        width: 1em;
        height: 1em;
    }

    .done > .check-status, 
    .fail > .check-status {
        transition: transform 300ms ease-out;
        transform: scale(.2);
    }

    .done > .importance, 
    .fail > .importance {
        height: .2em;
    }

    .done:hover > .check-status, 
    .fail:hover > .check-status {
        transform: scale(1);
    }

    .done:hover > .importance, 
    .fail:hover > .importance {
        height: .92em;
    }

    .done > button > span,
    .fail > button > span {
        font-size: .8em;
        opacity: .4;
    }

    .fail > button {
        color: red;
    }

    .task-list {
        width: 30em;
    }

    .wait > .importance {
        transition: transform 300ms ease-out 200ms;
    }

    .wait:hover > .importance {
        transform: scale(1.5);
    }

    .task::after {
        content: "";
        top:0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: var(--color-content);
        position: absolute;
        opacity: 0;
        z-index: 1;
        transition: opacity 100ms ease-out;
    }

    .task:hover::after {
        opacity: .05;
    }

    .deadline {
        flex-grow: 1;
        text-align: right;
        white-space: nowrap;
        opacity: .8;
        font-size: .5em;
        padding: 0 2em 0 1em;
    }

    .done > .deadline, 
    .fail > .deadline {
        opacity: .4;
    }

</style>

