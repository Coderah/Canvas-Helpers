var bufferedCanvas = function(_buffers) {
	if (_buffers.length <= 1) { throw new Error("2 or more buffers must be provided."); }
	this.buffers = _buffers;
	
	this._init();
}

bufferedCanvas.prototype = {
	buffers: [],
	
	//internal
	_curBuffer: null,
	_renderBuffer: null,
	_flipBuffer: null,
	
	_init: function() {
		for (var i = 0; i < this.buffers.length; i++) {
			if (this.buffers[i].style.display !== "none") {
				if (this._curBuffer == null) {
					this._curBuffer = i;
				} else {
					this.buffers[i].style.display = "none";
				}
			}
		}
	},
	
	_getNextRenderBuffer: function() {
		if (this._renderBuffer == this.buffers.length - 1) {
			this._renderBuffer = 0;
		} else {
			this._renderBuffer = this._renderBuffer + 1;
		}
		return this.buffers[this._renderBuffer];
	},
	
	getContext: function(clear) {
		var buffer = this._getNextRenderBuffer();
		if (this._flipBuffer == null) {
			this._flipBuffer = this._renderBuffer;
		}
		if (this._renderBuffer == this._curBuffer) {
			this.flip();
		}
		var context = buffer.getContext("2d");
		var width = buffer.width, height = buffer.height;
		context.clearRect(0, 0, width, height);
		
		return context;
	},
	
	flip: function() {
		var buffer = this.buffers[this._flipBuffer];
		var curBuffer = this.buffers[this._curBuffer];
		
		buffer.style.display = "block";
		curBuffer.style.display = "none";
		if (this._curBuffer == this.buffers.length - 1) {
			this._curBuffer = 0;
		} else {
			this._curBuffer += 1;
		}
		
		if (this._flipBuffer == this.buffers.length - 1) {
			this._flipBuffer = 0;
		} else {
			this._flipBuffer += 1;
		}
	}
}
