let CryptoJS = require("crypto-js");
let BadgeImageConfig = require("./badgeLayersConfig.js");
const RenderEngine = require("./RenderEngine.js");
const RenderEngineV2 = require("./RenderEngineV2.js");

let jsPDF = require("jspdf");
console.log(BadgeImageConfig);
let decryptedText;
let ciphertext;

function generateBadgeHTML(badgeCanvasId) {
		return `<div><img src="${document.getElementById(badgeCanvasId).toDataURL('image/png', 1.0)}"/></div>`;
}	

$(() => {

	// Contains Keys That Map To A Badge
	let mapOfBadges = {};


	//Parse for queryString parameter
	function parseQueryString(name) { //gets query string parameters
	    const url = window.location.href;
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    let returnParam = decodeURIComponent(decodeURIComponent(results[2].replace(/\+/g, " ")));
	    returnParam = returnParam.replace(/ /g, '+');
	    console.log(returnParam);
	    return returnParam;
	}

	//Decrypt querystring value into its json state - return json object
	function decryptQueryString(hashVal, keyVal) {
		decryptedText = CryptoJS.AES.decrypt(hashVal, keyVal).toString(CryptoJS.enc.Utf8);
		return JSON.parse(decryptedText);
		
	}

	function getBadgesFromLocalStorage() { // Gets the Badge Data From Local Storage
		let badges = [];
		for (element in window.localStorage) {
			if (element.includes("Badge")) {
				badges.push(JSON.parse(window.localStorage[element]));
			}
		}
		return badges;
	}

	async function renderMultipleBadges() { // Renders the Badge Cards of already unlocked badges
		console.log("rendered multiple badges");
		let badges = await getBadgesFromLocalStorage();
		badges.sort(function(a, b) {
			let aDate = new Date(a.awardDate);
			let bDate = new Date(b.awardDate);
			return bDate - aDate;
		});
		badges.map((badge, index) => {
			// Add To The MapofBadges
			let badgeMapKey = "Badge-" + index;
			mapOfBadges[badgeMapKey] = badge;
			console.log(mapOfBadges);
			let canvasId = `Badge-${index}`;
			let badgeCardId = "badgeCard" + index

			// Append Badge Card
			$("#badges").append(`<a href="#badgeStage"><div class="badgeCard" data-badge="${badgeMapKey}">
					<span hidden class='awardName1'>${badge.badgeName} awarded to ${badge.recipientName}</span>
					<div class="badgeImgContainer" id=${badgeCardId}>
					</div>
					<div class="cardInfo">
					<h5><span class="awardName">${badge.badgeName}</span><br/><span class="issuedDate">issued on ${badge.awardDate}</span></h5>
					</div>
			    </div></a>`);

			// Create the Badge Image Based on the stored Image URL
			let badgeImage = new Image();
			badgeImage.src = badge.imageURI;

			// Append the Badge Image to the Respective Badge Card
			document.getElementById(badgeCardId).appendChild(badgeImage);
			
			// A click event handler

			$(".badgeCard").on("click", function(event) { // On Click Show The Badge Data On Badge Stage
						
						let badgeData = mapOfBadges[$(this).attr('data-badge')];
						$("#badge").attr("src", badgeData.imageURI);
						$("#badgeNameDisplay").text(badgeData.badgeName);
						$("#badge").attr("data-badge", badgeMapKey);
						drawCertificate1(badgeData)
					});
			// $("#badges").append(`<div class="badgeContainer">
			// 					 <button class="getBadgeHTMLBtn" data-canvas=${canvasId} onClick="handleCopyHTML(this)">Get Badge HTML</button>
			// 					 <div><a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=I earned the ${badge.badgeName} Badge!">Tweet</a></div>
			// 					 <div class="fb-share-button" data-href="https://jvarilla.github.io/BadgeRenderer/" data-layout="button" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://jvarilla.github.io/BadgeRenderer/" class="fb-xfbml-parse-ignore">Share</a></div>
			// 					 <canvas id=${canvasId} class="badgeCanvas" height="600" width="800"></canvas>
			// 					 </div>`);
			//drawBadge(badge, canvasId);
			return;
		});
	}


	
	renderMultipleBadges();



	

	// Hide and show the unlock badge field as necessary
	if(parseQueryString('ebs')) {
		$("#badgeDisplayed").hide();
		$("#unlockBadge").hide();

	} else {
		$("#needsToBeUnlocked").hide();
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

				// CONVERT BETWEEN BADGE VERSIONS 5/2/2019 TEMPORARY
				badgeData.recipientName = 
					badgeData.recipientFirstName + " " + badgeData.recipientLastName;

				badgeData.issuerName = 
					badgeData.issuerFirstName + " " + badgeData.issuerLastName;

				badgeData.email = badgeData.recipientEmail;

				badgeData.badgeName = badgeData.awardName;
				
				//renderBadge(badgeData);
				console.log(badgeData);
				// $("#badgeImage").attr('src', drawBadge(decryptQueryString(hash, key)));
				//console.log(drawBadge(decryptQueryString(hash, key)));
				let canvasId = `Badge-${key}`;
				$("#badges").append(`<canvas id=${canvasId} height="800" width="1000" hidden></canvas>`);
				// drawBadge(badgeData, canvasId);
				let canvas = document.getElementById(canvasId);
				let oldBadgeConfiguration = [
					{
						type: "image",
						name: "background",
						imagePath: BadgeImageConfig['background'][badgeData['conference']],
						x: 0,
						y: 0
					},
					{
						type: "image",
						name: "sport",
						imagePath: BadgeImageConfig['sport'][badgeData['sport']],
						x: 0,
						y: 0
					},
					{
						type: "image", 
						name: "overlay",
						imagePath: BadgeImageConfig['overlay'][badgeData['overlay']],
						x: 0,
						y: 0
					},
					{
						type: "text",
						name: "badge name",
						fontSize: "36px",
						fontFamily: "Helvetica",
						fontColor: "#ffffff",
						x: 400,
						y: 400,
						text: badgeData.badgeName
					},
					{
						type: "text",
						name: "recpient name",
						fontSize: "20px",
						fontFamily: "Helvetica",
						x: 400,
						y: 475,
						text: badgeData.recipientName
					}
				]

				let backgroundImgPath = BadgeImageConfig['background']['distinction']['v4'][badgeData.distinction];
				console.log("Distinction", backgroundImgPath);
				let sportImgPath = BadgeImageConfig['sport']['v4'][badgeData['sport']][(new Date(badgeData['awardDate'])).getFullYear() % 2];
				console.log("Sport", sportImgPath);

				// let renderEngineV2 = new RenderEngineV2(canvas, [
				// 	{
				// 		type: "image",
				// 		name: "background",
				// 		imagePath: backgroundImgPath,
				// 		x: 125,
				// 		y: 0
				// 	},
				// 	{
				// 		type: "image",
				// 		name: "sport",
				// 		imagePath: sportImgPath,
				// 		x: 325,
				// 		y: 455
				// 	},
				// 	{
				// 		type: "text",
				// 		name: "badge name",
				// 		fontSize: "45px",
				// 		fontFamily: "Helvetica",
				// 		fontColor: "white",
				// 		x: 380,
				// 		y: 435,
				// 		text: badgeData.awardName
				// 	},
				// 	{
				// 		type: "text",
				// 		name: "recpient name",
				// 		fontSize: "28px",
				// 		fontColor: "black",
				// 		fontFamily: "Helvetica",
				// 		x: 380,
				// 		y: 160,
				// 		text: badgeData.recipientName
				// 	}
				// ] )
				// renderEngineV2.setScaleFactor(1.8, 1.8);
				// renderEngineV2.drawLayersMethodConditional()

				let renderEngine = new RenderEngine(canvas, [
					{
						type: "image",
						name: "background",
						imagePath: backgroundImgPath,
						x: 125,
						y: 0
					},
					{
						type: "image",
						name: "sport",
						imagePath: sportImgPath,
						x: 330,
						y: 600
					},
					{
						type: "text",
						name: "badge name",
						fontSize: "50px",
						fontFamily: "Helvetica",
						fontColor: "white",
						x: 400,
						y: 565,
						text: badgeData.awardName
					},
					{
						type: "text",
						name: "recpient name",
						fontSize: "28px",
						fontColor: "black",
						fontFamily: "Helvetica",
						x: 410,
						y: 220,
						text: badgeData.recipientName
					}
				] )
				//renderEngine.setScaleFactor(1.8, 1.8);
				renderEngine.drawImage()
				.then((output) => {
					let imageURI = canvas.toDataURL("imageURI/png");
					badgeData.imageURI = imageURI;
					let myImage = new Image();
					myImage.src = imageURI;
					return myImage
				})
				.then((myImage) => {
					// The data URL stored inside the badge object in local storage is correct but the one used as an image source is incorrect		
					window.localStorage.setItem('Badge' + hash, JSON.stringify(badgeData));
					let badgeMapKey = "Badge-" + Object.keys(mapOfBadges).length
					mapOfBadges[badgeMapKey] = badgeData;
					console.log(mapOfBadges);
					$(canvasId).remove();
					let cardId = badgeData.badgeName+badgeData.recipientName;
					$("#badges").append(`<a href="#badgeStage"><div class="badgeCard" data-badge="${badgeMapKey}" id="${cardId}-Card">
						<div class="badgeImgContainer" id="${cardId}" >
						</div>
						<div class="cardInfo">
						<h5><span class="awardName">${badgeData.badgeName} awarded to ${badgeData.recipientName}</span><br/><span class="issuedDate">issued on ${badgeData.awardDate}</span></h5>
						</div>
			   		 </div></a>`);
					document.getElementById(cardId).appendChild(myImage);
					let cardSelectorString = "#" + cardId + "-Card";
					$(cardSelectorString).on("click", function(event) {
						console.log(this);
						//Set Badge Image to Badge Stage
						//let imageURI = $(this).children(".badgeImgContainer").children("img").attr("src");
						
						$("#badge").attr("src", badgeData.imageURI);
						$("#badge").attr("data-badge", badgeMapKey);
						$("#badgeNameDisplay").text(badgeData.badgeName);
					});
					$("#badgeUnlockStatus").text("Congratulations! Your has been unlocked!");
					$("#badgeDisplayed").show();
					$("#needsToBeUnlocked").hide();
					$("#unlockBadge").show();
					$("#badge").attr("src", badgeData.imageURI);
					$("#badgeNameDisplay").text(badgeData.badgeName);
					drawCertificate1(badgeData)
				});	
			} catch(err) {
				console.log(err);
				$("#badgeUnlockStatus").text("");
				feedback.text("Wrong key... Please try again");
			}
		} else {
			feedback.text("You already have this badge")
			$("#badgeUnlockStatus").text("");
		}
	});

	console.log(getBadgesFromLocalStorage());
	
	
	// When a badge card is clicked load that badge onto the badge stage
	// $(".badgeCard").on('click', function(evt) {
	// 	// Get Badge Image Src
	// 	console.log(this);
	// 	//const badgeURI = $()
	// })
	function drawCertificate1(badgeData) {
		let imageURI = badgeData.imageURI;
		console.log(imageURI);
		let certificateCanvas = document.getElementById("myCertificate");
		// Clear Canvas
		let context = certificateCanvas.getContext("2d");
		context.clearRect(0, 0, certificateCanvas.width, certificateCanvas.height);
		//certificateCanvas.style.display = "block";
		let certRender = new RenderEngine(certificateCanvas, [
				{
					type: "image",
					name: "certBase",
					imagePath: './CertificateAssets/Certificate_Blank.PNG',
					x: 0,
					y: 0
				},
				// {
				// 	type: "image",
				// 	name: "badge",
				// 	imagePath: imageURI,
				// 	x: 100,
				// 	y: 100
				// },
				{
					type: "image",
					name: "sport",
					scalex: 2.5,
					scaley: 2.5,
					x: 130,
					y: 140,
					imagePath: BadgeImageConfig['sport'][badgeData.sport][1]
				},
				{
					type: "text",
					name: "date",
					fontSize: "30px",
					fontFamily: "SignatureScript",
					x: 540,//440,
					y: 720, // 690,
					text: `May 8th, 2019`
				},
				{
					type: "text",
					name: "recipientName",
					fontSize: "54px",
					fontFamily: "RobotoLight",
					x: 675,//440,
					y: 320, // 690,
					text: badgeData.recipientName
				},
				{
					type: "text",
					name: "title",
					fontSize: "45px",
					fontFamily: "SignatureScript",
					x: 500,
					y: 50,
					text: `${badgeData.badgeName} Awarded To ${badgeData.recipientName}`
				},
				{
					type: "text",
					name: "issuer",
					fontSize: "30px",
					fontFamily: "Serif",
					x: 600,
					y: 700,
					text: `Awarded by ${badgeData.issuerName}, Director of Sports Administration on ${badgeData.awardDate}.`
				}
			]);
		certRender.setScaleFactor(1.11510031679, 1.11627906977);
		certRender.drawImage();
	}

	let download = document.getElementById("pdfBtn");
		download.addEventListener("click", function() {
			let certCanvas = document.getElementById("myCertificate")
			var imgData = certCanvas.toDataURL("image/png");
			//certCanvas.style.display = "block";
	  		var pdf = new jsPDF('l');
	  		//pdf.addImage(imgData, 'JPEG', 15, 40, 180, 160)
	  		pdf.addImage(imgData, 'JPEG', 0, 0);
	  		pdf.save("download.pdf");
	  	}, false);	
});

