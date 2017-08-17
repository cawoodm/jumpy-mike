G.restart = function() {
	G.ticks = 0;
	G.state = 1;
	G.speed = 1.2;
	G.spacing=50;//Ticks between cactus
	G.music.tempo=100;
	G.lastCactus = 0;
	G.level = 0;
	G.ui.palette = G.ui.palette0;
	G.ent=[];
	G.player = G.entity.add({
		id: 'player',
		l: '3',
		x:4,
		y:G.ui.floor,
		dx:0,//G.speed,
		follow:true,
		dy:0,
		ddx:0,
		ddy:-G.gravity,
		minY:G.ui.floor,
		score:0,
		//pts:G.ui.sprites.trex,
		jumps:0,
		w:26,
		h:20,
		frame:0,
		image: new Image()
	});
	G.player.image.src = 'sprites.png';
	G.addCloud(G.ui.width*0.3,1);
	G.addCloud(G.ui.width*0.7,1);
	G.addCloud(G.ui.width*0.6,0);
	G.addCloud(G.ui.width*0.9,0);
	
	G.entity.add({tag:'horizon', x:0, y:G.ui.horizon, follow:true, pts:G.ui.sprites.horizon})

	G.entity.add({id:'char3', x:G.ui.width-4*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	G.entity.add({id:'char2', x:G.ui.width-3*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	G.entity.add({id:'char1', x:G.ui.width-2*(6+2), y:G.ui.height-2-10, follow:true, pts:G.ui.sprites.char0})
	
	G.ui.camera = {
		x:0,
		y:0
	}
	G.player.image.onload = G.start;
}