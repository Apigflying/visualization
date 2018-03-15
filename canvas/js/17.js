var ww=1024;
var wh=768;//设置屏幕的宽高
var rr=5;
var mt=60;
var ml=30;
$(function (){
	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext('2d');
	canvas.width=ww;
	canvas.height=wh;
	setInterval(function (){
		ctx.clearRect(0,0,ww,wh);
		render(ctx);
	},1000)	
})
function getTimes(){
	var now=new Date();
	var h=now.getHours();
	var m=now.getMinutes();
	var s=now.getSeconds();
	
	return {
		h:h,
		m:m,
		s:s
	}
	
}
function render(ctx){
	//t用来保存当前时间的时分秒
	var t=getTimes()
	
	
	renderDigit(ml,mt,parseInt(t.h/10),ctx);
	//rr+1是每一个球所在格子的宽度的一半，所以这里要用每个格子的宽度乘以7即：2*(rr+1)*7，就是一个字的宽度
	//为了有一定的间距，所以，添加一个间距，让这里等于15
	renderDigit(ml+15*(rr+1),mt,parseInt(t.h%10),ctx);
	renderDigit(20+ml+2*15*(rr+1),mt,10,ctx);
	renderDigit(ml+3*15*(rr+1),mt,parseInt(t.m/10),ctx);
	renderDigit(ml+4*15*(rr+1),mt,parseInt(t.m%10),ctx);
	renderDigit(20+ml+5*15*(rr+1),mt,10,ctx);
	renderDigit(ml+6*15*(rr+1),mt,parseInt(t.s/10),ctx);
	renderDigit(ml+7*15*(rr+1),mt,parseInt(t.s%10),ctx);
}
function renderDigit(x,y,num,ctx){
	ctx.fillStyle='rgb(0,102,153)';
	//将要遍历的数字传入进来，digit数组与每一项对应，即digit[0]对应的就是数字0的的数组
	for (var i = 0; i < digit[num].length; i++) {
		//digit[num]的每一项就是一行组成的数组，一共是10个数组，即10行
		for(var j=0;j<digit[num][i].length;j++){
			//这里面是每一行对应的每一个
			if(digit[num][i][j]==1){
				//如果是1，那么就画圆，如果不是1，就过滤掉
				ctx.beginPath();
				ctx.arc(x+(j+1+rr)*2*(rr+1),y+(i+1+rr)*2*(rr+1),rr,0,2*Math.PI);
				ctx.fill();
			}
		}
		
	}
}
