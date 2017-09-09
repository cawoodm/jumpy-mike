//FILE: draw.js
// Layer 0 = clouds
// Layer 1 = mountains
// Layer 2 = stones
// Layer 3 = cactii
// Layer 4 = player
G.draw = function() {
	var ctx = G.ui.area.ctx;
	ctx.fillStyle = G.ui.palette.dark;
	for (var l=0; l<=4; l++) {
		if (l==1) G.ui.terrain.draw(); // Mountains in front of clouds
		var ent = G.entity.layer(l);
		for (var e=0; e<ent.length; e++) pte(ent[e]);
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
}