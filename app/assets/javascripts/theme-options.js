// THEME OPTIONS.JS
//--------------------------------------------------------------------------------------------------------------------------------
//This is JS file that contains skin, layout Style and bg used in this template*/
// -------------------------------------------------------------------------------------------------------------------------------
// Template Name: Studio
// Author: Iwthemes.
// Name File: theme-options.js
// Version 1.0 - Created on 1sep 2014
// Website: http://www.iwthemes.com 
// Email: support@iwthemes.com
// Copryright: (C) 2014
// -------------------------------------------------------------------------------------------------------------------------------

  $(document).ready(function($) {

  	/* Selec your skin and layout Style */

	function interface(){

    // Skin value
    var skin = "orange-light"; // // blue, bone, brown, cyan, green, orange, orange-light, purple, red, yellow 

    // Layout Style
    var skin_version = ""; // style-light, style-dark, default
    var layout = "";
    // Theme Panel - disable panel options
    var themepanel = "1"; // 1 (default - enable), 0 (disable)

    $(".skin").attr("href", "css/skins/"+ skin + "/" + skin + ".css");
    $("#layout").addClass(layout);
    $("#layout").addClass(skin_version);	
    $("#theme-options").css('opacity' , themepanel);
    
    return false;
    
  }

 	interface();

	//=================================== Theme Options ====================================//

	$('.single-post h1, .single-post h2, .single-post h3, .single-post h4, .single-post h5, .single-post h6').addClass('color-dark-font');

	$('.color-light .title p, .color-light .date_blog li, .color-light .date_blog li a, .color-light .date_blog h2 a, .color-light .text_blog a, .color-light .social h3, .color-light .color-black, .color-light .social h3 span, .color-light .number p, .color-light.contact_us p, .color-light.contact_us h3 a, .color-light aside h2, .color-light aside p, .color-light .color-dark-font').addClass('color-font-black').removeClass('color-font');
	
	$('.light').click(function() {
		$('.dark').removeClass('active');
		$('.default').removeClass('active');
		$(this).addClass('active');
		$('.color').addClass('color-light').removeClass('color-dark');
		$('.pattern_top').addClass('pattern-top-light').removeClass('pattern-top-dark');
		$('.pattern_bottom').addClass('pattern-bottom-light').removeClass('pattern-bottom-dark');
		$('.divider_dark').addClass('divider-dark-color');
		$('.date_blog ul').addClass('divider-color-bottom');
		$('.color-light .social_icon a').css('background','#000');
		$('.color-light .social_icon a i').css('color','#fff');
		$('.color-light .title p, .color-light .date_blog li, .color-light .date_blog li a, .color-light .date_blog h2 a, .color-light .text_blog a, .color-light .social h3, .color-light .color-black, .color-light .social h3 span, .color-light .number p, .color-light.contact_us p, .color-light.contact_us h3 a, .color-light aside h2, .color-light aside p, .color-light .color-dark-font').addClass('color-font-black').removeClass('color-font');
	});
	
	$('.dark').click(function() {
		$('.light').removeClass('active');
		$('.default').removeClass('active');
		$(this).addClass('active');
		$('.color').addClass('color-dark').removeClass('color-light');
		$('.pattern_top').addClass('pattern-top-dark').removeClass('pattern-bottom-light');
		$('.pattern_bottom').addClass('pattern-bottom-dark').removeClass('pattern-top-light');
		$('.divider_dark').addClass('divider-dark-color');
		$('.date_blog ul').addClass('divider-color-bottom');
		$('.color-light .social_icon a').css('background','#fff');
		$('.color-light .social_icon a i').css('color','#000');
		$('.color-dark .title p, .color-dark .date_blog li, .color-dark .date_blog li a, .color-dark .date_blog h2 a, .color-dark .text_blog a, .color-dark .social h3, .color-dark .color-black, .color-dark .social h3 span, .color-dark .number p, .color-dark.contact_us p, .color-dark.contact_us h3 a, .color-dark aside h2, .color-dark aside p, .color-dark .color-dark-font').addClass('color-font').removeClass('color-font-black');
	});
	$('.default').click(function() {
		$('.light').removeClass('active');
		$('.dark').removeClass('active');
		$(this).addClass('active');
		$('.color').removeClass('color-dark').removeClass('color-light');
		$('.pattern_top').removeClass('pattern-top-dark').removeClass('pattern-top-light');
		$('.pattern_bottom').removeClass('pattern-bottom-dark').removeClass('pattern-bottom-light');
		$('.divider_dark').removeClass('divider-dark-color');
		$('.date_blog ul').removeClass('divider-color-bottom');
		$('.color .social_icon a').css('background','#fff');
		$('.color .social_icon a i').css('color','#000');
		$('a').css('color','#fff');
		$('.color .title p, .color .date_blog li, .color .date_blog li a, .color .date_blog h2 a, .color .text_blog a, .color .social h3, .color .color-black, .color .social h3 span, .color .number p, .color.contact_us p, .color.contact_us h3 a, .color aside h2, .color aside p, .color .color-dark-font').removeClass('color-font');
		$('.color .title p, .color .date_blog li, .color .date_blog li a, .color .date_blog h2 a, .color .text_blog a, .color .social h3, .color .color-black, .color .social h3 span, .color .number p, .color.contact_us p, .color.contact_us h3 a, .color aside h2, .color aside p, .color .color-dark-font').removeClass('color-font-black');
	});

	//=================================== Skins Changer ====================================//

	google.setOnLoadCallback(function(){

	'use strict';

    // Color changer
    $(".red").click(function(){
	   	$(".skin").attr("href", "css/skins/red/red.css");
	   	$(".logo").attr("src", "css/skins/red/logo.png");
	   	$(".logo_big").attr("src", "css/skins/red/logo-big.png");
	    return false;
	});
	$(".cyan").click(function(){
	    $(".skin").attr("href", "css/skins/cyan/cyan.css");
	   	$(".logo").attr("src", "css/skins/cyan/logo.png");
	   	$(".logo_big").attr("src", "css/skins/cyan/logo-big.png");
	    return false;
	});
	$(".yellow").click(function(){
	    $(".skin").attr("href", "css/skins/yellow/yellow.css");
	   	$(".logo").attr("src", "css/skins/yellow/logo.png");
	   	$(".logo_big").attr("src", "css/skins/yellow/logo-big.png");
	    return false;
	});
	$(".green").click(function(){
	    $(".skin").attr("href", "css/skins/green/green.css");
	   	$(".logo").attr("src", "css/skins/green/logo.png");
	   	$(".logo_big").attr("src", "css/skins/green/logo-big.png");
	    return false;
	});
	$(".orange").click(function(){
    	$(".skin").attr("href", "css/skins/orange/orange.css");
	   	$(".logo").attr("src", "css/skins/orange/logo.png");
	   	$(".logo_big").attr("src", "css/skins/orange/logo-big.png");
    	return false;
	});
	$(".bone").click(function(){
	    $(".skin").attr("href", "css/skins/bone/bone.css");
	   	$(".logo").attr("src", "css/skins/bone/logo.png");
	   	$(".logo_big").attr("src", "css/skins/bone/logo-big.png");
	    return false;
	});
	$(".orange-light").click(function(){
        $(".skin").attr("href", "css/skins/orange-light/orange-light.css");
	   	$(".logo").attr("src", "css/skins/orange-light/logo.png");
	   	$(".logo_big").attr("src", "css/skins/orange-light/logo-big.png");
        return false;
   	});
   	$(".purple").click(function(){
        $(".skin").attr("href", "css/skins/purple/purple.css");
	   	$(".logo").attr("src", "css/skins/purple/logo.png");
	   	$(".logo_big").attr("src", "css/skins/purple/logo-big.png");
        return false;
   	});
   	$(".brown").click(function(){
        $(".skin").attr("href", "css/skins/brown/brown.css");
	   	$(".logo").attr("src", "css/skins/brown/logo.png");
	   	$(".logo_big").attr("src", "css/skins/brown/logo-big.png");
        return false;
   	});
   	$(".blue").click(function(){
        $(".skin").attr("href", "css/skins/blue/blue.css");
	   	$(".logo").attr("src", "css/skins/blue/logo.png");
	   	$(".logo_big").attr("src", "css/skins/blue/logo-big.png");
        return false;
   	});
 });

	//=================================== Background Options ====================================//
	
	$('#theme-options ul.backgrounds li').click(function(){
		$bgSrc = $(this).css('background-image');
		if ($(this).attr('class') == 'bgnone')
			$bgSrc = "none";

		$('body').css('background-image',$bgSrc);
		$.cookie('background', $bgSrc);
		$.cookie('backgroundclass', $(this).attr('class').replace('active',''));
		$(this).addClass('active').siblings().removeClass('active');
	});

	//=================================== Panel Options ====================================//

	$('#theme-options .title').click(function(){
		if ($('#theme-options').css('left') == "-250px")
		{
			$left = "0px";
			$.cookie('displayoptions', "0");
		} else {
			$left = "-250px";
			$.cookie('displayoptions', "1");
		}
		$('#theme-options').animate({
			left: $left
		},{
			duration: 500,
			easing: "easeInOutExpo"
		});

	});

	$(function(){
		$('#theme-options').fadeIn();
		$bgSrc = $.cookie('background');
		$('body').css('background-image',$bgSrc);

		if ($.cookie('displayoptions') == "1")
		{
			$('#theme-options').css('left','-250px');
		} else if ($.cookie('displayoptions') == "0") {
			$('#theme-options').css('left','0');
		} else {
			$('#theme-options').delay(800).animate({
				left: "-250px"
			},{
				duration: 500,
				easing: "easeInOutExpo"
			});
			$.cookie('displayoptions', "1");
		}
		$('#theme-options ul.backgrounds').find('li.' + $.cookie('backgroundclass')).addClass('active');

	});

});