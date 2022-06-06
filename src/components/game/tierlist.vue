<script>
    export default {
        props: ["tiers", "groups", "startDrag", "onDrop"],
        data() {
            return {
                colors: ["rgb(59, 59, 59)", "rgb(80 80 80)", "rgb(59, 59, 59)", "rgb(80 80 80)", "rgb(59, 59, 59)",]
            }
        }
    }
</script>

<template>
    <div class="tierlist">
        <table class="tierlist-block" v-for="(elem, v) in tiers" :key="elem">
            <tr>
                <th class="tierlist-class" :style="{background: elem.color}"> {{elem.name}}</th>
                <th class="tierlist-element" :style="{background: colors[v]}" @drop="onDrop($event, elem.name)" @dragover.prevent @dragenter.prevent>
                    <div class="user-object" v-for="item in groups[elem.name]" :key="item">
                    <div class="user" :style="{color: item.color, border: `5px solid ${item.groupColor}`}" draggable="true" @dragstart="startDrag($event, item)">
                        {{item.nick}}
                    </div>
                </div>
                </th>
            </tr>
        </table>    
    </div>
</template>

<style>
    .user {
        background: rgb(45, 45, 45);
        user-select: none;
        font-size: 20px;
        font-weight: 700;
    }
    .user-object {
        display: inline-block;
        margin-right: 10px;
        padding: 7px;
        margin-left: 3px;
    }
    .tierlist-element {
        width: 60vw;
        border: 1px solid black;
        height: 100px;
        overflow: auto;
        background: rgb(59, 59, 59);
        display: inline-block;
    }
    .tierlist-class {
        color: #333;
        font-size: 40px;
        border: 1px solid black;
        width: 5vw;
        display: inline-block;
        height: 80px;
        vertical-align: middle;
        padding-top: 20px;
    }
    .tierlist-block {
        background: black;
    }
</style>