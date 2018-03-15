class Arrow {
	constructor(props) {
		this.x = 0; //箭头位置
		this.y = 0; //箭头位置
		this.w = 40;
		this.h = 60;
		this.startX = 0;
		this.startY = 0;
		this.len = 200;
		this.rotation = 0;
		this.arrowcolor = 'green';
		this.lineWidth = 4;
		this.lineColor = 'red';
		Object.assign(this, props)
	}
	render(ctx) {
		//默认是向下指向的箭头
		//len包含箭头的高度
		let {
			x,
			y,
			w,
			h,
			startX,
			startY,
			len,
			rotation,
			arrowcolor,
			lineWidth,
			lineColor
		} = this;
		rotation = rotation * Math.PI / 180;
		ctx.save();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = lineColor;
		ctx.translate(x, y);
		ctx.rotate(rotation);
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(startX, startY + len - h);
		ctx.stroke();
		ctx.beginPath();
		ctx.fillStyle = arrowcolor
		ctx.moveTo(startX - w / 2 , startY + len - h);
		ctx.lineTo(startX + w / 2, startY+ len - h);
		ctx.lineTo(startX, startY + len);
		ctx.fill();
		ctx.restore();
	}
}