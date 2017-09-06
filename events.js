//FILE: events.js
G.clickTimer = 0;
G.ui.setupEvents=function(){
	document.body.addEventListener('mousedown', G.click)
	document.body.addEventListener('mouseup', G.clickEnd)
	document.body.addEventListener('touchstart', G.click, {passive: false})
	document.body.addEventListener('touchend', G.clickEnd, {passive: false})
};
G.click = function(e) {
	var button0 = e.key==' ' || e.type == 'touchstart' || e.type == 'mousedown';
	if (button0 && G.menu.next) {
		e.stopPropagation(); e.preventDefault();
		var eX = e.screenX||e.touches[0].clientX;
		if(eX<G.menu.rectX) G.menu.end(); else G.menu.doNext();
		return
	}
	if(G.state == 3 && button0) {e.stopPropagation(); e.preventDefault();G.restart(); return;}
	if (e.key=='p') G.pause();
	if (G.state==1 && button0) {
		e.stopPropagation(); e.preventDefault();
		// Sink player mid-jump
		if(G.player.y>G.player.minY+5 && G.player.dy>-4) {G.player.dy=-4;}
		else if(G.player.y=G.player.minY) {
			G.music.playJump();
			G.clickTimer = G.minJump;
		}
	}
};
G.clickEnd = function(e) {
	if (G.clickTimer>0) {
		G.clickTimer = 0;
	}
};
