<script>
import { tasklist } from '../store/TestTaskList'

let completed = 0;
let allCategories = ["", ];

tasklist.subscribe(items => {
    let conterDone = 0;
    allCategories = [];

    items.forEach(item => {
        if (item.status === "done") 
            conterDone++;
        if (allCategories.includes(item.category))
            allCategories.push(item.category)
    })
    completed = Math.round(
        conterDone * 100 / items.length
    )
});

function changeStatus(taskid=0){

    tasklist.update(items => {

        const newTasklist = [...items];
        const indexToUpdate = newTasklist.findIndex(
            item => item.id === taskid
        );

        if (indexToUpdate !== -1) {
            let newStatus;
            switch (newTasklist[indexToUpdate].status) {
                case "wait":
                    newStatus = "done"; break;
                case "done":
                    newStatus = "fail"; break;
                default:
                    newStatus = "wait"; break;
            }
            newTasklist[indexToUpdate] = { 
                ...newTasklist[indexToUpdate], 
                status: newStatus 
            };
        }
        return newTasklist;
    });
}

const listSortBy = [
    "creation",  // по дате создания
    "deadline",  // по дедлайну
    "name",      // по алфавиту
]
const listGrouptBy = [
    "not group",      // не группировать
    "status",         // по статусу
    "projects",       // по проектам
]

let sortBy = listSortBy[0]
let groupBy = listGrouptBy[0]


function sortTaskList(arg="creation"){

    sortBy = arg;

    tasklist.update(items => {

        const sortedTasklist = [...items];

            switch (arg) {
                    
                case "deadline":
                    sortedTasklist.sort((a, b) => {
                        const d1 = Date.parse(a.deadline);
                        const d2 = Date.parse(b.deadline);
                        return d1 - d2

                        // // @ts-ignore
                        // if (d2.isNaN()){
                        //     return -1
                        // // @ts-ignore
                        // } else if (d1.isNaN()) {
                        //     return 1
                        // } else {
                        //     return d1 - d2
                        // }
                    }); break;
                case "name":
                    sortedTasklist.sort((a, b) => {
                        const nameA = a.name.toUpperCase();
                        const nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        } else if (nameA > nameB) {
                            return 1; 
                        } else {
                            return 0;
                        }
                    }); break;
                default: // creation
                    sortedTasklist.sort((a, b) => (a.id - b.id)); break;
            }

        return sortedTasklist;
    });
}

function openTask(taskid=0){

}

</script>

