//FILE: entity.js
G.entity = {
	get: function(id) {
		for (var e=0; e<G.ent.length; e++) if (G.ent[e].id==id) return G.ent[e];
	},
	gets: function(tag) {
		var ret=[];for (var e=0; e<G.ent.length; e++) if (G.ent[e].tag==tag) ret.push(G.ent[e]); return ret;
	},
	layer: function(l) {
		var res=[];for (var e=0; e<G.ent.length; e++) if (G.ent[e].l==l || l==0&&typeof G.ent[e].l =='undefined') res.push(G.ent[e]);
		return res;
	},
	add: function(ent) {
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
		var X = G.player.x+G.ui.camera.x
		//dp(G.player.y,ent.obstacle[1],G.player.y<=ent.obstacle[1])
		if (G.player.y<=ent.obstacle[1]-1 && ent.x<=X+G.player.w-3 && ent.x+ent.obstacle[0]>X) {
			//dp('player.x=',X,'player.x+w=',X+G.player.w,'cactus.x=', ent.x,'overlap',ent.x-(X+G.player.w),ent.obstacle[0],ent.x<=X+G.player.w)
			return true;}
	}
}