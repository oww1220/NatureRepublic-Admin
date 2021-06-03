function setContentHeight( ) {
	var _chkH = $("#container").height() ;
	if ( typeof $("#contentArea2") == 'object') {
		if ( $("#contentArea2").height() > _chkH ) {
			_chkH = $("#contentArea2").height() + 50 ;
		}
	}
	$('#leftArea').css('height', _chkH ) ;
	$('#rightArea1').css('height', _chkH ) ;
	$('#contentArea1').css('height', _chkH ) ;
}

function setMenuListHeight() {
	var _chkH = $("#container").height() - $("#header").height() ;
	var _h = eval( _chkH - $("div.edit_btn_area").height() - 80 ) + 'px' ;
	$("div.edit_list_box").css('height', _h) ;
}

$.fn.imageLoad = function(fn){
    this.load(fn);
    this.each( function() {
        if ( this.complete && this.naturalWidth !== 0 ) {
            $(this).trigger('load');
        }
    });
}

$.fn.imgPop = function() {
	var e = this,
		d = false ;
	this.setup = function() {
		$(this).on("click", e.zoom) ;
	} ;
	this.clear = function( f ) {
		$("#popImageLayer").remove() ;
	} ;
	this.zoom = function( f ) {
		if (f.preventDefault) {
			f.stopImmediatePropagation();
			f.preventDefault()
		} else {
			f.returnValue = false
		}
		bg = $(document.createElement("div")).attr("id", "popImageLayer").css({
			position: "absolute",
			left: "0px",
			top: "0px",
			"z-index": "1001",
			"background-color": "#242424",
			"overflow-x":"scroll"
		});
		bg.append($(document.createElement("div")).attr("id", "splmg").css({
			left: "50%",
			margin: "0 auto",
			"z-index": "1001",
			width: f.target.naturalWidth
		}));
		$("body").append(bg);
		bg.css({
			width: "100%",
			height: $("#container").height()
			/*height: $("body").height()*/
		});
		cl = $(this).clone().css({
			position: "absolute",
			"z-index": "1002",
			width: f.target.naturalWidth,
			height: f.target.naturalHeight,
			margin: "0 auto",
			cursor: "move"
		});
		calcPos = $(document).scrollTop();
		if (calcPos < -1) {
			calcPos = 0
		}
		cl.css("top", calcPos);
		$("#splmg").append(cl);
		cl.draggable();
		$("#popImageLayer, #splmg, #splmg img").on("click", e.clear) ;
	} ;
	this.setup() ;
}

//-----------------------------------------------------------------------
// 2013-06-14
// 자바스크립트 동적 로딩
//
//-----------------------------------------------------------------------
function loadJavascript(url, callback, charset) {
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    if (charset != null) {
        script.charset = "utf-8";
    }
    var loaded = false;
    script.onreadystatechange= function () {
        if (this.readyState == 'loaded' || this.readyState == 'complete') {
            if (loaded) {
                return;
            }
            loaded = true;
            callback();
        }
    }
    script.onload = function () {
        callback();
    }
    script.src = url;
    head.appendChild(script);
}

//-----------------------------------------------------------------------
// 2013-06-18
// CSS 동적 입력
//
//-----------------------------------------------------------------------
function loadcssByStr( cssStr ) {
	var cssStr = "div {border:1px solid red;}"
	var style = document.createElement("style");
	style.setAttribute("type", "text/css");
	if( style.styleSheet ) { // IE
		style.styleSheet.cssText = cssStr;
	} else { //W3C
		var cssText = document.createTextNode(cssStr);
		style.appendChild(cssText);
	}
	document.getElementsByTagName("head")[0].appendChild(style);
}

function loadcssByUrl( url ) {
		var CSS   = document.createElement('link');
		CSS.rel   = 'stylesheet';
		CSS.type  = 'text/css';
		//CSS.href  = '/stylesheets/' + fileName + '.css'; //Path of your Stylesheet files
		CSS.href  = url ; //Path of your Stylesheet files
		CSS.media = 'screen';
		document.getElementsByTagName('head')[0].appendChild(CSS);
}

