//FILE: events.js
G.clickTimer = 0;
G.ui.setupEvents=function(){
	G.ui.area.addEventListener("mousedown", G.click);
	G.ui.area.addEventListener("mouseup", G.clickEnd);
	G.ui.area.addEventListener("touchstart", G.click, {passive: false});
	G.ui.area.addEventListener("touchend", G.clickEnd, {passive: false});
	window.onerror = function(msg, url, lineNo, columnNo, error)  {
		alert("Line " +lineNo + "; Message: " + msg);
	}
};
G.click = function(e) {
	var button0 = e.key==" " || e.type == "touchstart" || e.type == "mousedown";
	if (button0) {
		e.stopPropagation(); e.preventDefault();
		var eX = (e.screenX||e.touches[0].clientX)-G.ui.area.offsetLeft;
		var eY = (e.screenY||e.touches[0].clientY)-G.ui.area.offsetTop;
		if(G.state == 3) {
			// Dead -> tap to restart
			G.restart();
		} else if (G.menu.next) {
			// Goto next menu
			if(eX<G.menu.rectX) {
				// Skip intro menus
				G.menu.end();
			}  else {
				G.menu.doNext();
			}
		} else if (G.state==1 && eX/G.ui.scaleX<=11 && eY/G.ui.scaleY<=11) {
			dp("Mute", eX, eY)
			// Tap mute button
			G.music.toggle(); 
		} else if (G.state==1) {
			// During game
			if(G.player.y>G.player.minY+5 && G.player.dy>-4) {
				// Sink player mid-jump
				G.player.dy=-4;
			} else if(G.player.y=G.player.minY) {
				G.music.playJump();
				G.clickTimer = G.minJump;
			}
		}
	} else {
		if (e.key=="p") G.pause();
	}
};
G.clickEnd = function(e) {
	if (G.clickTimer>0) G.clickTimer = 0;
};
