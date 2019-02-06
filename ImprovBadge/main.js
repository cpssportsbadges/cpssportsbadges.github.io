var CryptoJS = require("crypto-js");

let ciphertext;
$(() => {

	ciphertext = CryptoJS.AES.encrypt('abv', '123');
	console.log(ciphertext.toString());
	//Parse for queryString parameter
	const url = window.location.href;
	function parseQueryString(name) { //gets query string parameters
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
	// function decryptQueryString (keyVal, hashVal) {

	// }



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