function nav(){
	$('#top-menuarea ul li, #top-menuarea ul li ul.submenu').mouseover(function() {
		$(this).find('ul:first').slideDown();
	});

	$('#top-menuarea > ul > li, #top-menuarea > ul > li > ul.submenu').mouseleave(function() {
		$('#top-menuarea ul li ul').hide();
	});
	/*
	$('#top-menuarea ul li ul').mouseleave(function() {
		$('#top-menuarea ul li ul').slideUp();;
	}); */
};

(function($){
	$.fn.extend({
		customStyle : function(options) {
			if(!$.browser.msie || ($.browser.msie&&$.browser.version>6)){
				return this.each(function() {
					var currentSelected = $(this).find(':selected');
					$(this).after('<span class="customStyleSelectBox"><span class="customStyleSelectBoxInner">'+currentSelected.text()+'</span></span>').css({position:'absolute', opacity:0,fontSize:$(this).next().css('font-size')});
					var selectBoxSpan = $(this).next();
					var selectBoxWidth = parseInt($(this).width()) - parseInt(selectBoxSpan.css('padding-left')) -parseInt(selectBoxSpan.css('padding-right'));
					var selectBoxSpanInner = selectBoxSpan.find(':first-child');
					selectBoxSpan.css({display:'inline-block'});
					selectBoxSpanInner.css({width:selectBoxWidth, display:'inline-block'});
					var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
					$(this).height(selectBoxHeight).change(function(){
						selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');
					});
				});
			}
		}
	});
})(jQuery);

$.fn.hasData = function(key) {
    var $this = $(this);
    return $.data($this) && typeof $this.data(key) !== 'undefined';
};

function nl2brinText( str ) {
	var agt = navigator.userAgent.toLowerCase();
	if ( agt.indexOf("msie") != -1 ) {
		if ( IE(10) ) {
			return str ;
		} else {
			return str.replace(/\n/g,"<br/>") ;
		}
	} else {
		return str ;
	}
}

function IE(v) {
  var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
  return r.test(navigator.userAgent);
}

function getInternetExplorerVersion() {
	 var rv = -1; // Return value assumes failure.
	 if (navigator.appName == 'Microsoft Internet Explorer') {
		  var ua = navigator.userAgent;
		  var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		  if (re.exec(ua) != null)
			  rv = parseFloat(RegExp.$1);
		 }
	 return rv;
}

function toJSONString(json) {
	var ary = new Array();
	for(var key in json)
	{
		var val = json[key];
		if(typeof(val)=='object') val = toJSONString(val);
		else if(typeof(val)=='string') val = '"'+val+'"';
		ary.push(key+':'+val);
	}
	return '{'+ary.join()+'}';
}

function number_format(num){
    var num_str = num.toString();
    var result = "";

    for(var i=0; i<num_str.length; i++){
        var tmp = num_str.length - (i+1);

        if(((i%3)==0) && (i!=0))    result = ',' + result;
        result = num_str.charAt(tmp) + result;
    }

    return result;
}

//-----------------------------------------------------------------------
// 2013-11-05
// Jquery 존재 체크 후 ID 체크
//-----------------------------------------------------------------------
var util = {
	uploadifyInit: function( inputID, queueID, attachID, uptype, preImgID ) {
		$('#'+inputID).uploadify({
			'swf': '/_lib/uploadify/uploadify.swf',
			'uploader': '/_lib/uploadify/uploadify.php',
			'cancelImg':'/_lib/uploadify/uploadify-cancel.png',
			'formData': { "folder":"uploads" },
			buttonText : '파일업로드',
			width: 100,
			height: 25,
			queueID : queueID,
			scriptAccess: 'always',
			auto : true,
			multi: true,
			'onError' : function (a, b, c, d) {
				 if (d.status == 404)
					alert('Could not find upload script.');
				 else if (d.type === "HTTP")
					alert('error '+d.type+": "+d.status);
				 else if (d.type ==="File Size")
					alert(c.name+' '+d.type+' Limit: '+Math.round(d.sizeLimit/1024)+'KB');
				 else
					alert('error '+d.type+": "+d.text);
			},
			'onUploadComplete' : function( data ) {

			},
			'onUploadSuccess': function( file, data, response ) {
				$.post("/util/uploadify/fileupload/",{"filearray": data, "uptype":uptype, "preImgID":preImgID},function(info){
					$('#'+attachID).append(info);
				});
			}
		});
	},
	optImageView: function( url, id ) {
		console.log(url+'////////'+id) ;
		var _obj = $('#'+id) ;
		if ( typeof _obj != 'undefined' ) {
			_obj.html('<img src="'+url+'" width="200" />') ;
		}
	},
	delFile: function(f_no,f_tp,f_md) {
		$.post('/util/uploadify/filedel/', {"file_no":f_no,"file_type":f_tp}, function( r ) {
			if ( r.state == 'ok' ) {
				if ( $("#fileno_"+f_no) ) {
					$("#fileno_"+f_no).remove() ;
				}
			}
		},"json") ;
	},

}

