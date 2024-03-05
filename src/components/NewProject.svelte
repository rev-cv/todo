<script>
import {createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
import Tulle from './Tulle.svelte'

export let id_project = -1;

let name = "";
let target = "";
let desc = "";

const duration = ['month', '3 months', 'half-year', 'year', 'some years'];
let curdur = 'some years';

const durationStages = ['1 week', '2 weeks', '3 weeks', '4 weeks', '5 weeks'];
let curdurstage = '2 weeks';


</script>

<Tulle on:closeDialog={event => {dispatch('closeDialog', {event})}} >
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="widget" on:click={e => e.stopPropagation()} >

    <div class="header">
        <div>{id_project < 0 ? "New Project" : `Project #{id_project}`}</div>
        <button>{id_project < 0 ? "Create" : "Edit"}</button>
    </div>

    <div class="column">

        <div class="line">
            <div class="expl">Project Name</div>
            <textarea 
                class="entry-field" 
                maxlength=50 
                placeholder=">"
                bind:value={name}
                wrap="off"
            />
        </div>

        <div class="line">
            <div class="expl">Objective of the project</div>
            <textarea 
                class="entry-field" 
                maxlength=50 
                placeholder=">"
                bind:value={target}
            />
        </div>

        <div class="line">
            <div class="expl">The project will finish within a {curdur}.</div>
            <div class="select-box">
                {#each duration as dur }
                    <button 
                        on:click={e => {curdur = dur}}
                        class={dur === curdur ? "active" : ""}
                        > { dur } 
                    </button>
                {/each}
            </div>
        </div>

        <div class="line expanding">
            <div class="expl">Description</div>
            <textarea 
                class="entry-field"
                placeholder=">"
                bind:value={desc}
            />
        </div>

    </div>

    <div class="column">

        <div class="line expanding">
            <div class="expl">Project stages</div>
            <div class="stages-list"></div>
        </div>
        
        <div class="line">
            <div class="expl">New stage</div>
            <textarea 
                class="entry-field" 
                maxlength=50
                placeholder=">"
            />
        </div>

        <div class="line">
            <div class="expl">Duration of the stage a {curdurstage}.</div>
            <div class="select-box">
                {#each durationStages as dur }
                    <button 
                        on:click={e => {curdurstage = dur}}
                        class={dur === curdurstage ? "active" : ""}
                        > { dur } 
                    </button>
                {/each}
            </div>
        </div>

    </div>

    <div class="column expanding">

        <div class="line expanding">
            <div class="expl">Project sources</div>
            <div class="stages-list"></div>
        </div>
        
        <div class="line">
            <div class="expl">New source</div>
            <textarea 
                class="entry-field" 
                placeholder=">"
            />
        </div>

    </div>
    

    
</div>
</Tulle>

<style>
    .widget {

        font-size: 1rem;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto 1fr ;
        grid-gap: 1em;
        padding: 1em;
        height: 30em;

        background-color: var(--color-block);
        box-shadow: var(--color-block-shadow);
        color: var(--color-content-B);

        border-radius: .8em;

        animation-name: open-widget;
	    animation-duration: 200ms;

        cursor: default;
    }

    .widget > .header {
        grid-column: 1 / -1;
        font-weight: 700;

        display: flex;
        justify-content: space-between;
    }

    .widget > .header > button {
        font-size: 1em;
        color: var(--color-content-A);
        background-color: var(--color-accent);
        padding: .3em 1em;
        border-radius: .6em;
        border: .1em solid rgba(0, 0, 0, .2);
        transition: 0.08s linear;
    }

    .widget > .header > button:hover {
        box-shadow: var(--color-block-shadow-on-block);
        border: .1em solid rgba(0, 0, 0, 0);
        transform: scale(1.1);
    }

    .widget > .header > button:active {
        transform: scale(.9);
    }

    .widget > .column {
        justify-self: stretch;
        align-self: stretch;

        display: flex;
        flex-direction: column;
    }

    .widget > .column > .line {
        margin-bottom: .8em;
    }

    .widget > .column > .line > .expl {
        font-size: .6em;
        text-align: left;
        margin-bottom: .8em;
    }

    .widget > .column > .line > .entry-field,
    .widget > .column > .line > .stages-list {
        font-size: .9em;
        width: 100%;

        background-color: var(--color-canvas);
        color: var(--color-content-B);
        border-radius: .6em;

        padding: .6em;

        box-shadow: 0 0 5px 1px rgba(0, 0, 0, .3) inset;

        resize: none;
    }

    .widget > .column > .expanding {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
    }

    .widget > .column > .expanding > .entry-field,
    .widget > .column > .expanding > .stages-list {
        flex-grow: 1;
    }

    .widget > .column > .line:last-child {
        margin-bottom: 0;
    }

    .select-box {
        background-color: var(--color-canvas);

        border-radius: .6em;

        font-size: 1em;
    }

    .select-box > button {
        font-size: .6em;
        background-color: var(--color-canvas);
        color: var(--color-content-B);
        padding: .6em;
        border-radius: 1em;
    }

    .select-box > .active {
        background-color: var(--color-accent);
        color: var(--color-content-A);
    }

    @keyframes open-widget {
	    from {  
            transform: translate(5em, -5em) scale(.7);
        }
        to {
            transform: translate(0,0) scale(1);
        }
    }
</style>