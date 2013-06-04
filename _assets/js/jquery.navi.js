$(document).ready(function() {

	var mainNav = "#nav_pri";
	var mobileNav = ".nav_mobile";
	var orientation = "vertical";
	$(mobileNav).hide();

    if (orientation === "vertical") {
	    $(".navi").click(
			function (e) {
				e.preventDefault();
				var navContent = $(mainNav).html();
				$(mobileNav).html(navContent);
				$(mobileNav).slideToggle(300);
			});
	}

	if (orientation === "horizontal") {
		$(".navi").click(
			function (e) {
			e.preventDefault();
			var navContent = $(mainNav).html();

		});
	}
});