var lypop = {
	zi: 0,
	maxIndex: function(ele) {
		var array = [];
		$(""+ele+"").each(function() {
			array.push($(this).css("z-index"));
		});
		var index_highest = Math.max.apply(Math, array);
		index_highest = index_highest == 'Nan' ? 0 : index_highest ;
		return index_highest ;
	},
	view: function(_db) {
		var _ck = getCookie(_db.id) ;
		if ( _ck == null || _ck != 'no' ) {
			if ( lypop.zi == 0 )
				lypop.zi = lypop.maxIndex() ;
			if ( lypop.zi < 1000 )
				lypop.zi = 1000 ;
			var _obj = $('#'+_db.id) ;
			if ( typeof _obj != 'undefined' ) {
				_obj.css({'width':_db.width+'px', 'height':_db.height+'px', 'top':_db.top, 'left':_db.left,'z-index':lypop.zi}).show() ;
			}
			lypop.zi = lypop.zi + 1 ;
		}
	},
	close: function(id) {
		setCookie(id,'no',24) ;
		$('#'+id).hide() ;
	},
	close2: function(id) {
		$('#'+id).hide() ;
	}
} ;

//-----------------------------------------------------------------------
// 2013-11-07
// ex) serializeObject($("#form").serializeArray());
// 이렇게 serializeArray()로 변경해서 함수에 넣어 주면 json object를 반환함.
//-----------------------------------------------------------------------

function serializeObject(a){
  var obj = {};
 $.each(a, function() {
    if (obj[this.name]) {
      if (!obj[this.name].push) {
       obj[this.name] = [obj[this.name]];
      }
      obj[this.name].push(this.value || '');
    } else {
     obj[this.name] = this.value || '';
    }
  });
  return obj;
}

//-----------------------------------------------------------------------
// serializeArray RemoveItem
//-----------------------------------------------------------------------
function arrayClean (thisArray, thisName) {
    "use strict";
	var num = thisArray.length ;
	var reload = false ;
    $.each(thisArray, function(index, item) {
		if ( typeof item != 'undefined' ) {
			if (item.name == thisName) {
				delete thisArray[index];
				reload = index + 1 == num ? false : true ;
				return false ;
			}
		}
    });
	if ( reload == true )
		arrayClean( thisArray, thisName ) ;
}

//-----------------------------------------------------------------------
// 2013-11-07
// http://jquery.webspirited.com/2011/02/jquery-serializepost/
//-----------------------------------------------------------------------
(function($) {
    $.fn.serializePost = function() {
        var data = {};
        var formData = this.serializeArray();
        for (var i = formData.length; i--;) {
            var name = formData[i].name;
            var value = formData[i].value;
            var index = name.indexOf('[]');
            if (index > -1) {
                name = name.substring(0, index);
                if (!(name in data)) {
                    data[name] = [];
                }
                data[name].push(value);
            }
            else
                data[name] = value;
        }
        return data;
    };
})(jQuery);

// 쿠키 설정
// setCookie("NextCookie",4000,48);
function setCookie(cName, cValue, cDate) {
	var today = new Date();
	today.setHours(today.getHours()+cDate);
	var cookieValue = cValue;
	document.cookie = cName+"="+escape(cookieValue)+";expires="+today.toGMTString()+"; path=/"
}

