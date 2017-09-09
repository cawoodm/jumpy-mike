//FILE: entity.js
G.entity = {
	get: function(id) {
		for (var e=0; e<G.ent.length; e++) if (G.ent[e].id==id) return G.ent[e];
	},
	gets: function(tag) {
		var ret=[];for (var e=0; e<G.ent.length; e++) if (G.ent[e].tag==tag) ret.push(G.ent[e]); return ret;
	},
	layer: function(l) {
		var res=[];for (var e=0; e<G.ent.length; e++) if (G.ent[e].l==l || l==0&&typeof G.ent[e].l =="undefined") res.push(G.ent[e]);
		return res;
	},
	add: function(ent) {
		ent.l=typeof ent.l == "undefined"?"2":ent.l;
		G.ent.push(ent);
		return ent;
	},
	remove: function(e) {
		G.ent.splice(e,1);
	},
	count: function(tag) {
		var count=0;
		for (var e=0; e<G.ent.length; e++) if (G.ent[e].tag && G.ent[e].tag.indexOf(tag)>-1) count++;
		return count;
	},
	collision: function(ent) {
		//Need to factor in player"s frame for their size
		var eX = Math.round(ent.x-+G.ui.camera.x);
		var eH = ent.obstacle[1];
		var eMaxX = Math.round(eX+ent.obstacle[0]);
		var pX = Math.round(G.player.x)
		var pMaxX = Math.round(pX+G.player.spriteSizes[G.player.frame])
		var EasyY = 0; Math.floor(eH/1.5);
		var EasyX = 1;
		var hitY=G.player.y+EasyY<=ent.y+eH;
		var hitFront = eX+EasyX<pMaxX;
		var hitTop = eMaxX-EasyX>pX;
		if (hitY && hitFront && hitTop) {
			//dp("pY+EasyY=",G.player.y+EasyY,"eH=",eH,"eH+eY=",ent.y+eH,"hitY=",hitY)
			//dpd("eX=",eX,"pMaxX=",pMaxX,"overlap=",pMaxX-eX,"hitFront=",hitFront,"frame=",G.player.frame)
			//dpd	("eX=",eX,"px=",pX,"eMaxX=",eMaxX,"hitTop=",hitTop)
			return true;}
	}
};