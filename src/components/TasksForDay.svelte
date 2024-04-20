<script>
// @ts-nocheck
import { per100, per200, per300, tasklist } from '../store/TestTaskList'
import ItemTask from './ItemTask.svelte'

let isTaskForDecade = false;
let dragsTask = undefined;

const listLists = [$per100, $per200, $per300];
let efficiency = 0;


// per100.subscribe(_ => calcEfficiency());
// per200.subscribe(_ => calcEfficiency());
// per300.subscribe(_ => calcEfficiency());
tasklist.subscribe(_ => calcEfficiency());


function calcEfficiency(){
    efficiency = 0;

    if ($per200[0] != undefined) {
        if ($per200[0].status === "done"){
            efficiency += 100
        }
    }

    $per200.forEach(task => {
        if (task != undefined) {
            if (task.status === "done"){
                efficiency += 100 / 3
            }
        }
    })

    $per300.forEach(task => {
        if (task != undefined) {
            if (task.status === "done"){
                efficiency += 100 / 5
            }
        }
    })
}


function manageTaskForDay(list, position) {
    if (dragsTask === undefined){
        // задача убирается из спика
        listLists[list][position] = undefined;
    } else {
        listLists.forEach((block, index) => {
            // убираются дубликаты (если такие есть) перед добавлением
            block.forEach((task, subindex) => {
                if (task != undefined){
                    if (task.id === dragsTask.id) {
                        listLists[index][subindex] = undefined;
                    }
                }
            })
        })
        listLists[list][position] = dragsTask;
        dragsTask = undefined;
    }
}


</script>


<div class="control-panel">

    <div class="efficiency">efficiency — {efficiency}%</div>

    <button class="btn-open-all-tasks" on:click={e => isTaskForDecade = !isTaskForDecade}>
        <svg><use xlink:href="#ico-list"/></svg>
    </button>
</div>


<div class="task-for-day">

    <div class="block-pers">
        {#each listLists as block, index }
            <div class={`block-${index+1}00per`}>
                <div class="title">{`${index+1}00% efficiency`}</div>

                {#each block as task, subindex}
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div 
                        class="dropzone"
                        on:dragover|preventDefault
                        on:drop|preventDefault={e => 
                            manageTaskForDay(index, subindex)
                        }
                        >
                        {#if task !== undefined}
                            <ItemTask 
                                task={task}
                                isShowImportance={false}
                                isDragAndDrop={true}
                                on:dragstart={e => dragsTask = task}
                                on:remove={e => manageTaskForDay(index, subindex) }
                            />
                        {:else}
                            <div class="no-task">no task</div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}

    </div>
    <div class={isTaskForDecade ? "block-decade" : "block-decade hidden"}>
        <div class="title">Task for this decade</div>
        {#each $tasklist as task}
            <ItemTask 
                task={task}
                isDragAndDrop={true}
                on:dragstart={e => dragsTask = task}
            />
        {/each}
    </div>
</div>



<style>


.btn-open-all-tasks {
    background-color: greenyellow;

    background-color: var(--color-block);
    width: 2.4em;
    height: 2.4em;

    margin: .2em .4em;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: .6em;

    transition: 0.08s ease-out;

    border: .1em solid rgba(0, 0, 0, .2);

    font-size: 1em;

    align-self: flex-end;
    margin-right: 1em;

    position: relative;
    overflow: hidden;
}

.btn-open-all-tasks::after {
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

.btn-open-all-tasks:hover::after {
    opacity: .3;
}

.btn-open-all-tasks > svg {
    width: 50%;
    height: 50%;
}

.title {
    margin-bottom: 1em;
    font-size: .5em;
    font-weight: 700;
    user-select: none;
    text-align: left;
}


.task-for-day {
    flex-grow: 1;
    display: flex;
    margin-bottom: 1em;
    overflow: auto;
}

.block-pers,
.block-decade {
    width: 22em;
    transition: all 0.3s ease;
    transform-origin: left;
    margin: 1em 1em 0 1em;
    height: 30em;
}

.block-pers {
    position: sticky;
    top: 1em;
}

.hidden {
    transform: scaleX(0);
    width: 0px;
    opacity: 0;
}

.no-task {
    padding: .3em 1em ;
    background-color: var(--color-content-C);
    margin: .2em 0;
    opacity: .2;
    border-radius: .3em;
    user-select: none;
}

.block-100per, 
.block-200per,
.block-300per {
    background-color: var(--color-block);
    margin: 0 0 1em 0;
    padding: .5em 1em 1em 1em;
    border-radius: .2em .6em .6em .2em;
    border-left: .2em solid yellowgreen;
    box-shadow: var(--color-block-shadow-on-block);
}

.block-100per > .title {
    color: var(--color-importance-A);
}

.block-200per > .title {
    color: var(--color-importance-B);
}

.block-300per > .title {
    color: var(--color-importance-C);
}

.block-100per {
    border-color: var(--color-importance-A);
}

.block-200per {
    border-color: var(--color-importance-B);
}

.block-300per {
    border-color: var(--color-importance-C);
}

.control-panel {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>