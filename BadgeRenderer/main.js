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



	function drawBadge(badgeData, canvasId) {//, canvasId
		let canvas = document.getElementById(canvasId); //document.getElementById("drawCanvas");
		//
	    let ctx = canvas.getContext("2d");

	    async function drawBackground() {
	    	setTimeout(async function() {
	    		let background = new Image();
				background.onload = function () {
   				 ctx.drawImage(background, 0, 0);
				}
				background.onload();
				background.src =  BadgeImageConfig['background'][badgeData['conference']];
	  	    	return;
	  	    	}, 50);
	    	
	    	return;
	    }

	    async function drawSport() {
	    	await drawBackground();
	    	setTimeout(async function() {
	    		let sport = new Image();
				sport.onload = function () {
   				 ctx.drawImage(sport, 0, 0);
				}
				await sport.onload();
				sport.src =  BadgeImageConfig['sport'][badgeData['sport']];
		    	return;
		    }, 100);
		    return; 
	    	
	    }

	     async function drawOverlay() {
	    	await drawSport();
	    	setTimeout(async function() {
	    		let overlay = new Image();
				overlay.onload = function () {
   				ctx.drawImage(overlay, 0, 0);
			}
			await overlay.onload();
			overlay.src =  BadgeImageConfig['overlay'][badgeData['overlay']];
	    	return;
	    	}, 150)
	    	
	    	return;//canvas.toDataURL("image/png");
	    }

	    async function drawText() {
	    	await drawOverlay();
	    	setTimeout(async function(){
	    		ctx.textAlign = "center"; 
	    		ctx.font = "36px Helvetica";
	    		ctx.fillStyle = "#ffffff"; 
				ctx.fillText(badgeData.badgeName, 400, 400);	//220
				ctx.font = "20px Helvetica"; 
	    		ctx.fillText(`Awarded to ${badgeData.recipientName}`, 400, 475);
	    		return;//canvas.toDataURL("image/png");
	    	}, 200)	    	
	    }


	    drawText();
	    return;
	}

	async function renderMultipleBadges() {
		let badges = await getBadgesFromLocalStorage();
		badges.map((badge, index) => {
			let canvasId = `Badge-${index}`;
			$("#badges").append(`<canvas id=${canvasId} height="600" width="800"></canvas>`);
			drawBadge(badge, canvasId);
			return;
		});
		return;
	}
	renderMultipleBadges();

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
				//console.log(drawBadge(decryptQueryString(hash, key)));
				let canvasId = `Badge-${key}`;
				$("#badges").prepend(`<canvas id=${canvasId} height="600" width="800"></canvas>`);
				drawBadge(badgeData, canvasId);
				$("#badgeUnlockStatus").text("Congratulations! Your has been unlocked!");
			} catch(err) {
				console.log(err);
				$("#badgeUnlockStatus").text("");
				feedback.text("Wrong key... Please try again");
			}
		} else {
			feedback.text("You already have this badge")
			$("#badgeUnlockStatus").text("");
		}
		


		// let badgeData dec
		// decrypt
		// renderBadge(decryptQueryString(parseQueryString('ebs'), $("#keyInput").val()));
		// localStorage.set($("#keyInput").val(), )
	});

	console.log(getBadgesFromLocalStorage());

})

