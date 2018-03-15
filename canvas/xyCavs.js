		

		//帧动画
		function FrameAnimation(option){
			this.init(option)
		}
		FrameAnimation.prototype={
			init:function(option){
				//初始化，添加属性
				this.x=option.x===0?0:(option.x||10);
				this.y=option.y===0?0:(option.y||10);
				this.w=option.w||82.5;//在canvas画布上的宽度
				this.h=option.h||62.5;//在canvas画布上的高度
				this.Sw=option.Sw||82.5;//在原图片中，图片要显示的部分的宽度
				this.Sh=option.Sh||62.5;//在原图片中，图片要显示的部分的高度
				this.imgSrc=option.imgSrc||'';//图片地址
				this.fps=option.fps||10//frame per second帧
				this.m=0;//控制显示第几行
			},
			render:function (ctx){
				var img=new Image();//创建图片对象
				img.src=this.imgSrc;
				var that=this;
				img.onload=function (){
					that.width=that.w;
					that.height=that.h;
					var n=0;
					setInterval(()=>{
						ctx.clearRect(that.x,that.y,that.w,that.h);
						ctx.drawImage(
							this
							,that.Sw*n
							,that.Sh*that.m
							,that.Sw
							,that.Sh
							,that.x
							,that.y
							,that.w
							,that.h
						)
						n++;
						n%=4;
					},that.fps);
				}
			},
			changeDir:function(dir){
				switch(dir){
					case 37:
					this.m=1;
					break;
					case 38:
					this.m=3;
					break;
					case 39:
					this.m=2;
					break;
					case 40:
					this.m=0;
					break;
				}
			}
		}
		
		//封装绘制矩形
		//哪些属性被封装
		function RectStrokes(option){
			this.init(option);
		}
		RectStrokes.prototype={
			init:function(option){
				this.x=option.x===0?0:(option.x||10);
				//如果||后面是0，是没有问题，但如果后面的数不是0，会有问题
				//0被||转换成false，如果传入0，返回的将是10；
				this.y=option.y||0;
				this.w=option.w||0;
				this.h=option.h||0;
				this.rotation=option.rotation||0;//传入角度
				this.opacity=option.opacity===0?0:(option.opacity||1);
				this.scaleX=option.scaleX||1;
				this.scaleY=option.scaleY||1;
				this.strokeStyle=option.strokeStyle||'red';
				this.fillStyle=option.fillStyle||'blue';
			},
			render:function (ctx){
				ctx.save();//保存之前的状态
				//默认从画布的0,0点开始计算旋转，所以讲画布的位置移动到当前位置，并且设置矩形的绘制起始点为0,0，就能够依据左上角进行旋转
				ctx.beginPath();
				ctx.translate(this.x,this.y);
				
				ctx.rotate(this.rotation*Math.PI/180)
				ctx.scale(this.scaleX,this.scaleY);
				ctx.globalAlpha=this.opacity;
				
				ctx.rect(0,0,this.w,this.h);
				ctx.fillStyle=this.fillStyle;
				ctx.fill();
				
				
				
				ctx.strokeStyle=this.strokeStyle;
				ctx.stroke();
				ctx.restore();//将之前的状态还原，如果旋转了画布，或者移动了画布，在旋转或者移动，或者放大之前，将之前的状态保存下来，再在这里还原回去，还原过后，可以接着之前的状态继续添加东西
			}
		}
