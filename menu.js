G.menu = {
	next: null
	,font:"Courier New,Courier"
	,textSize: Math.round(G.ui.width*G.ui.scaleX/25)
	,lineHeight: Math.round(G.ui.width*G.ui.scaleX*1.2/25)
}
G.menu.intro0 = function() {
	G.ui.speaker.start();
	G.menu.popup('Welcome... or rather not.... You are an illegal alien #BadHombre of questionable race and virtue trying to get into the "Land of the Free"', G.menu.intro1);
}
G.menu.intro1 = function() {
	G.menu.popup('Sooo... until we build The Wall (#NeedSponsor) and according to our new "Merit System" you must earn enough "Freedom Points" in order to be allowed entry...', G.menu.intro2)
}
G.menu.intro2 = function() {
	G.menu.popup('Pass through our desert (#SwampDrained) to earn Freedom Points by jumping cactuseses and we will consider your application ...', G.menu.intro3)
}
G.menu.intro3 = function() {
	G.menu.popup('Fail and we will be forced to keep you in a prison camp wearing pink underwear until you die of humiliation #ToughLove ...', G.menu.intro4)
}
G.menu.intro4 = function() {
	G.menu.popup('Gain 2000 points and you will be worthy to enter the "Home of the Brave" where guns are cheap and basic necessities ain\'t. Good Luck!', G.menu.end);
}
G.menu.end = function(){
	G.ui.speaker.stop();
	G.restart();
}
G.menu.popup = function(text, next) {

	G.menu.next=next;
	
	var rectWidth = (G.ui.width*G.ui.scaleX)/1.5;
	var rectHeight = (G.ui.height*G.ui.scaleX)/1.5;
	this.rectY = (G.ui.height*G.ui.scaleY)/2-rectHeight/2;
	this.rectX = (G.ui.width*G.ui.scaleX)/2-rectWidth/2;
	var cornerRadius = 8*G.ui.scaleX;

	var ctx = G.ui.area.ctx;
	ctx.fillStyle = G.ui.palette.light;
	ctx.strokeStyle = G.ui.palette.light;
	ctx.lineJoin = "round";
	ctx.lineWidth = cornerRadius;
	ctx.strokeRect(this.rectX+(cornerRadius/2), this.rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
	ctx.fillRect(this.rectX+(cornerRadius/2), this.rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
	
	G.menu.wrapText(text,this.rectX+cornerRadius*0.7,this.rectY+cornerRadius+this.lineHeight*0.5, rectWidth-cornerRadius);
}
G.menu.doNext = function() {
	this.next();
}
G.menu.wrapText = function(text, x, y, maxWidth) {
	
	var ctx = G.ui.area.ctx;
	
	ctx.fillStyle = G.ui.palette.dark;
	ctx.font=G.menu.textSize+"px "+this.font;
	
	var words = text.split(' ');
	var line = '';

	for(var n = 0; n < words.length; n++) {
	  var testLine = line + words[n] + ' ';
	  if (ctx.measureText(testLine).width > maxWidth && n > 0) {
		ctx.fillText(line, x, y);
		line = words[n] + ' ';
		y += this.lineHeight;
	  }
	  else {
		line = testLine;
	  }
	}
	ctx.fillText(line, x, y);
}