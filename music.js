//FILE: music.js
G.music={}
G.music.init = function() {
	this.enabled=true;
	G.music.ac = typeof AudioContext !== "undefined" ? new AudioContext : new webkitAudioContext;
	G.music.tempo=100;
	G.music.lead = [
		"C3  e","C3  e","B3  e","C3  e","C3  s","C3  s","G3  s","C3  s","G3  s","C3  s","C3  s","-  s",
		"A3  e","G3  e","A3  e","G3  e","C3  e","C3  e","C3  e","-  e",
	],
	G.music.lead1 = [
		"C3  s","C3  s","A3  s","C3  s","G3  s","C4  s","C3  s","-  s","F3  e","C3  e","A3  e","F3  e",
		"A3  e","G3  e","C3  s","C3  s","G3  e","C3  e","D4  e","C3  e","-  e",
	],
	G.music.harmony = [
		"-   e","D4  e","C4  e","D4  e","C3 e","C4  e","A3  e","C3 e",
		"G3  e","A3  e","C3 e","A3  e","G3  e","A3  e","F3  q",
		"-   e","D4  s","C4  s","D4  e","C3 e","C4  e","C3 e","A3  e","C3 e",
		"G3  e","A3  e","C3 e","A3  e","G3  s","A3  s","G3  e","F3  q"
	],
	G.music.bass = [
		"D3  q","-   h","D3  q",
		"A3  q","-   h","A2  q",
		"C2 q","-   h","C2 q",
		"G2  h","A2  h"
	];
	G.music.jump = ["C5  q","-   q"];
	G.music.gameover = ["E3  q","D3  q","C2  h"];
	
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

	// adjust the levels so the bass and harmony aren"t too loud
	G.music.seq1.gain.gain.value = 1.0 / 20;
	G.music.seq4.gain.gain.value = 1.0 / 20;
	G.music.seq2.gain.gain.value = 0.8 / 20;
	G.music.seq3.gain.gain.value = 0.65 / 20;

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
	this.sfxJump.staccato = 0.45;
	this.sfxJump.smoothing = 0.2;
	this.sfxJump.gain.gain.value = 0.65 / 10;
	this.sfxJump.bass.gain.value = -6;
	this.sfxJump.bass.frequency.value = 1400;
	this.sfxJump.mid.gain.value = -6;
	this.sfxJump.mid.frequency.value = 1400;
	this.sfxJump.treble.gain.value = -2;
	this.sfxJump.treble.frequency.value = 1400;

	this.sfxGameOver = new TinyMusic.Sequence( G.music.ac, G.music.tempo, G.music.gameover);
	this.sfxGameOver.staccato = 0.45;
	this.sfxGameOver.smoothing = 0.2;
	this.sfxGameOver.gain.gain.value = 0.65 / 10;
	this.sfxGameOver.bass.gain.value = -6;
	this.sfxGameOver.bass.frequency.value = 1400;
	this.sfxGameOver.mid.gain.value = -6;
	this.sfxGameOver.mid.frequency.value = 1400;
	this.sfxGameOver.treble.gain.value = -2;
	this.sfxGameOver.treble.frequency.value = 1400;

}
G.music.playJump = function() {
	if (!this.enabled) return;
	this.sfxJump.play(this.ac.currentTime)
	this.sfxJump.loop=false;
}
G.music.playGameOver = function() {
	if (!this.enabled) return;
	this.sfxGameOver.play(this.ac.currentTime)
	this.sfxGameOver.loop=false;
}
G.music.restart = function() {
	this.tempo=100;
	this.seq1.counter=0;
	this.seq4.counter=0;
	if (!this.enabled) return;
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
		// After enabled harmony once, wait 16 beats then play again
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
G.music.toggle=function(){
	if (this.enabled) {
		this.stop();
		this.enabled=false;
		G.entity.get('mute').col=2;
	}
	else {
		this.play();
		this.enabled=true;
		G.entity.get('mute').col=0;
	}
};
