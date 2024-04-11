<script>
// @ts-nocheck
import { vectors } from '../store/TestTaskList'
import ItemTask from './ItemTask.svelte'
import EmojiPicker from './PickerEmoji.svelte'
import Tulle from './Tulle.svelte'
import Confirmation from './DialogConfirmation.svelte'


let active = 0;
let isViewMotivation = false;
let isViewYearEndReport = false;
let isDeletionWarning = false;

let textarea; // <textarea>

let indexShuffleVector = undefined;
let shuffleSpaceOver = undefined;


function changeEmoji(emoji) {
    vectors.update(items => {
        const newTasklist = [...items];
        newTasklist[active].icon = emoji.detail
        return newTasklist;
    });
}


function handleInput(e) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}
setTimeout(handleInput, 1);


function newVector () {
    vectors.update(items => {
        if (items.length < 5)
            items.push({
                id: items.length,
                icon: "🎖️",
                title: items.length === 0 ? "my first vector" : "new vector",
                motivation: "",
                tasks: [],
            })
        return items;
    });
    active = $vectors.length - 1;
}
if ($vectors.length === 0) newVector ();


function delVector () {
    vectors.update(items => {
        items = items.filter((item, index) => index != active);
        if (items.length === 0)
            items.push({
                id: 0,
                icon: "🎖️",
                title: items.length === 0 ? "my first vector" : "new vector",
                motivation: "",
                tasks: [],
            })
        return items;
    });
    active = 0 < active ? active - 1 : 0;
}


function shuffleVectors (onPos) {
    // вектор с индексом indexShuffleVector на позицию onPos

    const currentActiveID = $vectors[active].id;

    if (indexShuffleVector != undefined){
        vectors.update(items => {
            let arr = [...items];
            const elem = arr.splice(indexShuffleVector, 1, undefined);
            if (elem.length != 0) {
                arr.splice(onPos, 0, elem[0])
            }
            return arr.filter(elem => elem != undefined);
        });
        indexShuffleVector = undefined;
    }

    $vectors.forEach((elem, index) => {
        if (elem.id === currentActiveID) {
            active = index; 
        }
    })
}
</script>


