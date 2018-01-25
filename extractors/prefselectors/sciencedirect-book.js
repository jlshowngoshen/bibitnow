var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_issn: [ ['span.pubISBN','innerText'] ],
		citation_title: [ ['span.pubTitle','innerText'] ],
		citation_journal_title: [ ['span.pubSubTitle','innerText'] ],
		citation_misc: [ ['meta[name="description"]','content'] ],
		citation_abstract: [ ['div#bookDescription','innerText', true, 20000] ],
		citation_authors: [ ['span.pubEditors','innerText'] ],
		citation_date: [ ['p.copyright','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
