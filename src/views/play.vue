<script>

    // {
    //     "tags": {
    //         "badge-info": {},
    //         "badges": {
    //             "no_audio": "1"
    //         },
    //         "client-nonce": "a0695e026758ec51e3f0bf795073b1af",
    //         "color": "#8A2BE2",
    //         "display-name": "doshirak08",
    //         "emotes": {},
    //         "first-msg": "0",
    //         "flags": "",
    //         "id": "fdf504b6-0b66-4a2e-96bb-306b32774bc4",
    //         "mod": "0",
    //         "room-id": "48189727",
    //         "subscriber": "0",
    //         "tmi-sent-ts": "1654445194954",
    //         "turbo": "0",
    //         "user-id": "445909178",
    //         "user-type": ""
    //     },
    //     "command": "PRIVMSG",
    //     "message": "Для тебя",
    //     "user": "doshirak08",
    //     "room": "#t2x2",
    //     "action": false
    // }

    import userList from "@/components/game/listUsers.vue"
    import tierList from "@/components/game/tierlist.vue"
    export default {
    computed: {
      groups () {
            return {"A": this.Users.filter(item => item.group === "A"),
                    "B": this.Users.filter(item => item.group === "B"),
                    "C": this.Users.filter(item => item.group === "C"),
                    "D": this.Users.filter(item => item.group === "D"),
                    "F": this.Users.filter(item => item.group === "F"),
                    "mods": this.Users.filter(item => item.group === "mods"),
                    "subs": this.Users.filter(item => item.group === "subs"),
                    "vips": this.Users.filter(item => item.group === "vips"),
                    "viewers": this.Users.filter(item => item.group === "viewers")
                }
      }
  	},
    data() {
        return {
            tiersList: [{name: "A", color: "rgb(213 76 76)", users: []}, {name: "B", color: "rgb(215 148 81)", users: []}, {name: "C", color: "rgb(255, 223, 127)", users: []}, {name: "D", color: "#d7d74c", users: []},{name: "F", color: "rgb(147 215 79)", users: []}],
            allUsers: [],
            Users: [],
            channel: this.$route.query.channel,
            maxPlayers: 100
        }
    },
    methods: {
        getMaxPlayers() {
            let maxPlayers = this.$route.query.maxplayers
            if (maxPlayers != undefined) {
                maxPlayers = parseInt(maxPlayers)
                if (maxPlayers < 5) {
                    this.maxPlayers = 5
                } else if (maxPlayers > 500) {
                    this.maxPlayers = 500
                } else {
                    this.maxPlayers = maxPlayers
                }
            }
        },
        startDrag (evt, item) {
            evt.dataTransfer.dropEffect = 'move'
            evt.dataTransfer.effectAllowed = 'move'
            evt.dataTransfer.setData('group', item.group)
            evt.dataTransfer.setData('nick', item.nick)
        },
        onDrop (evt, list) {
            const itemID = evt.dataTransfer.getData('group')
            const nick = evt.dataTransfer.getData('nick')
            const item = this.Users.find(item => item.nick == nick)
            item.group = list
        },
        connect: function() {
        console.log("Connecting to twitch..")
        this.connection = new WebSocket("wss://irc-ws.chat.twitch.tv:443")
        this.connection.onopen = (event) => {
            this.connection.send("NICK justinfan1337")
            this.connection.send("JOIN #" + this.channel);
            this.connection.send('CAP REQ :twitch.tv/tags twitch.tv/commands')
        }
        this.connection.onclose = (event) => {
            console.log("Reconnecting..")
            setTimeout(function() {
            this.connect();
            }, 5000);
        }
        this.connection.onmessage = (event) => {
            let message = event.data.toString().split('\n');
            const ircRegex = /^(?:@([^ ]+) )?(?:[:](\S+) )?(\S+)(?: (?!:)(.+?))?(?: [:](.+))?$/;
			const tagsRegex = /([^=;]+)=([^;]*)/g;
			const badgesRegex = /([^,]+)\/([^,]*)/g;
			const emotesRegex = /([^\/]+):([^\/]*)/g;
			const emoteIndexRegex = /([^,]+)-([^,]*)/g;
			const actionRegex = /^\u0001ACTION (.*)\u0001$/g;
			const hostRegex = /([a-z_0-9]+)!([a-z_0-9]+)@([a-z._0-9]+)/;
            let payload = {
                    tags: {},
                    command: false,
                    message: '',
                    raw: message[x]
            }
            for (var x=0;x<message.length;x++) {
                if (message[x].length == 0) {
                    return;
                }

                const data = ircRegex.exec(message[x].trim());

                if (data === null) {
                    console.error(`Couldnt parse message '${message[x]}'`);
                    return;
                }

                // items
                // 0 is unparsed message
                // 1 ircV3 tags
                // 2 tmi.twitch.tv
                // 3 COMMAND
                // 4 Room
                // 5 rest/message

                // 0 ignore

                // 1 tags
                let tagdata = data[1] ? data[1] : false;
                if (tagdata) {
                    let m;
                    do {
                        m = tagsRegex.exec(tagdata);
                        if (m) {
                            // unparsed, a, b
                            const [, key, val] = m;

                            // interrupts
                            switch (key) {
                                case 'badges':
                                case 'badge-info':
                                    payload.tags[key] = {};

                                    let b;
                                    do {
                                        b = badgesRegex.exec(val);
                                        if (b) {
                                            const [, badge, tier] = b;
                                            payload.tags[key][badge] = tier;
                                        }
                                    } while (b);
                                    break;
                                case 'emotes':
                                    payload.tags[key] = {};

                                    let e;
                                    do {
                                        e = emotesRegex.exec(val);
                                        if (e) {
                                            const [, emoteID, indices] = e;
                                            // and split again

                                            let em;
                                            do {
                                                em = emoteIndexRegex.exec(indices);

                                                if (em) {
                                                    const [, startIndex, endIndex] = em;

                                                    // arrays!
                                                    if (!payload.tags[key][emoteID]) {
                                                        payload.tags[key][emoteID] = new Array();
                                                    }
                                                    payload.tags[key][emoteID].push({
                                                        startIndex,
                                                        endIndex
                                                    });
                                                }
                                            } while (em);
                                        }
                                    } while (e);
                                    break;
                                default:
                                    payload.tags[key] = val.replace(/\\s/g, ' ').trim();// for \s (space)
                                    //// dupe - keys for ease
                                    //if (key.indexOf('-') >= 0) {
                                    //    let dupeKey = key.replace(/-/g, '_');
                                    //    payload.tags[dupeKey] = val.replace(/\\s/g, ' ').trim();// for \s (space)
                                    //}
                            }
                        }
                    } while (m);
                }

                let host = hostRegex.exec(data[2]);
                payload.user = false;
                if (host != null) {
                    payload.user = host[1];
                }

                payload.command = data[3];

                payload.room = data[4];
                payload.message = data[5];
                payload.action = false;

                const actionCheck = actionRegex.exec(payload.message);
                if (actionCheck != null) {
                    payload.action = true;
                    payload.message = actionCheck[1];
                }
                break
            }
            switch (payload.command) {
            case 'PONG':
                console.log('Pong');
                pinger.gotPong();
                break;
            case 'PING':
                this.connection.send('PONG :' + payload.message);
                break;
            case 'JOIN':
                console.log('Joined', payload.room);
                break;
            case 'PRIVMSG':
                if (!this.allUsers.includes(payload.user) && this.allUsers.length+1 <= this.maxPlayers && payload.message.split(" ", 2)[0] == "!add") {
                    this.allUsers.push(payload.user)
                    if (Object.keys(payload.tags.badges).includes("moderator")) {this.Users.push({nick: payload.user, color: payload.tags.color, group: "mods", groupColor: "rgb(48 155 41)"})}
                    else if (Object.keys(payload.tags.badges).includes("vip")) {this.Users.push({nick: payload.user, color: payload.tags.color, group: "vips", groupColor: "rgb(180 35 183)"})}
                    else if (Object.keys(payload.tags.badges).includes("subscriber")) {this.Users.push({nick: payload.user, color: payload.tags.color, group: "subs", groupColor: "#7851a9"})}
                    else {this.Users.push({nick: payload.user, color: payload.tags.color, group: "viewers", groupColor: "rgb(24 87 171)"})}

                }
                break;
            }
        }
    }},
    name: 'Play',
    props: ["maxplayers"],
    beforeMount(){
        this.getMaxPlayers()
        this.connect()
    },
    components: {
        userList: userList,
        tierList: tierList
    }
  }
</script>

<template>
  <div id="game">
      <div id="title"> Введите !add в чат чтобы добавить себя в список. </div>
      <center>
          <tierList :tiers="tiersList" :groups="groups" :startDrag="startDrag" :onDrop="onDrop" />

          <userList id="viewers" :users="groups['viewers']" :startDrag="startDrag" :onDrop="onDrop" desc="Зрители" descColor="rgb(24 87 171)" />
          <userList id="subs" :users="groups['subs']" :startDrag="startDrag" :onDrop="onDrop" desc="Подписчики" descColor="#7851a9" />
          <userList id="vips" :users="groups['vips']" :startDrag="startDrag" :onDrop="onDrop" desc="Випы" descColor="rgb(180 35 183)" /> 
          <userList id="mods" :users="groups['mods']" :startDrag="startDrag" :onDrop="onDrop" desc="Модераторы" descColor="rgb(48 155 41)" />
      </center>
  </div>
</template>

<style>
 #title {
     text-align: center;
     font-size: 3vh;
     padding-top: 0.5vh;
     user-select: auto;
 }
 #game {
     color: white;
     user-select: none;
 }
</style>