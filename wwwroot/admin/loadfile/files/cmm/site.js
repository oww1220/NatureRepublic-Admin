
var ewsAdmin = ewsAdmin || {};

;(function($, window, undefined)
{
	"use strict";
	
	$(document).ready(function() {
		var v = getCookie('vsam') ;

		if ( v == 'N' ) {
			hide_sidebar_menu(null) ;
		}
		$("#sms-area").hide() ;
		ewsAdmin.sms = {
			view: function() {
				var obj = $("#sms-area") ;
				//console.log( obj.length ) ;
				if ( obj.length < 1 ) {
					return ;
				}
				//console.log( obj.css('display') ) ;
				if ( obj.css('display') == 'none' ) {
					obj.show() ;
				} else {
					obj.hide() ;
				}
			}
		} ;
	});
	
})(jQuery, window);


var ews = ews || {};

;(function($, window, undefined)
{
	//"use strict";
	
	$(document).ready(function() {

		document.querySelectorAll( 'oembed[url]' ).forEach( element => {
			iframely.load( element, element.attributes.url.value );
		} );

		ews.usrt = '' ; //  사용자 그룹
		ews.sideinfo = {
			init: function() {

			},
			show: function(url,db) {
				var obj = $('#side-info-in') ;
				obj.empty() ;
				if ( obj.length > 0 ){
					obj.load(url, db, function() {
						$('#side-info').show('slow') ;
						$('.btn-info-close').off('click').on('click', ews.sideinfo.hide) ;
						$(window).scrollTop(1) ;
					}) ;
				}
			},
			hide: function() {
				$('#side-info').hide() ;
			},
			search: function() {
				console.log('search') ;
			}
		} ; 

		ews.sideinfo2 = {
			show: function(url, db) {
				var obj = $('#bottom-info-in') ;
				obj.empty() ;
				if ( obj.length > 0 ){
					obj.load(url, db, function() {
						$('body').addClass('modal-open') ;
						$('#bottom-info').show('slide', { direction: 'down'}, 500) ;
						$('.btn-info-close').off('click').on('click', ews.sideinfo2.hide) ;
						$('#bottom-info').off('click').on('click', ews.sideinfo2.hide) ;
						$('#bottom-info').find('.container').css({'z-index':'102'}).on('click', function(e) {
							e.stopPropagation() ;
						}) ;
					}) ;
				}
			},
			hide: function() {
				$('#bottom-info').hide('slide', {direction:'down'}, 500) ;
				$('body').removeClass('modal-open') ;
			},
		} ;

		ews.sideinfo3 = {
			chart: null,
			col: '',
			columns : [],
			nms: [],
			show: function(columns,nms,db) {
				if ( ews.sideinfo3.chart != null ) { 
					ews.sideinfo3.chart.dispose() ;
					delete ews.sideinfo3.chart ;
				}
				ews.sideinfo3.columns = columns ;
				ews.sideinfo3.nms = nms ;

				var obj = $('#bottom-info2-in') ;
				obj.empty() ;
				$('#bottom-info2').show('slide', { direction: 'down'}, 500) ;
				$('.btn-info2-close').off('click').on('click', ews.sideinfo3.hide) ;
				am4core.ready(function() {
					am4core.useTheme(am4themes_animated) ;
					ews.sideinfo3.chart = am4core.create('bottom-info2-in', am4charts.XYChart) ;
					ews.sideinfo3.chart.logo.height = - 15000;
					ews.sideinfo3.chart.colors.step = 2;
		
					ews.sideinfo3.chart.legend = new am4charts.Legend() ;
					ews.sideinfo3.chart.legend.position = 'top' ;
					ews.sideinfo3.chart.legend.paddingBottom = 20 ;
					ews.sideinfo3.chart.legend.labels.template.maxWidth = 95 ;
		
					var xAxis = ews.sideinfo3.chart.xAxes.push(new am4charts.CategoryAxis())
					xAxis.dataFields.category = 'category' ;
					xAxis.renderer.grid.template.location = 0 ; 
		
					var yAxis = ews.sideinfo3.chart.yAxes.push(new am4charts.ValueAxis()) ;
					yAxis.min = 0 ;
		
					ews.sideinfo3.chart.data = db ;

					for ( var i in columns ) {
						var column = columns[i] ;
						var nm = nms[i] ;
						if ( i == 0 )
							ews.sideinfo3.col = column ;
						ews.sideinfo3.createChart01SeriesLine(column, nm) ;
					}
		
					//chart01.legend = new am4charts.Legend();
					ews.sideinfo3.chart.cursor = new am4charts.XYCursor();
				}) ;
			},
			createChart01SeriesLine: function(field,name) {
				var series = ews.sideinfo3.chart.series.push(new am4charts.LineSeries());
				series.dataFields.valueY = field;
				series.dataFields.categoryX = "category";
				series.name = name;

				if ( ews.sideinfo3.col == field ) {
					series.tooltipHTML = `
					<table class="pop-table2">
					<tr><th colspan="2">{categoryX}</th></tr>` ;
					for ( var i in ews.sideinfo3.columns ) {
						var column = ews.sideinfo3.columns[i] ;
						var nm = ews.sideinfo3.nms[i] ;
						series.tooltipHTML += `<tr><td>`+nm+`</td><td>{`+column+`}</td></tr>` ;
					}
					series.tooltipHTML += `</table>` ;
					series.tooltip.pointerOrientation = "vertical" ;
            		series.tooltip.getFillFromObject = false;
            		series.tooltip.background.fill = '#99dd99' ;
				}
				series.strokeWidth = 2;
				series.tooltip.label.textAlign = "middle" ;
				series.showTooltipOn = "hover" ;

				var bullet = series.bullets.push(new am4charts.CircleBullet());
			},
			hide: function() {
				$('#bottom-info2').hide('slide', {direction:'down'}, 500) ;
			},
		} ;

		ews.sideinfo4 = {
			show: function(url,db) {
				var obj = $('#bottom-info-in') ;
				obj.empty() ;
				if ( obj.length > 0 ){
					obj.load(url, db, function() {
						$('#bottom-info').show('slide', { direction: 'down'}, 500) ;
						$('.btn-info-close').off('click').on('click', ews.sideinfo4.hide) ;
					}) ;
				}
			},
			hide: function() {
				$('#bottom-info').hide('slide', {direction:'down'}, 500) ;
			},
		} ;

		ews.alarm = {
			delay: 1000 * 60,
			showList: true,
			data: [],
			init: function() {
				var path = $(location).attr('pathname') ;
				if ( path.indexOf('/adm/alarm/index') != -1 ) {
					// 현재 페이지는 알람, 폴트 보는 페이지이므로 실행하지 않는다.
					// 해당 페이지에서 카운터는 해야 되어서 다시 변경
					//return ;
					ews.alarm.showList = false ;
				}
				$.ajax({
					url : '/adm/alarm/check/',
					type : 'POST',
					dataType : 'json',
					success : function(r) {
						if ( typeof r != 'undefined' ) {
							
							$('#fault_num').html(r.fault) ;
							$('#warning_num').html(r.warning) ;

							if ( parseInt(r.fault) > 0 && ews.alarm.showList === true ) {
								var audio = new Audio();
								audio.src = '/_lib/noti2.mp3' ;
								audio.play() ;
							}

							if ( r.list != null && ews.alarm.showList === true ) {
								$("div[data-notify='container']").remove();
								
								ews.alarm.data = r.list ;
								ews.alarm.showNotiWhile(0) ;
								/*
								$.each( r.list, function(i,o) {
									ews.alarm.showNoti(o) ;
									ews.alarm.sleep(300);
								}) ;
								*/
							}
							setTimeout(function() {
								ews.alarm.init() ;
							}, 60000) ;
						}
					}
				}) ;
			},
			showNotiWhile: function(idx) {
				if ( ! ews.alarm.data[idx] ) 
					return ;
				if ( idx >= 11 )
					return ;
				ews.alarm.showNoti(ews.alarm.data[idx]) ;
				setTimeout(function() {
					ews.alarm.showNotiWhile(parseInt(idx+1));
				},200);
			},
			showNoti: function(obj) {
				//console.log(obj) ;
				var clt = ews.alarm.lpad(obj["client_no"],2,'0') ;
				var icn = 'fas fa-bell' ;
				var tp = 'warning' ;
				if ( parseInt(obj["client_no"]) <= 5 ) {
					clt = 'PCS #'+clt ;
				} else {
					clt = 'BMS #'+clt ;
				}
				if ( obj["tp"] == 'fault' ) {
					icn = 'fas fa-exclamation-triangle' ;
					tp = 'danger' ;
				}
				$.notify({
					icon: icn,
					title: '<span class="label label-inverse">'+obj["site_nm"]+' '+obj["tp"]+'</span>',
					message: clt+'에서 '+obj["dttm"]+'에 Addr('+obj["adr"]+') '+obj["title"]+'이 발생했습니다',
					url: '/adm/alarm/index/?dt='+obj["dttm"].substring(0,10),
					target: '_self'
				},{
					type: tp,
					delay : ews.alarm.delay,
					placement: {
						from: 'top',
						align: 'right',
					},
					onShow: null,
					onShown: null,
					onClose: null,
					onClosed: null,
					template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert" style="display:table;">' +
						'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
						'<div style="display:table-cell;;font-size:30px; padding-right:10px;"><span data-notify="icon"></span></div>' +
						'<div style="display:table-cell;vertical-align:top;line-height:22px;">' +
						'<span data-notify="title" style="padding-bottom:5px;">{1}</span> <br/>' +
						'<span data-notify="message">{2}</span>' +
						'</div>' +
						'<div class="progress" data-notify="progressbar">' +
						'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
						'</div>' +
						'<a href="{3}" target="{4}" data-notify="url"></a>' +
					'</div>' 
				}) ;
			},
			lpad: function (str, padLen, padStr) {
				if (padStr.length > padLen) {
					console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
					return str;
				}
				str += ""; // 문자로
				padStr += ""; // 문자로
				while (str.length < padLen)
					str = padStr + str;
				str = str.length >= padLen ? str.substring(0, padLen) : str;
				return str;
			},
			sleep: function(delay) {
				var start = new Date().getTime()
				while( new Date().getTime() < start + delay) ;
			}
		};
		//ews.alarm.init() ;

		ews.loading = {
			idx: 1200,
			show: function() {
				var body = $('body') ;
				if ( body.hasClass('locked') == false ) {
					body.addClass('locked') ;
				}
				var idx = parseInt( ews.loading.idx + 2 ) ;
				var id = 'popupshow_'+ idx ;
				var id2 = 'popupwrap_'+ idx ;
				var html = $('<div/>').attr({'id':id}).addClass('mask-popup') ;
				html.css({'position':			'fixed'
						, 'z-index':			idx
						, 'height':				'100%' 
						, 'width':				'100%'
						, 'left':				'0'
						, 'top':				'0'
						, 'background-color':	'RGBA(0,0,0,0.2)'
						, 'overflow-x':			'auto'
						, 'overflow-y':			'scroll'
				}) ;
				var container = $('<div/>').attr({'id':id2}).addClass('popupContainer') ;
				container.css({ 'position':		'relative'
							  , 'top':			'50%'
							  , 'margin':		'auto'
							  , 'width':		'250px'
							  , 'text-align':	'center'
							  , 'transform':	'translateY(-50%)'
				}) ;
				container.html('<img src="/images/cmm/ajax_loader4.gif" width="150px" />') ;
				body.append(html.append(container)) ;

				return id ;
			},
			hide: function(id) {
				var obj = $('#'+id) ;
				if ( obj.length > 0 ) {
					obj.remove() ;
				}
				if ( $('div.mask-popup').length < 1 ) {
					$('body').removeClass('locked') ;
				}
			}
		};
		ews.popup2 = {
			idx: 1000,
			show: function(url,db,w) {
				var body = $('body') ;
				
				if ( body.hasClass('locked') == false ) {
					body.addClass('locked') ;
				}
				if ( body.width() < w ) {
					w = body.width() ;
				}
				//$('.modal-container').slideDown(2000) ;
				
				var idx = parseInt( ews.popup2.idx + 2 ) ;
				var id = 'popupshow_'+ idx ;
				var id2 = 'popupwrap_'+ idx ;
				var html = $('<div/>').attr({'id':id}).addClass('mask-popup') ;
				html.css({'position':			'fixed'
						, 'z-index':			idx
						, 'height':				'100%' 
						, 'width':				'100%'
						, 'left':				'0'
						, 'top':				'0'
						, 'background-color':	'RGBA(0,0,0,0.5)'
						, 'overflow-x':			'auto'
						, 'overflow-y':			'scroll'
				}) ;

				html.on('click', {'id':id}, ews.popup2.close) ;
				//body.append(html) ;

				var container = $('<div/>').attr({'id':id2}).addClass('popupContainer') ;
				container.on('click', function(e) {
					e.stopPropagation();
				}) ;
				if ( w == '' ) {
				} else if ( isNaN(w) == false ) {
					container.css({'width':w+'px'}) ;
				} else {
					container.css({'width':w}) ;
				}
				var ct = 100 ;
				ct = ct +  $(document).scrollTop();
				ct = ct + 'px' ;
				container.css({ 'margin':				ct + ' auto 0 auto'
							  , 'background-color':		'#FFF'
							  , 'opacity':				'1'
							  , 'display':				'none'
							  , 'boxshadow':			'0 10px 30px rgba(51, 51, 51, 0.8)'
							  }) ;

				$.ajax({
					url: url,
					type: 'POST',
					data: db,
					dataType: 'html',
					success: function(r) {
						container.html(r) ;
						body.append(html.append(container)) ;
						$('#'+id2).slideDown(100);
						//div1.show();
						//$('html, body').stop().animate( { scrollTop : '0' } ); 
					}
				}) ;
				
				
			},
			close: function(a) {
				var id = a.data.id ;
				var obj = $('#'+id) ;
				if ( obj.length > 0 ) {
					obj.remove() ;
				}

				if ( $('div.mask-popup').length < 1 ) {
					$('body').removeClass('locked') ;
				}
			}
		} ;

	}) ; // document.ready end
})(jQuery, window);


// 주어진 시간 만큼 지나서 함수 실행
//  $(window).resize(throttle(100, function(e) {
//        resizeContents();
//    }));

function throttle(ms, fn) {
    var allow = true;
    function enable() {
        allow = true;
    }
    return function(e) {
        if(allow) {
            allow = false;
            setTimeout(enable, ms);
            fn.call(this, e);
        }
    }
}