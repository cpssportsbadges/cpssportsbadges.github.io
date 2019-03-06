let CryptoJS = require("crypto-js");
let BadgeImageConfig = require("./badgeLayersConfig.js");
console.log(BadgeImageConfig);
let decryptedText;
let ciphertext;
// let jsonObj = {//Sample Unencrypted Object
// 		recipientName: "Jane Doe" ,
// 		badgeName: "Sports Badge",
// 		badgeImage: "sports.png"
// 	};

window.onLoad = function() {
	let canvas = document.getElementById("drawCanvas");
	console.log('canvas', canvas);
	let ctx = canvas.getContext("2d");
	function paintBadge(back, over, sport) {
		console.log('b', back);
		console.log('o', over);
		ctx.drawImage(back, 0, 0);
		ctx.drawImage(over, 0, 0);
		ctx.drawImage(sport, 0, 0);
		ctx.fillText("Hello World", 10, 50);
}
}



	

$(() => {
	//Parse for queryString parameter
	function parseQueryString(name) { //gets query string parameters
	    const url = window.location.href;
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
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

	function getBadgesFromLocalStorage() {
		let badges = [];
		for (element in window.localStorage) {
			if (element.includes("Badge")) {
				badges.push(JSON.parse(window.localStorage[element]));
			}
		}
		return badges;
	}

	function drawBadge(badgeData) {
		let canvas = document.getElementById("drawCanvas");
	    let ctx = canvas.getContext("2d");

	    async function drawBackground() {
	    	let background = new Image();
				background.onload = function () {
   				 ctx.drawImage(background, 0, 0);
			}
			background.src =  BadgeImageConfig['background'][badgeData['conference']];
	    	return;
	    }

	    async function drawSport() {
	    	await drawBackground();
	    	let sport = new Image();
				sport.onload = function () {
   				 ctx.drawImage(sport, 0, 0);
			}
			sport.src =  BadgeImageConfig['sport'][badgeData['sport']];
	    	return;
	    }

	     async function drawOverlay() {
	    	await drawSport();
	    	let overlay = new Image();
				overlay.onload = function () {
   				 ctx.drawImage(overlay, 0, 0);
			}
			overlay.src =  BadgeImageConfig['overlay'][badgeData['overlay']];
	    	return;//canvas.toDataURL("image/png");
	    }
	    drawOverlay();
	    return;
	}


	// function renderBadgesFromLocalStorage() {
		

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
		let key = $("#keyInput").val();
		let feedback = $("#feedback");
		let hash = parseQueryString('ebs');
		//console.log(localStorage[hash]);
		//let badgeData = decryptQueryString(hash, key);
		if (!window.localStorage['Badge' + hash]) {
			try {
				let badgeData = decryptQueryString(hash, key);
				window.localStorage.setItem('Badge' + hash, JSON.stringify(badgeData));
				//renderBadge(badgeData);
				console.log(badgeData);
				// $("#badgeImage").attr('src', drawBadge(decryptQueryString(hash, key)));
				console.log(drawBadge(decryptQueryString(hash, key)));
			} catch(err) {
				console.log(err);
				feedback.text("Wrong key... Please try again");
			}
		} else {
			feedback.text("You already have this badge")
		}
		


		// let badgeData dec
		// decrypt
		// renderBadge(decryptQueryString(parseQueryString('ebs'), $("#keyInput").val()));
		// localStorage.set($("#keyInput").val(), )
	});

	console.log(getBadgesFromLocalStorage());

})

