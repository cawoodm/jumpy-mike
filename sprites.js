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
		dpd((new Date()).getMilliseconds(), G.ticks,G.ticks%(G.ui.fps/8))
		if (G.ticks%(G.ui.fps/8)==0) G.player.frame=G.player.frame<5?G.player.frame+1:0;
	} else {
		G.player.frame=5; // Jump
	}	
}
G.ui.sprites.restart=function() {
	Object.assign(G.player, {w:22, h:25, image: new Image()});
	G.player.image.src='sprites.png';
}