var CryptoJS = require("crypto-js");
let decryptedText;
let ciphertext;
let jsonObj = {
		recipientName: "Jane Doe" ,
		badgeName: "Sports Badge",
		badgeImage: "sports.png"
	};
$(() => {
	console.log(JSON.stringify(jsonObj))
	ciphertext = CryptoJS.AES.encrypt(JSON.stringify(jsonObj), '123');
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
	    let returnParam = decodeURIComponent(decodeURIComponent(results[2].replace(/\+/g, " ")))
	    returnParam = returnParam.replace(/ /g, '+');
	    console.log(returnParam);
	    return returnParam;
	}
	//Decrypt querystring value into its json state - return json object
	function decryptQueryString(hashVal, keyVal) {
		decryptedText = CryptoJS.AES.decrypt(hashVal, keyVal).toString(CryptoJS.enc.Utf8);
		return JSON.parse(decryptedText);
		
	}

	console.log('dyanmic', decryptQueryString(parseQueryString('ebs'),'123'))
   console.log('static', decryptQueryString('U2FsdGVkX1/L9yvTZROXyALoAA8bjeVSLdgL3rKHd8FGFf3ERoqbRYVVKzYLqepmGfKv0SILSTrftaw9/qLu+4U+LT/Sj5kfuEv0lsUR3B6YhT9Tkx+pBSMbvRgdc5ohFu/VChWK65QRFx9ufUjZfg==', '123'));
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
		renderBadge(decryptQueryString(parseQueryString('ebs'), $("#keyInput").val()));
	});


})

