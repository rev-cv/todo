
<script>
import { page } from '../store/OpenPage'

let menu = [
    ["/main", "frames"],
    ["/day", "timeline"],
    ["/queue", "queue"],
    ["/ideas", "ideas"],
    ["/category", "category"],
    // ["/projects", "projects"],
    ["stretch"],
    ["/user", "user"],
]
</script>


<header>
    {#each menu as item }
        {#if item[0] === "stretch"}
            <div class="stretch"></div>
        {:else}
            <button 
                on:click={() => {page.set(item[0])}}
                class={$page === item[0] ? "active" : ""}
                > <svg><use xlink:href={`#ico-${item[1]}`}/></svg>
            </button>
        {/if}
    {/each}
</header>


<style>

header {

    font-size: 1rem;
    flex-shrink: 0;

    
    background-color: var(--color-block);
    box-shadow: var(--color-block-shadow);

    margin: 1em;
    padding: .2em 0;
    border-radius: .8em;

    display: flex;
    flex-direction: column;
}

header > button {
    background-color: var(--color-block);
    width: 2.4em;
    height: 2.4em;

    margin: .2em .4em;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: .6em;

    transition: 200ms ease-out;

    border: .1em solid rgba(0, 0, 0, .2);

    font-size: 1em;

    position: relative;
    overflow: hidden;
}

header > button::after {
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

header > button:hover::after {
    opacity: .3;
}

header > .active {
    background-color: var(--color-accent);
}

header > button:hover {
    box-shadow: var(--color-block-shadow-on-block);
    border: .1em solid rgba(0, 0, 0, 0);
}

header > button:hover > svg {
    transform: scale(1.2);
}

/* header > button:active {
    transform: scale(.9);
} */

header > button > svg {
    width: 50%;
    height: 50%;
    transition: 200ms ease-out;
}

header > .active:hover, 
header > .active:active {
    border: .1em solid rgba(0, 0, 0, .2);
    box-shadow: none;
    transform: scale(1);
}

header > button.active > svg {
    transform: scale(1.2);
}

.stretch {
    flex-grow: 1;
}

</style>
