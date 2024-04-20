
<script>
import { decade, getDecOfMonth, getMonthByDec, getDecByDate } from '../store/Date'
import Tulle from './Tulle.svelte'
import Calendar from './DialogDecades.svelte'

let isOpenCalendarDecade = false;
let isCurrentDate = true;

function setIsCurrentDec() {
    const currentDec = getDecByDate(new Date());
    if (currentDec[0] === $decade[0] && currentDec[1] === $decade[1]){
        isCurrentDate = true;
    } else {
        isCurrentDate = false;
    }
}

function changedecade(arg="."){

    switch (arg) {
        case ".":
            decade.set(getDecByDate(new Date())); break;
        case "-": 
            const lastDec = $decade[1] - 1;
            if (lastDec < 1) {
                decade.set([$decade[0] - 1, 36])
            } else {
                decade.set([$decade[0], lastDec])
            }
            break;
        case "+": 
            const nextDec = $decade[1] + 1;
            if (nextDec > 36) {
                decade.set([$decade[0] + 1, 1])
            } else {
                decade.set([$decade[0], nextDec])
            }
            break;
    }
    setIsCurrentDec()
    
}
</script>


<button class="btn-back" on:click={() => changedecade("-")}>
    <svg><use xlink:href="#ico-arrow"/></svg>
</button>

<button class="btn-select-decade" on:click={() => {isOpenCalendarDecade = true}}>
    <div class="date">
        <div>{$decade[0]},</div>
        <div class="day-of-date">{getDecOfMonth($decade[1])}</div>
        <div>{getMonthByDec($decade[1])}</div>
    </div>
</button>

<button class={`btn-now ${isCurrentDate?"is-current-day":""}`} on:click={() => changedecade(".")}>
    <svg><use xlink:href="#ico-arrow"/></svg>
</button>

<button class="btn-next" on:click={() => changedecade("+")}>
    <svg><use xlink:href="#ico-arrow"/></svg>
</button>

{#if isOpenCalendarDecade}
    <Tulle on:closeDialog={() => {isOpenCalendarDecade = false}} >
        <Calendar on:changedecade={() => {
            isOpenCalendarDecade = false;
            setIsCurrentDec();
        }} />
    </Tulle>
{/if}


<style>
.btn-back, 
.btn-now, 
.btn-next, 
.btn-select-decade {
    font-size: 1rem;

    background-color: var(--color-block);
    /* box-shadow: var(--color-block-shadow); */
    color: var(--color-content-B);

    margin: .4em .2em;
    border-radius: .6em;
    border: .1em solid rgba(0, 0, 0, .2);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.4em;
    height: 2.4em;

    transition: transform 100ms ease-out;

    position: relative;
    overflow: hidden;
}

.btn-back::after, 
.btn-now::after, 
.btn-next::after, 
.btn-select-decade::after {
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

.btn-back:hover::after, 
.btn-now:hover::after, 
.btn-next:hover::after, 
.btn-select-decade:hover::after {
    opacity: .3;
}

.btn-select-decade {
    width: auto;
    display: flex;
    flex-direction: column;
    padding: .2em .6em;
}

.btn-back, 
.btn-now, 
.btn-next {
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-now > svg, 
.btn-back > svg, 
.btn-next > svg {
    transition: scale 200ms ease-out;
}


.btn-now {
    width: 1.2em;
}

.btn-back > svg, 
.btn-next > svg {
    width: 40%;
    height: 40%;
}

.btn-now > svg {
    width: 70%;
    height: 40%;
}

.btn-back > svg {
    transform: rotate(90deg);
}

.btn-next > svg {
    transform: rotate(-90deg);
}

.is-current-day {
    background-color: var(--color-accent);
}

.is-current-day:active, 
.is-current-day:hover {
    transform: scale(1);
}

.date {
    font-size: .8em;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dayweek {
    font-size: .45em;
}

.day-of-date {
    min-width: 1.6em;
    font-size: 1.4em;
}
</style>