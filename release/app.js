!function(t,e){"function"==typeof define&&define.amd?define(["exports"],e):e("object"==typeof exports&&"string"!=typeof exports.nodeName?exports:t.TinyMusic={})}(this,function(t){function e(t){var s=t.split(c);this.frequency=e.getFrequency(s[0])||0,this.duration=e.getDuration(s[1])||0}function s(t,e,s){this.ac=t||new AudioContext,this.createFxNodes(),this.tempo=e||120,this.loop=!0,this.smoothing=0,this.staccato=0,this.notes=[],this.push.apply(this,s||[])}var i="B#-C|C#-Db|D|D#-Eb|E-Fb|E#-F|F#-Gb|G|G#-Ab|A|A#-Bb|B-Cb",o=440*Math.pow(Math.pow(2,1/12),-9),n=/^[0-9.]+$/,r=4,c=/\s+/,h=/(\d+)/,a={};i.split("|").forEach(function(t,e){t.split("-").forEach(function(t){a[t]=e})}),e.getFrequency=function(t){var e=t.split(h),s=a[e[0]],i=(e[1]||r)-r,n=o*Math.pow(Math.pow(2,1/12),s);return n*Math.pow(2,i)},e.getDuration=function(t){return n.test(t)?parseFloat(t):t.toLowerCase().split("").reduce(function(t,e){return t+("w"===e?4:"h"===e?2:"q"===e?1:"e"===e?.5:"s"===e?.25:0)},0)},s.prototype.createFxNodes=function(){var t=[["bass",100],["mid",1e3],["treble",2500]],e=this.gain=this.ac.createGain();return t.forEach(function(t,s){s=this[t[0]]=this.ac.createBiquadFilter(),s.type="peaking",s.frequency.value=t[1],e.connect(e=s)}.bind(this)),e.connect(this.ac.destination),this},s.prototype.push=function(){return Array.prototype.forEach.call(arguments,function(t){this.notes.push(t instanceof e?t:new e(t))}.bind(this)),this},s.prototype.createCustomWave=function(t,e){e||(e=t),this.waveType="custom",this.customWave=[new Float32Array(t),new Float32Array(e)]},s.prototype.createOscillator=function(){return this.stop(),this.osc=this.ac.createOscillator(),this.customWave?this.osc.setPeriodicWave(this.ac.createPeriodicWave.apply(this.ac,this.customWave)):this.osc.type=this.waveType||"square",this.osc.connect(this.gain),this},s.prototype.scheduleNote=function(t,e){var s=60/this.tempo*this.notes[t].duration,i=s*(1-(this.staccato||0));return this.setFrequency(this.notes[t].frequency,e),this.smoothing&&this.notes[t].frequency&&this.slide(t,e,i),this.setFrequency(0,e+i),e+s},s.prototype.getNextNote=function(t){return this.notes[t<this.notes.length-1?t+1:0]},s.prototype.getSlideStartDelay=function(t){return t-Math.min(t,60/this.tempo*this.smoothing)},s.prototype.slide=function(t,e,s){var i=this.getNextNote(t),o=this.getSlideStartDelay(s);return this.setFrequency(this.notes[t].frequency,e+o),this.rampFrequency(i.frequency,e+s),this},s.prototype.setFrequency=function(t,e){return this.osc.frequency.setValueAtTime(t,e),this},s.prototype.rampFrequency=function(t,e){return this.osc.frequency.linearRampToValueAtTime(t,e),this},s.prototype.play=function(t){return t="number"==typeof t?t:this.ac.currentTime,this.createOscillator(),this.osc.start(t),this.notes.forEach(function(e,s){t=this.scheduleNote(s,t)}.bind(this)),this.osc.stop(t),this.osc.onended=this.loop?this.play.bind(this,t):null,this},s.prototype.stop=function(){return this.osc&&(this.osc.onended=null,this.osc.disconnect(),this.osc=null),this},t.Note=e,t.Sequence=s});//FILE: functions.js
function rnd(min,max){return Math.round(Math.random() * (max - min) + min);}
function prob(p){return Math.random()*100<=p}
function dpd() {if(DEBUG) console.log.apply(this, arguments)}
const dp=console.log
function $(i) {return document.getElementById(i)}
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
	G.ui.area.style.top=(window.innerHeight-G.ui.area.height)/2;
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
	G.player=G.playerDefault;
	if (G.playerDefault.image.complete) G.startMain();
	else G.playerDefault.image.onload = G.startMain;
}
//FILE: sprites.js
function makeSprite(X,H,a) {
	var res = []
	for (var i=0; i<a.length; i++) {
		var p = a[i]
		for (var x=p[1]; x<=p[2]; x++)
			res.push({x:x,y:p[0],c:p[3]})
	}
	spriteFlip(res,H)
	return res
}
function spriteQuad(x,y,w,h,H) {
	var res = []
	for (var i=x; i<x+w; i++)
		for (var j=y; j<y+h; j++)
			res.push({x:i,y:j})
	spriteFlip(res,H)
	return res;
}
function spriteCombine(arr) {
	var res = []
	for (var i=0; i<arr.length; i++){
		res = res.concat(arr[i])}
	return res
}
function spriteFlip(s,h) {
	for (var i=0; i<s.length; i++)
		s[i].y = h-s[i].y
}
G.ui.sprites = {
	trex: makeSprite(0,20,[[0,11,18],[1,10,19],[2,10,11],[2,12,12,1],[2,13,19],[3,10,19],[4,10,19],[5,10,14],[6,10,17],[7,0,0],[7,9,13],[8,0,0],[8,8,13],[9,0,1],[9,6,15],[10,0,2],[10,5,13],[11,0,13],[12,0,0,1],[12,1,12],[12,13,13,1],[13,1,12],[14,2,12],[15,3,11],[16,4,10],[17,5,7],[17,9,10],[18,5,6],[18,10,10],[19,5,5],[19,10,10],[20,5,6],[20,10,11]])
	,cloud: makeSprite(0,7,[[0,6,10],[1,2,6],[1,11,11],[2,1,1],[2,5,5],[2,12,12],[3,0,1],[3,4,4],[3,13,13],[4,0,0],[4,13,13],[5,0,0],[5,13,13],[6,1,1],[6,13,13],[7,2,12]])
	,smallCloud: makeSprite(0,4,[[0,4,6],[1,1,3],[1,7,7],[2,0,0],[2,2,2],[2,8,8],[3,0,0],[3,8,8],[4,1,7]])
	,smallHill: makeSprite(0,5,[[0,5,5],[1,4,4],[1,6,6],[2,3,3],[2,7,7],[3,2,2],[3,8,8],[4,1,1],[4,9,9]])
	,stone0: [{x:0,y:0}]
	,stone1: [{x:0,y:0},{x:1,y:0}]
	,stone2: spriteQuad(0,0,3,1,1)
	,cactus0:  spriteCombine([spriteQuad(0,2,2,4,10),spriteQuad(6,3,2,3,10),spriteQuad(0,6,8,2,10),spriteQuad(3,0,2,10,10)])
	,cactus1:  spriteCombine([spriteQuad(3,3,3,17,20),spriteQuad(6,7,3,2,20),spriteQuad(7,5,2,4,20),spriteQuad(0,9,3,2,20),spriteQuad(0,7 ,2,4,20)])
	,horizon: spriteQuad(0,0,G.ui.width,1,1)
	,char0: spriteCombine([spriteQuad(0,0,6,2,10), spriteQuad(0,2,2,6,10), spriteQuad(0,8,6,2,10), spriteQuad(4,2,2,6,10)])
	,char1: spriteCombine([spriteQuad(0,0,4,2,10), spriteQuad(2,2,2,6,10), spriteQuad(0,8,6,2,10)])
	,char2: spriteCombine([spriteQuad(0,0,6,2,10), spriteQuad(4,2,2,2,10), spriteQuad(0,4,6,2,10), spriteQuad(0,6,2,2,10), spriteQuad(0,8,6,2,10)])
	,char3: spriteCombine([spriteQuad(0,0,6,2,10), spriteQuad(4,2,2,2,10), spriteQuad(0,4,6,2,10), spriteQuad(4,6,2,2,10), spriteQuad(0,8,6,2,10)])
	,char4: spriteCombine([spriteQuad(0,0,2,6,10), spriteQuad(4,0,2,10,10), spriteQuad(0,4,6,2,10)])
	,char5: spriteCombine([spriteQuad(0,0,6,2,10), spriteQuad(0,2,2,2,10), spriteQuad(0,4,6,2,10), spriteQuad(4,6,2,2,10), spriteQuad(0,8,6,2,10)])
	,char6: spriteCombine([spriteQuad(0,0,2,10,10), spriteQuad(0,4,6,2,10), spriteQuad(4,6,2,2,10), spriteQuad(0,8,6,2,10)])
	,char7: spriteCombine([spriteQuad(0,0,6,2,10), spriteQuad(4,2,2,8,10)])
	,char8: spriteCombine([spriteQuad(0,0,2,10,10), spriteQuad(0,0,6,2,10), spriteQuad(4,2,2,2,10), spriteQuad(0,4,6,2,10), spriteQuad(4,6,2,2,10), spriteQuad(0,8,6,2,10)])
	,char9: spriteCombine([spriteQuad(0,0,6,2,10), spriteQuad(0,2,2,4,10), spriteQuad(2,4,2,2,10), spriteQuad(4,2,2,8,10)])
}
G.ui.sprites.animate=function(){
	if (G.player.y==G.ui.floor) {
		// Running: animate player 3 times a second
		if (G.ticks%(G.ui.fps/8)==0) G.player.frame=G.player.frame<5?G.player.frame+1:0;
	} else {
		G.player.frame=5; // Jump
	}	
}
G.ui.speaker = {speaking:false,frame:0,w:22,h:25}
G.ui.speaker.start=function() {this.speaking=true;this.speak()}
G.ui.speaker.stop=function() {this.speaking=false;}
G.ui.speaker.speak=function() {
	var that = G.ui.speaker;
	if (!that.speaking) return;
	
	G.ui.area.ctx.drawImage(G.player.image, 22*that.frame, that.h, that.w, that.h, (8)*G.ui.scaleX, 8*G.ui.scaleY, that.w*G.ui.scaleX, that.h*G.ui.scaleY)
	if (that.frame<1)that.frame++;else that.frame=0;
	//G.ui.area.ctx.imageSmoothingEnabled=true;
	window.setTimeout(that.speak, 300)
}//FILE: entity.js
G.entity = {
	get: function(id) {
		for (var e=0; e<G.ent.length; e++) if (G.ent[e].id==id) return G.ent[e];
	},
	gets: function(tag) {
		var ret=[];for (var e=0; e<G.ent.length; e++) if (G.ent[e].tag==tag) ret.push(G.ent[e]); return ret;
	},
	layer: function(l) {
		var res=[];for (var e=0; e<G.ent.length; e++) if (G.ent[e].l==l || l==0&&typeof G.ent[e].l =='undefined') res.push(G.ent[e]);
		return res;
	},
	add: function(ent) {
		G.ent.push(ent);
		return ent;
	},
	remove: function(e) {
		G.ent.splice(e,1);
	},
	count: function(tag) {
		var count=0;
		for (var e=0; e<G.ent.length; e++) if (G.ent[e].tag && G.ent[e].tag.indexOf(tag)>-1) count++;
		return count;
	},
	collision: function(ent) {
		//Need to factor in player's frame for their size
		var eX = Math.round(ent.x-+G.ui.camera.x);
		var eH = ent.obstacle[1];
		var eMaxX = Math.round(eX+ent.obstacle[0]);
		var pX = Math.round(G.player.x)
		var pMaxX = Math.round(pX+G.player.spriteSizes[G.player.frame])
		var EasyY = 0; Math.floor(eH/1.5);
		var EasyX = 1;
		var hitY=G.player.y+EasyY<=ent.y+eH;
		var hitFront = eX+EasyX<pMaxX;
		var hitTop = eMaxX-EasyX>pX;
		if (hitY && hitFront && hitTop) {
			dpd("pY+EasyY=",G.player.y+EasyY,"eH+eY=",ent.y+eH,"hitY=",hitY)
			dp("eX=",eX,"pMaxX=",pMaxX,"overlap=",pMaxX-eX,"hitFront=",hitFront,"frame=",G.player.frame)
			dpd	("eX=",eX,"px=",pX,"eMaxX=",eMaxX,"hitTop=",hitTop)
			return true;}
	}
}
//FILE: draw.js
G.draw = function() {
	var ctx = G.ui.area.ctx;
	ctx.fillStyle = G.ui.palette.dark;
	for (var l=0; l<=3; l++) {
		var ent = G.entity.layer(l);
		for (var e=0; e<ent.length; e++) {
			pte(ent[e]);
		}
	}
}
G.clear = function() {
	var ctx = G.ui.area.ctx;
	ctx.fillStyle = G.ui.palette.light;;
	ctx.fillRect(0,0,G.ui.width*G.ui.scaleX,G.ui.height*G.ui.scaleY);
}
function pte(e) {
	if(e.pts) {
		for (var p=0; p<e.pts.length; p++) {
			if (e.follow)
				px(e.x+e.pts[p].x, e.y+e.pts[p].y,e.pts[p].c||e.col);
			else px(e.x+e.pts[p].x-G.ui.camera.x, e.y+e.pts[p].y-G.ui.camera.y,e.pts[p].c||e.col);
		}
	} else if (e.image) {
		G.ui.area.ctx.drawImage(G.player.image, e.w*e.frame, 0, e.w-1, e.h-1, (e.x)*G.ui.scaleX, (G.ui.height-e.y-e.h)*G.ui.scaleY, e.w*G.ui.scaleX, e.h*G.ui.scaleY);
	}
}
var tt = 0;
function px(x,y,c) {
	y=G.ui.height-y;
	x = x*G.ui.scaleX;
	y = y*G.ui.scaleY;
	G.ui.area.ctx.fillStyle = c==1?G.ui.palette.light:c==2?G.ui.palette.mid:G.ui.palette.dark;
	G.ui.area.ctx.fillRect(x,y,G.ui.scaleX,G.ui.scaleY);
}//FILE: music.js
G.music={}
G.music.init = function() {
	G.music.ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext;
	G.music.tempo=100;
	G.music.lead = [
		'C3  e','C3  e','B3  e','C3  e','C3  s','C3  s','G3  s','C3  s','G3  s','C3  s','C3  s','-  s',
		'A3  e','G3  e','A3  e','G3  e','C3  e','C3  e','C3  e','-  e',
	],
	G.music.lead1 = [
		'C3  s','C3  s','A3  s','C3  s','G3  s','C4  s','C3  s','-  s','F3  e','C3  e','A3  e','F3  e',
		'A3  e','G3  e','C3  s','C3  s','G3  e','C3  e','D4  e','C3  e','-  e',
	],
	G.music.harmony = [
		'-   e','D4  e','C4  e','D4  e','C3 e','C4  e','A3  e','C3 e',
		'G3  e','A3  e','C3 e','A3  e','G3  e','A3  e','F3  q',
		'-   e','D4  s','C4  s','D4  e','C3 e','C4  e','C3 e','A3  e','C3 e',
		'G3  e','A3  e','C3 e','A3  e','G3  s','A3  s','G3  e','F3  q'
	],
	G.music.bass = [
		'D3  q','-   h','D3  q',
		'A3  q','-   h','A2  q',
		'C2 q','-   h','C2 q',
		'G2  h','A2  h'
	];
	G.music.jump = ['C5  q','-   q'];
	
	G.music.seq1 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, G.music.lead );
	G.music.seq1.createCustomWave([-1,-0.9,-0.6,-0.3, 0, 0.3, 0.6, 0.9,1])
	G.music.seq2 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, G.music.harmony );
	G.music.seq3 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, G.music.bass );
	G.music.seq3.createCustomWave([-1,-0.9,-0.6,-0.3, 0, 0.3, 0.6, 0.9,1])
	G.music.seq4 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, G.music.lead1 );
	G.music.seq4.createCustomWave([-1,-0.8,-0.4,-0.2, 0, 0.2, 0.4, 0.8,1])
	

	// set staccato and smoothing values for maximum coolness
	G.music.seq1.staccato = 0.55;
	G.music.seq4.staccato = 0.55;
	G.music.seq2.staccato = 0.55;
	G.music.seq3.staccato = 0.15;
	G.music.seq3.smoothing = 0.9;

	// adjust the levels so the bass and harmony aren't too loud
	G.music.seq1.gain.gain.value = 1.0 / 10;
	G.music.seq4.gain.gain.value = 1.0 / 10;
	G.music.seq2.gain.gain.value = 0.8 / 10;
	G.music.seq3.gain.gain.value = 0.65 / 10;

	// apply EQ settings
	G.music.seq1.mid.frequency.value = 800;
	G.music.seq4.mid.frequency.value = 800;
	G.music.seq1.mid.gain.value = 3;
	G.music.seq4.mid.gain.value = 3;
	G.music.seq2.mid.frequency.value = 1200;
	
	G.music.seq3.mid.gain.value = 3;
	G.music.seq3.bass.gain.value = 16;
	G.music.seq3.bass.frequency.value = 80;
	G.music.seq3.mid.gain.value = -6;
	G.music.seq3.mid.frequency.value = 500;
	G.music.seq3.treble.gain.value = -2;
	G.music.seq3.treble.frequency.value = 1400;
	
	this.sfxJump = new TinyMusic.Sequence( G.music.ac, G.music.tempo, G.music.jump);
	with (this.sfxJump) {
		staccato = 0.45;
		smoothing = 0.2;
		gain.gain.value = 0.65 / 2;
		bass.gain.value = -6;
		bass.frequency.value = 1400;
		mid.gain.value = -6;
		mid.frequency.value = 1400;
		treble.gain.value = -2;
		treble.frequency.value = 1400;
	}

}
G.music.playJump = function() {
	this.sfxJump.play(this.ac.currentTime)
	this.sfxJump.loop=false;
}
G.music.restart = function() {
	this.tempo=100;
	this.seq1.counter=0;
	this.seq4.counter=0;
	this.play();
};
G.music.play = function() {
	G.music.seq1.play( G.music.ac.currentTime );
	var foo1 = function() {
		++G.music.seq1.counter;
		if (G.music.seq1.counter%4!=0)
			{G.music.seq1.play(G.music.ac.currentTime);G.music.seq1.osc.onended = foo1;}
		else {G.music.seq4.play(G.music.ac.currentTime);G.music.seq4.osc.onended = foo4;}
		
	}
	var foo4 = function() {
		++G.music.seq4.counter;
		if (G.music.seq4.counter%4!=0)
		  {G.music.seq4.play(G.music.ac.currentTime);G.music.seq4.osc.onended = foo4;}
		else {G.music.seq1.play(G.music.ac.currentTime);G.music.seq1.osc.onended = foo1;}
	}
	G.music.seq1.osc.onended = foo1;
	G.music.seq2.play( G.music.ac.currentTime + ( 60 / G.music.tempo ) * 16 );
	var foo2 = function() {
		// After playing harmony once, wait 16 beats then play again
		G.music.seq2.play( G.music.ac.currentTime + ( 60 / G.music.tempo ) * 16 );
		G.music.seq2.osc.onended = foo2;
	}
	G.music.seq2.osc.onended = foo2;
	G.music.seq3.play( G.music.ac.currentTime + (60 / G.music.tempo ) * 8 );
	var foo3 = function() {
		G.music.seq3.play( G.music.ac.currentTime + ( 60 / G.music.tempo ) * 16 );
		G.music.seq3.osc.onended = foo3;
	}
	G.music.seq3.osc.onended = foo3;
};
G.music.stop = function() {
	G.music.seq1.stop();
	G.music.seq2.stop();
	G.music.seq3.stop();
	G.music.seq4.stop();
};
//FILE: events.js
G.clickTimer = 0;
G.ui.setupEvents=function(){
	document.body.addEventListener('mousedown', G.click)
	document.body.addEventListener('mouseup', G.clickEnd)
	document.body.addEventListener('touchstart', G.click, {passive: false})
	document.body.addEventListener('touchend', G.clickEnd, {passive: false})
};
G.click = function(e) {
	var button0 = e.key==' ' || e.type == 'touchstart' || e.type == 'mousedown';
	if (button0 && G.menu.next) {
		e.stopPropagation(); e.preventDefault();
		G.menu.doNext(); return
	}
	if(G.state == 3 && button0) {e.stopPropagation(); e.preventDefault();G.restart(); return;}
	if (e.key=='p') G.pause();
	if (G.state==1 && button0) {
		e.stopPropagation(); e.preventDefault();
		// Sink player mid-jump
		if(G.player.y>G.player.minY+5 && G.player.dy>-4) {G.player.dy=-4;}
		else if(G.player.y=G.player.minY) {
			G.music.playJump();
			G.clickTimer = G.minJump;
		}
	}
};
G.clickEnd = function(e) {
	if (G.clickTimer>0) {
		G.clickTimer = 0;
	}
};
G.menu = {
	next: null
	,font:"Courier New,Courier"
	,textSize: Math.round(G.ui.width*G.ui.scaleX/25)
	,lineHeight: Math.round(G.ui.height*G.ui.scaleY/14)
}
G.menu.intro0 = function() {
	G.ui.speaker.start();
	G.menu.popup('Welcome... or rather not.... You are an illegal alien #BadHombre of questionable race and virtue trying to get into the "Land of the Free"', G.menu.intro1);
}
G.menu.intro1 = function() {
	G.menu.popup('Sooo... until we build The Wall (#NeedSponsor) and according to our new "Merit System" you must earn enough "Freedom Points" in order to be allowed entry...', G.menu.intro2)
}
G.menu.intro2 = function() {
	G.menu.popup('Pass through our desert (#SwampDrained) to earn Freedom Points by jumping cactuseses and we will consider your application ...', G.menu.intro3)
}
G.menu.intro3 = function() {
	G.menu.popup('Fail and we will be forced to keep you in a prison camp wearing pink underwear until you die of humiliation #ToughLove ...', G.menu.intro4)
}
G.menu.intro4 = function() {
	G.menu.popup('Gain 2000 points and you will be worthy to enter the "Home of the Brave" where guns are cheap and basic necessities ain\'t. Good Luck!', function(){
		G.ui.speaker.stop();
		G.restart();
	});
}
G.menu.popup = function(text, next) {

	G.menu.next=next;
	
	var rectWidth = (G.ui.width*G.ui.scaleX)/1.5;
	var rectHeight = (G.ui.height*G.ui.scaleX)/1.5;
	var rectY = (G.ui.height*G.ui.scaleY)/2-rectHeight/2;
	var rectX = (G.ui.width*G.ui.scaleX)/2-rectWidth/2;
	var cornerRadius = 8*G.ui.scaleX;

	var ctx = G.ui.area.ctx;
	ctx.fillStyle = G.ui.palette.light;
	ctx.strokeStyle = G.ui.palette.light;
	ctx.lineJoin = "round";
	ctx.lineWidth = cornerRadius;
	ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
	ctx.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
	
	G.menu.wrapText(text,rectX+cornerRadius*0.7,rectY+cornerRadius+this.lineHeight*0.5, rectWidth-cornerRadius);
}
G.menu.doNext = function() {
	this.next();
}
G.menu.wrapText = function(text, x, y, maxWidth) {
	
	var ctx = G.ui.area.ctx;
	
	ctx.fillStyle = G.ui.palette.dark;
	ctx.font=G.menu.textSize+"px "+this.font;
	
	var words = text.split(' ');
	var line = '';

	for(var n = 0; n < words.length; n++) {
	  var testLine = line + words[n] + ' ';
	  if (ctx.measureText(testLine).width > maxWidth && n > 0) {
		ctx.fillText(line, x, y);
		line = words[n] + ' ';
		y += this.lineHeight;
	  }
	  else {
		line = testLine;
	  }
	}
	ctx.fillText(line, x, y);
}//FILE: restart.js
G.startMain = function() {
	G.menu.intro0();
};
G.restart = function() {

	if (G._intervalId) G.pause();
	
	G.ticks = 0;
	G.state = 1;
	G.speed = 1.2;
	G.spacing=50;//Ticks between cactus
	G.music.tempo=100;
	G.lastCactus = 0;
	G.level = 0;
	G.ui.palette = G.ui.palette0;
	G.ent=[];
	G.player = G.entity.add(G.playerDefault);

	G.addCloud(G.ui.width*0.3,1);
	G.addCloud(G.ui.width*0.7,1);
	G.addCloud(G.ui.width*0.6,0);
	G.addCloud(G.ui.width*0.9,0);
	
	for (var s=0; s<20; s++) {
		G.entity.add({tag:'stone'+(s%3),x:rnd(0,G.ui.width),y:rnd(0, G.ui.horizon-1),pts:G.ui.sprites['stone'+(s%3)]})
	}
	
	G.entity.add({tag:'horizon', x:0, y:G.ui.horizon, follow:true, pts:G.ui.sprites.horizon})

	G.entity.add({id:'char3', x:G.ui.width-4*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	G.entity.add({id:'char2', x:G.ui.width-3*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	G.entity.add({id:'char1', x:G.ui.width-2*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	
	G.menu.next=null;
	
	G.ui.camera = {
		x:0,
		y:0
	}
	G.start();
};//FILE: game.js
G.update = function() {
	G.ticks++;
	
	var test = G.entity.get('char')

	// Generate a random cloud
	if (prob(75) && G.ticks%rnd(10,30)==0) {
		if (prob(80) && G.entity.count('smallCloud')<3) G.addCloud(0,0)
		if (prob(90) && G.entity.count('cloud' )<3) G.addCloud(0,1)
		if (prob(90) && G.entity.count('hill' )<3) G.addHill(0,1)
	}
	// Generate random stones
	if (prob(75) && G.ticks%rnd(10,30)==0) G.entity.add({tag:'stone0',x:G.ui.camera.x+G.ui.width,y:rnd(0, G.ui.horizon-1),pts:G.ui.sprites.stone0})
	if (prob(75) && G.ticks%rnd(10,30)==0) G.entity.add({tag:'stone1',x:G.ui.camera.x+G.ui.width,y:rnd(0, G.ui.horizon-2),pts:G.ui.sprites.stone1})
	if (prob(75) && G.ticks%rnd(10,30)==0) G.entity.add({tag:'stone2',x:G.ui.camera.x+G.ui.width,y:rnd(0, G.ui.horizon-3),pts:G.ui.sprites.stone2})

	if (G.ticks%10==0) {G.speed+=0.005;G.spacing-=.1;}
	
	// Generate cactii 
	if (G.ticks%rnd(10,30)==0) {
		var nextCactus = (Math.random()*G.spacing)+40;
		if (G.ticks-G.lastCactus>nextCactus) {
			dpd('spacing:',G.spacing,'last:', G.ticks-G.lastCactus,'next:',nextCactus, G.ticks-G.lastCactus>nextCactus)
			var p=Math.random();
			G.addCactus(0,Math.round(Math.random()))
			if(G.level>1 && p>0.75) G.addCactus(10,Math.round(Math.random()))
			if(G.level>3 && p>0.95) G.addCactus(20,Math.round(Math.random()))
			G.lastCactus = G.ticks;
		}
	}

	if (G.clickTimer > 0 && G.clickTimer < G.maxJump) {
		G.player.dy = G.jumpPower;
		G.clickTimer++;
	}
	if (G.clickTimer > G.maxJump) g.clickTimer=0;//G.playerJump(G.clickTimer);
	G.ui.camera.x+=G.speed||0;

	var e = G.ent.length;
	while (e--) {
		var ent = G.ent[e]; 
		
		// Acceleration
		if (ent.dx && ent.ddx) ent.dx+=ent.ddx;
		if (ent.dy && ent.ddy) ent.dy+=ent.ddy;
		
		// Motion
		ent.x+=ent.dx?ent.dx:0;
		ent.y+=ent.dy?ent.dy:0;
		
		// Floor (min y) => Stop vertical motion and remain on floor
		if (typeof ent.minY != 'undefined' && Math.abs(ent.dy)>0 && ent.y <= ent.minY) {
			ent.dy=0;ent.y=ent.minY;
			if (ent===G.player) {
				G.player.jumps++;
				G.player.frame=0;
			}
		}

		// Check collision
		if (ent.obstacle && G.entity.collision(ent)) G.gameOver();
		
		// Off the board
		if (ent.x+20<G.ui.camera.x && !ent.follow) G.entity.remove(e);
		
	}
	
	if (G.state>1) return;

	G.ui.sprites.animate();
	
	G.player.score = Math.round(G.ticks/10);
	G.level = Math.floor(G.player.score/100)
	//G.player.score = G.player.jumps
	G.ui.showScore(G.player.score)
	//if (G.ticks%100==0) {G.music.tempo=100+100*parseInt(G.player.score)/1000;}
	if(G.ticks%1000==0) G.ui.palette = G.ui.palette==G.ui.palette0?G.ui.palette1:G.ui.palette0;
};
G.loop = function() {
	G.update();
	if (G.state>1) return;
	G.clear();
	G.draw();
	if (G._intervalId) requestAnimationFrame(G.loop);
};
G.ui.showScore = function(s) {
	let char = ('00' + s).slice(-3);
	let c3 = char[0];c2 = char[1];c1 = char[2];
	G.entity.get('char3').pts = G.ui.sprites['char'+c3];
	G.entity.get('char2').pts = G.ui.sprites['char'+c2];
	G.entity.get('char1').pts = G.ui.sprites['char'+c1];
};
G.addCloud = function(x,t) {
	G.entity.add({tag:t==0?'smallCloud':'cloud',x:x||G.ui.camera.x+G.ui.width,y:rnd(t*G.ui.height/60+G.ui.height/3,G.ui.height-15),pts:t==0?G.ui.sprites.smallCloud:G.ui.sprites.cloud,col:2, dx:G.speed/(2+t), dy:.01})
};
G.addHill = function(x,t) {
	G.entity.add({tag:'hill',x:x||G.ui.camera.x+G.ui.width,y:G.ui.horizon+1,pts:t==0?G.ui.sprites.smallHill:G.ui.sprites.smallHill,col:0})
};
G.addCactus = function(x,t) {
	var h=9+t*9;
	G.entity.add({tag:'cactus',obstacle:[9,h], x:G.ui.camera.x+G.ui.width+x, y:G.ui.floor, pts:G.ui.sprites['cactus'+t]})
};
G.start = function() {
	if (G._intervalId) clearInterval(G._intervalId);
	G._intervalId = requestAnimationFrame(G.loop);//setInterval(G.loop, 1000/G.ui.fps);
	G.music.restart();
};
G.gameOver = function() {
	G.pause();
	G.state=2;
	setTimeout(function(){G.state = 3},1000);
}
G.pause = function() {
	if (G._intervalId) {
		clearInterval(G._intervalId);
		delete G._intervalId;
		G.music.stop();
	} else G.start();
};
G.init();
