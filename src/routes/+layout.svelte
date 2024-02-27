<script>
    import SvgSprite from '../components/SvgSprite.svelte';
    import HeaderMenu from '../components/HeaderMenu.svelte';
</script>


<SvgSprite />
<div class="layout">
    <HeaderMenu />
    <main><slot /></main>
</div>


<style global>
    @import "../reset.css";
    @import "../root.css";

    .layout {
        font-family: "Roboto", sans-serif;
        font-size: var(--font-size);
        display: flex;
        /* flex-direction: column; */
        height: 100vh;
        background-color: var(--color-canvas);
        color: var(--color-content);
        letter-spacing: .8px;
    }
    


    main {
        flex-grow: 1;
        overflow: auto;
    }

</style>