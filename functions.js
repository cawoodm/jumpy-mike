//FILE: functions.js
function rnd(min,max){return Math.round(Math.random() * (max - min) + min);}
function prob(p){return Math.random()*100<=p;}
function dpd() {if(DEBUG) console.log.apply(this, arguments);}
const dp=console.log;
function $(i) {return document.getElementById(i);}
