var CryptoJS = require("crypto-js");
let decryptedText;
let ciphertext;
$(() => {

	ciphertext = CryptoJS.AES.encrypt('abv', '123');
	console.log('o')
	console.log(ciphertext.toString());
	//Parse for queryString parameter
	console.log('hi')
	function parseQueryString(name) { //gets query string parameters
	    const url = window.location.href;
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	console.log(parseQueryString('d'));
	//Decrypt querystring value into its json state - return json object
	function decryptQueryString (keyVal, hashVal) {
		decryptedText = CryptoJS.AES.decrypt(hashVal, keyVal).toString(CryptoJS.enc.Utf8);
		console.log('hi');
		return decryptedText.toString(CryptoJS.enc.Utf8);
		
	}

	
		decryptQueryString(ciphertext, '123');
		console.log(decryptQueryString('U2FsdGVkX1+V4LOoP96GD0d6Fn7yI9sOvqF6lkDWUu0=', '123'));
	//Render json values in the view
	function renderBadge (badgeData){
		//Render Badge Recipient Name
		$("#recipientName").text(badgeData.recipientName);
		//Render Badge Name
		$("#badgeName").text(badgeData.badgeName);
		//Render Badge Image
		$("#badgeImage").attr('src', `./assets/${badgeData.badgeImage}`);
	}

	//Store json value in browser using websql


	$("#unlockBadgeBtn").on('click', function(event) {
		renderBadge(decryptQueryString($("#keyInput").text(), parseQueryString('ebs')));
	});


})

