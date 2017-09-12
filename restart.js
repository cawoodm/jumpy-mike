//FILE: restart.js
G.startMain = function() {
	G.restart(true);
	G.clear();
	G.draw();
	G.menu.intro0();
};
G.restart = function(intro) {

	if (G._intervalId) G.pause();
	
	G.ticks = 0;
	G.state = 1;
	G.speed = 1.2;
	G.spacing=50;//Ticks between cactus
	G.music.tempo=100;
	G.lastCactus = 0;
	G.level = 0;
	G.ui.palette = G.ui.palette0;
	G.ui.camera = {x:0, y:0};
	G.ent=[];
	G.player = G.entity.add(G.playerDefault);

	G.addCloud(G.ui.width*0.3,1);
	G.addCloud(G.ui.width*0.7,1);
	G.addCloud(G.ui.width*0.6,0);
	G.addCloud(G.ui.width*0.9,0);
	
	let c = G.addCactus(40-G.ui.width,1); c.kill=true;
	c = G.addCactus(120-G.ui.width,0); c.kill=true;
	
	for (var s=0; s<13; s++) G.addStone(rnd(0,G.ui.width),s%3);
	
	G.entity.add({id:'mute', x:1, y:G.ui.height-1-10, follow:true, pts:G.ui.sprites.mute, col:G.music.enabled?0:2})
	c = G.entity.add({id:'info', x:20, y:G.ui.height-1-10, follow:true, pts:G.ui.sprites.info}); c.col=2;
	
	G.entity.add({id:'char3', x:G.ui.width-4*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	G.entity.add({id:'char2', x:G.ui.width-3*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	G.entity.add({id:'char1', x:G.ui.width-2*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	
	G.menu.next=null;
	
	if (intro) return;
	
	G.start();
	
};