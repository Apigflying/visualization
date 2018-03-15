			
$(function (){
	var btn=document.getElementById("btn");
	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext('2d');
	canvas.width=500;
	canvas.height=300;
	//canvas绘制图片的四步
	//第一步:创建一个图片实例
	//第二步:给这个图片设置src路径
	//第三步:在图片加载完成后,将这个图片绘制到canva中
	var img=new Image();
	img.src="img/images.jpg";
	img.onload=function (){
		ctx.drawImage(img,0,0,240,160,100,100,240,160);
		img.style.display='none';
		
	}
	btn.onclick=function (){
		filter()
	}
	function filter(){
		//这里面的信息一开始都是0，直到图片加载完之后，才有值，如果一上来就执行filter，会造成所有的值都是0
		var imageData=ctx.getImageData(100,100,240,160);
		console.log();
		var data=imageData.data;
		//imageData保存了当前图片的颜色信息
	//				保存的方式:
	//				1.将这个图片按照它的宽高进行像素级拆分
	//				2.拆分出来的值是rgba格式的即:rgba(23,24,234,1)
	//				3.将这四个值放入到imageData.data中,所以这个image.data保存的数据的长度为:img.width*img.height*4
		
		
		//了解了原理之后,可以利用这个数组,进行像素控制
		
		
		//这里i就是img图片的宽度乘以高度，所以i就代表图片中的每个像素
		//设置rgba的值：
		//其中r就是data[i];
		//g->data[i+1];
		//b->data[i+2];
		//a->data[i+3];
		
		for(var i=0;i<240*160;i++){
			data[i*4+2]=250;
		}
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(imageData,100,100,0,0,240,160)
	
	//				ctxa.clearRect(0,0,canvasa.width,canvasa.height);
	//				ctxa.putImageData(imageData,100,100,0,0,240,160)
	}	
})
			