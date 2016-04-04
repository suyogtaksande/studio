$(document).ready(function(){
    
  //=================================== Totop  ===================================//
		$().UItoTop({ 		
			scrollSpeed:500,
			easingType:'linear'
		});
    
	//================================= Animations  =================================//
		new WOW().init();

    //================================== Accordion  =================================// 
	    $('.accordion-container').hide(); 
	    $('.accordion-trigger:first').addClass('active').next().show();
	    $('.accordion-trigger').click(function(){
	      if( $(this).next().is(':hidden') ) { 
	        $('.accordion-trigger').removeClass('active').next().slideUp();
	        $(this).toggleClass('active').next().slideDown();
	      }
	      return false;
	    });


  $(".header-slideshow").sticky({topSpacing:0});
  
	//=================================== Works Carousel  ===================================// 
	  $(".ch-grid").owlCarousel({
      	autoPlay: 3000, 
      	items : 3,
      	navigation: false,
      	navigationText: true, 
      	itemsDesktop : [1199,3],
      	itemsDesktopSmall : [1000,2],
      	itemsMobile : [568,1],
      	stopOnHover : true
	  });

  	//=================================== Blog Carousel  ===================================// 
	  $(".carousel-blog").owlCarousel({
      	items : 1,
      	pagination: true,
      	navigation: false,
      	singleItem: true,
      	stopOnHover : true,
      	autoPlay: 5000
	  });
  
  	//=================================== Testimonials Carousel  ===================================// 
	  $(".testimonials").owlCarousel({
      	autoPlay: 3500, 
      	items : 1,
      	navigation: false,
      	navigationText: true, 
      	singleItem: true,
      	stopOnHover : true
	  });

  	//=================================== Pricing Carousel  ===================================// 
	  $(".carousel-pricing").owlCarousel({
      	autoPlay: 3000, 
      	items : 3,
      	navigation: false,
      	navigationText: true, 
      	itemsDesktop : [1199,3],
      	itemsDesktopSmall : [1000,2],
      	itemsMobile : [568,1],
      	stopOnHover : true
	  });

    //=================================== Partners Carousel  ===================================// 
    $(".partners").owlCarousel({
        autoPlay: 3000, 
        items : 4,
        navigation: false,
        navigationText: true, 
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [1000,2],
        itemsMobile : [568,2],
        stopOnHover : true
    });

  	//=================================== about Carousel  ===================================// 
	  $(".carousel-about").owlCarousel({
      	autoPlay: 3000, 
      	items : 3,
      	navigation: false,
      	navigationText: true, 
      	itemsDesktop : [1199,3],
      	itemsDesktopSmall : [1000,2],
      	itemsMobile : [568,1],
      	stopOnHover : true
	  });

  	//=============================== Items blog Aside ======================================// 
	  $(".items-blog").owlCarousel({
      	autoPlay: 3000, 
      	items : 1,
      	pagination: true,
      	navigation: false,
      	itemsDesktop : [1199,1],
      	itemsDesktopSmall : [980,1],
      	itemsTablet   : [768,1],
      	itemsTabletSmall : [560,1],
      	itemsMobile : [400,1],
      	stopOnHover : true
	   });

	//=================================== Lightbox  ===================================//	
		$(".iframe_video").fancybox({
			'width'				: '75%',
			'height'			: '75%',
			'autoScale'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'type'				: 'iframe'
		});
	   
	   
	    jQuery("a[class*=fancybox]").fancybox({
			'overlayOpacity'	:	0.7,
			'overlayColor'		:	'#000000',
			'transitionIn'		: 'elastic',
			'transitionOut'		: 'elastic',
			'easingIn'      	: 'easeOutBack',
			'easingOut'     	: 'easeInBack',
			'speedIn' 			: '700',
			'centerOnScroll'	: true,
			'titlePosition'     : 'over'
		});
    
	//=================================== Hover Effects =====================================//
		$('.social_icon a').hover(function() {
			$(this).toggleClass('animated tada');
		});
		$('.specialize a i').hover(function() {
			$(this).toggleClass('animated wobble');
		});
		$('.contact_us .btn-default').hover(function() {
			$(this).toggleClass('animated pulse');
		});

	//=================================== Tooltips =====================================//
		if( $.fn.tooltip() ) {
			$('[class="tooltip_hover"]').tooltip();
		}  

	//=================================== Scrollbar  ======================================//
		$(".info_hover").mCustomScrollbar({
	        scrollButtons:{
				enable:true
			},
			theme:"dark-2"
	    });

    //=============================  Nice scroll bar Body =================================//
      $("html").niceScroll({
        background:"transparent",
        cursorcolor:"#292929",
        cursorwidth: 10, 
        boxzoom:true, 
        autohidemode:false,
        zindex:99999,
        cursorborder:"0",
      });

	//=================================== Subtmit Form  ====================================//
	  $('.form-contact').submit(function(event) {  
	    event.preventDefault();  
	    var url = $(this).attr('action');  
	    var datos = $(this).serialize();  
	    $.get(url, datos, function(resultado) {  
	      $('.result').html(resultado);  
	    });  
	  });  

	//=================================== Slide Home =====================================//  

     	$('#tabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		})

	//=================================== Slide Revolution =====================================//

	jQuery('.menu-header').show().revolution(
        {
            startheight:750,
            navigationType:"none"
      	});
	
     jQuery('.tp-banner').show().revolution(
        {
            dottedOverlay:"none",
            delay:16000,
            startwidth:1170,
            startheight:790,
            hideThumbs:200,
            startWithSlide:1170,
            
            thumbWidth:100,
            thumbHeight:50,
            thumbAmount:5,
            
            navigationType:"none",
            navigationArrows:"solo",
            navigationStyle:"preview2",
            
            touchenabled:"on",
            onHoverStop:"on",
            
            swipe_velocity: 0.7,
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            drag_block_vertical: false,
                                    
            parallax:"mouse",
            parallaxBgFreeze:"on",
            parallaxLevels:[7,4,3,2,5,4,3,2,1,0],
                                    
            keyboardNavigation:"off",
            
            navigationHAlign:"center",
            navigationVAlign:"bottom",
            navigationHOffset:0,
            navigationVOffset:20,

            soloArrowLeftHalign:"left",
            soloArrowLeftValign:"center",
            soloArrowLeftHOffset:20,
            soloArrowLeftVOffset:0,

            soloArrowRightHalign:"right",
            soloArrowRightValign:"center",
            soloArrowRightHOffset:20,
            soloArrowRightVOffset:0,
                    
            shadow:0,
            fullWidth:"on",
            fullScreen:"off",

            spinner:"spinner4",
            
            stopLoop:"off",
            stopAfterLoops:-1,
            stopAtSlide:-1,

            shuffle:"off",
            
            autoHeight:"off",                       
            forceFullWidth:"off",                       
                                               
                                    
            hideThumbsOnMobile:"off",
            hideNavDelayOnMobile:1500,                      
            hideBulletsOnMobile:"off",
            hideArrowsOnMobile:"off",
            hideThumbsUnderResolution:0,
            
            hideSliderAtLimit:0,
            hideCaptionAtLimit:0,
            hideAllCaptionAtLilmit:0,
            startWithSlide:0,
            videoJsPath:"rs-plugin/videojs/",
            fullScreenOffsetContainer: ""   
        });

});