//쿠키 검색
function getCookie(cName) {
	var myCookie = document.cookie;  //쿠기 데이터 변수 저장
	var startNum = myCookie.indexOf(cName);  //해당하는 쿠기명의 인덱스번호 검색
	if(startNum<0)
		return null;
	//해당쿠기 인덱스 부터 마지막인덱스까지 문자 추출
	var myText = myCookie.substring(startNum,myCookie.length); //startNum부터 myCookie.length전 까지
	//해당 쿠키 세미콜론 인덱스번호 검색
	var lastNum = myText.indexOf(";");
	//찾는 쿠키가 마지막일경우네느 세미콜론 없으므로 문자의 개수를 불러온다.
	if(lastNum < 0) lastNum = myText.length;
	// '쿠키명=쿠키값'에서 쿠키 값만 추출
	var result = myText.substring(0,lastNum).split("=")[1];
	return result;
}
// delCookie("3000");
function delCookie(cName){
	var today = new Date();
	today.setHours(today.getHours()-2400);
	var cookieValue = "";
	document.cookie = cName+"="+escape(cookieValue)+";expires="+today.toGMTString()+"; path=/"
}

//----------------------- jquery $.post Result ------------------------------------------------//
function jqueryPostResult( r ) {
	if ( String(typeof r).toLowerCase() == 'object' ) {
		if ( r.state == 'err' ) {
			//alert(r.msg) ;
			alertify.dialog.alert(r.msg) ;
		} else if ( r.reURL == 'reload' ) {
			document.location.reload() ;
		} else if ( String(r.reULR).length > 0 ) {
			document.location.replace(r.reURL) ;
		} else {
		}
	}
}
//------------------------ Search ZipCode ------------------------------------------------------//
function search_zipcode_old(keyword,objID){
	/*var keyword = encodeURIComponent($("#zipcode_q").val());*/

	if($.trim(keyword)==""){
		alert("검색하실 동을 입력하세요");
		return;
	}
	var url_search = "/zipcode/?qry="+keyword;

	var resultTxt = "";

	$.ajax({
		type: "GET",
		url : url_search,
		timeout: 30000,
		cache: false,
		async: false,
		data: {"qry2":keyword},
		fail : function(jqXHR, textStatus){
			fn_alert("네트워크가 불안정하거나 서버정보를 알 수 없습니다.\n 다시 시도해주시기 바랍니다.");
			console.log("ZIPCODE FAIL:::::::::::::::::::"+textStatus);
		},
		error : function(jqXHR, textStatus){
			fn_alert("네트워크가 불안정하거나 서버정보를 알 수 없습니다.\n 다시 시도해주시기 바랍니다.");
			console.log("ZIPCODE ERROR:::::::::::::::::::"+textStatus);
		},
		success : function(xml, status, request){
			/*console.log("ZIPCODE SUCCESS:::::::::::::::::::");
			console.log("ZIPCODE xml:::::::::::::::::::"+xml);*/
			$(xml).find("item").each(function(){
				var address = $(this).find("address").text();
				var postcd = $(this).find("postcd").text();
				postcd = postcd.substr(0,3)+"-"+postcd.substr(3,3);
				/*console.log("address::::::::::::::::::::"+address);
				console.log("postcd::::::::::::::::::::"+postcd);*/

				resultTxt += '<li><a href="javascript:void(0);" onclick="go_zipcode_apply(this)" data-zipcode="'
					+postcd+'" data-addr1="'+address+'">'+address+'</a></li>';
			});
			resultTxt = '<ul class="zipresult">'+resultTxt+'</ul>';
			$('#'+objID).html(resultTxt) ;
			//$("#zipcode_search_result").html(resultTxt);
		}
	});

	/*ajax통신해서 결과를 #zipcode_search_result에 넣은 후, 연다.*/
	//$('#zipcode_search_result').show() ; /*slideDown();*/
	$('#'+objID).show() ;
}