<div class="vector-about">
    <div class="vectors-list">

        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div 
            class={ shuffleSpaceOver === 0 ? "positition-for-vector over" : "positition-for-vector"}
            on:dragover|preventDefault
            on:drop|preventDefault={e => {
                shuffleVectors(0);
                shuffleSpaceOver = undefined;
            }}
            on:dragenter={e => shuffleSpaceOver = 0}
            on:dragleave={e => shuffleSpaceOver = undefined}
        />
        {#each $vectors as vec, i }
            <button
                class={active === i ? "vector active" : "vector"} 
                draggable={true}
                on:click={e => {
                    active = i;
                    setTimeout(handleInput, 1);
                } } 
                on:dragstart={e => indexShuffleVector = i}
                >{vec.icon}
            </button>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div 
                class={ shuffleSpaceOver === i+1 ? "positition-for-vector over" : "positition-for-vector"}
                on:dragover|preventDefault
                on:drop|preventDefault={e => {
                    shuffleVectors(i+1);
                    shuffleSpaceOver = undefined;
                } }
                on:dragenter={e => shuffleSpaceOver = i+1}
                on:dragleave={e => shuffleSpaceOver = undefined}
            />
        {/each}
        
    
        {#if $vectors.length < 5}
            <button class="new-vector" on:click={newVector}>
                <svg><use xlink:href="#ico-add"/></svg>
            </button>
        {/if}
    </div>

    <!-- <div class="mark">title</div> -->
    <div class="title-block">
        <EmojiPicker 
            currentEmoji={$vectors[active].icon}
            on:select={changeEmoji}
        />
        <input 
            class="title" 
            value={$vectors[active].title}
            on:change={e => $vectors[active].title = e.target.value}
        />
        <button 
            class="delete-vector"
            on:click={e => {isDeletionWarning = !isDeletionWarning}}
            ><svg><use xlink:href="#ico-delete-in-basket"/></svg>
        </button>
    </div>

    <div class="block">
        <div class="mark">Tasks for vector</div>
        {#each $vectors[active].tasks as task}
            <ItemTask 
                task={task}
                isShowImportance={false}
            />
        {/each}
        <button
            class="add-new-task-for-vector"
            >
                <svg><use xlink:href="#ico-add"/></svg>
                <span>new task</span>
        </button>
    </div>
    

    <div class="block">
        <div class="descr-block">
            <button 
                class={isViewMotivation ? "" : "active"}
                on:click={e => {
                    isViewMotivation = !isViewMotivation;
                    setTimeout(handleInput, 100);
                }}
                ><span>Motivation</span>
                <svg><use xlink:href="#ico-arrow"/></svg>
            </button>
        </div>
        
        <textarea 
            class={isViewMotivation ? "motivation view" : "motivation"}
            on:input={handleInput}
            bind:value={$vectors[active].motivation}
            bind:this={textarea}
        />
    </div>


    <div class="block">
        <div class="descr-block">
            <button 
                class={isViewYearEndReport ? "" : "active"}
                on:click={e => {
                    isViewYearEndReport = !isViewYearEndReport;
                    setTimeout(handleInput, 100);
                }}
                ><span>Year-end report</span>
                <svg><use xlink:href="#ico-arrow"/></svg>
            </button>
        </div>
        
        <textarea 
            class={isViewYearEndReport ? "year-end-report view" : "year-end-report"}
            on:input={handleInput}
            bind:value={$vectors[active].report}
            bind:this={textarea}
        />
    </div>

    
</div>


{#if isDeletionWarning}
    <Tulle on:closeDialog={() => {isDeletionWarning = false}} >
        <Confirmation
            on:confirm={e => {
                isDeletionWarning = false;
                delVector();
            }}
            on:noConfirm={e => isDeletionWarning = false}
            >
            <div class="del-message">
                <div class="del-message-title">Delete?</div>
                <div class="del-message-vector">
                    {$vectors[active].icon} {$vectors[active].title}
                </div>
            </div>
        </Confirmation>
    </Tulle>
{/if}


<style>

.vectors-list {
    display: flex;
    align-items: center;
    padding-top: 1em;
}

.vector {
    font-size: 1.6em;
    --size: 2em;
    width: var(--size);
    height: var(--size);
    border-radius: .4em;
    transform: scale(1);
    background-color: var(--color-canvas);
    border: .08em solid var(--color-content-C);
    transition: all 200ms ease-out;

    display: flex;
    justify-content: center;
    align-items: center;
}

.vector:hover {
    transform: scale(1.1);
}

.vector.active {
    background-color: var(--color-accent);
    border-width: 0;
    box-shadow: var(--color-block-shadow);
}

.positition-for-vector {
    width: .4em;
    height: 100%;
    background-color: transparent;
    border-radius: .1em;
    z-index: 10;
    transform: scaleX(1.8);

    display: flex;
    justify-content: center;

}

.positition-for-vector::before {
    content: "";
    background-color: var(--color-content);
    width: .05em;
    border-radius: .1em;
    transform: scaleY(0);
    opacity: 0;
    transition: all 300ms ease-out;
}

.positition-for-vector.over::before {
    transform: scaleY(1);
    opacity: 1;
}

button.new-vector {
    font-size: 1em;
    top: 24em;
    width: 2em;
    height: 2em;

    display: flex;
    align-items: center;
    padding: .4em;
    margin-left: .4em;
    border-radius: 50%;

    background-color: transparent;
    transform: scale(.7);
    overflow: hidden;

    transition: all 200ms ease-out;
}

button.new-vector:hover {
    transform: scale(.8);
}

button.new-vector:active {
    transform: scale(.7);
}

.vector-about {
    min-width: 26em;

    display: flex;
    flex-direction: column;
}

.block {
    background-color: var(--color-block);
    box-shadow: var(--color-block-shadow-on-block);
    padding: .5em;
    border-radius: .4em;
    margin: .25em 0;

    display: flex;
    flex-direction: column;
}

.mark, 
.descr-block > button > span {
    font-size: .6em;
    font-weight: 700;
    opacity: .5;
    margin: .5em;
    user-select: none;
    color: var(--color-content-B);
}

.title-block {
    display: flex;
    align-items: center;
    margin-top: 1em;
}

.title {
    flex-grow: 1;

    font-size: 1.4em;
    font-weight: 700;
    margin-left: .3em;

    background-color: transparent;
    color: var(--color-content-A);
    padding: .4em;

    border-radius: .4em;
}

.title:focus {
    box-shadow: var(--color-block-shadow-inset);
}

button.add-new-task-for-vector {
    align-self: flex-start;

    font-size: .8em;
    margin: .6em .4em .6em .14em;
    padding: .4em;
    border-radius: .5em;

    display: flex;
    align-items: center;

    background-color: transparent;
    color: var(--color-content-B);

    position: relative;
    overflow: hidden;
}

button.add-new-task-for-vector > svg {
    width: 1em;
    height: 1em;
    margin: 0 .4em 0 0;
}

.year-end-report,
.motivation {
    font-size: .8em;
    background-color: transparent;
    color: var(--color-content-B);
    padding: 0 1em;
    border-radius: .4em;
    resize: none;

    overflow: hidden;
    max-height: 0;
    opacity: .2;
    transition: all 300ms ease-out;
}

.year-end-report.view,
.motivation.view {
    max-height: 500px;
    opacity: .8;
    padding: 1em;
}

.year-end-report:focus,
.motivation:focus {
    box-shadow: var(--color-block-shadow-inset);
    opacity: 1;
}

.descr-block {
    display: flex;
    align-items: center;
    justify-content:space-between;
}

.descr-block > button {
    flex-grow: 1;
    font-size: 1rem;

    background-color: transparent;

    display: flex;
    justify-content: space-between;
    align-items: center;
    
}

.descr-block > button > svg {
    transition: transform 300ms ease-out;
    transform: rotate(180deg);
    height: .4em;
    width: 1.4em;
}

.descr-block > button.active > svg {
    transform: rotate(0deg);
}


.delete-vector {
    align-self: center;
    font-size: .4em;

    width: 4em;
    height: 4em;
    padding: 1em;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    background-color: transparent;

    position: relative;
    overflow: hidden;

    transition: all 300ms ease-out;
    transform: scale(.4);
    background-color: var(--color-importance-A);
}

.delete-vector:hover {
    transform: scale(1);
    background-color: transparent;
}


.add-new-task-for-vector::before,
.delete-vector::before,
.new-vector::before {
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    background-color: var(--color-content-C);
    opacity: 0;
    transition: opacity 200ms ease-out;
}

.add-new-task-for-vector:hover::before,
.delete-vector:hover::before,
.new-vector:hover::before {
    opacity: .5;
}

/* MESSAGE FOR DELETE */

.del-message {
    display: flex;
    flex-direction: column;
}

.del-message-title {
    font-size: 1.4em;
    font-weight: 700;
    text-align: center;
}

.del-message-vector {
    font-size: 1.1em;

    height: 4em;
    

    display: flex;
    justify-content: center;
    align-items: center;

}
</style>