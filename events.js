//FILE: events.js
G.clickTimer = 0;
G.ui.setupEvents=function(){
	document.body.addEventListener("mousedown", G.click);
	document.body.addEventListener("mouseup", G.clickEnd);
	document.body.addEventListener("touchstart", G.click, {passive: false});
	document.body.addEventListener("touchend", G.clickEnd, {passive: false});
};
G.click = function(e) {
	var button0 = e.key==" " || e.type == "touchstart" || e.type == "mousedown";
	if (button0) {e.stopPropagation(); e.preventDefault();}
	var eX = e.screenX||e.touches[0].clientX;
	eX-=G.ui.area.offsetLeft;
	var eY = e.screenY||e.touches[0].clientY;
	eY-=G.ui.area.offsetTop;
	if (button0 && G.menu.next) {
		if(eX<G.menu.rectX) G.menu.end(); else G.menu.doNext();
		return
	}
	if(G.state == 3 && button0) {G.restart(); return;}
	if (G.state==1 && eX/G.ui.scaleX<=11 && eY/G.ui.scaleY<=11) {G.music.toggle(); return;}
	if (e.key=="p") G.pause();
	if (G.state==1 && button0) {
		// Sink player mid-jump
		if(G.player.y>G.player.minY+5 && G.player.dy>-4) {G.player.dy=-4;}
		else if(G.player.y=G.player.minY) {
			G.music.playJump();
			G.clickTimer = G.minJump;
		}
	}
};
G.clickEnd = function(e) {
	if (G.clickTimer>0) G.clickTimer = 0;
};
