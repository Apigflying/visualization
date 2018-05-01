# canvas

标签（空格分隔）： canvas

---
##1. canvas基本绘图语法
```javascript
    第一步，获取canvas标签
    var canvas=document.getElementById("canvas");
    第二步，获取canvas的上下文
	var ctx=canvas.getContext('2d');
	第三步，设置canvas的宽高
	canvas.width=$(window).width();
	canvas.height=$(window).height();
	
	
	ctx.beginPath();//设置起始位置
	ctx.strokeStyle="red";//描边样式
	ctx.lineWidth=10;//设置线宽
	ctx.moveTo(100,100)//绘制的起点
	ctx.lineTo(200,200);
	ctx.lineTo(200,100);
	ctx.closePath();//闭合路径
	ctx.stroke()//绘制描边
	
	beginPath()用来重新设置当前路径，如果不手动设置，后面设置的样式会覆盖前面的
	如果这里不加beginPath，那么后面的fillStyle会覆盖前面的fillStyle，造成上面设置的颜色显示不出来
	ctx.beginPath();
	ctx.fillStyle='blue';//设置填充样式
	ctx.arc(300,300,100,0,2*Math.PI,false);
	//最后一个参数控制了绘制圆的方式，如果是true就顺时针画弧，如果是false就逆时针
	
	arc是绘制圆弧，如果它结束的位置是2*Math.PI,那么绘制的就是圆
	
	
	ctx.fill();//样式填充
	
	
	ctx.beginPath();
	var color=ctx.createLinearGradient(500,200,500,500);
	//添加线性渐变色createLinearGradient()
	//接收四个参数，x1,y1,x2,y2
	//x1,y1为颜色渐变的开始的点
	//x2,y2位颜色渐变的结束点,这个结束和起点的坐标是跟下面矩形的位置对应的
	//ctx.createLinearGradient的返回值是一个渐变的变量
	
	color.addColorStop(0,'red');
	//可以给这个渐变的变量添加渐变的颜色和位置
	//color.addColorStop()的第一个参数控制了渐变的百分比，数值从0~1。第二个参数是颜色值
	color.addColorStop(0.5,'yellow');
	
	color.addColorStop(1,'green');
	/*设置fillStyle为其渐变色，如果不设置，那么渐变出不来*/
	ctx.fillStyle=color;
	ctx.rect(500,200,200,400);
	ctx.fill();
	
/*	radial:径向的   */
	var color0=ctx.createRadialGradient(x0,y0,Rstart,x1,y1,Rend);
	绘制径向渐变
	x0，y0--径向渐变起点的坐标
	x1,y1--径向渐变结束点的坐标
	通常设置x0=x1,y0=y1
	Rstart--渐变起始的半径
	Rend--渐变结束的半径
	
	ctx.beginPath();
	ctx.lineWidth=5;
	//直接绘制矩形，描边矩形
	ctx.strokeRect(20,200,100,300);
	color=ctx.createLinearGradient(40,240,40,460);
	color.addColorStop(0,'green');
	color.addColorStop(1,'yellow');
	ctx.fillStyle=color;
	/*直接绘制填充颜色的矩形*/
	ctx.fillRect(40,240,60,220);

```
##2.利用面相对象绘制canvas的套路
```javascript
    $(function (){
		var canvas=document.getElementById("canvas");
		var ctx=canvas.getContext('2d');
		canvas.width=$(window).width()-6;
		canvas.height=$(window).height()-6;
		canvas.style.border='1px solid red';
		
		//之所以利用面相对象的方式写，是因为，每个canvas内的物体，都可以看做是一个对象，通过这种方式，可以很好的控制这个物体
		class Something{
			constructor(){
				//设置初始坐标
				this.x=Math.random()*canvas.width;
				this.y=Math.random()*canvas.height;
				//自定义增量
				this.z=rP([1,3]);
				this.r=10;
				this.drawing();
			}
			drawing(){
				//在这里绘图
				this.color=ctx.createRadialGradient(this.x,this.y,0,this.x,this.y,this.r);
				this.color.addColorStop(0,'rgba(0,0,0,1)');
				this.color.addColorStop(1,'rgba(0,0,0,0.1)')
				//先设置起始的路径
				ctx.beginPath();
				ctx.fillStyle=this.color;
				//1.画圆
				ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
				//2.画矩形
//							ctx.rect(this.x,this.y,this.w.this.h)
				
				//绘制描边
				//ctx.stroke();
				//绘制填充色
				ctx.fill();
			}
		}
		//先创建一个对象，将所有东西都挂载到这个对象下面
		var store={};
		
		for(var i=0;i<10;i++){
		 	//为方便遍历，新建一个数组，数组内存了这些对象
			store[i]=new Something();
		}
		
		function draw(){
			//在这里绘制图形，控制增量，在原有的基础上进行绘制，render执行这个函数一次，就重绘一次
			//由于stroke内保存的是new出来这个实例的指针，所以当修改了这个指针的值的时候，原值会被修改，调用上面的drowing就会重新绘制
			for(var attr in store){
				store[attr].x++;
				store[attr].y+=store[attr].z;
				//注：如果运动的物体不止一个，那么一定要将绘制放在for循环内
				store[attr].drawing();
			}
		}
		
		var render=function(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			draw();
			//一开始想要控制这个动画，后来才之后，这个动画不是被控制的，而是控制增量
			requestAnimationFrame(render);
		}
		render();
		//随机函数
		function rP(arr){
		  var max = Math.max.apply(this, arr);
		  var min = Math.min.apply(this, arr);
		  return Math.round(Math.random() * (max - min) + min);
		}
	})
```
##3.用canvas绘制图片
```javascript
    //canvas绘制图片的四步
	//第一步:创建一个图片实例
	//第二步:给这个图片设置src路径
	//第三步:在图片加载完成后,将这个图片绘制到canva中
	具体绘制步骤:
	var img=new Image();
	img.src="...jpg";
	
	img.onload=function(){
	    ctx.drawImage(img,imgX,imgY,imgW,imgH,cvsX,cvsY,cvsW,cvsH);
	    img.style.display='none';
	}
	imgX,imgY代表图片中的位置
	imgW,imgH代表要显示的图片部分的宽度和高度
	cvsX,cvsY表示在canvas中，图片的起始坐标
	cvsW,cvsH表示在canvas中，图片的宽度和高度
	
```
```javascript
    在图片加载完成后，可以通过getImageData来获取到图片的像素信息组成的数组
    var imgData=ctx.getImageData(cx,cy,cw,ch)
    /*利用这个imgData可以在canvas中，获取起始点为cx，cy，大小为cw，cy区域内的图形信息*/
    得到的信息有这段区域的宽高，以及每个像素点的rgba值组成的数组
    
    var rgbData=imgData.data;
    rgbData->[205, 160, 96, 255, 194, 153, 97, 255, 110, 77, 35, 255, 50, 25, 0, 255, 15, 0, 0, 255, 18, 6, 7, 255, 11, 1, 8, 255, 10, 0, 5, 255, 20, 6, 3, 255, 19, 0, 0, 255, 48, 21, 0, 255, 118, 83, 42, 255, 130, 88, 37, 255, 146, 98, 41, 255, 161, 110, 48, 255, 156, 105, 42, 255, 154, 106, 43, 255, 153, 107, 55, 255, 114, 70, 41, 255, 50, 11, 0, 255, 26, 0, 0, 255, 39, 13, 5, 255, 111, 90, 70, 255, 122, 103, 71, 255, 97, 78, 36, 255…]
    其中四个数字为一组，每组中四个值分别是：
    r,g,b,a
    所以获取到的像素的信息可以用for循环设置
    这里面len就是图片面积，img.w*img.h
    for(var i=0,len=rgbData.length/4;i<len;i++){
        
    }
    
    
```



