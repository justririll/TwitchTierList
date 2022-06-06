<script>
  import Start from '@/components/intoduction/start.vue'
  import Desc from '@/components/intoduction/description.vue'
  import About from '@/components/About/about.vue'
  export default {
    data() {
      return {
        maxPlayers: 100,
        Channel: ""
      }
    },
    methods: {
      setMaxPlayers() {
        if (this.maxPlayers < 5) {
          this.maxPlayers = 5
        } else if (this.maxPlayers > 500) {
          this.maxPlayers = 500
        }
      }
    },  
    name: 'Main-Page',
    components: {
    Start: Start,
    About: About,
    Desc: Desc,
    }
  }
</script>

<template>
  <div>
    <div class="main-title">
      Twitch Tier List
    </div>

    <center>
      <div id="maxPlayers">Максимальное количество игроков: </div>
      <br>
      <input id="playersInput" type="number" v-model="maxPlayers" v-on:change="setMaxPlayers" max="500" min="5">
      <br>
      <div id="Channel">Название канала: </div>
      <br>
      <input id="channelInput" type="text" v-model="Channel"> <br>
      <Start class="Start" @click="if (this.Channel != '') ($router.push(`/play?maxplayers=${this.maxPlayers}&channel=${this.Channel}`)); " />
      <!-- <Desc /> -->
      <About />
    </center>

  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  input {
    border: none;
    border-radius: 12px;
    background: #4e4e4e;
    color: white
  }

  #channelInput {
    width: 12vw;
    height: 2.5vw;
    font-size: 2vw;
  }
  #Channel {
    margin-top: 5%;
    font-size: 2.5vw;
  }
  #maxPlayers {
    margin-top: 10vh;
    font-size: 2vw;
  }
  #playersInput {
    width: 6vw;
    height: 2.5vw;
    font-size: 2vw;
  }
  .Start {
    margin-top: 4vw;
    border-radius: 16px;
  }
  .main-title {
    color: rgb(255, 255, 255);
    font-size: 4vw;
    text-align: center;
  }
</style>