<script>
import { vectors } from '../store/TestTaskList'

const svgWidth = 30;
const svgHeight = 30;
const cx = svgWidth / 2;
const cy = svgHeight / 2;
const VRadius = 11;
const vsRadius = 2;

let active = 0;

export let currentYear = 2024;


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


        {#each vectors as vec, i }
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <g 
                class={active === i ? "vector active" : "vector"} 
                on:click={e => active = i } 
                >
                <circle 
                    cx={`${cx + VRadius * Math.cos(2 * Math.PI * i / vectors.length)}em`}
                    cy={`${cy + VRadius * Math.sin(2 * Math.PI * i / vectors.length)}em`}
                    r={`${vsRadius}em`}
                />
                <text
                    class="icon"
                    x={`${(cx + VRadius * Math.cos(2 * Math.PI * i / vectors.length) - 1.2) / 2}em`}
                    y={`${(cy + VRadius * Math.sin(2 * Math.PI * i / vectors.length) + .6) / 2}em`}
                    >{vec.icon}
                </text>
            </g>
        {/each}
    </svg>

<div class="vector-about">
    <div class="title">title</div>
    <div class="description">description</div>

</div>

</div>







<style>
.vectors {
    display: flex;
}

.vector-about {
    width: 10em;
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
    transform: scale(1.09);
}

.vector > text.icon {
    font-size: 2em;
}

.vector:hover {
    transform: scale(1.1);
}

.main-title > text {
    font-size: 2em;
    font-weight: 700;
    fill: var(--color-content);
}

</style>