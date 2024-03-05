<script>
import SvgSprite from '../components/SvgSprite.svelte';
import HeaderMenu from '../components/HeaderMenu.svelte';
import NewTask from '../components/NewTask.svelte';
import NewProject from '../components/NewProject.svelte';
import ChangeDate from '../components/ChangeDate.svelte';
import { page } from '../store/OpenPage'

let isOpenNewProject = false;
</script>


<SvgSprite />


<div class="layout">

    <HeaderMenu />

    <main>

        {#if $page === '/main'}

            <div class="header-page">
                <h1>Main Page</h1>
            </div>
            <div class="content">Main Page</div>

        {:else if $page === '/timeline'}

            <div class="header-page">
                <h1>Tasks with deadline</h1>
                <ChangeDate />
            </div>
            <div class="content">Tasks with deadline</div>

        {:else if $page === '/day'}

            <div class="header-page">
                <h1>Tasks for day</h1>
                <ChangeDate />
            </div>
            <div class="content">Tasks for day</div>

        {:else if $page === '/ideas'}
        
            <div class="header-page">
                <h1>Task-Ideas</h1>
            </div>
            <div class="content">Task-Ideas</div>
            
        {:else if $page === '/projects'}

            <div class="header-page">
                <h1>Projects</h1>
                <button class="new-project" on:click={() => {isOpenNewProject = true}}>
                    <svg><use xlink:href="#ico-add"/></svg>
                    <span>New project</span>
                </button>
                {#if isOpenNewProject}
                    <NewProject on:closeDialog={e => {isOpenNewProject = false}} />
                {/if}
            </div>
            <div class="content">Projects</div>
            
        {:else if $page === '/user'}

            <div class="header-page">
                <h1>Setting</h1>
            </div>
            <div class="content">Setting</div>
            
        {/if}

        <NewTask />

    </main>
</div>


<style global>
    @import "../reset.css";
    @import "../root.css";

    .layout {
        font-size: 1rem;
        font-family: "Roboto", sans-serif;


        display: flex;
        height: 100vh;
        background-color: var(--color-canvas);
        color: var(--color-content);
        letter-spacing: .8px;
    }

    main {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
    }

    .content {
        overflow: auto;
        flex-grow: 1;
    }

    .header-page {
        margin: 1em 1em 1em 0;
        height: 3em;

        display: flex;
        justify-content: space-between;
        align-items: center;

        background-color: var(--color-block);
        border-radius: .8em;
        box-shadow: var(--color-block-shadow-on-block);

        padding: .2em .2em .2em 1em;
    }

    .header-page > * {
        flex-shrink: 0;
    }

    .header-page > h1 {
        font-weight: 700;
        font-size: 1.2em;
        opacity: .8;
        flex-grow: 1;
    }


    /* PROJECTS */
    .new-project {
        font-size: .8em;
        font-weight: 700;

        display: flex;
        align-items: center;

        background-color: var(--color-block);

        padding: 0 1em;
        border-radius: .6em;

        color: var(--color-content-B);

        transition: 0.08s linear;
        height: 2.4em;
        margin: .4em .6em;
    }

    .new-project > svg {
        height: 1em;
        width: 1em;
        margin-right: .5em;
    }

    .new-project:hover {
        transform: scale(1.05);
        box-shadow: var(--color-block-shadow);
    }

    .new-project:active {
        transform: scale(.9);
    }
</style>