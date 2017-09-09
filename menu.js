G.menu = {
	next: null
	,font:"Courier New,Courier"
	,textSize: Math.round(G.ui.width*G.ui.scaleX/25)
	,lineHeight: Math.round(G.ui.width*G.ui.scaleX*1.2/25)
}
G.menu.intro0 = function() {
	G.ui.speaker.start();
	G.menu.popup({title:"#Get LOST Hombre!", text:"Welcome... or rather not.... You are an illegal alien #BadHombre of questionable race and virtue trying to get into the Land of the Free ...", next:G.menu.intro1});
}
G.menu.intro1 = function() {
	G.menu.popup({text:"Sooo... until we build The Wall (#NeedSponsor) and according to our new Incredible Merit System you must earn enough Freedom Points to be allowed in...", next:G.menu.intro2})
}
G.menu.intro2 = function() {
	G.menu.popup({text:"Pass through our desert (#SwampDrained) to earn Freedom Points by jumping cactuseses and we will consider your application ...", next:G.menu.intro3})
}
G.menu.intro3 = function() {
	G.menu.popup({text:"Fail and we will be forced to keep you in a prison camp wearing pink underwear until you die of humiliation #ToughLove ...", next:G.menu.intro4})
}
G.menu.intro4 = function() {
	G.menu.popup({text:"Gain 1000 points and you will be worthy to enter the Home of the Brave where guns are cheap and basic necessities ain't. Good Luck!", next:G.menu.end});
}
G.menu.gameover0 = function() {
	G.ui.speaker.start();
	G.menu.popup({text:"You failed. Get Lost!", next:G.menu.end, title:"Game Over", button:"Try again"});
}
G.menu.end = function(){
	G.ui.speaker.stop();
	G.restart();
}
G.menu.popup = function(o) {
	var ctx = G.ui.area.ctx;
	o.button=o.button||"Play!";
	G.menu.next=o.next;
	
	this.rectWidth = (G.ui.width*G.ui.scaleX)/1.5;
	this.rectHeight = (G.ui.height*G.ui.scaleX)/1.5;
	this.rectX = (G.ui.width*G.ui.scaleX)/2-this.rectWidth/2;
	this.rectY = (G.ui.height*G.ui.scaleY)/2-this.rectHeight/2;
	var cornerRadius = 8*G.ui.scaleX;

	ctx.fillStyle = G.ui.palette.light;
	ctx.strokeStyle = G.ui.palette.dark;
	ctx.lineJoin = "round";
	ctx.lineWidth = cornerRadius;
	ctx.strokeRect(this.rectX+(cornerRadius/2), this.rectY+(cornerRadius/2), this.rectWidth-cornerRadius, this.rectHeight-cornerRadius);
	ctx.fillRect(this.rectX+(cornerRadius/2), this.rectY+(cornerRadius/2), this.rectWidth-cornerRadius, this.rectHeight-cornerRadius);
	
	let offY=0;
	if (o.title) {
		ctx.fillStyle = G.ui.palette.dark;
		ctx.font="bold "+Math.round(1.5*G.menu.textSize)+"px "+this.font;
		ctx.fillText(o.title, this.rectX+cornerRadius*0.7,this.rectY+cornerRadius+this.lineHeight);
		offY=2*this.lineHeight;
		this.rectHeight+=offY;
	}
	
	G.menu.wrapText(o.text, this.rectX+cornerRadius*0.7,this.rectY+cornerRadius+this.lineHeight*0.5+offY, this.rectWidth-cornerRadius);
	
	
};
G.menu.doNext = function() {
	this.next();
};
G.menu.wrapText = function(text, x, y, maxWidth) {
	var ctx = G.ui.area.ctx;
	ctx.fillStyle = G.ui.palette.dark;
	ctx.font=G.menu.textSize+"px "+this.font;
	var words = text.split(" ")
		 ,line = "";
	for(var n = 0; n < words.length; n++) {
	  var testLine = line + words[n] + " ";
	  if (ctx.measureText(testLine).width > maxWidth && n > 0) {
			ctx.fillText(line, x, y);
			line = words[n] + " ";
			y += this.lineHeight;
	  }
	  else {
			line = testLine;
	  }
	}
	ctx.fillText(line, x, y);
};