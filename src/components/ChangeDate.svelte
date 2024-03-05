<script>
import { date } from '../store/SelectDate'
import Tulle from './Tulle.svelte'
import Calendar from './Calendar.svelte'

const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]
const dayweek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

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
            currentDate = new Date();
            break;
        case "-": 
            currentDate.setDate( currentDate.getDate() - 1 );
            break;
        case "+": 
            currentDate.setDate( currentDate.getDate() + 1 );
            break;
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
        <div>{month[currentDate.getMonth()]}</div>
    </div>
    <div class="dayweek">{dayweek[currentDate.getDay()]}</div>
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
    .btn-back, .btn-now, .btn-next, .btn-select-day {

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

        transition: transform 100ms linear;
    }

    .btn-back:hover, .btn-now:hover, .btn-next:hover, .btn-select-day:hover {
        transform: scale(1.05);
        box-shadow: var(--color-block-shadow-on-block);
        border: .1em solid rgba(0, 0, 0, 0);
    }

    .btn-back:active, .btn-now:active, .btn-next:active, .btn-select-day:active {
        transform: scale(.9);
    }

    .btn-select-day {
        width: auto;
        display: flex;
        flex-direction: column;
        padding: .2em .6em;
    }

    .btn-back, .btn-now, .btn-next {
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

    .is-current-day:active, .is-current-day:hover {
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