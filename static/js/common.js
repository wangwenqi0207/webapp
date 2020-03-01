$(function(){	
	$("#mask,.tips_bar").click(function(){
		closePop(".tips_pop");
	});		
	$(".back_btn").click(function(){
		history.go(-1);
	});		
	 checkLogin();
});
var domain = window.location.host;
var baseurl = "http://"+domain+"/";
//var baseurl = "http://ywcqhl.yly99.com/";
var sId=localStorage.sId;
var sourceCode=1;
var source=3;
var macAddr="xxx";
var ip="0.0.0.0";
var pushSignAddr=111;
var nullHead="http://mov.91catv.com/img/userfiles//images//member/image//null";
var tempHead="static/images/head.png";
function showPop(obj){
	$(obj).fadeIn(0);
	$("#mask").fadeIn(0);
}

function closePop(obj){
	$(obj).fadeOut(0);
	$("#mask").fadeOut(0);
}

function tip(msg)
{	var msgHtml="<div class='msg_box'>"+msg+"</div>";
	$("body").append(msgHtml);
	//$("#mask").fadeIn(0);
	setTimeout('closeTip()', 3000)
}

function closeTip(){
	$(".msg_box").animate({top:"-500px",opacity:"0"},1000,function(){$(".msg_box").remove()});
	//$("#mask").fadeOut(0);
}

function pageReload(){
    window.location.reload();
}

function loading(msg)
{	
	msg = msg || "页面加载中...";
	var msgHtml="<div class='mask'></div><div class='loading_box'>"+msg+"</div>";
	$("body").append(msgHtml);
}


function loadingClose(){
	$(".loading_box,.mask").remove();
}


function pageLoad(){	
	   window.location.reload();
}




function getLocation()
{
	var options={
		enableHighAccuracy:true,
		maximumAge:1000
    }
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition,showError,options);
	}
	else
	{
		tip("?????????????λ??");
		loadingClose();//???????
	}
}

//???????
function distance(latA, lngA, latB, lngB) {  //longitude and latitude; ??   γ   ??
    var earthR = 6371000;
    var x = Math.cos(latA*Math.PI/180) * Math.cos(latB*Math.PI/180) * Math.cos((lngA-lngB)*Math.PI/180);
    var y = Math.sin(latA*Math.PI/180) * Math.sin(latB*Math.PI/180);
    var s = x + y;
    if (s > 1) {
        s = 1;
    }
    if (s < -1) {
        s = -1;
    }
    var alpha = Math.acos(s);
    var distance = alpha * earthR;
    return distance;
}


function showError(error)
{
	switch(error.code) 
	{
		case error.PERMISSION_DENIED:
			tip("??????????????λ???????");
			loadingClose();//???????
			break;
		case error.POSITION_UNAVAILABLE:
			tip("λ??????????????");
			loadingClose();//???????
			break;
		case error.TIMEOUT:
			tip("???????????λ?ó????");
			loadingClose();//???????
			break;
		case error.UNKNOWN_ERROR:
			tip("δ?????");
			loadingClose();//???????
			break;
	}
}

//???url?е????
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //??????????????????????????????
	var r = window.location.search.substr(1).match(reg);    //?????????
	if (r != null) return decodeURI(r[2]); return null;  //????????           
       
}


//?????
function showthumb(obj){
	var pic_arr = new Array();
	var photo_pic = $(obj).parents(".up_ul").find('img');
	var $photo_list =$(obj).parents(".up_ul");
	var nIndex=$(obj).parent("p").index();
	photo_pic.each(function(index){
		pic_arr[index] = photo_pic.eq(index).attr("src");
	});
	var html_div = '';
	for(var i=0; i<pic_arr.length ; i++){
		html_div += '<div class="swiper-slide"><img src="'+pic_arr[i]+'" ></div>';
	}
	var popHtml="<div class='swiper-container picture_preview' id='picture_preview' style='display:none;'>"
					+"<a class='preview_close' title='???' id='previewClose'>Close</a>"
					+"<div class='swiper-wrapper swiper-no-swiping'>"+html_div+"</div>"
					+"<div class='swiper-pagination swiper-pagination-pop'></div>"
					+"<div class='swiper-button-next swiper-button-white'></div>"
					+"<div class='swiper-button-prev swiper-button-white'></div>"
				+"</div>";
	$('body').append(popHtml)
	$('#picture_preview').show();
	var swiperPop = new Swiper('.picture_preview', {
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		pagination: '.swiper-pagination-pop',
		noSwiping:true,
		paginationType: 'fraction',
		paginationClickable: true,
		//preloadImages: false,
		//lazyLoading: true,
		initialSlide:nIndex,
		onSlideChangeStart: function(swiperPop){
			
		 },
		onSlideChangeEnd: function(swiperPop){
			//??????
			$('.picture_preview .swiper-slide-active img').smartZoom({'containerClass':'zoomableContainer'});   
		}
	});
	//??????
	$('.picture_preview .swiper-slide-active img').smartZoom({'containerClass':'zoomableContainer'}); 
	//??????
	$("#previewClose").click(function(){
		$('#picture_preview').remove();
	})
}
//?????end

