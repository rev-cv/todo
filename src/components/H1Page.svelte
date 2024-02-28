
<script>
    import { page } from '$app/stores';

    const month = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    const dayweek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ]

    // function getDate() {
    //     const d = new Date()
    //     date = `${d.getFullYear()}, ${d.getDate()} ${month[d.getMonth()]}`
    //     day = dayweek[d.getDay()]
    //     return ""
    // }


</script>


<div class="header-page">
    <h1>
        {#if $page.url.pathname === '/'}
            Main Page
        {:else if $page.url.pathname === '/day'}
            Tasks for day
        {:else if $page.url.pathname === '/ideas'}
            Task-Ideas
        {:else if $page.url.pathname === '/projects'}
            Projects
        {:else if $page.url.pathname === '/timeline'}
            Tasks with deadline
        {:else if $page.url.pathname === '/user'}
            Setting
        {/if}
    </h1>

    {#if ['/day', '/timeline'].includes($page.url.pathname)}
        <div class="currentDate">
            <div>2024, 28 Feb</div>
            <div>Wednesday</div>
        </div>
    {:else if $page.url.pathname === '/projects'}
        <button class="new-project">
            <svg><use xlink:href="#ico-add"/></svg>
            <span>New project</span>
        </button>
    {:else if $page.url.pathname === '/projects'}
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
    }

    .header-page > h1 {
        font-weight: 700;
        font-size: 2em;
        opacity: .5;
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