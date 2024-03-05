
<script>
import { page } from '../store/OpenPage'
import ChangeDate from './ChangeDate.svelte';
</script>


<div class="header-page">
    <h1>
        {#if $page === '/main'}
            Main Page
        {:else if $page === '/day'}
            Tasks for day
        {:else if $page === '/ideas'}
            Task-Ideas
        {:else if $page === '/projects'}
            Projects
        {:else if $page === '/timeline'}
            Tasks with deadline
        {:else if $page === '/user'}
            Setting
        {/if}
    </h1>

    {#if ['/day', '/timeline'].includes($page)}
        <ChangeDate />
    {:else if $page === '/projects'}
        <button class="new-project">
            <svg><use xlink:href="#ico-add"/></svg>
            <span>New project</span>
        </button>
    {:else if $page === '/projects'}
        dd
    {/if}

</div>

<style>
    .header-page {
        margin: 1.5em 1.5em 0 0;
        height: 3em;

        display: flex;
        justify-content: space-between;
        align-items: center;

        overflow: hidden;
    }

    .header-page > * {
        flex-shrink: 0;
    }

    .header-page > h1 {
        font-weight: 700;
        font-size: 2em;
        opacity: .5;
        flex-grow: 1;
    }

    .new-project {
        font-size: .8em;
        font-weight: 700;

        display: flex;
        align-items: center;

        background-color: var(--color-block);
        box-shadow: var(--color-block-shadow);

        padding: 1em;
        border-radius: .8em;

        color: var(--color-content-B);
    }

    .new-project > svg {
        height: 1em;
        width: 1em;
        margin-right: .5em;
    }

</style>