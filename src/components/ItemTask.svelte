<script>
// @ts-nocheck
import { shortMonthNames } from '../store/Date'
import { tasklist } from '../store/TestTaskList'
import {createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
import Tulle from './Tulle.svelte'
import DialogTask from './DialogTask.svelte'
import DialogTaskVector from './DialogTaskVector.svelte'


export let task = {
    "id": -1, // если (-1) значит отображается создаваемая сейчас задача
    "title": "Исследование рынка",
    "start": "", // 2023-07-01
    "finished": "", // 2023-12-28
    "deadline": "", // 2024-03-12 15:15
    "category": "",
    "status": "wait",
    "importance": 0,
    "type": "standard", 
}


export let isShowImportance = true;
export let isDragAndDrop = false;


let isOpenedDialog = false;
let taskID = task.id;


function getDeadline () {
    const d = new Date(task.deadline);
    const [date, time] = task.deadline.split(" ");

    let taskDeadline = `${d.getDate()} ${shortMonthNames[d.getMonth()]}`

    if (time != undefined) {
        const th = d.getHours()
        const tm = d.getMinutes()
        taskDeadline += ` ${String(th).padStart(2, '0')}:${String(tm).padStart(2, '0')}`
    }
    return taskDeadline
}

function changeStatus(){

    tasklist.update(items => {

        const newTasklist = [...items];
        const indexToUpdate = newTasklist.findIndex(
            item => item.id === taskID
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
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    class={`task ${task.status}`} draggable={`${isDragAndDrop}`}
    on:dragstart={e => dispatch('dragstart')}
    >

    {#if isShowImportance}
        <div class={`importance importance-${task.importance}`} />
    {/if}

    <button 
        class="check-status" 
        on:click={changeStatus}
        >
        <svg><use xlink:href="#ico-check-mark"/></svg>
    </button>

    <button 
        class="object-task"
        on:click={e => isOpenedDialog = true}
        >
        <span>{task.title}</span>
    </button>

    {#if isShowImportance}
        <div class="deadline">
            { task.deadline != "" ? getDeadline() : "" }
        </div>
    {:else}
        <button 
            class="remove-task" 
            on:click={e => dispatch('remove')}
            >
            <svg><use xlink:href="#ico-delete"/></svg>
        </button>
    {/if}

</div>


{#if isOpenedDialog && task.type === "standard"}
    <Tulle on:closeDialog={e => isOpenedDialog = false} escTrue={false}>
        <DialogTask 
            task={task} 
            on:closeDialog={e => isOpenedDialog = false}
        />
    </Tulle>
{:else if isOpenedDialog && task.type === "vector"}
    <Tulle on:closeDialog={e => isOpenedDialog = false} >
        <DialogTaskVector task={task} />
    </Tulle>
{/if}


<style>

.task {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: .1em 1em 1em .1em;
    overflow: hidden;
    user-select: none;
}

.task > .object-task {
    flex-grow: 1;

    font-size: .9em;
    color: var(--color-content);
    background-color: transparent;

    padding: .4em;
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
    margin: 0 .4em;

    padding: 0 .2em;
    z-index: 2;

    border-radius: .3em;
    border: .14em solid var(--color-content-B);

    width: 1em;
    height: 1em;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    transition: transform 300ms ease-out;
}

.task > .check-status > svg {
    width: .6em;
    height: .6em;
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
    transition: height 300ms ease-out;
    transform-origin: left;
    margin-right: .6em;
    margin-left: .2em;
    margin: 0 .2em;
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

/* .wait > .importance {
    transition: transform 300ms ease-out 200ms;
}

.wait:hover > .importance {
    transform: scale(1.5);
} */

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

.task > button.remove-task {
    font-size: .9em;
    background-color: transparent;

    display: flex;
    align-items: center;
    margin: 0 .6em;

    z-index: 2;

    width: 1em;
    height: 1em;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    transition: opacity 300ms ease-out;
    opacity: 0;
    overflow: hidden;
}

.task > button.remove-task > svg {
    width: .6em;
    height: .6em;
}

.task:hover > button.remove-task {
    opacity: .5;
}

.task:hover > button.remove-task:hover {
    opacity: 1;
}


</style>