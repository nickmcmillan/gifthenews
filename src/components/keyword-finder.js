
// short, common words to skip when counting
// MUST be lowercase
const stopWords = [
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'about',
	'actually',
	'always',
	'even',
	'given',
	'into',
	'just',
	'not',
	'im',
	'thats',
	'its',
	'arent',
	'weve',
	'ive',
	'didnt',
	'dont',
	'the',
	'of',
	'to',
	'and',
	'a',
	'in',
	'is',
	'it',
	'you',
	'that',
	'he',
	'was',
	'for',
	'on',
	'are',
	'with',
	'as',
	'i',
	'his',
	'they',
	'be',
	'at',
	'one',
	'have',
	'this',
	'from',
	'or',
	'had',
	'by',
	'hot',
	'but',
	'some',
	'what',
	'there',
	'we',
	'can',
	'out',
	'were',
	'all',
	'your',
	'when',
	'up',
	'use',
	'how',
	'said',
	'an',
	'each',
	'she',
	'which',
	'do',
	'their',
	'if',
	'will',
	'way',
	'many',
	'then',
	'them',
	'would',
	'like',
	'so',
	'these',
	'her',
	'see',
	'him',
	'has',
	'more',
	'could',
	'go',
	'come',
	'did',
	'my',
	'no',
	'get',
	'me',
	'say',
	'too',
	'here',
	'must',
	'such',
	'try',
	'us',
	'own',
	'oh',
	'any',
	'youll',
	'youre',
	'san',
	'new',
	'also',
	'than',
	'those',
	'though',
	'thing',
	'things',
	'video',
	'reuters'
]

// adapted from http://codereview.stackexchange.com/a/63979
export default function(string) {

	const cutOff = 3

	let cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,'').toLowerCase()
	let	words = cleanString.split(/\s/)
	let	frequencies = {}

	words.forEach((word, i)=> {
		word = words[i];

		const containsAStopWord = (stopWords.indexOf(word) > -1);
		const containsANumber = parseFloat(word) == word; // double equals, not triple

		if (!containsAStopWord && !containsANumber) {
			frequencies[word] = frequencies[word] || 0;
			frequencies[word]++;
		}
	})

	words = Object.keys( frequencies );

	return words.sort( (a,b) => {
		return frequencies[b] - frequencies[a];
	}).slice(0,cutOff);

}