var cfg1 = {
	txHost : '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) http://xxx.xxx.com */
	txPath : '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) /xxx/xxx/ */
	txService : 'sample', /* 수정필요없음. */
	txProject : 'sample', /* 수정필요없음. 프로젝트가 여러개일 경우만 수정한다. */
	initializedId : "", /* 대부분의 경우에 빈문자열 */
	wrapper : "tx_trex_container", /* 에디터를 둘러싸고 있는 레이어 이름(에디터 컨테이너) */
	form : 'tx_editor_form' + "", /* 등록하기 위한 Form 이름 */
	txIconPath : "/_lib/daumeditor/images/icon/editor/", /*에디터에 사용되는 이미지 디렉터리, 필요에 따라 수정한다. */
	txDecoPath : "/_lib/daumeditor/images/deco/contents/", /*본문에 사용되는 이미지 디렉터리, 서비스에서 사용할 때는 완성된 컨텐츠로 배포되기 위해 절대경로로 수정한다. */
	canvas : {
		styles : {
			color : "#123456", /* 기본 글자색 */
			fontFamily : "굴림", /* 기본 글자체 */
			fontSize : "10pt", /* 기본 글자크기 */
			backgroundColor : "#fff", /*기본 배경색 */
			lineHeight : "1.5", /*기본 줄간격 */
			padding : "0px" /* 위지윅 영역의 여백 */
		},
		showGuideArea : false
	},
	events : {
		preventUnload : false
	},
	sidebar : {
		attachbox : {
			show : true
		}
	},
	size : {
		contentWidth : 760 /* 지정된 본문영역의 넓이가 있을 경우에 설정 */
	}
};

var cfg2 = {
	txHost: '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) http://xxx.xxx.com */
	txPath: '', /* 런타임 시 리소스들을 로딩할 때 필요한 부분으로, 경로가 변경되면 이 부분 수정이 필요. ex) /xxx/xxx/ */
	txService: 'sample', /* 수정필요없음. */
	txProject: 'sample', /* 수정필요없음. 프로젝트가 여러개일 경우만 수정한다. */
	initializedId: "1", /* 대부분의 경우에 빈문자열 */
	wrapper: "tx_trex_container1", /* 에디터를 둘러싸고 있는 레이어 이름(에디터 컨테이너) */
	form: "tx_editor_form"+"", /* 등록하기 위한 Form 이름 */
	txIconPath: "/board/daumeditor/images/icon/editor/", /*에디터에 사용되는 이미지 디렉터리, 필요에 따라 수정한다. */
	txDecoPath: "/board/daumeditor/images/deco/contents/", /*본문에 사용되는 이미지 디렉터리, 서비스에서 사용할 때는 완성된 컨텐츠로 배포되기 위해 절대경로로 수정한다. */
	canvas: {
		styles: {
			color: "#123456", /* 기본 글자색 */
			fontFamily: "굴림", /* 기본 글자체 */
			fontSize: "10pt", /* 기본 글자크기 */
			backgroundColor: "#fff", /*기본 배경색 */
			lineHeight: "1.5", /*기본 줄간격 */
			padding: "8px" /* 위지윅 영역의 여백 */
		},
		showGuideArea: false
	},
	events: {
		preventUnload: false
	},
	sidebar: {
		attachbox: {
			show: false
		}
	},
	size: {
		/*contentWidth: 700 */ /* 지정된 본문영역의 넓이가 있을 경우에 설정 */
	}
};

function getEditorConfig(num) {
	var cfg = { initializedId: num, wrapper : 'tx_trex_container' + num }
	return $.extend({}, cfg2, cfg) ;
}

//-------------------------------------------------------------------------------------------------------------------------------
// Object 사이즈 구하기
// Get the size of an object
// var size = Object.size(myArray);
//-------------------------------------------------------------------------------------------------------------------------------
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
//-------------------------------------------------------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------------------------------------------------------
if(!jQuery.browser){
	jQuery.browser = {};
	jQuery.browser.mozilla = false;
	jQuery.browser.webkit = false;
	jQuery.browser.opera = false;
	jQuery.browser.safari = false;
	jQuery.browser.chrome = false;
	jQuery.browser.msie = false;
	jQuery.browser.android = false;
	jQuery.browser.blackberry = false;
	jQuery.browser.ios = false;
	jQuery.browser.operaMobile = false;
	jQuery.browser.windowsMobile = false;
	jQuery.browser.mobile = false;

	var nAgt = navigator.userAgent;
	jQuery.browser.ua = nAgt;

	jQuery.browser.name  = navigator.appName;
	jQuery.browser.fullVersion  = ''+parseFloat(navigator.appVersion);
	jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
		jQuery.browser.opera = true;
		jQuery.browser.name = "Opera";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+6);
		if ((verOffset=nAgt.indexOf("Version"))!=-1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
	}