<div class="control-panel">
    <div class="select-decade">June, Ⅱ</div>
    <div class="completed">{`completed by ${completed}%`}</div>

    <div class="dropdown">
        <div class="dd-content">
            <svg><use xlink:href="#ico-sort"/></svg>
            <span>{sortBy}</span>
            <svg><use xlink:href="#ico-arrow"/></svg>
        </div>
        <div class="dd-menu">
            {#each listSortBy as item }
                {#if item != sortBy}
                    <button on:click={e => sortTaskList(item)}>{item}</button>
                {/if}
            {/each}
        </div>
    </div>

    <div class="dropdown">
        <div class="dd-content">
            <svg><use xlink:href="#ico-group"/></svg>
            <span>{groupBy}</span>
            <svg><use xlink:href="#ico-arrow"/></svg>
        </div>
        <div class="dd-menu">
            {#each listGrouptBy as item }
                {#if item != groupBy}
                    <button>{item}</button>
                {/if}
            {/each}
        </div>
    </div>
</div>


<div class="task-list">

    <!-- {#if groupBy === listGrouptBy[0]}
        // БЕЗ ГРУППИРОВКИ -->

        {#each $tasklist as task }
            <div class={`task ${task.status}`}>
                <div class={`importance importance-${task.importance}`} />
                <button 
                    class="check-status" 
                    on:click={e => changeStatus(task.id)}
                    >
                    <svg><use xlink:href="#ico-check-mark"/></svg>
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
    padding: .4em 0;
    position: relative;
    border-radius: .1em 1em 1em .1em;
    overflow: hidden;
    user-select: none;
}

.task > .object-task {
    font-size: .9em;
    color: var(--color-content);
    background-color: transparent;

    padding: 0 .4em;
    text-align: left;

    display: flex;
    align-items: center;

    transition: transform 100ms ease-out;
    transform-origin: left;

    z-index: 2;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.task > .object-task:active {
    transform: scale(.98)
}

.task > .check-status {
    font-size: .9em;
    background-color: transparent;

    display: flex;
    align-items: center;
    margin-right: .4em;

    padding: 0 .2em;

    z-index: 2;

    border-radius: 50%;
    border: .1em solid var(--color-content-B);

    width: 1em;
    height: 1em;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    transition: transform 300ms ease-out;
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
    min-width: .55em;
    min-height: .55em;
}

.done > .check-status {
    border-color: var(--color-importance-D);
    background-color: var(--color-importance-D);
}

.fail > .check-status {
    display: flex;
    align-items: center;
    position: relative;
    border-color: var(--color-importance-A);
    background-color: var(--color-importance-A);
}

.fail > .check-status::after {
    content: "";
    height: .1em;
    width: 100%;
    background-color: var(--color-importance-A);
}

.done > .check-status, 
.fail > .check-status {
    transition-property: transform, background-color;
    transition: 300ms ease-out;
    transform: scale(.2);
}

.fail > .check-status > svg {
    display: none;
}

.done > .importance, 
.fail > .importance {
    height: .2em;
}

.wait > .check-status:hover {
    transform: scale(1.2);
}

.wait > .check-status:active {
    transform: scale(1.1);
}

.wait > .check-status > svg {
    transform: scale(0);
    
}

.wait > .check-status:hover > svg {
    transform: scale(1);
}

.done:hover > .check-status, 
.fail:hover > .check-status {
    transform: scale(1);
    background-color: transparent;
}

.done:hover > .importance, 
.fail:hover > .importance {
    height: .92em;
}

.wait > button > span {
    transition: transform 200ms ease-out;
    transform-origin: left;
}

.done > button > span,
.fail > button > span {
    opacity: .4;
    transform: scale(.8);
    transform-origin: left;
    transition: transform 200ms ease-out;
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



/* CONTROL PANEL */

.control-panel {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    width: 80%;
    font-size: .7em;
    margin-bottom: 1em;
}

.select-decade {
    grid-column: 1 / 3;
}

.completed {
    grid-column: 3 / 6;
}



/* DROPDOWN */

.dropdown {
    font-size: 1em;
    background: transparent;
    border-radius: .6em .6em 0 0;
    cursor: default;
    position: relative;
    transition: all 200ms ease-out;


    background-color: transparent;
    box-shadow: none;
}

.dropdown::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: .4em;
    right: .4em;
    height: .1em;
    background-color: var(--color-content-C);


    opacity: 0;
}

.dropdown > .dd-content {
    display: flex;
    align-items: center;
    padding: .6em;
    white-space: nowrap;
}

.dropdown > .dd-content > svg {
    width: .8em;
    height: .8em;
    opacity: .8;
}

.dropdown > .dd-content > span {
    padding: 0 .6em;
}

.dropdown > .dd-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    z-index: 10;
    overflow: hidden;
    border-radius: 0 0 .6em .6em;
    background-color: var(--color-block);
    transition: all 200ms ease-out;


    visibility: hidden;
    opacity: 0;
    transform: scale(.85), translateY(.85);
}

.dropdown > .dd-menu > button {
    font-size: 1em;
    background-color: transparent;
    color: var(--color-content-B);
    padding: .6em;
    position: relative;
    border-radius: .6em;
}

.dropdown > .dd-menu > button::after {
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    background-color: var(--color-content-B);
    opacity: 0;
}

.dropdown > .dd-menu > button:hover::after {
    opacity: .05;
    transition: opacity 200ms ease-out;
}

/* ↓↓↓ hover on dropdown ↓↓↓ */

.dropdown:hover  {
    background-color: var(--color-block);
    box-shadow: var(--color-block-shadow);
}

.dropdown:hover::after {
    opacity: .5;
}

.dropdown:hover > .dd-menu {
    visibility: visible;
    opacity: 1;
    transform: scale(1), translateY(1);
}

.dropdown > .dd-content > svg:last-child {
    margin: 0 0 0 .5em;
    transition: .2s linear;
}

.dropdown:hover > .dd-content > svg:last-child {
    transform: rotate(-180deg);
} 
</style>

