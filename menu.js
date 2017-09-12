G.menu = {
	next: null
	,font:"Courier New,Courier"
	,textSize: Math.round((G.ui.width+G.ui.height)*G.ui.scaleX/50)
	,lineHeight: Math.round((G.ui.width+G.ui.height)*G.ui.scaleX/40)
}
G.menu.intro0 = function() {
	G.ui.speaker.start();
	G.menu.popup({title:"Get LOST Hombre!", text:"Welcome... or rather not.... You are an illegal alien #BadHombre of questionable race and virtue trying to get into the Land of the Free ...", next:G.menu.intro1});
}
G.menu.intro1 = function() {
	G.menu.popup({title:"Get LOST Hombre!", text:"Sooo... until we build The Wall (#NeedSponsor) and according to our new Incredible Merit System you must earn enough 1000 Freedom Points to be allowed in...", next:G.menu.intro2})
}
G.menu.intro2 = function() {
	G.menu.popup({title:"Get LOST Hombre!", text:"Pass through our desert #SwampDrained to earn Freedom Points by jumping cactuseses and we will consider your application ...", next:G.menu.intro3})
}
G.menu.intro3 = function() {
	G.menu.popup({title:"Get LOST Hombre!", text:"Fail and we will be forced to keep you in a prison camp wearing pink underwear until you die of humiliation #ToughLove ...", next:G.menu.end, button:"Let's go!"})
}
G.menu.info = function() {
	G.menu.popup({title:"Get LOST Hombre!", text:"Developed by: Marc Cawood ##  ## Inspired by: T-Rex Runner Chrome ##  ## Thanks to: TinyMusic, Loktar", next:function(){
		G.menu.end();
		G.start();
	}, button:"Let's go!"});
}
G.menu.gameover0 = function() {
	G.ui.speaker.start();
	G.menu.popup({title:"Get LOST Hombre!", text:"You failed. Get Lost! ##  Get 'em outta here!! ##   #GameOver    ## Sad! ## ramble ramble ##    I love Hexicans ##     covefe...", next:G.menu.end, button:"Try again!"});
}
G.menu.end = function() {
	G.menu.next=null;
	G.ui.speaker.stop();
	G.restart();
}
G.menu.popup = function(o) {
	var ctx = G.ui.area.ctx;
	G.menu.next=o.next;
	
	this.rectWidth = (G.ui.width*G.ui.scaleX)/1.3;
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
	// Main text
	G.menu.wrapText(o.text, this.rectX+cornerRadius*0.7,this.rectY+cornerRadius+this.lineHeight*0.5+offY, this.rectWidth-cornerRadius);
	
	if (o.button) {
		// Play button
		ctx.fillStyle = '#FB6';
		ctx.lineWidth = cornerRadius;
		ctx.strokeStyle = G.ui.palette.dark;
		ctx.strokeRect(G.ui.width*G.ui.scaleX/2-4*this.textSize, this.rectY+this.rectHeight-4*this.textSize, 8*this.textSize, 2*this.textSize);
		ctx.fillRect(G.ui.width*G.ui.scaleX/2-4*this.textSize, this.rectY+this.rectHeight-4*this.textSize, 8*this.textSize, 2*this.textSize);
		ctx.fillStyle = G.ui.palette.dark;
		ctx.font=G.menu.textSize+"px "+this.font;
		let cX=o.button.length*this.textSize;
		ctx.lineWidth = "1";
		ctx.strokeText(o.button, G.ui.width*G.ui.scaleX/2-2.5*this.textSize, this.rectY+this.rectHeight-2.8*this.textSize, 10*this.textSize, 2*this.textSize);
	}	
};
G.menu.doNext = function() {
	this.next();
};
G.menu.wrapText = function(text, x, y, maxWidth) {
	var ctx = G.ui.area.ctx;
	ctx.strokeStyle = G.ui.palette.dark;
	ctx.lineWidth = "1";
	ctx.font=G.menu.textSize+"px "+this.font;
	var words = text.split(/\s/)
		 ,line = "";
	for(var n = 0; n < words.length; n++) {
	  var testLine = line + words[n] + " ";
	  if (words[n]=="##" || ctx.measureText(testLine).width > maxWidth && n > 0) {
			ctx.strokeText(line, x, y);
			line = words[n]!="##"?words[n] + " ":"";
			y += this.lineHeight;
	  }
	  else {
			line = testLine;
	  }
	}
	ctx.strokeText(line, x, y);
};