// In MSIE < 11, the true version is after "MSIE" in userAgent
	else if ( (verOffset=nAgt.indexOf("MSIE"))!=-1) {
		jQuery.browser.msie = true;
		jQuery.browser.name = "Microsoft Internet Explorer";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+5);
	}

// In TRIDENT (IE11) => 11, the true version is after "rv:" in userAgent
	else if (nAgt.indexOf("Trident")!=-1 ) {
		jQuery.browser.msie = true;
		jQuery.browser.name = "Microsoft Internet Explorer";
		var start = nAgt.indexOf("rv:")+3;
		var end = start+4;
		jQuery.browser.fullVersion = nAgt.substring(start,end);
	}

// In Chrome, the true version is after "Chrome"
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		jQuery.browser.webkit = true;
		jQuery.browser.chrome = true;
		jQuery.browser.name = "Chrome";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
	}
// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		jQuery.browser.webkit = true;
		jQuery.browser.safari = true;
		jQuery.browser.name = "Safari";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
	}
// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset=nAgt.indexOf("AppleWebkit"))!=-1) {
		jQuery.browser.webkit = true;
		jQuery.browser.name = "Safari";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
	}
// In Firefox, the true version is after "Firefox"
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		jQuery.browser.mozilla = true;
		jQuery.browser.name = "Firefox";
		jQuery.browser.fullVersion = nAgt.substring(verOffset+8);
	}
// In most other browsers, "name/version" is at the end of userAgent
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ){
		jQuery.browser.name = nAgt.substring(nameOffset,verOffset);
		jQuery.browser.fullVersion = nAgt.substring(verOffset+1);
		if (jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()) {
			jQuery.browser.name = navigator.appName;
		}
	}

	/*Check all mobile environments*/
	jQuery.browser.android = (/Android/i).test(nAgt);
	jQuery.browser.blackberry = (/BlackBerry/i).test(nAgt);
	jQuery.browser.ios = (/iPhone|iPad|iPod/i).test(nAgt);
	jQuery.browser.operaMobile = (/Opera Mini/i).test(nAgt);
	jQuery.browser.windowsMobile = (/IEMobile/i).test(nAgt);
	jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile;


// trim the fullVersion string at semicolon/space if present
	if ((ix=jQuery.browser.fullVersion.indexOf(";"))!=-1)
		jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);
	if ((ix=jQuery.browser.fullVersion.indexOf(" "))!=-1)
		jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix);

	jQuery.browser.majorVersion = parseInt(''+jQuery.browser.fullVersion,10);
	if (isNaN(jQuery.browser.majorVersion)) {
		jQuery.browser.fullVersion  = ''+parseFloat(navigator.appVersion);
		jQuery.browser.majorVersion = parseInt(navigator.appVersion,10);
	}
	jQuery.browser.version = jQuery.browser.majorVersion;
}



function gourl(obj) {
	console.log( obj ) ;
}


//var _utl = {}
//--------------------------------------------------------------------
// 팝업관련
//--------------------------------------------------------------------

