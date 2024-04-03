<script>
import { vectors } from '../store/TestTaskList'
import ItemTask from './ItemTask.svelte'

export let currentYear = 2024;
let active = 0;

const svgWidth = 28;
const svgHeight = 28;
const cx = svgWidth / 2;
const cy = svgHeight / 2;
const VRadius = 10;
const vsRadius = 2;

let isViewDescription = false;
let isOpenVector = false;
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
                x={`${(cx - 6) / 2}em`}
                y={`${(cy - .5) / 2}em`}
                >Development
            </text>

            <text
                x={`${(cx - 5.8) / 2}em`}
                y={`${(cy + 1.5) / 2}em`}
                >vectors {currentYear}
            </text>
        </g>


        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <g 
            class="new-vector"
            on:click={e => isOpenVector=true}
            >
            <!-- <path d="M17.25 1.5C17.25 0.671579 16.5784 0 15.75 0L14.25 0C13.4216 0 12.75 0.671579 12.75 1.5L12.75 12.75L1.5 12.75C0.67157 12.75 0 13.4215 0 14.25L0 15.75C0 16.5785 0.67157 17.25 1.5 17.25L12.75 17.25L12.75 28.5C12.75 29.3284 13.4216 30 14.25 30L15.75 30C16.5784 30 17.25 29.3284 17.25 28.5L17.25 17.25L28.5 17.25C29.3284 17.25 30 16.5785 30 15.75L30 14.25C30 13.4215 29.3284 12.75 28.5 12.75L17.25 12.75L17.25 1.5Z" fill="var(--color-content-B)" fill-rule="nonzero" transform={`translate(${cx * 19}, ${cy * 24})`}
            /> -->
            <circle
                class="development-vectors"
                cx={`${cx}em`}
                cy={`${cy}em`}
                r={`${VRadius}em`}
                opacity=".8"
            />
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


    <div class="vector-about">
        <!-- <div class="mark">title</div> -->
        <div class="title">{$vectors[active].title}</div>
        <div class="descr-block">
            <div class="mark">description</div>
            <button 
                class={isViewDescription ? "active" : ""}
                on:click={e => isViewDescription = !isViewDescription}
                ><svg><use xlink:href="#ico-arrow"/></svg>
            </button>
        </div>
        
        <div 
            class={isViewDescription ? "description active" : "description"}
            >{$vectors[active].description}</div>

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

</div>


<style>
.vectors {
    display: flex;
}

.vector-about {
    width: 22em;
    margin: 2em 3em 0 3em;
    max-height: 30em;
    overflow-x: hidden;
    overflow-y: auto;
}

.mark {
    font-size: .6em;
    font-weight: 700;
    opacity: .5;
    margin: 2em 0 1em 0;
    user-select: none;
}

.descr-block {
    display: flex;
    align-items: center;
    justify-content:space-between
}

.descr-block > button {
    font-size: 1rem;

    background-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;

    width: .6em;
    height: .6em;

    transition: transform 100ms ease-out;
    transform: rotate(180deg);
}

.descr-block > button.active {
    transform: rotate(0deg);
}

button.add-new-task-for-vector {
    font-size: .8em;
    margin: .6em .4em .6em .14em;
    padding: .4em;

    display: flex;
    align-items: center;

    background-color: transparent;
    color: var(--color-content-B);
}

button.add-new-task-for-vector > svg {
    width: 1em;
    height: 1em;
    margin: 0 .4em 0 0;
}





.vector-about > .title {
    font-size: 1.4em;
    font-weight: 700;
    /* transition: all 200ms ease-out; */
}

.description {
    font-size: .8em;
    opacity: .8;
}
.description.active {
    max-height: 0;
    overflow: hidden;
}

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
    font-size: 2em;
    font-weight: 700;
    fill: var(--color-content);
}

.new-vector {
    transition: all 300ms ease-out;
    transform-origin: center;
    cursor: pointer;
}

.new-vector:hover {
    transform: scale(1.12);
}

</style>