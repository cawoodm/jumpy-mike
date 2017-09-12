//FILE: game.js
G.update = function() {
	G.ticks++;
	
	var test = G.entity.get('char')

	// Generate a random cloud
	if (prob(75) && G.ticks%rnd(10,30)==0) {
		if (prob(80) && G.entity.count('smallCloud')<3) G.addCloud(0,0)
		if (prob(90) && G.entity.count('cloud' )<3) G.addCloud(0,1)
	}
	// Generate random stones
	if (prob(75) && G.ticks%rnd(10,30)==0 && G.entity.count('stone0')<3) G.addStone(0, 0);
	if (prob(75) && G.ticks%rnd(10,30)==0 && G.entity.count('stone1')<7) G.addStone(0, 1);
	if (prob(75) && G.ticks%rnd(10,30)==0 && G.entity.count('stone2')<7) G.addStone(0, 2);

	if (G.ticks%10==0) {G.speed+=0.005;G.spacing-=0.1;}
	
	// Generate cactii 
	if (G.ticks%rnd(10,30)==0) {
		var nextCactus = (Math.random()*G.spacing)+40;
		if (G.ticks-G.lastCactus>nextCactus) {
			let cNum=Math.min(2, Math.round(G.level)); // Cactus size
			G.addCactus(0,rnd(0,cNum))
			if(G.level>1 && prob(50)) G.addCactus(10,rnd(0,cNum));// Double cactii
			if(G.level>3 && prob(25)) G.addCactus(20,rnd(0,cNum));// Treble cactii
			if(G.level>5 && prob(25)) G.addCactus(30,rnd(0,cNum));// Quadruple cactii
			G.lastCactus = G.ticks;
		}
	}
	// Power the jump the longer the press
	if (G.clickTimer > 0 && G.clickTimer < G.maxJump) {
		G.player.dy = G.jumpPower;
		G.clickTimer++;
	}
	if (G.clickTimer > G.maxJump) g.clickTimer=0;
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
		
		if (ent.kill) G.entity.remove(e);
		
	}
	
	if (G.state>1) return;

	G.ui.sprites.animate();
	
	G.player.score = Math.round(G.ticks/10);
	G.level = Math.floor(G.player.score/100);
	G.ui.showScore(G.player.score)
	// Night every 200 points
	if(G.ticks%2000==0) G.ui.palette = G.ui.palette==G.ui.palette0?G.ui.palette1:G.ui.palette0;
};
G.loop = function() {
	G.update();
	if (G.state>1 || G.paused) return;
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
G.addStone = function(x,t) {
	let X = x||G.ui.camera.x+G.ui.width;
	let step = G.ui.horizon/3;
	Y=t*(step)+rnd(0,step-1)
	//dp("addStone", t, Y,G.ui.horizon-Y)
	G.entity.add({tag:'stone'+t,x:X,y:G.ui.horizon-Y-1,pts:G.ui.sprites["stone"+t],dx:(G.ui.horizon-Y)/20});
}
G.addCloud = function(x,t) {
	var X = x||G.ui.camera.x+G.ui.width
	var Y = rnd(t*G.ui.height/60+G.ui.height/2, G.ui.height-15);
	G.entity.add({tag:t==0?'smallCloud':'cloud',x:X,y:Y,pts:t==0?G.ui.sprites.smallCloud:G.ui.sprites.cloud,col:2, dx:2*G.speed/(2+t), dy:0.01, l: '0'})
};
G.addCactus = function(x,t) {
	var h=9+t*9;
	return G.entity.add({tag:'cactus',obstacle:[9,h], x:G.ui.camera.x+G.ui.width+x, y:G.ui.floor, l:3, pts:G.ui.sprites['cactus'+t]})
};
G.start = function() {
	G.menu.next=null;
	G.paused=false;
	if (G._intervalId) clearInterval(G._intervalId);
	G._intervalId = requestAnimationFrame(G.loop);
	G.music.restart();
};
G.gameOver = function() {
	G.pause();
	G.state=2;
	setTimeout(function(){G.state = 3},1000);
	G.music.playGameOver();
	G.menu.gameover0();
}
G.pause = function() {
	if (G._intervalId) {
		G.paused=true;
		clearInterval(G._intervalId);
		delete G._intervalId;
		G.music.stop();
	} else G.start();
};
G.cheat=function(n){
	G.ticks=n*1000;
	G.score=n*100;
	G.speed=1.2+G.ticks*0.0005;
	G.spacing=50-G.ticks*0.01;
}
G.init();
