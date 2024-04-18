<script>
// @ts-nocheck
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
import { onDestroy } from 'svelte';
import { isOpenDialog } from '../store/OpenDialog'
import { tasklist, allCategories } from '../store/TestTaskList'
import { shortMonthNames } from '../store/Date'
import PickerDateTime from './PickerDateTime.svelte'
import Confirmation from './DialogConfirmation.svelte'

// управление дополнительными всплывающими окнами
let isOpenAddition = false;

let isOpenDeadline = false;
let isOpenStartline = false;
let isOpenTimeEstimate = false;
let isOpenCategories = false;
let isDeletionWarning = false;


const timeEstimaties = [
    ["×", 0], ["30m", 30], ["45m", 45], ["1h", 60],
    ["2h", 120], ["3h", 180], ["5h", 300], ["8h", 480],
]


// распаковка задачи
export let task = {
    "id": -1, // если (-1) значит отображается создаваемая сейчас задача
    "title": "",
    "created": "",     // 2023-11-01
    "startline": "",   // 2023-07-01
    "finished": "",    // 2023-12-28
    "deadline": "",    // 2024-03-12 15:15
    "timeEstimate": 0, // minutes
    "category": "",
    "status": "wait",
    "importance": 0,
    "isQueue": false,  // помещена задача в очередь? 
    "type": "standard", 
}
let status = task.status;

// распаковка значения старта
let sDT = new Date();
let isSED = false; // isExistsDate
let isSET = false;
if (task.startline != "") {
    sDT = new Date(task.startline);
    const [date, time] = task.startline.split(" ");
    isSED = date != undefined
    isSET = time != undefined
}


// распаковка значения дедлайна
let dDT = new Date();
let isDED = false; // isExistsDate
let isDET = false;
if (task.deadline != "") {
    dDT = new Date(task.deadline);
    const [date, time] = task.deadline.split(" ");
    isDED = date != undefined
    isDET = time != undefined
}


function generateTextDateTime(date, isED, isET) {
    let text = "- - -";

    if (isED) {
        const dYear = date.getFullYear();
        const dMonth = date.getMonth() + 1;
        const dDay = date.getDate();

        text = `${dYear}, ${dDay} ${shortMonthNames[dMonth - 1]}`;

        if (isET) {
            const dHour = date.getHours();
            const dMin = date.getMinutes();

            text += ` ${String(dHour).padStart(2, '0')}`
            text += `:${String(dMin).padStart(2, '0')}`
        }
    }

    return text
}
let textStart = generateTextDateTime(sDT, isSED, isSET);
let textDeadline = generateTextDateTime(dDT, isDED, isDET);


// управление выбором старта и дедлайна
function setStartline (date, isExistsDate, isExistsTime) {
    // обработка закрытия дополнительного окна
    isOpenAddition = false;
    setTimeout(() => {
        isOpenStartline = false;
    }, 300)

    sDT = date;
    isSED = isExistsDate;
    isSET = isExistsTime;

    textStart = generateTextDateTime(sDT, isSED, isSET);
}

function setDeadline (date, isExistsDate, isExistsTime) {
    // обработка закрытия дополнительного окна
    isOpenAddition = false;
    setTimeout(() => {
        isOpenDeadline = false;
    }, 300)

    dDT = date;
    isDED = isExistsDate;
    isDET = isExistsTime;

    textDeadline = generateTextDateTime(dDT, isDED, isDET);
}


function UPDATE () {

    // в дальнейшем данная функция должна будет взаимодействовать с базой данной

    let finished = task.finished
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
    if (isDED) {
        const month = String(dDT.getMonth() + 1).padStart(2, '0');
        const day = String(dDT.getDate()).padStart(2, '0');
        newDeadLine = `${dDT.getFullYear()}-${month}-${day}`
        if (isDET) {
            const hour = String(dDT.getHours()).padStart(2, '0');
            const minute = String(dDT.getMinutes()).padStart(2, '0');
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
                    status: newStatus,
                    finished: finished,
                    deadline: newDeadLine,
            };
        }
        return newTasklist
    });
}


function CREATE () {

    // тестовая функция добавления новой задачи
    // в дальнейшем данная функция должна будет взаимодействовать с базой данной

    if (task.title != ""){

        task.id = Date.now();

        isOpenDialog.set(false)
        setTimeout(() => {
            dispatch('closeDialog')
        }, 200)

        tasklist.update(items => {
            items.push(task)
            return items
        });
    }
}


