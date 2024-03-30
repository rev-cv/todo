<script>
// @ts-nocheck
import { onDestroy } from 'svelte';
import { isOpenDialog } from '../store/OpenDialog'
import { tasklist, allCategories } from '../store/TestTaskList'
import { shortMonthNames } from '../store/Date'

// управление дополнительными всплывающими окнами
let isOpenDeadline = false;
let isOpenCategories = false;
let isOpenAddition = false;


// распаковка задачи
export let task = {};
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
let title = task.title;
let status = task.status;
let importance = task.importance;
let category = task.category;


// распаковка значения дедлайна
let dDT = new Date();
let isED = false; // isExistsDate
let isET = false;
let dYear = 2024;
let dMonth = 1;
let dDay = 1;
let dHour = 0;
let dMin = 0;

if (task.deadline != "") {
    dDT = new Date(task.deadline);
    const [date, time] = task.deadline.split(" ");

    if (date != undefined) {
        isED = true;
        dYear = dDT.getFullYear();
        dMonth = dDT.getMonth() + 1;
        dDay = dDT.getDate();
    }

    if (time != undefined) {
        isET = true;
        dHour = dDT.getHours();
        dMin = dDT.getMinutes();
    }
}

let textDeadline = "no deadline";
function viewDeadline () {
    if (!isED) {
        textDeadline = "no deadline";
    } else {
        textDeadline = `${dYear}, ${dDay} ${shortMonthNames[dMonth - 1]}`
        if (isET) {
            textDeadline += ` ${String(dHour).padStart(2, '0')}`
            textDeadline += `:${String(dMin).padStart(2, '0')}`
        }
    }
}
if (isED)
    viewDeadline()


// управление выбором дедлайна
function setDeadline () {
    // обработка закрытия дополнительного окна
    isOpenAddition = false;
    setTimeout(() => {
        isOpenDeadline = false;
    }, 300)
    
    dDT = new Date(
        dYear, dMonth-1, dDay, dHour, dMin, 0
    )

    dYear = dDT.getFullYear();
    dMonth = dDT.getMonth() + 1;
    dDay = dDT.getDate();

    viewDeadline()
}


function saveTask () {

    const newTitle = title;
    const newImportance = importance;
    const newСategory = category;
    let finished = task.finished


    // подготовка статуса
    let newStatus = status;
    if (newStatus != task.status) {

        if (newStatus === "done" || newStatus === "fail" ) {
            let dateFinished = new Date()
            const month = String(dateFinished.getMonth()).padStart(2, '0');
            const day = String(dateFinished.getDate()).padStart(2, '0');
            finished = `${dateFinished.getFullYear()}-${month}-${day}`
        } else {
            finished = ""
        }
    }


    // подготовка дедлайна
    let newDeadLine = "";
    if (isED) {
        const month = String(dMonth).padStart(2, '0');
        const day = String(dDay).padStart(2, '0');
        newDeadLine = `${dYear}-${month}-${day}`

        if (isET) {
            const hour = String(dHour).padStart(2, '0');
            const minute = String(dMin).padStart(2, '0');
            newDeadLine += ` ${hour}:${minute}`
        }
    }



    tasklist.update(items => {

        const newTasklist = [...items];
        const indexToUpdate = newTasklist.findIndex(
            item => item.id === task.id
        );

        

        if (indexToUpdate !== -1) {
            newTasklist[indexToUpdate] = { 
                ...newTasklist[indexToUpdate], 
                    title: newTitle,
                    importance: newImportance,
                    category: newСategory,
                    status: newStatus,
                    finished: finished,
                    deadline: newDeadLine,
            };
        }
        return newTasklist;
    });
}


onDestroy(_ => {
    saveTask()
})


