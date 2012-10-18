// MAIN CONTROLLER
function pageChange(item) {
	//remove the selected class from all link unless it's the current selected link
	$('nav a').each(function() { 
		($(this).attr('href') == item.hash)  ?  $(this).addClass('selected')  :  $(this).removeClass('selected')
	});
	
	//var view = //item.html
	var view = walk(item.html);
	
	//Load the view. If no page was loaded prior to this, we don't animate. Otherwise, we fade from a page to another
	if($('section').html() == "")
		$('section').html(view)
	else
		$('section').fadeOut('fast', function() { $('section').html(view).fadeIn('fast') })
}

// FRAMEWORK
$(function() {
	$('menu').hide()
	
	$.getJSON('model.json', function(data) {

		$.each(data, function(key, val) {
			//Loads all menu-links from pages that have 'nav' set to true
			if(val.nav == 'true')
				$('nav').append($('<a>').attr('href', val.hash).attr('hover', val.color).html(key))
			//Load the page if it's the current page
			if(val.hash == window.location.hash)
				pageChange(data[key])
		});
		
		//load the default page, the first page in data, if no hash is specified
		if(window.location.hash == '')
			pageChange(data[(function() { for (var key in data) return key }).call()])

		$('a').bind('click', function() {
			//If the link we clicked isn't the same page we are on already, load the page.
			if(window.location.hash != data[$(this).html()].hash)
				pageChange(data[$(this).html()])
		});
	});
});

// JSON MODEL PARSER
function walk(json) {
	var $result = $();
	if(typeof json == 'object') {
		
		for (var key in json) {
			if(typeof window[json[key].view] == 'function')
				$result = $result.add(window[json[key].view](walk(json[key].content)))
		}
		return $result;
	}
	
	if(typeof json == 'string')
		return json;
}