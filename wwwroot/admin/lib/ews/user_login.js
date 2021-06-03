/**
 *	Neon Login Script
 *
 *	Developed by Arlind Nushi - www.laborator.co
 */

var ewsLogin = ewsLogin || {};

;(function($, window, undefined)
{
	"use strict";
	
	$(document).ready(function()
	{
		ewsLogin.$container = $("#form_login");
		
		
		// Login Form & Validation
		ewsLogin.$container.validate({
			rules: {
				username: {
					required: true	
				},
				
				password: {
					required: true
				},
				
			},
			
			highlight: function(element){
				$(element).closest('.input-group').addClass('validate-has-error');
			},
			
			
			unhighlight: function(element)
			{
				$(element).closest('.input-group').removeClass('validate-has-error');
			},
			
			submitHandler: function(ev)
			{
				/* 
					Updated on v1.1.4
					Login form now processes the login data, here is the file: data/sample-login-form.php
				*/
				
				$(".login-page").addClass('logging-in'); // This will hide the login form and init the progress bar
					
					
				// Hide Errors
				$(".form-login-error").slideUp('fast');

				// We will wait till the transition ends				
				setTimeout(function()
				{
					var random_pct = 25 + Math.round(Math.random() * 30);
					var reURL = $('#reurl').val() ;
					// The form data are subbmitted, we can forward the progress to 70%
					ewsLogin.setPercentage(40 + random_pct);
											
					// Send data to the server
					$.ajax({
						url: '/member/loginProc/',
						method: 'POST',
						dataType: 'json',
						data: {
							username: $("input#username").val(),
							password: $("input#password").val(),
							reurl: $('#reurl').val()
						},
						error: function()
						{
							alert("An error occoured!");
						},
						success: function(response)
						{
							// Login status [success|invalid]
							var login_status = response.state;
															
							// Form is fully completed, we update the percentage
							ewsLogin.setPercentage(100);
							
							
							// We will give some time for the animation to finish, then execute the following procedures	
							setTimeout(function()
							{
								// If login is invalid, we store the 
								if(login_status != 'ok')
								{
									$(".login-page").removeClass('logging-in');
									$("#msgbox").html(response.msg) ;
									ewsLogin.resetProgressBar(true);
								}
								else
								if(login_status == 'ok')
								{
									// Redirect to login page
									setTimeout(function()
									{
										
										var redirect_url = '/';
//										console.log( response.redirect_url ) ;
										if(response.redirect_url && response.redirect_url.length)
										{
											redirect_url = response.redirect_url;
										}
										
										//console.log(redirect_url);
										//window.location.href = redirect_url;
										
								
										if(reURL == ''){
											reURL = redirect_url;
										}


//										console.log("urlcheck");
//										console.log(reURL);

										window.location.href = reURL ;								
										//if ( redirect_url == '' )
											//window.location.href = reURL ;
										//else
											//window.location.href = redirect_url;
										
					

										//	reURL = '/adm/' ;
										
										//
									}, 400);
								}
								
							}, 1000);
						}
					});
						
					
				}, 650);
			}
		});
		
		
		
		
		// Lockscreen & Validation
		var is_lockscreen = $(".login-page").hasClass('is-lockscreen');
		
		if(is_lockscreen)
		{
			ewsLogin.$container = $("#form_lockscreen");
			ewsLogin.$ls_thumb = ewsLogin.$container.find('.lockscreen-thumb');
			
			ewsLogin.$container.validate({
				rules: {
				
					password: {
						required: true
					},
					
				},
				
				highlight: function(element){
					$(element).closest('.input-group').addClass('validate-has-error');
				},
				
				
				unhighlight: function(element)
				{
					$(element).closest('.input-group').removeClass('validate-has-error');
				},
				
				submitHandler: function(ev)
				{	
					/* 
						Demo Purpose Only 
						
						Here you can handle the page login, currently it does not process anything, just fills the loader.
					*/
					
					$(".login-page").addClass('logging-in-lockscreen'); // This will hide the login form and init the progress bar
	
					// We will wait till the transition ends				
					setTimeout(function()
					{
						var random_pct = 25 + Math.round(Math.random() * 30);
						
						ewsLogin.setPercentage(random_pct, function()
						{
							// Just an example, this is phase 1
							// Do some stuff...
							
							// After 0.77s second we will execute the next phase
							setTimeout(function()
							{
								ewsLogin.setPercentage(100, function()
								{
									// Just an example, this is phase 2
									// Do some other stuff...
									
									// Redirect to the page
									setTimeout("window.location.href = '../../'", 600);
								}, 2);
								
							}, 820);
						});
						
					}, 650);
				}
			});
		}
		
		
		
		
		
		
		// Login Form Setup
		ewsLogin.$body = $(".login-page");
		ewsLogin.$login_progressbar_indicator = $(".login-progressbar-indicator h3");
		ewsLogin.$login_progressbar = ewsLogin.$body.find(".login-progressbar div");
		
		ewsLogin.$login_progressbar_indicator.html('0%');
		
		if(ewsLogin.$body.hasClass('login-form-fall'))
		{
			var focus_set = false;
			
			setTimeout(function(){ 
				ewsLogin.$body.addClass('login-form-fall-init')
				
				setTimeout(function()
				{
					if( !focus_set)
					{
						ewsLogin.$container.find('input:first').focus();
						focus_set = true;
					}
					
				}, 550);
				
			}, 0);
		}
		else
		{
			ewsLogin.$container.find('input:first').focus();
		}
		
		// Focus Class
		ewsLogin.$container.find('.form-control').each(function(i, el)
		{
			var $this = $(el),
				$group = $this.closest('.input-group');
			
			$this.prev('.input-group-addon').click(function()
			{
				$this.focus();
			});
			
			$this.on({
				focus: function()
				{
					$group.addClass('focused');
				},
				
				blur: function()
				{
					$group.removeClass('focused');
				}
			});
		});
		
		// Functions
		$.extend(ewsLogin, {
			setPercentage: function(pct, callback)
			{
				pct = parseInt(pct / 100 * 100, 10) + '%';
				
				// Lockscreen
				if(is_lockscreen)
				{
					ewsLogin.$lockscreen_progress_indicator.html(pct);
					
					var o = {
						pct: currentProgress
					};
					
					TweenMax.to(o, .7, {
						pct: parseInt(pct, 10),
						roundProps: ["pct"],
						ease: Sine.easeOut,
						onUpdate: function()
						{
							ewsLogin.$lockscreen_progress_indicator.html(o.pct + '%');
							drawProgress(parseInt(o.pct, 10)/100);
						},
						onComplete: callback
					});	
					return;
				}
				
				// Normal Login
				ewsLogin.$login_progressbar_indicator.html(pct);
				ewsLogin.$login_progressbar.width(pct);
				
				var o = {
					pct: parseInt(ewsLogin.$login_progressbar.width() / ewsLogin.$login_progressbar.parent().width() * 100, 10)
				};
				
				TweenMax.to(o, .7, {
					pct: parseInt(pct, 10),
					roundProps: ["pct"],
					ease: Sine.easeOut,
					onUpdate: function()
					{
						ewsLogin.$login_progressbar_indicator.html(o.pct + '%');
					},
					onComplete: callback
				});
			},
			
			resetProgressBar: function(display_errors)
			{
				TweenMax.set(ewsLogin.$container, {css: {opacity: 0}});
				
				setTimeout(function()
				{
					TweenMax.to(ewsLogin.$container, .6, {css: {opacity: 1}, onComplete: function()
					{
						ewsLogin.$container.attr('style', '');
					}});
					
					ewsLogin.$login_progressbar_indicator.html('0%');
					ewsLogin.$login_progressbar.width(0);
					
					if(display_errors)
					{
						var $errors_container = $(".form-login-error");
						
						$errors_container.show();
						var height = $errors_container.outerHeight();
						
						$errors_container.css({
							height: 0
						});
						
						TweenMax.to($errors_container, .45, {css: {height: height}, onComplete: function()
						{
							$errors_container.css({height: 'auto'});
						}});
						
						// Reset password fields
						ewsLogin.$container.find('input[type="password"]').val('');
					}
					
				}, 800);
			}
		});
		
		
		// Lockscreen Create Canvas
		if(is_lockscreen)
		{
			ewsLogin.$lockscreen_progress_canvas = $('<canvas></canvas>');
			ewsLogin.$lockscreen_progress_indicator =  ewsLogin.$container.find('.lockscreen-progress-indicator');
			
			ewsLogin.$lockscreen_progress_canvas.appendTo(ewsLogin.$ls_thumb);
			
			var line_width = 3,
				thumb_size = ewsLogin.$ls_thumb.width() + line_width;
			
                ewsLogin.$lockscreen_progress_canvas.attr({
				width: thumb_size,
				height: thumb_size
			}).css( {
				top: -line_width/2,
				left: -line_width/2
			} );
			
			
			ewsLogin.lockscreen_progress_canvas = ewsLogin.$lockscreen_progress_canvas.get(0);
			
			// Create Progress Circle
			var bg = ewsLogin.lockscreen_progress_canvas,
				ctx = ctx = bg.getContext('2d'),
				imd = null,
				circ = Math.PI * 2,
				quart = Math.PI / 2,
				currentProgress = 0;
			
			ctx.beginPath();
			ctx.strokeStyle = '#eb7067';
			ctx.lineCap = 'square';
			ctx.closePath();
			ctx.fill();
			ctx.lineWidth = line_width;
			
			imd = ctx.getImageData(0, 0, thumb_size, thumb_size);
			
			var drawProgress = function(current) {
			    ctx.putImageData(imd, 0, 0);
			    ctx.beginPath();
			    ctx.arc(thumb_size/2, thumb_size/2, 70, -(quart), ((circ) * current) - quart, false);
			    ctx.stroke();
			    
			    currentProgress = current * 100;
			}
			
			drawProgress(0/100);
			
			
			ewsLogin.$lockscreen_progress_indicator.html('0%');
			
			ctx.restore();
		}
		
	});
	
})(jQuery, window);