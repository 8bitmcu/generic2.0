function Article(data) {
	return $('<article>').append
				($('<h1>').html(data['title'])).append
				($('<p>').html(data['content']))
}

function Code(data) {
	return $('<article>').append
				($('<h1>').html(data['syntax']))
}