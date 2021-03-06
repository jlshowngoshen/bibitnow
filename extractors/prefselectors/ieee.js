var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		
		//return immediately if link
		if (link == null) return "";
		
		//get ids, return if not valid
		const ids = link.replace(/(?:^.*\/document\/|\/.*$)/g,"").replace(/[^0-9]/g,"");
		
		if (ids == "") return "";
		
		//set download method to POST
		metaData["citation_download_method"] = "POST";
		
		//return download link with ids obtained from abstract page url
		return (metaData["citation_url_nopath"] + "/xpl/downloadCitations?citations-format=citation-only&download-format=download-ris&recordIds=" + ids);
	}
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_title: [ ['h1.document-title','innerText'] , ['div.contentheader h1','innerText'] ],
		citation_authors: [ ['div.authors-container span.hide-mobile span[ng-bind-html="::author.name"]','textContent'] , ['div.authors-container span[ng-bind-html="::author.name"]','textContent'], ['div.authors-info-container span.authors-info','textContent']],
		citation_journal_title: [ ['a.stats-document-abstract-publishedIn','textContent'] ],
		citation_volume: [ ['span[ng-if="::vm.details.volume"]','textContent'] , ['div.stats-document-abstract-publishedIn','innerText'] ],
		citation_firstpage: [ ['div[ng-if~="::vm.details.startPage"]','innerText'] , ['div.stats-document-abstract-publishedIn+div div div','innerText',true]],
		citation_date: [ ['div.doc-abstract-pubdate','innerText'] ],
		citation_issn: [ ['div.stats-document-abstract-publishedIn+div div','innerText',true] , {query: 'div.article-metadata-tab',attribute: 'innerText', allowMultipleLines: true, lineSeparator: ' |-| '} ],
		citation_isbn: [ ['meta[name="citation_isbn"]','content'] ],
		citation_doi: [ ['div[ng-if~="::vm.details.doi"]','innerText'] , ['div.stats-document-abstract-doi','innerText']],
		citation_publisher: [ ['div.doc-abstract-publisher','innerText'] ],
		citation_abstract: [ ['div.abstract-text','innerText', true, 20000] , ['a[name="abstract" i]+p','innerText', true, 20000] ,  ['meta[name="citation_abstract"]','content', true, 20000] , ['div.section','innerText', true, 20000] ],
		citation_misc: [ { query: 'table.book-layout',attribute: 'textContent', allowMultipleLines: true, lineSeparator: " |-| "} , { query: 'div.document-abstract',attribute: 'innerText', allowMultipleLines: true, lineSeparator: " |-| "} , { query: 'section.document-abstract',attribute: 'innerText', allowMultipleLines: true, lineSeparator: " |-| ", maximumLength: 20000}],
		citation_keywords: [ ['div.stats-keywords-container li:first-of-type a','innerText'] ],
		citation_collection_title: [ ['div.book-chapter-mark-container','innerText'] ],
		citation_issue: [ ['a.stats-document-abstract-publishedIn-issue','textContent'] ],
		citation_download: [ ['BINURL','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
