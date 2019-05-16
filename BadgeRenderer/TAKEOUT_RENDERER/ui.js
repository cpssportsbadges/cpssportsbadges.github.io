/* Unencrypted Sample JSON
	{
		recipientName: Jane Doe ,
		badgeName: Sports Badge,
		badgeImage: "sports.png"
	}
*/

import CryptoJS from 'bundle.js';
let ciphertext;
$(() => {

	ciphertext = CryptoJS.AES.encrypt('abv', '123');
	//Parse for queryString parameter
	// function parseQueryString (param) {

	// }

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

