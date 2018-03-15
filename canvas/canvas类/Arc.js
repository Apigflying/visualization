class Arc { //弧类
	constructor(props) {
		this.x = 0; //平移 x 的位置
		this.y = 0; //平移 y 的位置
		this.dx = 0;
		this.dy = 0;
		this.r = 40; //圆的半径R
		this.lineWidth = 4;
		this.rotation = 0;
		this.fillStyle = ''; //圆的填充色
		this.strokeStyle = 'red'; //圆的描边色
		this.startDeg = 0;
		this.endDeg = 360;
		Object.assign(this, props);
		return this;
	}
	render(ctx) {
		let {
			x,
			y,
			dx,
			dy,
			r,
			lineWidth,
			rotation,
			fillStyle,
			strokeStyle,
			startDeg,
			endDeg
		} = this;
		startDeg = startDeg * Math.PI / 180;
		endDeg = endDeg * Math.PI / 180;
		ctx.save();
		ctx.translate(x, y);
		ctx.fillStyle = fillStyle;
		ctx.strokeStyle = strokeStyle;
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.arc(dx, dy, r, startDeg, endDeg);
		ctx.stroke();
		if(fillStyle) ctx.fill();
		ctx.restore();
	}
}

function postodeg(x1, y1, x2, y2) {
	//根据位置返回当前的角度
	var changes;
	changes = Math.abs(Math.atan((x1 - x2) / (y2 - y1)) * 180 / Math.PI);
	return changes;
}
