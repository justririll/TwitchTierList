import{_ as l,o as _,c as i,a as e,A as x,r as o,b as r,w as v,d as c,v as u,e as y}from"./index.9f97e645.js";const f={},P={class:"Start"};function b(a,t){return _(),i("button",P," \u041D\u0430\u0447\u0430\u0442\u044C ")}var C=l(f,[["render",b]]);const $={},T={id:"desc"},g=e("div",{id:"gif"}," @Todo: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0433\u0438\u0444\u043A\u0443 ",-1),S=e("div",{id:"Text"}," @Todo: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 ",-1),w=[g,S];function A(a,t){return _(),i("div",T,w)}var M=l($,[["render",A]]);const V={data(){return{maxPlayers:100,Channel:""}},methods:{setMaxPlayers(){this.maxPlayers<5?this.maxPlayers=5:this.maxPlayers>500&&(this.maxPlayers=500)}},name:"Main-Page",components:{Start:C,About:x,Desc:M}},k=e("div",{class:"main-title"}," Twitch Tier List ",-1),B=e("div",{id:"maxPlayers"},"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u0433\u0440\u043E\u043A\u043E\u0432: ",-1),D=e("br",null,null,-1),N=e("br",null,null,-1),I=e("div",{id:"Channel"},"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u043D\u0430\u043B\u0430: ",-1),L=e("br",null,null,-1),U=y(),E=e("br",null,null,-1);function j(a,t,q,z,s,d){const m=o("Start"),h=o("About"),p=o("center");return _(),i("div",null,[k,r(p,null,{default:v(()=>[B,D,c(e("input",{id:"playersInput",type:"number","onUpdate:modelValue":t[0]||(t[0]=n=>s.maxPlayers=n),onChange:t[1]||(t[1]=(...n)=>d.setMaxPlayers&&d.setMaxPlayers(...n)),max:"500",min:"5"},null,544),[[u,s.maxPlayers]]),N,I,L,c(e("input",{id:"channelInput",type:"text","onUpdate:modelValue":t[2]||(t[2]=n=>s.Channel=n)},null,512),[[u,s.Channel]]),U,E,r(m,{class:"Start",onClick:t[3]||(t[3]=n=>{this.Channel!=""&&a.$router.push(`/play?maxplayers=${this.maxPlayers}&channel=${this.Channel.toLowerCase()}`)})}),r(h)]),_:1})])}var G=l(V,[["render",j]]);export{G as default};