
<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
import { date, monthNames, shortDayNames } from '../store/Date'
import { isOpenDialog } from '../store/OpenDialog'

let cd = new Date();
date.subscribe(value => {
	cd = new Date(value);
});

let currentDate = new Date(cd);
let isCurrentMonth = true

let year = currentDate.getFullYear()
let month = currentDate.getMonth()
let cday = cd.getDate()

let lastDayOfMonth = new Date(year, month + 1, 0).getDate();   // Последний день месяца
let daysInMonth = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);

let wday = new Date(year, month, 1).getDay();
let daysOfLastMonth = Array(wday === 0? 6:wday-1).fill(0)

let monthDays = [...daysOfLastMonth, ...daysInMonth]

function changeMonth (arg=".") {
    switch (arg) {
        case ".":
            currentDate = new Date();
            break;
        case "-": 
            currentDate.setMonth( currentDate.getMonth() - 1 );
            break;
        case "+": 
            currentDate.setMonth( currentDate.getMonth() + 1 );
            break;
    }

    currentDate = new Date(currentDate);
    year = currentDate.getFullYear()
    month = currentDate.getMonth()

    lastDayOfMonth = new Date(year, month + 1, 0).getDate();   // Последний день месяца
    daysInMonth = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);

    wday = new Date(year, month, 1).getDay();
    daysOfLastMonth = Array(wday === 0? 6:wday-1).fill(0)

    monthDays = [...daysOfLastMonth, ...daysInMonth]

    isCurrentMonth = currentDate.getFullYear() === cd.getFullYear()
        && currentDate.getMonth() === cd.getMonth()
}
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={$isOpenDialog ? "widget" : "widget closing"} on:click|stopPropagation>
    <div class="navigator">
        <button class="btn-back" on:click={event => changeMonth("-")}>
            <svg><use xlink:href="#ico-arrow"/></svg>
        </button>

        <div>{`${year}, ${monthNames[month]}`}</div>

        <button class="btn-next" on:click={event => changeMonth("+")}>
            <svg><use xlink:href="#ico-arrow"/></svg>
        </button>
    </div>
    
    <div class="calendar">
        {#each shortDayNames as shortDay}
            <div class="short-day">{shortDay}</div>
        {/each}
        {#each monthDays as day}
            <button 
                class={
                    `${day === 0 ? "hidden" : "day"} 
                    ${cday === day && isCurrentMonth ? "active" : ""}`
                }
                on:click={(event) => {
                    if (day === 0) return
                    date.set(new Date(year, month, day));
                    dispatch('changedate', event)
                }}
                > { day === 0 ? "" : day } 
            </button>
        {/each}
    </div>
</div>


<style>
.widget {

    font-size: 1.2rem;


    padding: 1em;

    cursor: default;

    color: var(--color-content-B);
    background-color: var(--color-block);
    border-radius: .8em;
    box-shadow: var(--color-block-shadow);

    animation-name: open-widget;
    animation-duration: 200ms;
}

.navigator {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-back, .btn-next {
    font-size: 1em;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: .6em;

    border-radius: .6em;
    background-color: var(--color-block);
    border: .1em solid rgba(0, 0, 0, .2);

    transition: 0.08s ease-out;
}

.btn-back > svg, .btn-next > svg {
    width: .8em;
    height: .8em;
}

.btn-back > svg {
    transform: rotate(90deg);
}

.btn-next > svg {
    transform: rotate(-90deg);
}

.short-day {
    font-size: .55em;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    opacity: .55;
}

.calendar {
    display: grid;
    grid-template-columns: repeat(7, 2em);
    grid-auto-rows: 2em;
    grid-gap: .2em;

    min-height: 15.2em;
}

.day {
    margin: 1px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: .8em;
    color: var(--color-content-B);
    background-color: transparent;

    border: .1em solid rgba(0, 0, 0, .2);

    border-radius: .6em;

    transition: 0.08s ease-out;
}

.day:hover, .btn-back:hover, .btn-next:hover {
    box-shadow: var(--color-block-shadow-on-block);
    border: .1em solid rgba(0, 0, 0, 0);
    transform: scale(1.05);
}

.day:active, .btn-back:active, .btn-next:active {
    transform: scale(.9);
}

.hidden {
    opacity: 0;
    cursor: default;
}

.active {
    background-color: var(--color-accent);
}

.closing {
    animation-name: close-widget;
    animation-duration: 200ms;
    animation-fill-mode: both;
}

@keyframes open-widget {
    from {  
        transform: translate(5em, -5em) scale(.7);
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
        transform: translate(5em, -7em) scale(.7);
        opacity: 0;
    }
}
</style>