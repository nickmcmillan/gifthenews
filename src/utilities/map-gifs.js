import 'whatwg-fetch';

export default function(component, items) {

	const giphyApi = 'http://api.giphy.com/v1/gifs'
	const apiKey = 'dc6zaTOxFJmzC'

	// create an array of promises
	let promises = []

	items.map(i => {

		// create a string+of+keywords to feed to giphy
		let keywordStr = ''
		i.keywords.map(keyword=>{
			keywordStr += `${keyword}+`
		})

		const url = `${giphyApi}/search?api_key=${apiKey}&limit=1&rating=${component.state.rating}&q=${keywordStr}`
		promises.push(fetch(url).then(r => r.json()))

	})

	return Promise.all(promises).then(function(response) {

		response.forEach(function(item, i) {
			// sift through giphys response object, assign it as a 'gif' property to the item
			items[i].gif = item.data[0].images.original.mp4
		})

		return items
	})

}
