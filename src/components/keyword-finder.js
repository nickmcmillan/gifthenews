
// short, common words to skip when counting
// MUST be lowercase
const stopWords = [
	'1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
	'10',
  'one',
  'two',
  'three',
  'four',
  'five',
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
  'also',
  'than',
  'those',
  'though',
  'thing',
  'things'
]

export default function keywordFinder(string) {

		// convert all occurences to lowercase so they're not case-sensitive. and remove all non alphanumerics, but preserve the space so we can split
    let wordsArray = string.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s/);
		let wordOccurrences = {}

		// create wordOccurrences is an object containing each word with its respective count
    for (let i = 0; i < wordsArray.length; i++) {
        wordOccurrences[wordsArray[i]] = ( wordOccurrences[wordsArray[i]] || 0 ) + 1;
    }

    const result = Object.keys(wordOccurrences).reduce(function(arr, currentWord) {

        const containsAStopWord = (stopWords.indexOf(currentWord) > -1);

				// only add the word if its not a stopword
        if (!containsAStopWord) {

          for (let i = 0; i < wordsArray.length; i++) {

              if (!arr[i]) {

                  arr[i] = {
                    word: currentWord,
                    occurences: wordOccurrences[currentWord]
                  };

                  break;

              } else if (arr[i].occurences < wordOccurrences[currentWord]) {

                  arr.splice(i, 0, {
                    word: currentWord,
                    occurences: wordOccurrences[currentWord]
                   });

                  if (arr.length > wordsArray.length) {
                      arr.pop();
                  }

                  break;
              }
          }
        }

        return arr;

    }, []);

    return result;
}
