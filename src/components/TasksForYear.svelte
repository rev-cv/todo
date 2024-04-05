<script>
// @ts-nocheck
import { vectors } from '../store/TestTaskList'
import { year } from '../store/Date'
import ItemTask from './ItemTask.svelte'
import EmojiPicker from './EmojiPicker.svelte'

let active = 0;

const svgWidth = 20;
const svgHeight = 20;
const cx = svgWidth / 2;
const cy = svgHeight / 2;
const VRadius = 7;
const vsRadius = 2;

let isViewDescription = false;
let isOpenVector = false;

function changeEmoji(emoji) {
    vectors.update(items => {
        const newTasklist = [...items];
        newTasklist[active].icon = emoji.detail
        return newTasklist;
    });
}
</script>

<div class="vectors">
    <svg
        width={`${svgWidth}em`}
        height={`${svgHeight}em`}
        >

        <circle
            class="development-vectors"
            cx={`${cx}em`}
            cy={`${cy}em`}
            r={`${VRadius}em`}
        />


        <g class="main-title">
            <text
                x={`${(cx - 3.5) / 1.2}em`}
                y={`${(cy - .2) / 1.2}em`}
                >Development
            </text>

            <text
                x={`${(cx - 3.5) / 1.2}em`}
                y={`${(cy + 1.5) / 1.2}em`}
                >vectors {$year}
            </text>
        </g>


        {#each $vectors as vec, i }
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <g 
                class={active === i ? "vector active" : "vector"} 
                on:click={e => active = i } 
                >
                <circle 
                    cx={`${cx + VRadius * Math.cos(2 * Math.PI * i / $vectors.length)}em`}
                    cy={`${cy + VRadius * Math.sin(2 * Math.PI * i / $vectors.length)}em`}
                    r={`${vsRadius}em`}
                />
                <text
                    class="icon"
                    x={`${(cx + VRadius * Math.cos(2 * Math.PI * i / $vectors.length) - 1.2) / 2}em`}
                    y={`${(cy + VRadius * Math.sin(2 * Math.PI * i / $vectors.length) + .6) / 2}em`}
                    >{vec.icon}
                </text>
            </g>
        {/each}

    </svg>

    <button class="new-vector">
        <svg><use xlink:href="#ico-add"/></svg>
    </button>

    <div class="vector-about">
        <!-- <div class="mark">title</div> -->
        <div class="title-block">
            <EmojiPicker 
                currentEmoji={$vectors[active].icon}
                on:select={changeEmoji}
            />
            <div class="title">{$vectors[active].title}</div>
        </div>

        <div class="block">
            <div class="mark">Tasks for vector</div>
            {#each $vectors[active].tasks as task}
                <ItemTask 
                    task={task}
                    isShowImportance={false}
                />
            {/each}
            <button
                class="add-new-task-for-vector"
                >
                    <svg><use xlink:href="#ico-add"/></svg>
                    <span>new task</span>
            </button>
        </div>
        

        <div class="block">
            <div class="descr-block">
                <div class="mark">description</div>
                <button 
                    class={isViewDescription ? "active" : ""}
                    on:click={e => isViewDescription = !isViewDescription}
                    ><svg><use xlink:href="#ico-arrow"/></svg>
                </button>
            </div>
            
            <div 
                class={isViewDescription ? "description view" : "description"}
                >{$vectors[active].description}
            </div>
        </div>
        
        
    </div>

</div>


<style>

.vectors {
    display: flex;
}



/* CIRCLE VECTORS */

svg {
    font-size: 1em;
    user-select: none;
}

.development-vectors {
    fill: transparent;
    stroke-width: 1em;
    stroke: var(--color-content-C);
    stroke-dasharray: 4;
}

.vector {
    fill: var(--color-canvas);
    cursor: pointer;

    stroke-width: .2em;
    stroke: var(--color-content-C);

    box-shadow: var(--color-block-shadow);
    transform-origin: center;
    transition: all 300ms ease-out;
}

.active {
    fill: var(--color-accent);
    transform: scale(1.1);
}

.vector > text.icon {
    font-size: 2em;
}

.vector:hover {
    transform: scale(1.06);
}

.main-title > text {
    font-size: 1.2em;
    font-weight: 700;
    fill: var(--color-content);
}

button.new-vector {
    position: absolute;
    font-size: 1em;
    top: 24em;
    width: 3em;
    height: 3em;

    display: flex;
    align-items: center;
    padding: .6em;
    border-radius: 50%;

    background-color: transparent;
    border: .2em solid var(--color-content-C);
}


/* ABOUT VECTORS */

.vector-about {
    width: 22em;
    margin: 2em 3em 0 3em;
    max-height: 30em;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 1em;
}

.block {
    background-color: var(--color-block);
    box-shadow: var(--color-block-shadow-on-block);
    padding: .5em;
    border-radius: .4em;
    margin: .5em 0;

    display: flex;
    flex-direction: column;
}

.mark {
    font-size: .6em;
    font-weight: 700;
    opacity: .5;
    margin: .5em;
    user-select: none;
}


/* TITLE FOR VECTOR */

.title-block {
    display: flex;
    align-items: center;
}

.title {
    font-size: 1.4em;
    font-weight: 700;
    margin-left: .3em;
}


/* TASKS FOR VECTOR */

button.add-new-task-for-vector {
    align-self: flex-end;

    font-size: .8em;
    margin: .6em .4em .6em .14em;
    padding: .4em;
    border-radius: .5em;

    display: flex;
    align-items: center;

    background-color: transparent;
    color: var(--color-content-B);

    position: relative;
    overflow: hidden;
}

button.add-new-task-for-vector::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--color-content-C);
    transition: opacity 300ms ease-out;
    opacity: 0;
}

button.add-new-task-for-vector:hover::before {
    opacity: .4;
}

button.add-new-task-for-vector > svg {
    width: 1em;
    height: 1em;
    margin: 0 .4em 0 0;
}


/* DESCRIPTION FOR VECTOR */

.description {
    font-size: .8em;
    opacity: .8;
    padding: .5em;
}

.description.view {
    max-height: 0;
    overflow: hidden;
    padding: 0 .5em;
}

.descr-block {
    display: flex;
    align-items: center;
    justify-content:space-between;
}

.descr-block > button {
    font-size: 1rem;

    background-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;

    width: .6em;
    height: .6em;
    margin-right: .5em;

    transition: transform 100ms ease-out;
    transform: rotate(180deg);
}

.descr-block > button.active {
    transform: rotate(0deg);
}








</style>