//url???????
function getQueryString(name) {   
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");   
      var r = window.location.search.substr(1).match(reg);   
      if (r != null) return decodeURI(r[2]); return null;   
} 
//??????
function checkLogin(){
	if(sId==""||sId==null||sId==undefined){
		$(".to_login").click(function(){
			localStorage.tempUrl=window.location;
			window.location="login.html";
			return false;							  
		})		
	}
}

/*???????????*/
function commensSet(){
	$(".c_input").click(function(){	
		$("#commensBox").show().find("#commensArea").focus();			  					  
	})
	$("#commensArea").bind("keyup keydown",function(){												   
		var text=$(this).val();
		if(text==""){
				$(".commens_btn").attr("disabled","disabled")
			}
		else{
				$(".commens_btn").removeAttr("disabled")
			}
	})
}
/*??????????*/
function commensSubmit(newsId){
	
	$(".commens_btn").click(function(){	
		var commensText=$("#commensArea").val();
		$.ajax({
			type: 'post',
			url: baseurl+"newsComments/addComment?sid="+sId+"&newsId="+newsId+"&body="+commensText+"&source="+source+"&ip="+ip,
			dataType: 'json',
			success: function(res){
				if(res.responseCode==0)
				{
					
					tip("??????????????");
					$("#commensBox").hide().find("#commensArea").val('');	
					$(".commens_btn").attr("disabled","disabled");
	
				}
				if(res.responseCode==500){
					 tip(res.msg);
	
				}
			},
			error: function(xhr, type){
				tip('???????');
			} 
		 })								  
	})
	
}

(function($) {

  $.extend({

    myTime: {

      /**

       * ???????

       * @return <int>    unix????(??) 

       */

      CurTime: function(){

        return Date.parse(new Date())/1000;

      },

      /**       

       * ???? ???? Unix????

       * @param <string> 2014-01-01 20:20:20 ??????       

       * @return <int>    unix????(??)       

       */

      DateToUnix: function(string) {

        var f = string.split(' ', 2);

        var d = (f[0] ? f[0] : '').split('-', 3);

        var t = (f[1] ? f[1] : '').split(':', 3);

        return (new Date(

            parseInt(d[0], 10) || null,

            (parseInt(d[1], 10) || 1) - 1,

            parseInt(d[2], 10) || null,

            parseInt(t[0], 10) || null,

            parseInt(t[1], 10) || null,

            parseInt(t[2], 10) || null

            )).getTime() / 1000;

      },

      /**       

       * ???????????       

       * @param <int> unixTime  ??????(??)       

       * @param <bool> isFull  ???????????(Y-m-d ???? Y-m-d H:i:s)       

       * @param <int> timeZone  ???       

       */

      UnixToDate: function(unixTime, isFull, timeZone) {

        if (typeof (timeZone) == 'number')

        {

          unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;

        }

        var time = new Date(unixTime * 1000);

        var ymdhis = "";

        ymdhis += time.getUTCFullYear() + "-";

        ymdhis += (time.getUTCMonth()+1) + "-";

        ymdhis += time.getUTCDate();

        if (isFull === true)

        {

          ymdhis += " " + time.getUTCHours() + ":";

          ymdhis += time.getUTCMinutes() + ":";

          ymdhis += time.getUTCSeconds();

        }

        return ymdhis;

      }

    }

  });

})(jQuery);