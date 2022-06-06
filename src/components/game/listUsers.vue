<template>
    <div class="userList">
        <div class="desc" :style="{background: descColor}"> <div>{{desc}}</div> </div>
        <div class="list">
            <div class="user-object" v-for="item in users" :key="item">
                <div class="user" :style="{color: item.color, border: `5px solid ${item.groupColor}`}" draggable="true" @dragstart="startDrag($event, item)">
                    {{item.nick}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["users", "startDrag", "onDrop", "groupName", "desc", "descColor"],
    }
</script>

<style>
    .userList {
        display: inline-block;
        margin-left: 3vw;
        margin-top: 4vw
    }
    .desc div {
        padding-top: 0.2vw;
    }
    .desc {
        width: 230px;
        height: 40px;
        background: rgb(76 76 76);
    }
    .user {
        background: rgb(45, 45, 45);
        user-select: none;
        font-size: 20px;
        font-weight: 700;
        border-radius: 30px;
        padding: 7px;
    }
    .user-object {
        display: inline-block;
        margin-right: 10px;
        margin-left: 3px;
    }
    .list {
        height: 240px;
        margin-top: -10px;
        width: 230px;
        background: rgb(59, 59, 59);
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>