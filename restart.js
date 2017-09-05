//FILE: restart.js
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
	
	//G.entity.add({tag:'horizon', x:0, y:G.ui.horizon, follow:true, pts:G.ui.sprites.horizon})

	G.entity.add({id:'char3', x:G.ui.width-4*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	G.entity.add({id:'char2', x:G.ui.width-3*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	G.entity.add({id:'char1', x:G.ui.width-2*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	
	G.menu.next=null;
	
	G.ui.camera = {
		x:0,
		y:0
	}
	G.start();
};