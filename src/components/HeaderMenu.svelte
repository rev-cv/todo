

<header>
    <a href="."><svg><use xlink:href="#ico-timeline"/></svg></a>
    <a href="."><svg><use xlink:href="#ico-for-today"/></svg></a>
    <a href="."><svg><use xlink:href="#ico-projects"/></svg></a>
    <a href="."><svg><use xlink:href="#ico-ideas"/></svg></a>

    <div class="stretch"></div>

    <a href="."><svg><use xlink:href="#ico-user"/></svg></a>
</header>


<style>

    header {
        flex-shrink: 0;

        background-color: var(--color-block);
        box-shadow: var(--color-block-shadow);

        margin: 1em;
        padding: .2em 0;
        border-radius: .8em;

        display: flex;
        flex-direction: column;
    }

    header > a {
        background-color: var(--color-block);
        width: 2.4em;
        height: 2.4em;

        margin: .2em .4em;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: .6em;

        transition: 0.08s linear;

        border: .1em solid rgba(0, 0, 0, .2);
    }

    header > a:hover {
        box-shadow: var(--color-block-shadow-on-block);
        border: .1em solid rgba(0, 0, 0, 0);
        transform: scale(1.02);
    }

    header > a > svg {
        width: 50%;
        height: 50%;
    }

    .stretch {
        flex-grow: 1;
    }

</style>
