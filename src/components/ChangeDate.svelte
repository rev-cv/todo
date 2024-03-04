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
        <span>{currentDate.getFullYear()},</span>
        <span class="day-of-date">{currentDate.getDate()}</span>
        <span>{month[currentDate.getMonth()]}</span>
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
    <Tulle on:click={() => {isOpenCalendar = false}} >
        <Calendar on:changedate={() => {
            isOpenCalendar = false;
            setIsCurrentDay();
        }} />
    </Tulle>
{/if}


<style>
    .btn-back, .btn-now, .btn-next, .btn-select-day {
        background-color: var(--color-block);
        box-shadow: var(--color-block-shadow);
        color: var(--color-content-B);

        margin: .5em;
        border-radius: .8em;
        font-size: .8em;
        border: .1em solid rgba(0, 0, 0, .2);

        transition: transform 100ms linear;
    }

    .btn-back:hover, .btn-now:hover, .btn-next:hover {
        transform: scale(1.02);
    }

    .btn-select-day {
        padding: .6em 1.8em;
    }

    .btn-back, .btn-now, .btn-next {
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-now {
        padding: 1em .2EM;
    }

    .btn-back > svg, .btn-now > svg, .btn-next > svg {
        width: 1em;
        height: 1em;
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
        font-size: 1.1em;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dayweek {
        font-size: .8em;
    }

    .day-of-date {
        min-width: 1.6em;
        font-size: 1.4em;
    }
</style>