<script>
// @ts-nocheck
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
import { shortMonthNames } from '../store/Date'

export let thisdate = new Date();
export let isExistsDate = false;
export let isExistsTime = false;

let dYear = 2024;
let dMonth = 1;
let dDay = 1;
let dHour = 0;
let dMin = 0;

if (thisdate != undefined) {
    if (isExistsDate) {
        dYear = thisdate.getFullYear();
        dMonth = thisdate.getMonth() + 1;
        dDay = thisdate.getDate();
    }

    if (isExistsTime) {
        dHour = thisdate.getHours();
        dMin = thisdate.getMinutes();
    }
}

function setDate(){

    thisdate.setFullYear(dYear);
    thisdate.setMonth(dMonth - 1);
    thisdate.setDate(dDay)
    thisdate.setHours(dHour)
    thisdate.setMinutes(dMin)
    
    dispatch("setdate", [thisdate, isExistsDate, isExistsTime])
}
</script>



<div class="form">

    <div class="col-y col-mark">year</div>
    <div class="col-m col-mark">month</div>
    <div class="col-d col-mark">day</div>
    <div class="col-ho col-mark">hour</div>
    <div class="col-mi col-mark">minute</div>


    <div class="col-y">
        <button 
            class={ !isExistsDate ? "active" : "" }
            on:click={e => {
                isExistsDate = false;
                isExistsTime = false;
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
                class={dYear === year && isExistsDate ? "active" : ""}
                on:click={e => {
                    dYear = year;
                    isExistsDate = true;
                }}
                >{year}
            </button>
        {/each}
    </div>

    <div class="col-m">
        {#each Array(12).fill().map((_, i) => i + 1) as month }
            <button 
                class={dMonth === month && isExistsDate ? "active" : ""}
                on:click={e => {
                    dMonth = month;
                    isExistsDate = true;
                }}
                >{month}
            </button>
        {/each}
    </div>

    <div class="col-d">
        {#each Array(31).fill().map((_, i) => i + 1) as day }
            <button 
                class={dDay === day && isExistsDate ? "active" : ""}
                on:click={e => {
                    dDay = day;
                    isExistsDate = true;
                }}
                >{day}
            </button>
        {/each}
    </div>

    <div class="col-ho">
        <button 
            class={ !isExistsTime ? "active" : "" }
            on:click={e => {
                isExistsTime = false;
                dHour = 0;
                dMin = 0;
            }}
            >×
        </button>
        {#each Array(24).fill().map((_, i) => i) as hour }
            <button 
                class={dHour === hour && isExistsTime ? "active" : ""}
                on:click={e => {
                    dHour = hour;
                    isExistsTime = true;
                }}
                >{hour}
            </button>
        {/each}
    </div>

    <div class="col-mi">
        {#each Array(12).fill().map((_, i) => i * 5) as minute }
            <button 
                class={dMin === minute && isExistsTime ? "active" : ""}
                on:click={e => {
                    dMin = minute;
                    isExistsTime = true;
                }}
                >{minute}
            </button>
        {/each}
    </div>
</div>


<div class="set-date">
    {#if isExistsDate }
        <span>{`${dYear}, ${dDay} ${shortMonthNames[dMonth-1]}`}</span>
        {#if isExistsTime }
            <span>
            {`${String(dHour).padStart(2, '0')}:${String(dMin).padStart(2, '0')}`}
            </span>
        {/if}
    {:else}
        <span>- - -</span>
    {/if}
    <div class="spacer" />
    <button on:click={setDate} 
        ><svg><use xlink:href="#ico-arrow" /></svg>
    </button>
</div>

<style>

.set-date {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: .4em;
    margin-top: .4em;

    border: .1em solid var(--color-content-C);
    border-radius: .4em;

    user-select: none;
}

.set-date > span {
    margin-right: .4em;
}

.set-date > .spacer {
    flex-grow: 1;
}

.set-date > button {
    width: 2em;
    height: 2em;
    padding: .4em;
    transform: scale(1.5) translateX(-.1em) rotate(-90deg);

    display: flex;
    justify-content: center;
    align-items: center;


    background-color: transparent;
    border: .12em solid var(--color-content-C);
    border-radius: .4em;
}

.set-date > button::after {
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

.set-date >  button:hover::after {
    opacity: .3;
}



.form {
    display: grid;
    grid-template-columns: 2fr repeat(5, 1fr);
    grid-auto-flow: dense;
    justify-content: center;
    align-content: center;
    gap: .2em;
    height: 17.3em;

    border: .1em solid var(--color-content-C);
    border-radius: .4em;
    
    user-select: none;
}


.form > .col-y, 
.form > .col-m, 
.form > .col-d, 
.form > .col-ho, 
.form > .col-mi {
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.form > .col-y {
    grid-column: 1 / 2;
}

.form > .col-m {
    grid-column: 2 / 3;
}

.form > .col-d {
    grid-column: 3 / 4;
}

.form > .col-ho {
    grid-column: 5 / 6;
}

.form > .col-mi {
    grid-column: 6 / 7;
}



.form button {
    font-size: .7em;
    background-color: transparent;
    color: var(--color-content-B);
    margin: .2em;
    border-radius: .4em;
    border: .14em solid var(--color-content-C);
    padding: .4em;
    position: relative;
}

.form button.active {
    background-color: var(--color-accent);
}

.form > div > button::after {
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

.form > div >  button:hover::after {
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



</style>