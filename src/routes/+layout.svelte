<script>
import SvgSprite from '../components/SvgSprite.svelte';
import HeaderMenu from '../components/HeaderMenu.svelte';
import NewTask from '../components/NewTask.svelte';
import H1Page from '../components/H1Page.svelte';
</script>


<SvgSprite />


<div class="layout">
    <HeaderMenu />
    <main>
        <H1Page />
        <slot />
        <NewTask />
    </main>
</div>


<style global>
    @import "../reset.css";
    @import "../root.css";

    .layout {
        font-family: "Roboto", sans-serif;
        font-size: var(--font-size);
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

</style>