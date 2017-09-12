//FILE: sprites.js
function makeSprite(X,H,a) {
	var res = [];
	for (let i=0; i<a.length; i++) {
		var p = a[i];
		for (let x=p[1]; x<=p[2]; x++)
			res.push({x:x,y:p[0],c:p[3]});
	}
	spriteFlip(res,H);
	return res;
}
function spriteQuad(x,y,w,h,H) {
	var res = [];
	for (let i=x; i<x+w; i++)
		for (let j=y; j<y+h; j++)
			res.push({x:i,y:j});
	spriteFlip(res,H);
	return res;
}
function spriteCombine(arr) {
	var res = [];
	for (let i=0; i<arr.length; i++) res = res.concat(arr[i]);
	return res;
}
function spriteFlip(s,h) {
	for (let i=0; i<s.length; i++) s[i].y = h-s[i].y;
}
G.ui.sprites = {none:null
	,cloud: makeSprite(0,7,[[0,6,10],[1,2,6],[1,11,11],[2,1,1],[2,5,5],[2,12,12],[3,0,1],[3,4,4],[3,13,13],[4,0,0],[4,13,13],[5,0,0],[5,13,13],[6,1,1],[6,13,13],[7,2,12]])
	,smallCloud: makeSprite(0,4,[[0,4,6],[1,1,3],[1,7,7],[2,0,0],[2,2,2],[2,8,8],[3,0,0],[3,8,8],[4,1,7]])
	,smallHill: makeSprite(0,5,[[0,5,5],[1,4,4],[1,6,6],[2,3,3],[2,7,7],[3,2,2],[3,8,8],[4,1,1],[4,9,9]])
	,stone0: [{x:0,y:0}]
	,stone1: [{x:0,y:0},{x:1,y:0}]
	,stone2: spriteQuad(0,0,3,1,1)
	,cactus0: spriteCombine([spriteQuad(0,2,2,4,10),spriteQuad(6,3,2,3,10),spriteQuad(0,6,8,2,10),spriteQuad(3,0,2,10,10)])
	,cactus1: spriteCombine([spriteQuad(3,3,3,17,20),spriteQuad(6,7,3,2,20),spriteQuad(7,5,2,4,20),spriteQuad(0,9,3,2,20),spriteQuad(0,7,2,4,20)])
	,cactus2: spriteCombine([spriteQuad(3,3,3,22,25),spriteQuad(6,7,3,2,25),spriteQuad(7,5,2,4,25),spriteQuad(0,9,3,2,25),spriteQuad(0,7,2,4,25),spriteQuad(2,18,2,2,25),spriteQuad(1,16,1,4,25)])
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
	,mute: spriteCombine([spriteQuad(0,4,2,2,10), spriteQuad(2,3,1,4,10), spriteQuad(3,2,1,6,10), spriteQuad(4,1,1,8,10)])
	,info: spriteCombine([spriteQuad(4,0,2,2,10), spriteQuad(4,3,2,7,10)])
};
G.ui.sprites.animate=function(){
	if (G.player.y==G.ui.floor) {
		// Running: animate player 3 times a second
		if (G.ticks%(G.ui.fps/8)==0) G.player.frame=G.player.frame<5?G.player.frame+1:0;
	} else {
		G.player.frame=5; // Jump
	}	
};
G.ui.speaker = {speaking:false,frame:0,w:22,h:25};
G.ui.speaker.start=function() {this.speaking=true;this.speak()};
G.ui.speaker.stop=function() {this.speaking=false;};
G.ui.speaker.speak=function() {
	var that = G.ui.speaker;
	if (!that.speaking) return;
	G.ui.area.ctx.drawImage(G.player.image, 22*that.frame, that.h, that.w, that.h, Math.round(G.menu.rectX-that.w*G.ui.scaleX/1.5), Math.round(G.menu.rectY-that.h*G.ui.scaleY/1.3), that.w*G.ui.scaleX, that.h*G.ui.scaleY);
	if (that.frame<1)that.frame++;else that.frame=0;
	//G.ui.area.ctx.imageSmoothingEnabled=true;
	window.setTimeout(that.speak, 300);
}