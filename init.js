//FILE: init.js
var G = {};
var DEBUG = false;
G.ui = {}
G.ui.fps = 20 //50;
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

G.init = function() {
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
	G.ui.area.ctx.imageSmoothingEnabled=false;
	//G.ui.area.style.backgroundColor='#DDD';
	G.ui.pts = {}
	G.music.init();
	//G.restart();G.pause();
	G.playerDefault={
		id: 'player',
		l: '3',
		x:4,
		y:G.ui.floor,
		dx:0,
		follow:true,
		dy:0,
		ddx:0,
		ddy:-G.gravity,
		minY:G.ui.floor,
		score:0,
		jumps:0,
		frame:0,
		w:22,
		h:25,
		spriteSizes: [20, 13, 13, 11, 15, 21],
		image: new Image()
	};
	G.playerDefault.image.src='sprites.png';
	if (G.playerDefault.image.complete) G.startMain();
	else G.playerDefault.image.onload = G.startMain;
	G.player=G.playerDefault;
}
