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

.btn-back, 
.btn-now, 
.btn-next {
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

    transition: transform 100ms ease-out;

    position: relative;
    overflow: hidden;
}

.btn-back::after, 
.btn-now::after, 
.btn-next::after {
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
.btn-next:hover::after {
    opacity: .3;
}

.btn-select-year {
    width: 5em;
    padding: .2em;
    text-align: center;
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

.is-current-year {
    background-color: var(--color-accent);
}

</style>