function DELETE() {

    // в дальнейшем данная функция должна будет взаимодействовать с базой данной

    setTimeout(_ => {
        isOpenDialog.set(false)
    }, 100)
    

    setTimeout(_ => {
        dispatch('closeDialog')
    }, 400)

    setTimeout(() => {
        tasklist.update(items => {
            return items.filter(elem => elem.id != task.id)
        });
    }, 400)
}


onDestroy(_ => {
    UPDATE()
})


</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={$isOpenDialog ? "widget" : "widget closing"} on:click|stopPropagation >


    <div class="main-area">

        <!-- <div class="mark">Title</div> -->
        <div class="title-line">
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


        <div class="mark">Importance</div>
        <div class="importance-line">
            {#each [
                ["A", 1, "Important and urgent"], 
                ["B", 2, "Important but not urgent"], 
                ["C", 3, "Urgent but not important"], 
                ["×", 0, "Not urgent or important"]] 
                as imp }
                <button 
                    class={task.importance === imp[1] ? `imp-${imp[1]} active` : `imp-${imp[1]}`}
                    title={imp[2]}
                    on:click={e => task.importance = imp[1]}
                    >{imp[0]}
                </button>
            {/each}
        </div>


        <div class="mark">Status</div>
        <div class="status-line">
            {#each ["done", "wait", "fail"] as cst }
                <button 
                    class={status === cst ? `${cst} active` : cst}
                    on:click={e => status = cst}
                    >{cst}
                </button>
            {/each}
            <div class="v-line" />
            <button
                class={task.isQueue ? "queue active" : "queue"}
                on:click={e => task.isQueue = !task.isQueue}
                >queue
            </button>
        </div>
        

        <div class="mark">Category</div>
        <div class="categories">
            <button
                on:click={e => {
                    isOpenCategories = true;
                    isOpenAddition = true;
                }}
                >{task.category === "" ? "×" : `# ${task.category}`}
            </button>
        </div>

        <div class="time-line">
            <div class="mark">Start</div>
            <div class="mark">Deadline</div>
            <div class="mark">Time estimate</div>

            <button
                on:click={e => {
                    isOpenStartline = true;
                    isOpenAddition = true;
                }}
                ><span>{textStart}</span>
            </button>

            <button
                on:click={e => {
                    isOpenDeadline = true;
                    isOpenAddition = true;
                }}
                ><span>{textDeadline}</span>
            </button>

            <button
                on:click={e => {
                    isOpenAddition = true;
                    isOpenTimeEstimate = true;
                }}
                ><span>{
                    task.timeEstimate === 0 ? "×" :
                        task.timeEstimate < 60 ? 
                            `${task.timeEstimate}m` : 
                                `${Math.ceil(task.timeEstimate / 60)}h` 
                }</span>
            </button>

        </div>
 
        <!-- <div class="mark">Auto recreate</div> -->

        <!-- 
            отсчет от 
                - дедлайн         в часах | днях | месяцах
                - финиш           в часах | днях | месяцах
                - начала недели   в часах | днях | месяцах + день недели
                - начала декады   
                - начала месяца
         -->

        {#if task.id === -1}
            <div class="btn-create-new-task">
                <button on:click={CREATE}>create</button>
            </div>
        {:else}
            <div class="btn-delete-new-task">
                <button on:click={e => isDeletionWarning = true}>
                    <svg><use xlink:href="#ico-delete-in-basket" /></svg>
                </button>
            </div>
        {/if}

    </div>

    <div class={ isOpenAddition ? "additional" : "additional closed" }>

        {#if isOpenCategories }

            <div class="category-list">
                {#each allCategories as item }
                    <button
                        class={item === task.category ? "active" : ""}
                        on:click={e => {
                            isOpenAddition = false;
                            task.category = item;
                            setTimeout(() => {
                                isOpenCategories = false;
                            }, 300)
                        }}
                        >{item === "" ? "×" : `# ${item}`}
                    </button>
                {/each}
            </div>

        {:else if isOpenStartline}

            <PickerDateTime 
                thisdate={sDT}
                isExistsDate={isSED}
                isExistsTime={isSET}
                on:setdate={e => setStartline(...e.detail)}
            />

        {:else if isOpenDeadline}

            <PickerDateTime 
                thisdate={dDT}
                isExistsDate={isDED}
                isExistsTime={isDET}
                on:setdate={e => setDeadline(...e.detail)}
            />
        
        {:else if isOpenTimeEstimate}

            <div class="mark">Scheduled time for task</div>
            <div class="time-estimate-list">
                {#each timeEstimaties as est }
                    <button
                        on:click={e => {
                            isOpenAddition = false;
                            task.timeEstimate = est[1];
                            setTimeout(() => {
                                isOpenTimeEstimate = false;
                            }, 300)
                        }}>{est[0]}
                    </button>
                {/each}
            </div>
            
        {/if}
    </div>
</div>


{#if isDeletionWarning}
    <Confirmation
        on:confirm={DELETE}
        on:noConfirm={e => isDeletionWarning = false}
        >
        <div class="del-message">
            <div class="id">id: {task.id}</div>
            <div class="title">«{task.title}»</div>
            <div class="question">Delete task?</div>
        </div>
    </Confirmation>
{/if}


<svelte:window on:keydown={e => {

    if (task.id === -1 && e.ctrlKey && e.key.toLowerCase() === 's'){
        e.preventDefault();
        CREATE()


    } else if (e.key.toLowerCase() === "escape") {

        if (isOpenAddition) {
            isOpenAddition = false;
            setTimeout(() => {
                isOpenDeadline = false;
                isOpenStartline = false;
                isOpenTimeEstimate = false;
                isOpenCategories = false;
            }, 300)
        } else {
            isOpenDialog.set(false)
            setTimeout(_ => {
                dispatch('closeDialog')
            }, 200)
        }


    } else if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        isOpenDialog.set(false)
        setTimeout(_ => {
            dispatch('closeDialog')
        }, 200)
    }
}} />


<style>

.widget {
    display: flex;

    animation-name: open-widget;
    animation-duration: 200ms;
}

.widget.closing {
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



/* WIDGET FRAME */

.widget > .main-area,
.widget > .additional {
    font-size: 1.2rem;

    padding: 1em;

    cursor: default;

    color: var(--color-content-B);
    background-color: var(--color-block);
    border-radius: .8em;
    box-shadow: var(--color-block-shadow);

    width: 20em;
    height: 21em;

    display: flex;
    flex-direction: column;

    overflow: hidden;
}

.widget > .additional {
    position: absolute;
    transform-origin: bottom;
    transition: transform 200ms ease-out;
    background-color: var(--color-block-transparent);
    backdrop-filter: blur(6px);
}

.widget > .additional.closed {
    transform: scaleY(0);
}



/* MARK LINE */

.mark {
    font-size: .6rem;
    margin-top: 1em;
    font-weight: 700;
    opacity: .5;
    user-select: none;
}



/* TITLE LINE */

.widget > .main-area > .title-line {
    font-size: .8em;
    min-width: 20em;
    display: flex;
}

.widget > .main-area > .title-line > input {
    flex-grow: 1;
    font-size: 1.2em;
    padding: .6em .4em .4em .6em;
    background-color: transparent;
    color: var(--color-content-A);
    font-weight: 700;
    border-radius: .6em;
    transition: box-shadow 500ms ease-out;
}

.widget > .main-area > .title-line > input:focus {
    box-shadow: var(--color-block-shadow-inset);
}



/* IMPORTANCE LINE */

.widget > .main-area > .importance-line {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 2.5em;
    grid-gap: .3em;

    font-size: .7em;
    margin: .4em 0;
}

.widget > .main-area > .importance-line > button {
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

.widget > .main-area > .importance-line > button::after {
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

.widget > .main-area > .importance-line > button:hover::after {
    opacity: .3;
}

.widget > .main-area > .importance-line > button.imp-3.active {
    background-color: var(--color-importance-C);
    color: var(--color-block);
}

.widget > .main-area > .importance-line > button.imp-1.active {
    background-color: var(--color-importance-A);
    color: var(--color-block);
}

.widget > .main-area > .importance-line > button.imp-2.active {
    background-color: var(--color-importance-B);
    color: var(--color-block);
}

.widget > .main-area > .importance-line > button.imp-0.active {
    background-color: var(--color-importance-X);
    color: var(--color-block);
}



/* STATUS LINE */

.widget > .main-area > .status-line {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr .1fr 1fr;
    grid-auto-rows: 2.5em;
    grid-gap: .3em;

    font-size: .7em;
    margin: .4em 0;
}

.widget > .main-area > .status-line > button {
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

.widget > .main-area > .status-line > button::after {
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

.widget > .main-area > .status-line > button:hover::after {
    opacity: .3;
}

.widget > .main-area > .status-line > button.wait.active {
    background-color: var(--color-importance-C);
    color: var(--color-block);
}

.widget > .main-area > .status-line > button.done {
    border-radius: .6em .2em .12em .6em;
}

.widget > .main-area > .status-line > button.wait {
    border-radius: .2em;
}

.widget > .main-area > .status-line > button.fail {
    border-radius: .2em .6em .6em .2em;
}

.widget > .main-area > .status-line > button.done.active {
    background-color: var(--color-importance-D);
    color: var(--color-block);
}

.widget > .main-area > .status-line > button.fail.active {
    background-color: var(--color-importance-A);
    color: var(--color-block);
}

.widget > .main-area > .status-line > button.queue.active {
    background-color: var(--color-importance-B);
    color: var(--color-block);
}

.widget > .main-area > .status-line > .v-line {
    justify-self: center;
    background-color: var(--color-content-C);
    width: .1em;
    height: 100%;
}




/* CATEGORIES LINE */

.widget > .main-area > .categories {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 2.8em;
    grid-gap: .3em;

    font-size: .7em;
    margin: .4em 0;
}

.widget > .main-area > .categories > button  {
    font-size: 1em;
    text-align: left;

    user-select: none;

    position: relative;
    overflow: hidden;

    background-color: transparent;
    color: var(--color-content-B);

    border: .14em solid var(--color-content-C);
    border-radius: .6em;
    padding: .2em 0 0 1em;

    transition: background-color 500ms ease-out;
}

.widget > .main-area > .categories > button::after {
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

.widget > .main-area > .categories > button:hover::after {
    opacity: .3;
}



/* TIME LINE */

.widget > .main-area > .time-line {
    display: grid;
    grid-template-columns: 1fr 1fr .6fr;
    grid-template-rows: auto;
    grid-auto-rows: 2em;
    grid-gap: .3em;
}

.widget > .main-area > .time-line > button {
    font-size: .8em;
    user-select: none;

    position: relative;
    overflow: hidden;

    background-color: transparent;
    color: var(--color-content-B);

    border: .14em solid var(--color-content-C);
    border-radius: .6em;

    transition: background-color 500ms ease-out;
}

.widget > .main-area > .time-line > button > span {
    font-size: .7em;
    font-weight: 700;
}

.widget > .main-area > .time-line > button::after {
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

.widget > .main-area > .time-line > button:hover::after {
    opacity: .3;
}




/* CATEGORY WINDOW */

.widget > .additional > .category-list {
    display: flex;
    flex-direction: column;

    height: 100%;
    
    overflow-y: auto;
}

.widget > .additional > .category-list > button {
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

.widget > .additional > .category-list > button.active {
    background-color: var(--color-accent);
}



/* TIME ESTIMATE WINDOW */

.widget > .additional > .time-estimate-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 2.5em;
    grid-gap: .3em;

    font-size: .7em;
    margin: 1.4em 0;
}

.widget > .additional > .time-estimate-list > button {
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

.widget > .additional > .time-estimate-list > button::after {
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

.widget > .additional > .time-estimate-list > button:hover::after {
    opacity: .3;
}


/* SAVE BUTTON LINE */

.btn-create-new-task,
.btn-delete-new-task {
    font-size: .7em;
    margin: 1.4em 0;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.btn-delete-new-task > button,
.btn-create-new-task > button {
    font-size: 1em;
    text-align: left;

    user-select: none;

    position: relative;
    overflow: hidden;

    background-color: transparent;
    color: var(--color-content-B);

    border: .14em solid var(--color-content-C);
    border-radius: .6em;
    padding: .54em 1em .5em;

    display: flex;
    justify-content: center;
    align-items: center;

    align-self: flex-end;
}

.btn-delete-new-task > button > svg {
    width: 1em;
    height: 1em;
}

.btn-delete-new-task > button {
    align-self: flex-start;
    padding: .7em;
}


.btn-create-new-task > button::after,
.btn-delete-new-task > button::after {
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

.btn-delete-new-task > button::after {
    background-color: var(--color-importance-A);
}

.btn-create-new-task > button:hover::after,
.btn-delete-new-task > button:hover::after {
    opacity: .3;
}



/* DELETE QUESTIOM */

.del-message > .id {
    font-size: .5em;
    opacity: .5;
    text-align: center;
}

.del-message > .title {
    font-size: 1em;
    font-weight: 700;
    padding: 1em 0;
    text-align: center;
}

.del-message > .question {
    font-size: .8em;
    text-align: center;
}
</style>
