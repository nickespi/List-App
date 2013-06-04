$(document).ready(function() { 
			                
  // $('#responsive-menu-button').sidr({
  //    name: 'sidr-main',
  //    source: '#nav_pri'
  //  });       

  $(window).load(function() {
    $('.slider').flexslider({
    	slideshowSpeed: 6000,
    	animationSpeed: 600,
    	controlNav: true,  
		directionNav: true,
		useCSS: false,
		animation: "slide",
		easing: "easeOutCirc"
    });

  });


}); 
