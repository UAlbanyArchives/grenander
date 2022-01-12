$(function(){
	//console.log(window.location.hostname);
	if (window.location.hostname != "archives.albany.edu") {
		$("a").each(function(){
		    $url = $(this).attr('href');
		    if ($url != "#") {
			    var tmp = document.createElement('a');
			    tmp.href = $url
			    $localURL = window.location.protocol + "//" + window.location.hostname + $url.split(tmp.host)[1];
			    $(this).attr("href", $localURL);
			}
		});
	}
});
