//FILE: events.js
G.clickTimer = 0;
G.ui.setupEvents=function(){
	document.body.addEventListener("mousedown", G.click);
	document.body.addEventListener("mouseup", G.clickEnd);
	document.body.addEventListener("touchstart", G.click, {passive: false});
	document.body.addEventListener("touchend", G.clickEnd, {passive: false});
	window.onerror = function(msg, url, lineNo, columnNo, error)  {
		alert("Line " +lineNo + "; Message: " + msg + "\n" + error);
	}
};
G.click = function(e) {
	var button0 = e.key==" " || e.type == "touchstart" || e.type == "mousedown";
	if (button0) {
		e.stopPropagation(); e.preventDefault();
		var eX = (e.clientX||(e.touches?e.touches[0].clientX:-999))-G.ui.area.offsetLeft;
		var eY = (e.clientY||(e.touches?e.touches[0].clientY:-999))-G.ui.area.offsetTop;
		if(G.state == 2) {
			// Cool-off period
		} else if(G.state == 3) {
			// Dead -> tap to restart
			G.menu.end();
		} else if (G.menu.next) {
			// Goto next menu
			if (G.paused) {
				G.start();
			} else if(eX<G.menu.rectX || eX>G.menu.rectX+G.menu.rectWidth || eY<G.menu.rectY || eY>(G.menu.rectY+G.menu.rectHeight*0.75	)) {
				// Skip intro menus
				G.menu.end();
			}  else {
				G.menu.doNext();
			}
		} else if (G.state==1) { // During game
			if (eX>0 && eX/G.ui.scaleX<10 && eY/G.ui.scaleY<10) {
				// Tap mute button
				G.music.toggle(); 
			} else if (eX/G.ui.scaleX>20 && eX/G.ui.scaleX<30 && eY/G.ui.scaleY<10) {
				G.pause();
				G.menu.info();
			} else if(G.player.y>G.player.minY+5 && G.player.dy>-4) {
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
