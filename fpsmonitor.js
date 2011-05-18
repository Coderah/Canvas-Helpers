var fpsMonitor = function(_drawInterval) {
	this.drawInterval = _drawInterval;
	this.maxfps = 1 / (this.drawInterval / 1000); //calculate the maxfps based on drawInterval
}

fpsMonitor.prototype = {
	drawInterval: 15,
	frameCount: 0,
	fps: 0,
	maxfps: null,
	lastTime: new Date(),
	
	beforeRender: function() {
		var nowTime = new Date();
		var diffTime = Math.ceil((nowTime.getTime() - this.lastTime.getTime()));
		if (diffTime >= 1000) {
			this.fps = this.frameCount;
			this.frameCount = 0.0;
			this.lastTime = nowTime;
		}
	},
	
	afterRender: function() {
		this.frameCount++;
	},
	
	getfpsString: function() {
		return "FPS: " + this.fps + " / " + parseInt(this.maxfps);
	}
}