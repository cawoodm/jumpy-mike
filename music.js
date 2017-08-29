//FILE: music.js
G.music={}
G.music.restart = function() {
	G.music.tempo=100;
	G.music.ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext,
	lead = [
		'C3  e','C3  e','B3  e','C3  e','C3  s','C3  s','G3  s','C3  s','G3  s','C3  s','C3  s','-  s',
		'A3  e','G3  e','A3  e','G3  e','C3  e','C3  e','C3  e','-  e',
	],
	lead1 = [
		'C3  s','C3  s','A3  s','C3  s','G3  s','C4  s','C3  s','-  s','F3  e','C3  e','A3  e','F3  e',
		'A3  e','G3  e','A3  e','G3  e','C3  e','D4  e','C3  e','-  e',
	],
	harmony = [
		'-   e','D4  e','C4  e','D4  e','C3 e','C4  e','A3  e','C3 e',
		'G3  e','A3  e','C3 e','A3  e','G3  e','A3  e','F3  q',
		'-   e','D4  s','C4  s','D4  e','C3 e','C4  e','C3 e','A3  e','C3 e',
		'G3  e','A3  e','C3 e','A3  e','G3  s','A3  s','G3  e','F3  q'
	],
	bass = [
		'D3  q','-   h','D3  q',
		'A3  q','-   h','A2  q',
		'C2 q','-   h','C2 q',
		'G2  h','A2  h'
	];
	G.music.seq1 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, lead );
	G.music.seq2 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, harmony );
	G.music.seq3 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, bass );
	G.music.seq4 = new TinyMusic.Sequence( G.music.ac, G.music.tempo, lead1 );

	// set staccato and smoothing values for maximum coolness
	G.music.seq1.staccato = 0.55;
	G.music.seq4.staccato = 0.55;
	G.music.seq2.staccato = 0.55;
	G.music.seq3.staccato = 0.35;
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
	G.music.seq3.bass.gain.value = 6;
	G.music.seq3.bass.frequency.value = 80;
	G.music.seq3.mid.gain.value = -6;
	G.music.seq3.mid.frequency.value = 500;
	G.music.seq3.treble.gain.value = -2;
	G.music.seq3.treble.frequency.value = 1400;
	
	G.music.seq1.counter=0;
	G.music.seq4.counter=0;
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
