
<script>
    const maxlength = 50;
    let inputValue = "";
    $: char_can_be_used = maxlength - inputValue.length
</script>

<div id="new-task">
    <input 
        id="new-task__input" 
        type="text" 
        bind:value={inputValue}
        maxlength={maxlength}
        placeholder="New task …"
        autocomplete="off"
    >

    <div class="counter">
        {char_can_be_used == maxlength ? "" : char_can_be_used}
    </div>

</div>


<style>
    #new-task {
        
        font-size: 1rem;


        align-self: center;
        padding: .6em 0 .4em 1em;

        background-color: var(--color-block);
        box-shadow: var(--color-block-shadow);

        margin: 0 1.1em 2em 0;
        border-radius: .8em;

        display: flex;
        align-items: center;
    }

    #new-task > input {
        font-size: 1em;
        background-color: transparent;
        color: var(--color-content-B);

        padding: .5em 1.6em .4em .5em;
        min-width: 20em;

        border-bottom: .1em solid transparent;

        transition: border-color 200ms linear;
    }

    #new-task > input::placeholder {
        color: var(--color-content-B);
        opacity: .5;
        transition: opacity 200ms linear;
    }

    #new-task > input:focus::placeholder {
        opacity: .3;
    }

    #new-task > input:focus {
        border-color: var(--color-content-C);
    }

    #new-task > .counter {
        font-size: .7em;
        min-width: 1.6em;

        display: flex;
        justify-content: center;
        align-items: center;
        opacity: .6;
        transform: translateX(-2em);
    }

</style>