var _utl = {
	addSelectbox: function( nm, db, addClass, sel ) {
		var html = $(document.createElement('select')).attr({'name':nm,'id':nm}) ;
		if ( addClass != '' )
			html.addClass(addClass) ;
		html.append( $('<option/>').val('').html('선택하세요') ) ;
		$.each( db, function(b,c) {
			if ( String(sel) == String(c.ctg_idx) )
				html.append( $('<option/>').prop('selected',true).val(c.ctg_idx).html(c.ctg_nm) ) ;
			else
				html.append( $('<option/>').val(c.ctg_idx).html(c.ctg_nm) ) ;
		}) ;
		return html ;
	},
	checkPhonePre: function( obj, e ) {
		var key = e.charCode || e.keyCode || 0;
		if ( key == 8 || key == 9 || key == 46 || (key >= 37 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105) ) {
			if ( key == 9 ) return true ;
			var _str = _utl.removeDash( $(obj).val() ) ;
			var _len = _str.length ;
			if ( _len > 10 ) {
				if ( key == 8 ) {
					_utl.checkDash( obj ) ;
					return true ;
				} else {
					return false ;
				}
			} else {
				_utl.checkDash( obj ) ;
			}
		} else {
			return false ;
		}
	} ,
	checkDash: function( obj ) {
		var _str = _utl.removeDash( $(obj).val() ) ;
		var _len = _str.length ;
		if ( _len == 10 ) {
			$(obj).val( _str.substring(0,3)+'-'+_str.substring(3,7)+'-'+_str.substring(7,_len) ) ;
		} else if ( _len > 6 ) {
			$(obj).val( _str.substring(0,3)+'-'+_str.substring(3,6)+'-'+_str.substring(6,_len) ) ;
		} else if ( _len > 3 ) {
			$(obj).val( _str.substring(0,3)+'-'+_str.substring(3,_len) ) ;
		} else { }
	} ,
	removeDash: function( str ) {
		var _str = '' ;
		var regexp = /[0-9]/;
		for( var i=0; i < str.length; i++){
			if(str.charAt(i) != " " && regexp.test(str.charAt(i)) == true ){
			 _str = _str + str.charAt(i) ;
			}
		}
		return _str ;
	},
	cntID : 'metroPop' ,
	viewLayou: function() {
	},
	viewCreateForm: function(url) {
		var db = {} ;
		//var url = '/registration/create/' ;
		_utl.showFormLayout(db,url) ;
	},
	showBackgroundPage: function() {
		var maskHeight = $('body').height() ;
		mask = $('<div id="print-modal-mask" />').appendTo($('body'));
		mask.css({
    			position:           'fixed',
    			top:                0,
    			left:               0,
    			width:              '100%',
    			height:             maskHeight,
    			display:            'none',
    			'z-index':             9999,
    			background:			'rgba(0,0,0,0.7)'
    		});
		mask.css({display: 'block'}).fadeTo('400');
		mask.on('click', {}, function(e) { _utl.hideBackgroundPage() ; } ) ;

	},
	hideBackgroundPage: function() {
		$('#'+_utl.cntID).remove() ;
		//$('#print-modal').remove() ;
		$('#print-modal-mask').remove() ;
	},
	showFormLayout: function(call_db,call_url,w) {
		_utl.cntID = 'print-modal' ;
		_utl.showBackgroundPage() ;

		var db = {} ;
		if ( typeof call_db != 'undefined' )
			db = call_db ;
		print_modal = $('<div id="print-modal"><div id="print-modal-content"></div></div>');

		print_modal
			.hide()
			.appendTo( $('body') ) ; //
		$.ajax({
			url: call_url,
			data: db,
			context: document.body,
			success: function( r ) {
				$('#print-modal-content').append( r ) ;
				$('#print-modal-content').find("script").each( function(i) {
					eval( $(this).text() ) ;
				}) ;

				starting_position = $(window).height() + $(window).scrollTop();
				// top:        starting_position,
				var css = {
							'top' : starting_position,
							'min-height':     $('body').height(),
							overflowY:  'show',
							'z-index':     10000,
							display:    'block',
							position:	'absolute',
							'background': 'rgba(255,255,255,1)',
							left:		'50%',
							padding:	'0',
							'border':	'5px solid #000',
							'border-width': '0 5px 0 5px'
				} ;

				//			margin:		'0 0 0 -400px',
				//			width:		'800px',
				//console.log( isNaN(w) ) ;
				if ( isNaN( w ) == false ) { // 숫자
					css['width'] = w + 'px' ;
					css['margin'] = '0 0 0 -' + parseInt( w / 2 ) + 'px' ;
				} else {
					css['width'] = w ;
				}
				print_modal
					.css(css)
					.animate({ top: $(window).scrollTop()}, 400, 'linear', function() {
						//print_controls.fadeIn('slow').focus();
					});
			}
		}) ;

	},
	showFormLayoutNS: function(call_db,call_url,w) {
		_utl.cntID = 'print-modal' ;
		_utl.showBackgroundPage() ;

		var db = {} ;
		if ( typeof call_db != 'undefined' )
			db = call_db ;
		print_modal = $('<div id="print-modal"><div id="print-modal-content"></div></div>');

		print_modal
			.hide()
			.appendTo( $('body') ) ; //
		$.ajax({
			url: call_url,
			data: db,
			context: document.body,
			success: function( r ) {
				$('#print-modal-content').append( r ) ;
				/*
				$('#print-modal-content').find("script").each( function(i) {
					eval( $(this).text() ) ;
				}) ;*/

				starting_position = $(window).height() + $(window).scrollTop();
				// top:        starting_position,
				var css = {
							'top' : starting_position,
							'min-height':     $('body').height(),
							overflowY:  'show',
							'z-index':     10000,
							display:    'block',
							position:	'absolute',
							'background': 'rgba(255,255,255,1)',
							left:		'50%',
							padding:	'0',
							'border':	'5px solid #000',
							'border-width': '0 5px 0 5px'
				} ;

				//			margin:		'0 0 0 -400px',
				//			width:		'800px',
				//console.log( isNaN(w) ) ;
				if ( isNaN( w ) == false ) { // 숫자
					css['width'] = w + 'px' ;
					css['margin'] = '0 0 0 -' + parseInt( w / 2 ) + 'px' ;
				} else {
					css['width'] = w ;
				}
				print_modal
					.css(css)
					.animate({ top: $(window).scrollTop()}, 400, 'linear', function() {
						//print_controls.fadeIn('slow').focus();
					});
			}
		}) ;

	},
	classify1: function() { /* 담당부문 지정 */
		var db = {} ;
		var url = '/registration/classify/' ;
		_utl.metroView(db,url) ;
	},
	metroView: function(db_in,call_url) {
		_utl.cntID = 'metroPop' ;
		_utl.showBackgroundPage() ;
		var db = {} ;
		if ( typeof db_in != 'undefined' )
			db = db_in ;

		var metro = $('<div id="metroPop" />') ;
		var css = { 'top':			'150px',
					'position':		'absolute',
					'width':		'100%',
					'min-height':	'200px',
					'z-index':		'10001',
					'display':		'block',
					'background':	'rgba(255,255,255,1)'
		} ;

		//var metro = $('<div id="metroPop" />') ;
		var metro_content = $('<div class="metroPop-content" />') ;
		metro_content.css({'margin':'10px auto','width':'600px'}) ;
		metro.append( metro_content ) ;

		metro
			.hide()
			.css(css)
			.appendTo( $('body') ).hide() ;

		$('#metroPop div.metroPop-content').load(call_url, db, function(r) {
			_utl.popSizeCheck() ;
		}) ;
	},
	popSizeCheck: function() {
		var obj = $('#'+_utl.cntID) ;
		if ( obj.length > 0 ) {
			var wh = $(window).height() ;
			var oh = obj.height() ;
			if ( wh > oh ) {
				var mh = parseInt( (wh - oh) / 2 ) ;
				obj.css({top:mh}).show() ;
			} else {
				obj.css({top:$(window).scrollTop(),width:'800px','left':'50%','margin-left':'-400px'}).show() ;
			}
		} else {

		}
	},
	chkLen: false, // SMS LMS 변환 알림
	textLenChk: function(obj,id) { // SMS 텍스트 길이 체크
		var str = new String(obj.value);
		var _byte = 0;
		if(str.length != 0)
		{
			for (var i=0; i < str.length; i++)
			{
				var str2 = str.charAt(i);
				if(escape(str2).length > 4)
				{
					_byte += 2;
				}
				else
				{
					_byte++;
				}
				if ( _byte > 80 ) {
					if ( _utl.chkLen == false ) {
						_utl.notification("LMS전송으로 변환됩니다") ;
						_utl.chkLen = true ;
					}
				}
			}
		}
		$("#"+id).text(_byte) ;
	},
	alert: function(msg,tp) {

	},
	notification: function(msg,tp) {
		switch (tp) {
			case 'su' :
				alertify.success(msg);
				break ;
			case 'er' :
				alertify.error(msg);
				break ;
			case 'wa' :
				alertify.warning(msg);
				break ;
			default :
				alertify.success(msg);
				break ;
		}
	}
} ;



