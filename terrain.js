//FILE: terrain.js
G.ui.terrain={}
G.ui.terrain.generate = function (width, height, displace, roughness, seed) {
    var points = [],
        power = Math.pow(2, Math.ceil(Math.log(width) / (Math.log(2)))),
        seed = seed || {
            s: height / 2 + (Math.random() * displace * 2) - displace,
            e: height / 2 + (Math.random() * displace * 2) - displace
        }; 
    if(seed.s === 0) seed.s = height / 2 + (Math.random() * displace * 2) - displace;
    points[0] = seed.s;
    if(seed.e === 0) seed.e = height / 2 + (Math.random() * displace * 2) - displace
    points[power] = seed.e;
    displace *= roughness;
    for (var i = 1; i < power; i *= 2) {
        for (var j = (power / i) / 2; j < power; j += power / i) {
            points[j] = ((points[j - (power / i) / 2] + points[j + (power / i) / 2]) / 2);
            points[j] += (Math.random() * displace * 2) - displace
        }
        displace *= roughness;
    }
    return points;
}
G.ui.terrain.init = function() {
	this.ctx=G.ui.area.ctx;
	this.frames=5;
	this.tenth=Math.round(G.ui.area.height/10);
	var pts = [
		G.ui.terrain.generate(G.ui.area.width*this.frames, G.ui.area.height, G.ui.area.height/1.2, 0.63, {s:G.ui.area.height/2,e:G.ui.area.height/2}),
		G.ui.terrain.generate(G.ui.area.width*this.frames, G.ui.area.height, G.ui.area.height/2, 0.52, {s:G.ui.area.height/2,e:G.ui.area.height/2}),
		G.ui.terrain.generate(G.ui.area.width*this.frames, G.ui.area.height, G.ui.area.height/2, 0.30, {s:G.ui.area.height/2,e:G.ui.area.height/2})
	]
	var M = Math.max.apply(null, pts[0]);dp(M, pts[0])
	G.ui.terrain.grad=[];
	G.ui.terrain.grad[0]=this.ctx.createLinearGradient(0,M,0,G.ui.area.height);
	this.grad[0].addColorStop(0,'#DD8');this.grad[0].addColorStop(1,"white");
	this.grad[1]=this.ctx.createLinearGradient(0,G.ui.area.height*0.5,0,G.ui.area.height);
	this.grad[1].addColorStop(0,'#888');this.grad[1].addColorStop(1,'#AB5');
	this.grad[2]=this.ctx.createLinearGradient(0,G.ui.area.height*0.75,0,G.ui.area.height);
	this.grad[2].addColorStop(0,'#EEA');this.grad[2].addColorStop(1,'#885');
	this.mnt=[
		 {speed:1,frame:0,offset:1,col:this.grad[0],pts:pts[0]}
		,{speed:2,frame:0,offset:2,col:this.grad[1],pts:pts[1]}
		,{speed:4,frame:0,offset:3,col:this.grad[2],pts:pts[2]}
	];
	this.frameLast=this.mnt[0].pts.length;
	dp(this.mnt[0])
}
G.ui.terrain.draw = function() {
	this.drawMountain(this.mnt[0]);
	this.drawMountain(this.mnt[1]);
	this.drawMountain(this.mnt[2]);
}
G.ui.terrain.drawMountain = function(mnt) {
	this.ctx.fillStyle=mnt.col;
	this.ctx.beginPath();
	this.ctx.moveTo(0, mnt[mnt.frame]);
	for(var i=mnt.frame; i<=mnt.frame+G.ui.area.width; i++) this.ctx.lineTo(i-mnt.frame, this.tenth*mnt.offset+mnt.pts[i%this.frameLast]);
	this.ctx.lineTo(G.ui.area.width, G.ui.area.height);
	this.ctx.lineTo(0, G.ui.area.height);
	this.ctx.closePath();
	this.ctx.fill();
	mnt.frame=mnt.frame+mnt.speed<=this.frameLast?mnt.frame+mnt.speed:0;
}