</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={$isOpenDialog ? "widget" : "widget closing"} on:click|stopPropagation >


    <div class="main-area">

        <div class="mark">Title</div>
        <div class="title">
            <input type="text" bind:value={title} >
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
        <div class="categories">
            <button
                on:click={e => {
                    isOpenCategories = true;
                    isOpenAddition = true;
                }}
                >{`# ${category}`}
            </button>
        </div>


        <div class="mark">Deadline</div>
        <div class="deadline">

            <button
                on:click={e => {
                    isOpenDeadline = true;
                    isOpenAddition = true;
                }}
                >{textDeadline}
            </button>

        </div>


        <div class="mark">Auto recreate</div>

        

    </div>

    <div 
        class={
            isOpenAddition ? 
                "additional-area" : "additional-area additional-area-closed"
        }>

        {#if isOpenDeadline }
            <div class="deadline-select">

                <div class="set-deadline">
                    {#if isED }
                        <span>{`${dYear}, ${dDay} ${shortMonthNames[dMonth-1]}`}</span>
                        {#if isET }
                            <span>
                            {`${String(dHour).padStart(2, '0')}:${String(dMin).padStart(2, '0')}`}
                            </span>
                        {/if}
                    {:else}
                        <span>no deadline</span>
                    {/if}
                    <button on:click={setDeadline} >Ok</button>
                </div>


                <div class="col-y col-mark">year</div>
                <div class="col-m col-mark">month</div>
                <div class="col-d col-mark">day</div>
                <div class="col-ho col-mark">hour</div>
                <div class="col-mi col-mark">minute</div>


                <div class="col-y">
                    <button 
                        class={ !isED ? "active" : "" }
                        on:click={e => {
                            isED = false;
                            isET = false;
                            dYear = new Date().getFullYear();
                            dMonth = 1;
                            dDay = 1;
                            dHour = 0;
                            dMin = 0;
                        }}
                        >×
                    </button>
                    {#each Array(15).fill().map((_, i) => i + 2024) as year }
                        <button 
                            class={dYear === year && isED ? "active" : ""}
                            on:click={e => {
                                dYear = year;
                                isED = true;
                            }}
                            >{year}
                        </button>
                    {/each}
                </div>

                <div class="col-m">
                    {#each Array(12).fill().map((_, i) => i + 1) as month }
                        <button 
                            class={dMonth === month && isED ? "active" : ""}
                            on:click={e => {
                                dMonth = month;
                                isED = true;
                            }}
                            >{month}
                        </button>
                    {/each}
                </div>

                <div class="col-d">
                    {#each Array(31).fill().map((_, i) => i + 1) as day }
                        <button 
                            class={dDay === day && isED ? "active" : ""}
                            on:click={e => {
                                dDay = day;
                                isED = true;
                            }}
                            >{day}
                        </button>
                    {/each}
                </div>

                <div class="col-ho">
                    <button 
                        class={ !isET ? "active" : "" }
                        on:click={e => {
                            isET = false;
                            dHour = 0;
                            dMin = 0;
                        }}
                        >×
                    </button>
                    {#each Array(24).fill().map((_, i) => i) as hour }
                        <button 
                            class={dHour === hour && isET ? "active" : ""}
                            on:click={e => {
                                dHour = hour;
                                isET = true;
                            }}
                            >{hour}
                        </button>
                    {/each}
                </div>

                <div class="col-mi">
                    {#each Array(12).fill().map((_, i) => i * 5) as minute }
                        <button 
                            class={dMin === minute && isET ? "active" : ""}
                            on:click={e => {
                                dMin = minute;
                                isET = true;
                            }}
                            >{minute}
                        </button>
                    {/each}
                </div>

                
            </div>
        {/if}


        {#if isOpenCategories }
            <div class="category-list">
                {#each allCategories as item }
                    <button
                        on:click={e => {
                            isOpenAddition = false;
                            category = item;
                            setTimeout(() => {
                                isOpenCategories = false;
                            }, 300)
                        }}
                        >{`# ${item}`}
                    </button>
                {/each}
            </div>
        {/if}

    </div>


</div>

<style>

.widget {
    display: flex;

    animation-name: open-widget;
    animation-duration: 200ms;
}

.main-area,
.additional-area {
    font-size: 1.2rem;

    padding: 1em;

    cursor: default;

    color: var(--color-content-B);
    background-color: var(--color-block);
    border-radius: .8em;
    box-shadow: var(--color-block-shadow);

    width: 20em;
    height: 20em;

    display: flex;
    flex-direction: column;

    overflow: hidden;
}

.additional-area {
    position: absolute;
    transform-origin: bottom;
    transition: transform 200ms ease-out;
}

.additional-area-closed {
    transform: scaleY(0);
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

.categories,
.status-panel, 
.importance,
.deadline {
    display: grid;
    grid-auto-rows: 2.5em;
    grid-gap: .3em;

    font-size: .7em;
    margin: .4em 0;

    border: .15em solid transparent;
    border-radius: .8em;

    transition: border-color 200ms ease-out;
}

.importance {
    grid-template-columns: repeat(4, 1fr);
}

.status-panel {
    grid-template-columns: repeat(3, 1fr);
}

.categories {
    grid-template-columns: 1fr;
    grid-auto-rows: 2.8em;
}

.categories > button,
.status-panel > button,
.importance > button,
.deadline > button {
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

.categories > button {
    text-align: left;
    padding: .2em 0 0 1em;
}

.categories > button::after,
.status-panel > button::after,
.importance > button::after,
.deadline > button::after {
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

.categories > button:hover::after,
.status-panel > button:hover::after,
.importance > button:hover::after,
.deadline > button:hover::after {
    opacity: .3;
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



.category-list {
    display: flex;
    flex-direction: column;

    height: 100%;
    
    overflow-y: auto;
}

.category-list > button {
    font-size: .7em;
    text-align: left;
    background-color: transparent;
    color: var(--color-content-B);
    border-radius: .4em;
    border: .14em solid var(--color-content-C);
    margin: .2em;
    padding: .4em;
    border-radius: .4em;
}

.deadline-select {
    display: grid;
    grid-template-columns: 2fr repeat(5, 1fr);
    grid-auto-flow: dense;
    justify-content: center;
    align-content: center;
    gap: .2em;
    height: 100%;
}

.col-y {
    grid-column: 1 / 2;
}

.col-m {
    grid-column: 2 / 3;
}

.col-d {
    grid-column: 3 / 4;
}

.col-ho {
    grid-column: 5 / 6;
}

.col-mi {
    grid-column: 6 / 7;
}

.set-deadline {
    grid-column: 1 / -1;

    /* background-color: yellowgreen; */

    display: flex;
    justify-content: space-between;
    align-items: center;

}

.col-y, .col-m, .col-d, .col-ho, .col-mi {
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.deadline-select button {
    font-size: .7em;
    background-color: transparent;
    color: var(--color-content-B);
    margin: .2em;
    border-radius: .4em;
    border: .14em solid var(--color-content-C);
    padding: .4em;
    position: relative;
}

.deadline-select button.active {
    background-color: var(--color-accent);
}

.deadline-select > div > button::after {
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

.deadline-select > div >  button:hover::after {
    opacity: .3;
}

.col-mark {
    margin: 1em 0 .5em 0;
    font-size: .5em;
    font-weight: 700;
    opacity: .5;
    user-select: none;
    text-align: center;
}

.set-deadline > button {
    padding: .6em;
}

</style>
