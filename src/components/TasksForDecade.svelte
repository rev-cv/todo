<script>
import { tasklist } from '../store/TestTaskList'
import TaskItem from './TaskLineItem.svelte'

let completed = 0;
// @ts-ignore
/**
 * @type {any[]}
 */
let allCategories = [];

tasklist.subscribe(items => {
    let conterDone = 0;
    allCategories = [];

    items.forEach(item => {
        if (item.status === "done") 
            conterDone++;
        // @ts-ignore
        if (!allCategories.includes(item.category))
            allCategories.push(item.category)
    })
    completed = Math.round(
        conterDone * 100 / items.length
    )
});

// @ts-ignore
function changeStatus(taskid){

    tasklist.update(items => {

        const newTasklist = [...items];
        const indexToUpdate = newTasklist.findIndex(
            item => item.id === taskid.detail.taskID
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
    "status",         // по статусу выполненности
    "category",       // по категориям
    // "projects",       // по проектам
    "importance",     // по важности
]

let sortBy = listSortBy[0]
let groupBy = listGrouptBy[2]


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

// @ts-ignore
function openTask(taskid){

}

</script>

<div class="control-panel">
    <!-- <div class="select-decade">June, Ⅱ</div> -->
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
                    <button on:click={e => groupBy = item}>{item}</button>
                {/if}
            {/each}
        </div>
    </div>
</div>


<div class="task-list">

    <!-- // БЕЗ ГРУППИРОВКИ -->

    {#if groupBy === "not group"}

        {#each $tasklist as task }
            <TaskItem 
                task={task} 
                on:changeStatus={changeStatus}
                on:openTask={openTask}
            />
        {/each}


    <!-- // ГРУППИРОВКА ПО КАТЕГОРИЯМ -->

    {:else if groupBy === "category"}
        {#each allCategories as cat }
            <div class="group"># {cat}</div>
            {#each $tasklist as task }
                {#if cat === task.category}
                    <TaskItem 
                        task={task} 
                        on:changeStatus={changeStatus}
                        on:openTask={openTask}
                    />
                {/if}
            {/each}
        {/each}


    <!-- // ГРУППИРОВКА ПО статусу -->

    {:else if groupBy === "status"}

        {#each [
            ["Waiting", "wait"], 
            ["Сompleted", "done"], 
            ["Failed", "fail"]] as group }

            <div class="group">{group[0]}</div>
            {#each $tasklist as task }
                {#if task.status === group[1]}
                    <TaskItem 
                        task={task} 
                        on:changeStatus={changeStatus}
                        on:openTask={openTask}
                    />
                {/if}
            {/each}
        {/each}


    <!-- // ГРУППИРОВКА ПО важности задач -->

    {:else if groupBy === "importance"}
        {#each [
            ["No matter what it takes to do this!", 1], 
            ["It's better to do it now than later!", 2], 
            ["This will be the most productive decade!", 3], 
            ["Tasks of uncertain importance.", 0]] as group }
            <div class="group">{group[0]}</div>
            {#each $tasklist as task }
                {#if task.importance === group[1]}
                    <TaskItem 
                        task={task} 
                        on:changeStatus={changeStatus}
                        on:openTask={openTask}
                    />
                {/if}
            {/each} 
        {/each}
    {/if}





</div>




<style>

.control-panel {
    display: flex;
    align-items: center;
    width: 80%;
    font-size: .7em;
    margin-bottom: 1em;
}

.task-list {
    width: 28em;
}

.completed {
    flex-grow: 1;
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

    min-width: 9.6em;
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

    position: absolute;
    right: .6em;
}

.dropdown:hover > .dd-content > svg:last-child {
    transform: rotate(-180deg);
} 


.group {
    font-size: 1em;
    font-weight: 700;
    padding: 1em 0 .2em .2em;
    margin-bottom: .5em;
    /* background-color: yellowgreen; */
    border-bottom: .1em solid var(--color-content-C);
}
</style>

