class Particle {
	constructor(props){
		this.x=0;
		this.y=0;
		this.r=40;
		this.fillStyle="rgb(42,158,215)";
		this.strokeStyle="";
		
		this.vx=0;
		this.vy=0;//纵向速度
		this.ax=0;//横向加速度
		this.ay=0;//纵向加速度
		
		this.m=1;
		Object.assign(this,props);
		
		return this;
	}
	render(ctx){
		const {x,y,r,fillStyle,storkeStyle }=this;
		ctx.save();//保存之前的绘图环境
		ctx.fillStyle=fillStyle;
		ctx.strokeStyle=storkeStyle ;
		ctx.beginPath();
		
		ctx.arc(x,y,r,0,2*Math.PI);
		ctx.fill();
//		strokeStyle&&ctx.stroke();
		ctx.restore();//恢复到之前的绘图环境
	}
}
