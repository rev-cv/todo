<script>
import { decade, shortMonthNames } from '../store/Date'
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
let selectYear = $decade[0];
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="widget" on:click|stopPropagation>
    <div class="navigator">
        <button class="btn-back" on:click={e => --selectYear}>
            <svg><use xlink:href="#ico-arrow"/></svg>
        </button>

        <div>{selectYear}</div>

        <button class="btn-next" on:click={e => ++selectYear}>
            <svg><use xlink:href="#ico-arrow"/></svg>
        </button>
    </div>
    
    <div class="calendar">
        {#each shortMonthNames as month, indexMonth}
            <div class="decades-in-month">
                <div class="month">{month}</div>
                {#each [1, 2, 3] as dec}
                    <button 
                        class={
                        selectYear === $decade[0] 
                            && indexMonth*3+dec === $decade[1] ?
                                "decade active" : "decade"
                        } 
                        on:click={e =>{
                            decade.set([selectYear, indexMonth*3+dec]);
                            dispatch('changedecade', event)
                        }}
                        > {indexMonth*3+dec}
                    </button>
                {/each}
            </div>
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


.calendar {
    display: grid;
    grid-template-columns: repeat(12, 2em);
    grid-auto-rows: calc(2em * 4 + .2em * 3);
    grid-gap: .2em;
}

.decades-in-month {
    display: flex;
    flex-direction: column;
}

.decades-in-month > .month {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: .6em;

    width: calc(2em * 1.6);
    height: calc(2em * 1.6);

    /* background-color: yellowgreen; */
    opacity: .55;
}

.decades-in-month > .decade {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1em;
    color: var(--color-content-B);
    background-color: transparent;

    border: .1em solid rgba(0, 0, 0, .2);

    border-radius: .6em;

    transition: 0.08s ease-out;

    width: 2em;
    height: 2em;
    margin: .1em 0;
}

.decades-in-month > .active {
    background-color: var(--color-accent);
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