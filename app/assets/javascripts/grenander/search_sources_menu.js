document.addEventListener("DOMContentLoaded", function(){
	var pathname = window.location.pathname.toLowerCase();
	// console.log(pathname);
	var sourcesMenu = document.getElementById("search-sources-menu");
	if (sourcesMenu) {

		var alreadyActives = sourcesMenu.getElementsByClassName("active");
		for (var i = 0; i < alreadyActives.length; i++) {
		    alreadyActives[0].className = alreadyActives[0].className.replace(" active", "");
		} 

		if (pathname.startsWith("/search")) {
			var target = sourcesMenu.getElementsByClassName("search");
		} else if (pathname.startsWith("/description")) {
			var target = sourcesMenu.getElementsByClassName("description");
		} else if (pathname.startsWith("/catalog")) {
			var target = sourcesMenu.getElementsByClassName("catalog");
		} else if (pathname.startsWith("/history")) {
			var target = sourcesMenu.getElementsByClassName("history");
		} else if (pathname.includes("mathes")) {
			var target = sourcesMenu.getElementsByClassName("mathes");
		} else if (pathname.startsWith("/books")) {
			var target = sourcesMenu.getElementsByClassName("books");
		}
		target[0].className += " active";
	}
});