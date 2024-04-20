<script>
import { date, dayNames, shortMonthNames } from '../store/Date'
import Tulle from './Tulle.svelte'
import Calendar from './DialogCalendar.svelte'

let currentDate = new Date();
let isCurrentDate = true;
let isOpenCalendar = false;

// Подписываемся на обновления в сторе
date.subscribe(value => {
	currentDate = new Date(value);
});

function setIsCurrentDay () {
    let today = new Date();
    const isYear = today.getFullYear() === currentDate.getFullYear();
    const isMonth = today.getMonth() === currentDate.getMonth();
    const isDay = today.getDate() === currentDate.getDate();
    isCurrentDate = (isYear && isMonth && isDay) ? true : false
}

function changedate (arg = ".") {
    
    switch (arg) {
        case ".":
            currentDate = new Date(); break;
        case "-": 
            currentDate.setDate( currentDate.getDate() - 1 ); break;
        case "+": 
            currentDate.setDate( currentDate.getDate() + 1 ); break;
    }

    setIsCurrentDay()
    date.set(currentDate);
}
</script>


<button class="btn-back" on:click={() => changedate("-")}>
    <svg><use xlink:href="#ico-arrow"/></svg>
</button>

<button class="btn-select-day" on:click={() => {isOpenCalendar = true}}>
    <div class="date">
        <div>{currentDate.getFullYear()},</div>
        <div class="day-of-date">{currentDate.getDate()}</div>
        <div>{shortMonthNames[currentDate.getMonth()]}</div>
    </div>
    <!-- <div class="dayweek">{dayNames[currentDate.getDay()]}</div> -->
</button>

<button class={`btn-now ${isCurrentDate?"is-current-day":""}`} on:click={() => changedate(".")}>
    <svg><use xlink:href="#ico-arrow"/></svg>
</button>

<button class="btn-next" on:click={() => changedate("+")}>
    <svg><use xlink:href="#ico-arrow"/></svg>
</button>

{#if isOpenCalendar}
    <Tulle on:closeDialog={() => {isOpenCalendar = false}} >
        <Calendar on:changedate={() => {
            isOpenCalendar = false;
            setIsCurrentDay();
        }} />
    </Tulle>
{/if}


<style>
.btn-back, 
.btn-now, 
.btn-next, 
.btn-select-day {

    font-size: 1rem;

    background-color: var(--color-block);
    color: var(--color-content-B);

    margin: .4em .2em;
    border-radius: .6em;
    border: .1em solid rgba(0, 0, 0, .2);

    display: flex;
    justify-content: center;
    align-items: center;

    width: 2.4em;
    height: 2.4em;

    position: relative;
    overflow: hidden;
}

.btn-back::after, 
.btn-now::after, 
.btn-next::after, 
.btn-select-day::after {
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
.btn-select-day:hover::after {
    opacity: .3;
}

.btn-select-day {
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

.btn-now {
    width: 1.2em;
}

.btn-back > svg, .btn-next > svg {
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