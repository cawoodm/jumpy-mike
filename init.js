//FILE: init.js
var G = {};
var DEBUG = false;
G.ui = {}
G.ui.fps = 30 //50;
G.ui.width = 150;
G.ui.height = 150;
G.ui.scaleX = (window.innerWidth/G.ui.width);
G.ui.scaleY = (window.innerHeight/G.ui.height);
if (G.ui.scaleX>G.ui.scaleY) G.ui.scaleX=G.ui.scaleY; else G.ui.scaleY=G.ui.scaleX;
G.gravity=.3;
G.minJump=2;
G.maxJump=12;
G.jumpPower=4; 
G.ui.floor = 8;
G.ui.horizon = 12;
G.ui.palette0 = {light:'#EEE', dark:'#333', mid:'#CCC'}
G.ui.palette1 = {light:'#333', dark:'#EEE', mid:'#CCC'}
G.ui.palette = G.ui.palette0 
G.music = {}
G.ui.camera = {}

function init() {
	document.body.style.padding=document.body.style.margin='0px';
	document.body.style.backgroundColor=G.ui.palette.light;
	G.ui.area = $('c');
	G.ui.area.ctx = G.ui.area.getContext("2d");
	G.ui.setupEvents();
	window.onkeydown = G.click;
	window.onkeyup = G.clickEnd;
	G.ui.area.style.padding='0px';   
	G.ui.area.style.margin='0px';
	G.ui.area.width=Math.floor(G.ui.width*G.ui.scaleX);
	G.ui.area.height=Math.floor(G.ui.height*G.ui.scaleY);
	G.ui.area.style.backgroundColor='#DDD';
	G.ui.pts = {}

	G.music={tempo:111}
	G.music.ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext,
	lead = [
		'-   e','Bb3 e','A3  e','Bb3 e','G3  e','A3  e','F3  e','G3  e',
		'E3  e','F3  e','G3  e','F3  e','E3  e','F3  e','D3  q',
		'-   e','Bb3 s','A3  s','Bb3 e','G3  e','A3  e','G3  e','F3  e','G3  e',
		'E3  e','F3  e','G3  e','F3  e','E3  s','F3  s','E3  e','D3  q'
	],
	harmony = [
		'-   e','D4  e','C4  e','D4  e','Bb3 e','C4  e','A3  e','Bb3 e',
		'G3  e','A3  e','Bb3 e','A3  e','G3  e','A3  e','F3  q',
		'-   e','D4  s','C4  s','D4  e','Bb3 e','C4  e','Bb3 e','A3  e','Bb3 e',
		'G3  e','A3  e','Bb3 e','A3  e','G3  s','A3  s','G3  e','F3  q'
	],
	bass = [
		'D3  q','-   h','D3  q',
		'A2  q','-   h','A2  q',
		'Bb2 q','-   h','Bb2 q',
		'F2  h','A2  h'
	];
	G.music.seq1 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, lead );
	G.music.seq2 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, harmony );
	G.music.seq3 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, bass );

	// set staccato and smoothing values for maximum coolness
	G.music.seq1.staccato = 0.55;
	G.music.seq2.staccato = 0.55;
	G.music.seq3.staccato = 0.05;
	G.music.seq3.smoothing = 0.4;

	// adjust the levels so the bass and harmony aren't too loud
	G.music.seq1.gain.gain.value = 1.0 / 2;
	G.music.seq2.gain.gain.value = 0.8 / 2;
	G.music.seq3.gain.gain.value = 0.65 / 2;

	// apply EQ settings
	G.music.seq1.mid.frequency.value = 800;
	G.music.seq1.mid.gain.value = 3;
	G.music.seq2.mid.frequency.value = 1200;
	G.music.seq3.mid.gain.value = 3;
	G.music.seq3.bass.gain.value = 6;
	G.music.seq3.bass.frequency.value = 80;
	G.music.seq3.mid.gain.value = -6;
	G.music.seq3.mid.frequency.value = 500;
	G.music.seq3.treble.gain.value = -2;
	G.music.seq3.treble.frequency.value = 1400;
	
	G.restart();

}