	//轮播效果函数
	function swipeImg(objID, options){
		var nowPIcIndex=0,
			swipeTimer=null,
			clickTimer=null,
			objID=objID || null,    					//img父级容器ID
			options=options || null,					//参数容器
			animateTime=options.animateTime || 600,		//运动过程时间
			intervalTime=options.intervalTime || 4000,	//运动间隔时间
			showPicNum=options.showPicNum || 1,			//要显示的图片个数
			clickBar=options.clickBar || false;			//显示clickBar与否

		var initPicLength=$("#"+objID).children().length;  //初始图片个数
		var initLength='-'+(initPicLength+1); 			   //运动转折点
		var newPicList=$("#"+objID).children().clone(true); //将图片复制一份
		$("#"+objID).append(newPicList);
		var oPicW=parseInt($("#"+objID).parent().css('width'))/showPicNum; //获取图片容器宽度
		$("#"+objID).children().each(function(i, o){ 		//设置每个图片宽度
			o.style.width=oPicW+'px';
		});
		var aPicW=$("#"+objID).children().length*oPicW; 	//设置图片父级框宽度
		$("#"+objID).css('width', aPicW);

		$("#"+objID).on('mouseover',function(){            //鼠标移入时停止运动
			clearInterval(swipeTimer);
			clearInterval(clickTimer);
		});
		$("#"+objID).on('mouseout',function(){			   //鼠标移出时恢复运动
			setAnimateTimer();
		});

		setAnimateTimer();
		function setAnimateTimer(){
			swipeTimer=setInterval(function(){		//控制运动
				nowPIcIndex--;
				$("#"+objID).animate({'left': oPicW*nowPIcIndex}, animateTime, function(){
					if(nowPIcIndex == initLength) {
						nowPIcIndex=-1;
						$("#"+objID).css( 'left', oPicW*nowPIcIndex);
					}
				})
			},intervalTime)
			
			if(clickBar){		//控制clickBar
				clickTimer=setInterval(function(){
					var clickIndex=-nowPIcIndex%initPicLength;
					$(".clickBarBox li").removeClass('active');
					$(".clickBarBox li").eq(clickIndex).addClass('active');
				},intervalTime)
			}
		}
	}
	