const destination = "https://api.badgr.io/public/assertions/p9muDZCOTT-ikavmyWabcA.json?v=1_1"
const destination2 = "https://api.badgr.io/v2/assertions/p9muDZCOTT-ikavmyWabcA";
//file:///C:/Users/Joe/Documents/Important/Projects/Websites/jvar2/digital-badges/index.html?assertion=p9muDZCOTT-ikavmyWabcA&badgeclass=xuF70J_8Q6msEohXfR3edw&issuer=TPjkApBgS7CILthN5tFXdQ

let assertionData;
	let badgeClassData;
	let issuerData;

$(() => {

	//Data Storage Variables
	
	//Data Render Functions

	function renderBadgeVerificationLink () {
		$("#badgeVerificationLink").attr('href', `https://badgecheck.io/?url=https://api.badgr.io/public/assertions/${assertionData.uid}.json?v=1_1`)
	}
    function renderRecipientName () {//Render Recipient Name (Assertion)
    	$("#badgeRecipientName").text(assertionData["extensions:recipientProfile"].name);
    }

    function renderBadgeImage () {//Render Badge Image (Assertion)
    	$("#badgeImage").attr('src', assertionData.image);
    }

    function renderIssueDate () {//Render Badge Issue Date (Assertion)
    	let issueDate = new Date(assertionData.issuedOn);
    	$("#badgeIssueDate").text(issueDate.toLocaleString());
    }
    
    function renderBadgeName () {//Render Badge Name (BadgeClass)
    	$("#badgeName").text(badgeClassData.name);
    }

    function renderBadgeDescription () {//Render Badge Description (BadgeClass)
    	$("#badgeDescription").text(badgeClassData.description);
    }

    function renderBadgeNarrative () {//Render Badge Narrative (How it was earned) (BadgeClass)
    	$("#badgeCriteriaNarrative").text(badgeClassData.criteria.narrative);
    }

    function renderIssuerName () {//Render Issuer Group Name (Issuer)
    	$("#badgeIssuerName").text(issuerData.name);
    }

    function renderIssuerEmail () {//Render Issuer Email (Issuer)
    	let issuerEmail = issuerData.email;
    	$("#badgeIssuerEmail").text(issuerEmail).attr('href', `mailto:${issuerEmail}`);
    }

    //Parses the url to get query string parameter values
    //SOURCE: https://jennamolby.com/how-to-display-dynamic-content-on-a-page-using-url-parameters/	
	function getParameterByName(name, url) { //gets query string parameters
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	

   	function getData (URL) {// Used to get the data from a page Where the JSON resides
     // console.log("Fetching stuff")
	   let result;
	   let badge = fetch(URL)
	     .then(function(response) {
	     	return response.json();
	     	// h = badge;
	     	// console.log(badge);
	     	// return badge;
	   	})
	     .then((data) => {
			console.log(data);
			badgeData = data;
			$("#badgeImage").attr('src', badgeData.image);
			$("#badgeRecipient").text(badgeData["extensions:recipientProfile"].name);
		});
	   return badge;
	}


	//Data Retrieval Functions
    function getAssertionData () {//gets the data about the assertion (instance of the badge)
    	const assertionCode = getParameterByName('assertion');
    	const assertionURL = `https://api.badgr.io/public/assertions/${assertionCode}.json?v=1_1`;
    	return fetch(assertionURL)
    		.then((response) => {return response.json()})
    		.then((data) => {
    			assertionData = data;

    			//Render Items
    			renderRecipientName();
    			renderBadgeImage();
    			renderIssueDate();
    			renderBadgeVerificationLink();

    			return data;
    		})
    }
	
	function getBadgeClassData () {//gets the data about the badge
    	let badgeClassCode = getParameterByName('badgeclass');
    	const badgeClassURL = `https://api.badgr.io/public/badges/${badgeClassCode}.json?v=1_0`;
    	return fetch(badgeClassURL)
    		.then((response) => {return response.json()})
    		.then((data) => {
    			badgeClassData = data;

    			//Render Items
    			renderBadgeName();
    			renderBadgeDescription();
    			renderBadgeNarrative();

    			return data;
    		})
    }

    function getIssuerData () {//gets the data about the issuer
    	let issuerCode = getParameterByName('issuer');
    	const issuerURL = `https://api.badgr.io/public/issuers/${issuerCode}.json?v=1_1`;
    	return fetch(issuerURL)
    		.then((response) => {return response.json()})
    		.then((data) => {
    			issuerData = data;

    			//Render Items
    			renderIssuerName();
    			renderIssuerEmail();
    			return data;
    		})
    }





    //Get The Data
	getAssertionData();
	getBadgeClassData();
	getIssuerData();

});







