$(document).ready(function(){
	var r = json2html(jsonML);
	$('body').html(r);
	console.debug('html result', r);
});