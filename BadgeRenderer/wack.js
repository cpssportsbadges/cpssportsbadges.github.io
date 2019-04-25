let CryptoJS = require("crypto-js");
let BadgeImageConfig = require("./badgeLayersConfig.js");
console.log(BadgeImageConfig);
let decryptedText;
let ciphertext;

function generateBadgeHTML(badgeCanvasId) {
		return `<div><img src="${document.getElementById(badgeCanvasId).toDataURL('image/png', 1.0)}"/></div>`;
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

	    let ctx = canvas.getContext("2d");

	    let num = 0;

	    let background = `<img id="background" src=${BadgeImageConfig['background'][badgeData['conference']]} hidden/>`;
	    let sport = `<img id="sport" src=${BadgeImageConfig['sport'][badgeData['sport']]} hidden/>`;
	    let overlay = `<img id="overlay" src=${BadgeImageConfig['overlay'][badgeData['overlay']]} hidden/>`;

	    function dTextLayer() {
	   		ctx.textAlign = "center"; 
    		ctx.font = "36px Helvetica";
    		ctx.fillStyle = "#ffffff"; 
			ctx.fillText(badgeData.badgeName, 400, 400);	//220
			ctx.font = "20px Helvetica"; 
    		ctx.fillText(`Awarded to ${badgeData.recipientName}`, 400, 475);
    		console.log("text drawn");
    		let uri = canvas.toDataURL("image/png");
    		console.log(uri);
    		return uri;
	   	}
	    return $("#scratchSpace").append(background, function() {
	    	ctx.drawImage(document.getElementById("background"), 0, 0);
	    	console.log('background');
	    	return $("#scratchSpace").append(sport, function() {
	    		ctx.drawImage(document.getElementById("sport"), 0, 0);
	    		console.log('sport');
	    		return $("#scratchSpace").append(overlay, function() {
	    			ctx.drawImage(document.getElementById("overlay"), 0, 0);
	    			console.log('overlay');
	    			return dTextLayer();
	    	})
	    })
    })
}
	    
	  //  	function dBackgroundLayer() {
	  //  		let background = new Image();
	  //  		let drawn = false
	  //  		background.id = "background";
			// background.src = BadgeImageConfig['background'][badgeData['conference']];
			// background.onload = function () {
			// 	 ctx.drawImage(background, 0, 0);
			// 	 drawn = true;
			// 	 console.log("background drawn");
			// 	  num++;

			// }
			// background.onload();
			// console.log(background.src);
			// console.log(background);
			// while (!drawn) {
			// 	console.log("waiting...". background.width);
			// }
	  //  	}

	  //  	function dSportLayer() {
	  //  		let sport = new Image();
			// sport.onload = function () {
			// 	 ctx.drawImage(sport, 0, 0);
			// 	 console.log("sport drawn");
			// 	  num++;
			// }
			// sport.src =  BadgeImageConfig['sport'][badgeData['sport']];
			// sport.onload();
				
	  //  	}

	  //  	function dOverlayLayer() {
	  //  		let overlay = new Image();
			// overlay.onload = function () {
   // 			ctx.drawImage(overlay, 0, 0);
   // 			 console.log("overlay drawn");
   // 			  num++;
			// }
			// overlay.src =  BadgeImageConfig['overlay'][badgeData['overlay']];
			// overlay.onload();
			
	 //  	}

	  

	  // 	function paintBadge(callback1, callback2, callback3, callback4) {
	   		
	   		// setTimeout(function() {
	   		// 	callback1();
	   		// 	num++;
	   		// }, 500);
	   		// setTimeout(function() {
	   		// 	callback2();
	   		// 	num++
	   		// }, 1000);
	   		// setTimeout(function() {
	   		// 	callback3();
	   		// 	num++;
	   		// }, 1500);
	   		// setTimeout(function() {
	   		// 	callback4();
	   		// 	num++
	   		// }, 2000);
	   		
	   		// callback1();
	   	// 	callback2();
	   	// 	callback3();
	   	// 	callback4();
	   	// 	while (num < 4) {
	   	// 		console.log("waiting", num);
	   	// 	}
	   	// 	return canvas.toDataURL("image/png");
	   		
	   	// }

	    // return paintBadge(dBackgroundLayer, dSportLayer, dOverlayLayer, dTextLayer);;

	

	
		
	async function renderMultipleBadges() {
		let badges = await getBadgesFromLocalStorage();
		badges.map((badge, index) => {
			let canvasId = `Badge-${index}`;
			$("#badges").append(`<div class="badgeCard">
					<div class="badgeImgContainer">
						<img src=${badge.imageURI}
					</div>
					<div class="cardInfo">
					<h5><span class="awardName">Most Valuable Player Fall 2019</span><br/><span class="issuedDate">issued on 2/12/19</span></h5>
					</div>
			    </div>`);
			$(".badgeCard").on("click", function(event) {
						alert("Hi");
						let imageURI = $(this).children(".badgeImgContainer").children("img").attr("src");
						alert(imageURI);
						$("#badge").attr("src", imageURI);
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

	// Hide and show the unlock badge field as necessary
	if(parseQueryString('ebs')) {
		$("#badgeDisplayed").hide();

	} else {
		$("#needsToBeUnlocked").hide();
		$("#unlockBadge").css("width", "75%");
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
				//renderBadge(badgeData);
				console.log(badgeData);
				// $("#badgeImage").attr('src', drawBadge(decryptQueryString(hash, key)));
				//console.log(drawBadge(decryptQueryString(hash, key)));
				let canvasId = `Badge-${key}`;
				
				$("#badges").prepend(`<canvas id=${canvasId} height="600" width="800" hidden></canvas>`);
				// drawBadge(badgeData, canvasId);
				// let canvas = document.getElementById(canvasId);
				let canvas = document.getElementById(canvasId); //document.getElementById("drawCanvas");

			    let ctx = canvas.getContext("2d");

			    let num = 0;

			    //
			    let background = "<img id='background' src=" + BadgeImageConfig['background'][badgeData['conference']] + " hidden/>";
			    let sport = "<img id='sport' src=" + BadgeImageConfig['sport'][badgeData['sport']] + "hidden/>";
			    let overlay = "<img id='overlay' src=" + BadgeImageConfig['overlay'][badgeData['overlay']] + "hidden/>";

			    function dTextLayer() {
			   		ctx.textAlign = "center"; 
		    		ctx.font = "36px Helvetica";
		    		ctx.fillStyle = "#ffffff"; 
					ctx.fillText(badgeData.badgeName, 400, 400);	//220
					ctx.font = "20px Helvetica"; 
		    		ctx.fillText(`Awarded to ${badgeData.recipientName}`, 400, 475);
		    		console.log("text drawn");
		    		let uri = canvas.toDataURL("image/png");
		    		console.log(uri);
		    		return uri;
			   	}

			    $("#scratchSpace").append(background, function() {
			    	console.log(background);
			    	let b1 = document.getElementById("background");
			    	ctx.drawImage(b1, 0, 0);
			    	console.log("hi");
			    	console.log('background');
			    	
			    	$("#scratchSpace").append(sport, function() {
			    		let s1 = document.getElementById("sport")
			    		ctx.drawImage(s1 , 0, 0);
			    		console.log('sport');
			    		$("#scratchSpace").append(overlay, function() {
			    			let o1 = document.getElementById("overlay")
			    			ctx.drawImage(o1, 0, 0);
			    			console.log('overlay');
			    			ctx.textAlign = "center"; 
				    		ctx.font = "36px Helvetica";
				    		ctx.fillStyle = "#ffffff"; 
							ctx.fillText(badgeData.badgeName, 400, 400);	//220
							ctx.font = "20px Helvetica"; 
				    		ctx.fillText(`Awarded to ${badgeData.recipientName}`, 400, 475);
				    		console.log("text drawn");
				    		let uri = canvas.toDataURL("image/png");
				    		console.log(uri);
				    		badgeData.imageURI = uri; // canvas.toDataURL('image/png', 1.0);
							window.localStorage.setItem('Badge' + hash, JSON.stringify(badgeData));
							$(canvasId).remove();
							$("#badges").append(`<div class="badgeCard">
								<div class="badgeImgContainer">
									<img src=${badgeData.imageURI}></canvas>
								</div>
								<div class="cardInfo">
								<h5><span class="awardName">Most Valuable Player Fall 2019</span><br/><span class="issuedDate">issued on 2/12/19</span></h5>
								</div>
					   		 </div>`);
							$(".badgeCard").on("click", function(event) {
								alert('hi');
								//Set Badge Image to Badge Stage
							});
						})
					})
				})
						$("#badgeUnlockStatus").text("Congratulations! Your has been unlocked!");
			} catch(err) {
					console.log(err);
					$("#badgeUnlockStatus").text("");
					$("#feedback").text("Wrong key... Please try again");
					}
		} else {
				$("#feedback").text("You already have this badge")
				$("#badgeUnlockStatus").text("");
		}
	});
		// });

		// 	console.log(getBadgesFromLocalStorage());
		// 	    	})
		// 	    })
		//     })
				
	

	// When a badge card is clicked load that badge onto the badge stage
	// $(".badgeCard").on('click', function(evt) {
	// 	// Get Badge Image Src
	// 	console.log(this);
	// 	//const badgeURI = $()
	// })
	
});

