<script>
// @ts-nocheck
import { emoji } from '../store/emoji-list'
import {createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();

let isOpenPicker = false;
export let currentEmoji = "🥎";

</script>

<div class="widget">
    <button 
        class={isOpenPicker ? "picker-btn active" : "picker-btn"}
        on:click={e => isOpenPicker = !isOpenPicker}
        ><div>{currentEmoji}</div>
    </button>
    {#if isOpenPicker}
        <div class="picker">
            <div class="emojies">
                {#each Object.keys(emoji) as title }
                    <div class="title">{title}</div>
                    {#each emoji[title] as elem }
                        <button
                            on:click={e => {
                                currentEmoji = elem;
                                isOpenPicker = false;
                                dispatch('select', elem)
                            }}
                            >{elem}
                        </button>
                    {/each}
                {/each}
            </div>
        </div>
    {/if}
</div>


<style>

.widget {
    user-select: none;
}

button.picker-btn {
    font-size: 1.6em;
    background-color: transparent;
    position: relative;
    --border-radius: .3em;
    border-radius: var(--border-radius);
    transition: background-color 200ms ;
}

button.picker-btn > div {
    padding: .3em;
    overflow: hidden;
    border-radius: var(--border-radius);
    position: relative;
}

button.picker-btn > div::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: var(--color-content-C);
    opacity: 0;
    transition: opacity 200ms ;
}

button.picker-btn:hover > div::before {
    opacity: .3;
}

.picker-btn.active {
    border-radius: .3em .3em 0 0;
    background-color: var(--color-block);
}

.picker {
    position: absolute;
    width: 20em;
    height: 20em;
    border-radius: 0 .6em .6em .6em;
    z-index: 10;
    padding: 1em;
    overflow: hidden;
    backdrop-filter: blur(4px);
}

.picker::after {
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--color-block);
    position: absolute;
    z-index: -1;
    opacity: .7;
}

.emojies {
    display: grid;
    grid-template-columns: repeat(auto-fill, 2.2em);
    justify-content: center;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
}

.emojies > button {
    font-size: 1.4em;
    background-color: transparent;
    color: var(--color-content);
}

.emojies > .title {
    grid-column: 1 / -1;
    font-weight: 700;
    padding: 1.6em 0 .5em 0;
}

.active {
    background-color: var(--color-block);
    z-index: 10;
}

.active::before {
    content: "";
    position: absolute;
    width: var(--border-radius);
    height: var(--border-radius);
    background-color: var(--color-block);
    bottom: 0;
    right: calc(var(--border-radius) * -1);
}

.active::after {
    content: "";
    position: absolute;
    width: calc(var(--border-radius) * 2);
    height: calc(var(--border-radius) * 2);
    background-color: var(--color-canvas);
    border-radius: 50%;
    bottom: 0;
    right: calc(var(--border-radius) * -2);
}


</style>


