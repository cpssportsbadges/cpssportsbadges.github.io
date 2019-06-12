/* 
  main.js
  About: 
  Powers the user interface
  of the BadgeRenderer. This file makes
  use of jQuery and some NPM packages.

  main.js does not actually get sent to
  the user's browser, you need to build all
  the dependencies into bundle.js which get sent over.

  Created by: Joseph Varilla
  Last Edited: 5/16/2019
*/
let CryptoJS = require("crypto-js");
let BadgeImageConfig = require("./badgeLayersConfig.js");
const RenderEngine = require("./RenderEngine.js");
//const RenderEngineV2 = require("./RenderEngineV2.js");

let jsPDF = require("jspdf");
let decryptedText;
let ciphertext;
let insertingANewBadge = false;
// Dates and months used for certificate generation
const datesWithSuffixes = ['0th', '1st', '2nd', '3rd', 
	'4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th',
	'12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th',
	'20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th',
	'28th', '29th', '30th', '31st'];

const monthNames = ['January', 'February', 'March', 'April',
	'May', 'June', 'July', 'August', 'September', 'October', 'November',
	'December'];

/* Generate Formal Date String For Certificate */
function generateFormalDateString(date) {
	let dayOfMonth = date.getDate();
	let month = date.getMonth();
	let year = date.getFullYear();
	return `${monthNames[month]} ${datesWithSuffixes[dayOfMonth]}, ${year}`;
}
/* Creates the badge html that is embeddable */
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
	    // Remove fragment part of the url
	    // url = url.split("#")[0];
	    name = name.replace(/[\[\]]/g, "\\$&");
	    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    let returnParam = decodeURIComponent(decodeURIComponent(results[2].replace(/\+/g, " ")));
	    returnParam = returnParam.replace(/ /g, '+');
	    return returnParam;
	}

	//Decrypt querystring value into its json state - return json object
	function decryptQueryString(hashVal, keyVal) {
		decryptedText = CryptoJS.AES.decrypt(hashVal, keyVal).toString(CryptoJS.enc.Utf8);
		return JSON.parse(decryptedText);
		
	}

	// Gets the Badge Data From Local Storage
	function getBadgesFromLocalStorage() { 
		let badges = [];
		for (element in window.localStorage) {
			if (element.includes("Badge") && window.localStorage[element] !== null) {
				try {
					badges.push(JSON.parse(window.localStorage[element]));
				} catch (err) {
					continue;
				}
				
			}
		}
		return badges;
	}

	// Renders the Badge Cards of already unlocked badges
	// Sorts by recency of award new badges to the left
	async function renderMultipleBadges() { 
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
			return;
		});
	}

	// Call to render the mutiple badges
	renderMultipleBadges();


	// Hide and show the unlock badge field as necessary
	if(parseQueryString('ebs')) {
		$("#badgeDisplayed").hide();
		$("#unlockBadge").hide();

	} else {
		$("#needsToBeUnlocked").hide();
	}

	// Handles if a badge is unlocked
	$("#unlockBadgeBtn").on('click', function(event) {
		// Get Key to use to unlock the badge
		let key = $("#keyInput").val();
		let feedback = $("#feedback");
		let hash = parseQueryString('ebs');

		/* If the badge does not yet exist in local storage
		   If you don't have the badge already */
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
				let sportConverter = badgeData.sport.toLowerCase().trim().replace(/ +/g, '_');
				badgeData.sport = sportConverter;
				// Create canvas to draw the badge
				let canvasId = `Badge-${key}`;
				$("#badges").append(`<canvas id=${canvasId} height="800" width="1000" hidden></canvas>`);
				let canvas = document.getElementById(canvasId);
				
				// Get the correct badge image layers based on badge data

				// Get the correct badge background based on distinction
				let backgroundImgPath = BadgeImageConfig['background']['distinction']['v4'][badgeData.distinction];
				
				/* Get the correct badge sport layer
					Switch between blue and white icons in alternating years
					If the distinction is 1 (Gold) use the gold sports image
				*/

				let sportLayerSelectorValue;
				if (badgeData['distinction'] == 1) { // use gold sport badge
					sportLayerSelectorValue = "gold";
				} else { // determine whether it is an even or odd year
					sportLayerSelectorValue = (new Date(badgeData['awardDate'])).getFullYear() % 2;
				}
				
				// Set the sport img path to the the correct sport or the default
				let sportImgPath;
				try {
					sportImgPath = BadgeImageConfig['sport']['v4'][badgeData['sport']][sportLayerSelectorValue];
				} catch (err) {
					sportImgPath =	BadgeImageConfig['sport']['v4']['x'][sportLayerSelectorValue];
				}
				// Render the badge
				let renderEngine = new RenderEngine(canvas, [
					{
						type: "image",
						name: "background",
						imagePath: backgroundImgPath,
						x: 175,
						y: 0
					},
					{
						type: "image",
						name: "sport",
						imagePath: sportImgPath,
						x: 380,
						y: 580//610
					},
					{
						type: "text",
						textAlign: "center",
						name: "badge name",
						fontSize: "50px",
						fontFamily: "Helvetica",
						fontColor: "white",
						maxTextWidth: 550,
						x: 470,//450,
						y: 565,
						text: badgeData.awardName
					},
					{
						type: "text",
						name: "recpient name",
						maxTextWidth: 360,
						textAlign: "center",
						fontSize: "28px",
						fontColor: "black",
						fontFamily: "Helvetica",
						x: 470,//460,
						y: 220,
						text: badgeData.recipientName
					}
				] )
				
				renderEngine.drawLayersAsync()//renderEngine.drawImage()
				.then((output) => { // Create a image url of the badge image to store
					let imageURI = canvas.toDataURL("imageURI/png");
					badgeData.imageURI = imageURI;
					let myImage = new Image();
					myImage.src = imageURI;
					return myImage
				})
				.then((myImage) => {
					// Store the badge image url along with badge data in local storage	
					if (badgeData !== null) {
						insertingANewBadge = true;
						window.localStorage.setItem('Badge' + hash, JSON.stringify(badgeData));
						insertingANewBadge = false;
						let badgeMapKey = "Badge-" + Object.keys(mapOfBadges).length
						mapOfBadges[badgeMapKey] = badgeData;
						// Remove canvas used to draw the badge
						$(canvasId).remove();

						// Generate badge card to display newly unlocked badge
						let cardId = "justUnlockedBadge"; //badgeData.badgeName+badgeData.recipientName;
						$("#badges").append(`<a href="#badgeStage"><div class="badgeCard" data-badge="${badgeMapKey}" id="${cardId}-Card">
							<div class="badgeImgContainer" id="${cardId}" >
							</div>
							<div class="cardInfo">
							<h5><span class="awardName">${badgeData.badgeName}</span><br/><span class="issuedDate">issued on ${badgeData.awardDate}</span></h5>
							</div>
				   		 </div></a>`);
						document.getElementById(cardId).appendChild(myImage);
						let cardSelectorString = "#" + cardId;

						// Attach an event handler that allows the badge to be put in focus if selected
						$(cardSelectorString).on("click", function(event) {
							//Set Badge Image to the top center of the sceen (enlarged)
							$("#badge").attr("src", badgeData.imageURI);
							$("#badge").attr("data-badge", badgeMapKey);
							$("#badgeNameDisplay").text(badgeData.badgeName);
						});

						// Hide unlock badge components like the input form
						// Display the unlocked badge
						$("#badgeUnlockStatus").text("Congratulations! Your has been unlocked!");
						$("#badgeDisplayed").show();
						$("#needsToBeUnlocked").hide();
						$("#unlockBadge").show();
						$("#badge").attr("src", badgeData.imageURI);
						$("#badge").attr("data-badge", badgeMapKey);
						$("#badgeNameDisplay").text(badgeData.badgeName);
						drawCertificate1(badgeData)
					}
				});	
			} catch(err) { // Wrong key was entered
				$("#badgeUnlockStatus").text("");
				feedback.text("Wrong key... Please try again");
			}
		} else { // You already have the badge
			feedback.text("You already have this badge")
			$("#badgeUnlockStatus").text("");
		}
	});
	
	
	// Draw the certificate based on badge data
	function drawCertificate1(badgeData) {
		// Get reference to certicate drawing canvas
		let certificateCanvas = document.getElementById("myCertificate");
		// Clear Canvas
		let context = certificateCanvas.getContext("2d");

		// Reset the canvas by drawing a blank layer over everything
		context.clearRect(0, 0, certificateCanvas.width, certificateCanvas.height);
		
		let sportImgPath;
				try {
					sportImgPath = BadgeImageConfig['sport']['v4'][badgeData['sport']][1];
				} catch (err) {
					sportImgPath =	BadgeImageConfig['sport']['v4']['x'][1];
				}
		// Draw the certificate
		let certRender = new RenderEngine(certificateCanvas, [
				{
					type: "image",
					name: "certBase",
					imagePath: './CertificateAssets/CERTIFICATE_FINAL_BLANK.png',
					x: 0,
					y: 0
				},
				{
					type: "image",
					name: "sport",
					x: 120,//130,
					y: 140,
					// Set the sport image to the corresponding one or a default of the academic one
					imagePath: sportImgPath
				},
				{
					type: "text",
					name: "date",
					textAlign: "left",
					fontSize: "30px",
					fontColor: "#012c5e",
					fontFamily: "SignatureScript",
					maxTextWidth: 210,
					x: 418,
					y: 740,
					text: generateFormalDateString(new Date(badgeData.awardDate))//badgeData.awardDate.to
				},
				{
					type: "text",
					name: "issuer",
					fontSize: "30px",
					fontColor: "#012c5e",
					textAlign: "left",
					fontFamily: "SignatureScript",
					maxTextWidth: 210,
					x: 763,//850,//440,
					y: 740, // 690,
					text: badgeData.issuerName
				},
				{
					type: "text",
					name: "recipientName",
					textAlign: "center",
					fontSize: "60px",
					fontColor: "#012c5e",
					fontFamily: "Verdana",
					maxTextWidth: 650,
					x: 686,//700,
					y: 380,
					text: badgeData.recipientName
				},
				{
					type: "text",
					name: "awardName",
					textAlign: "center",
					fontSize: "42px",
					fontColor: "#012c5e",
					fontFamily: "Verdana",
					maxTextWidth: 600,
					x: 686,//700,//440,
					y: 450, // 690,
					text: badgeData.awardName
				},
				{
					type: "text",
					name: "date-label",
					textAlign: "left",
					fontSize: "18px",//"24px",
					fontColor: "#012c5e",
					fontFamily: "Verdana",
					maxTextWidth: 210,
					x: 418,//x: 440,
					y: 765,
					text: "Date"
				},
				{
					type: "text",
					name: "issuerTitle",
					maxTextWidth: 210,
					textAlign: "left",
					fontSize: "18px",//"24px",
					fontColor: "#012c5e",
					fontFamily: "Verdana",
					x: 763,
					y: 765,
					text: badgeData.issuerTitle
					
				}

			]);
		certRender.drawLayersAsync();
	}

	// Handles the download of the certificate
	let download = document.getElementById("pdfBtn");
		download.addEventListener("click", function() {
			let certCanvas = document.getElementById("myCertificate")
			var imgData = certCanvas.toDataURL("image/png");
	  		var pdf = new jsPDF('l');
	  		pdf.addImage(imgData, 'JPEG', 0, 0);
	  		let badgeData = mapOfBadges[$("#badge").attr('data-badge')];
	  		// Uses Badge Data in the Downloaded File Name
	  		pdf.save(`${badgeData.recipientName}-${badgeData.awardName}-${badgeData.awardDate}.pdf`);
	  	}, false);	


	// Download Badge Image
	function downloadURI(uri, name) {
	  var link = document.createElement("a");
	  link.download = name;
	  link.href = uri;
	  document.body.appendChild(link);
	  link.click();
	  document.body.removeChild(link);
	  delete link;
	}

	function generateBadgeFileName(badgeData) {
		let awardDate = badgeData.awardDate.replace(/\//ig, "_")
		return `${badgeData.awardName}-${badgeData.recipientName}-${awardDate}-badge.png`;
	}
	function downloadBadgeImage(badgeData, fileName) {
		downloadURI(badgeData.imageURI, fileName);
	}

	// Close Button Event Handler
	var closeButton = document.querySelector(".close-button");
	closeButton.addEventListener("click", function() {
			var modal = document.querySelector(".modal");
			modal.classList.toggle("show-modal");
		});

	function showModal(stepsArr, linkToSocialURL="0", socialLocation="0") {
		$("#howToSteps").empty();
		var modal = document.querySelector(".modal");
		modal.classList.toggle("show-modal");
		stepsArr.forEach((step, idx) => {
			$("#howToSteps").append(`<li id="step-${idx}">${step.text}</li>`);
		})

		let proceedToSocialBtn = $("#proceedToSocialBtn");
		if (linkToSocial != "0" && socialLocation != "0") {
			proceedToSocialBtn.show();
			proceedToSocialBtn.text(`Go To: ${socialLocation}`);
			$("#linkToSocial").attr("href", linkToSocialURL);
		} else {
			proceedToSocialBtn.hide();
			proceedToSocialBtn.text(``);
		}
	}

	// Social Media Buttons Event Handlers
	$("#facebookBtn").on('click', function() {
		// Download Badge Image
		//window.open('https://www.facebook.com', '_blank');
		let badgeData = mapOfBadges[$("#badge").attr('data-badge')];
		let fileName = generateBadgeFileName(badgeData);

		let facebookSteps = [
			{
				stepNumber: 1,
				text: `Upload ${fileName} To Post (being downloaded right now)`
			},
			{
				stepNumber: 2,
				text: "Hit Share"
			}
		];
		
		
		showModal(facebookSteps, "https://www.facebook.com", "Facebook");
		downloadBadgeImage(badgeData, fileName);
	});

	$("#twitterBtn").on('click', function() {
		let badgeData = mapOfBadges[$("#badge").attr('data-badge')];
		let fileName = generateBadgeFileName(badgeData);
		let twitterSteps = [
			{
				stepNumber: 1,
				text: `Upload ${fileName} To Post (being downloaded right now)`
			},
			{
				stepNumber: 2,
				text: "Hit Tweet"
			}
		];
		
		showModal(twitterSteps, "https://www.twitter.com", "Twitter");
		// Download Badge Image
		downloadBadgeImage(badgeData, fileName);
	});

	$("#embedHTMLBtn").on('click', function() {
		let badgeData = mapOfBadges[$("#badge").attr('data-badge')];
		let fileName = generateBadgeFileName(badgeData);
		let embedHTMLSteps = [
			{
				stepNumber: 1,
				text: "Upload the image to the a folder in your site"
			},
			{
				stepNumber: 2,
				text: `Copy the following into the HTML file\n
					   &lt;img src="{PATH}/${fileName} /&gt;`
			},
			{
				stepNumber: 3,
				text:  `Replace {PATH} with the file path of folders you stored the picture in.\n
					   (remove the curly braces too {} but keep the quotes and the <>) \n
					   HINT: A file path looks like ./site/assets`
			}
		];
		showModal(embedHTMLSteps);
		// Download Badge Image
		downloadBadgeImage(badgeData, fileName);
	});

});

/* Prevents the user from making changes to local storage */
// window.addEventListener('storage', function(e) {
//   if (e.newValue !== null || !insertingANewBadge) {// Allow them to delete records
//   	  localStorage.setItem(e.key, e.oldValue);
//   }
// })

