import keywordFinder from './keyword-finder'
import stripHTML from './strip-html'
import stripUntilDash from './strip-until-dash'

export default function(feed) {

	// https://jakearchibald.com/2015/thats-so-fetch/
	return new Promise(function(resolve, reject) {

		try {
			const rss2json = 'http://rss2json.com/api.json?rss_url'
			const url = `${rss2json}=${feed}`

			fetch(url).then(r => r.json())
			  .then(data => {

				  let cleanedData = []

				  data.items.map(i => {

					  let title = i.title
					  let description = stripUntilDash(stripHTML(i.description))
					  let keywords = keywordFinder(title + description)

					  cleanedData.push({
						  title,
						  description,
						  keywords
					  })

				  })

				  resolve(cleanedData)

			  })
			  .catch(e => console.log('Booo', e))

		} catch (e) {
			reject(e)
		}

	});

}
