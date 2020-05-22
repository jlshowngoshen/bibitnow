var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_abstract: [ [ 'blockquote.abstract','textContent', true, 20000] ],
		citation_misc: [ ['blockquote.abstract script[type="math/tex"], blockquote.abstract span.MathJax','textContent',true, 1024, true, 1000] ], /*for mathjax detection*/
		citation_keywords: [ [ 'td.tablecell.subjects','innerText'] ],
		citation_url: [ ['meta[property="og:url" i]','content'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg };

}());
