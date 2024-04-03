<script>
import { year } from '../store/Date'

let isCurrentYear = $year === new Date().getFullYear() ? true : false;

function changeyear(arg=".") {
    switch (arg) {
        case ".":
            year.set(new Date().getFullYear()); break;
        case "-": 
            year.set($year - 1); break;
        case "+": 
            year.set($year + 1); break;
    }
    isCurrentYear = $year === new Date().getFullYear() ? true : false;
}
</script>

<button class="btn-back" on:click={() => changeyear("-")}>
    <svg><use xlink:href="#ico-arrow"/></svg>
</button>

<div class="btn-select-year">{$year}</div>

<button 
    class={isCurrentYear ? "btn-now is-current-year" : "btn-now"} 
    on:click={() => changeyear(".")}>
    <svg><use xlink:href="#ico-arrow"/></svg>
</button>

<button class="btn-next" on:click={() => changeyear("+")}>
    <svg><use xlink:href="#ico-arrow"/></svg>
</button>

<style>
.btn-back, .btn-now, .btn-next {
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
}

.btn-back:hover, .btn-now:hover, .btn-next:hover {
    transform: scale(1.05);
    box-shadow: var(--color-block-shadow-on-block);
    border: .1em solid rgba(0, 0, 0, 0);
}

.btn-back:active, .btn-now:active, .btn-next:active {
    transform: scale(.9);
}

.btn-select-year {
    width: 5em;
    padding: .2em;
    text-align: center;
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

.is-current-year {
    background-color: var(--color-accent);
}

.is-current-year:active, .is-current-year:hover {
    transform: scale(1);
}
</style>