//FILE: init.js
var G = {};
var DEBUG = false;
G.ui = {}
G.ui.fps = 30 //50;
G.ui.width = 150;
G.ui.height = 150;
G.ui.scaleX = Math.floor(window.innerWidth/G.ui.width)||1;
G.ui.scaleY = Math.floor(window.innerHeight/G.ui.height)||1;
if (G.ui.scaleX>G.ui.scaleY) G.ui.scaleX=G.ui.scaleY; else G.ui.scaleY=G.ui.scaleX;
G.ui.width=Math.floor(window.innerWidth/G.ui.scaleX)
G.gravity=.3;
G.minJump=2;
G.maxJump=12;
G.jumpPower=4; 
G.ui.floor = 8;
G.ui.horizon = 12;
G.ui.palette0 = {light:'#EEE', dark:'#333', mid:'#CCC'}
G.ui.palette1 = {light:'#333', dark:'#EEE', mid:'#CCC'}
G.ui.palette = G.ui.palette0 
G.ui.camera = {}

function init() {
	document.body.style.padding=document.body.style.margin='0px';
	document.body.style.backgroundColor='#000';//G.ui.palette.dark;
	G.ui.area = $('c');
	G.ui.area.ctx = G.ui.area.getContext("2d");
	G.ui.setupEvents();
	window.onkeydown = G.click;
	window.onkeyup = G.clickEnd;
	G.ui.area.style.padding='0px';   
	G.ui.area.style.margin='0px';
	G.ui.area.width=Math.floor(G.ui.width*G.ui.scaleX);
	G.ui.area.height=Math.floor(G.ui.height*G.ui.scaleY);
	//G.ui.area.style.backgroundColor='#DDD';
	G.ui.pts = {}
	G.restart();
}
