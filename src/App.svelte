<script>
import SvgSprite from './components/SvgSprite.svelte';
import HeaderMenu from './components/HeaderMenu.svelte';
import BtnNewTask from './components/BtnNewTask.svelte'
import NewProject from './components/NewProject.svelte';
import ChangeDate from './components/ChangeDate.svelte';
import ChangeDecade from './components/ChangeDecade.svelte';
import ChangeYear from './components/ChangeYear.svelte';

import TasksForDay from './components/TasksForDay.svelte';
import TasksForDecade from './components/TasksForDecade.svelte';
import TasksForYear from './components/TasksForYear.svelte';

import { page } from './store/OpenPage'

let isOpenNewProject = false;
const TaskForSub = [
    "day", 
    "decade", 
    // "month", 
    "year"
]
let openedSubTaskFor = TaskForSub[0];
  
</script>


<SvgSprite />


<main class="container">

    <HeaderMenu />

    <div class="window">

        {#if $page === '/main'}

            <div class="header-page">
                <h1>Main Page</h1>
                <div class="stretch" />
            </div>
            <div class="content">Main Page</div>

        {:else if $page === '/day'}

            <div class="header-page">
                <h1>Tasks for </h1>

                {#each TaskForSub as sub}
                    <button
                        on:click={e => {openedSubTaskFor = sub}}
                        class={openedSubTaskFor === sub ? "btn-sub-task-for active" : "btn-sub-task-for"}
                        >{sub}
                    </button>
                {/each}
                
                <div class="stretch" />

                {#if openedSubTaskFor === 'day'}
                    <ChangeDate />
                {:else if openedSubTaskFor === 'decade'}
                    <ChangeDecade />
                {:else if openedSubTaskFor === 'year'}
                    <ChangeYear />
                {/if}
                
            </div>

            {#if openedSubTaskFor === 'day'}
                <div class="content"><TasksForDay /></div>
            {:else if openedSubTaskFor === 'decade'}
                <div class="content"><TasksForDecade /></div>
            <!-- {:else if openedSubTaskFor === 'month'}
                <div class="content">Tasks for month</div> -->
            {:else if openedSubTaskFor === 'year'}
                <div class="content"><TasksForYear /></div>
            {/if}

        {:else if $page === '/ideas'}
        
            <div class="header-page">
                <h1>Task-Ideas</h1>
                <div class="stretch" />
            </div>
            <div class="content">Task-Ideas</div>
            
        {:else if $page === '/user'}

            <div class="header-page">
                <h1>Setting</h1>
                <div class="stretch" />
            </div>
            <div class="content">Setting</div>

        {:else if $page === '/category'}

            <div class="header-page">
                <h1>Categories</h1>
                <div class="stretch" />
            </div>
            <div class="content">Categories</div>

        {:else if $page === '/queue'}

            <div class="header-page">
                <h1>Priority Queue</h1>
                <div class="stretch" />
            </div>
            <div class="content">Setting</div>
            
        {/if}

    </div>

    <BtnNewTask />

</main>


<style>

main {
    font-size: 1rem;

    display: flex;
    flex-direction: row;
    height: 100vh;
    background-color: var(--color-canvas);
    color: var(--color-content);
    letter-spacing: .8px;

    position: relative;
}

.window {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
}

.content {
    overflow: auto;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
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
    
    user-select: none;
}

.header-page > * {
    flex-shrink: 0;
}

.header-page > h1 {
    font-weight: 700;
    font-size: 1.2em;
    opacity: .8;
    margin-right: .3em;
}

.header-page > .stretch {
    flex-grow: 1;
}



.btn-sub-task-for {
    font-size: .9em;
    font-weight: 700;

    display: flex;
    align-items: center;

    background-color: var(--color-block);

    padding: 0 1em;
    border-radius: .6em;

    color: var(--color-content-B);

    transition: 200ms ease-out;
    height: 2.4em;
    margin: .4em .2em;
    
    border: .1em solid rgba(0, 0, 0, .2);

    position: relative;
    overflow: hidden;
}

.btn-sub-task-for::after {
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

.btn-sub-task-for:hover::after {
    opacity: .3;
}

.active {
    background-color: var(--color-accent);
}
</style>
