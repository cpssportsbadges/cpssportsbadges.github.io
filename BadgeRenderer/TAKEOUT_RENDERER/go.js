let canvas = document.getElementById(canvasId); //document.getElementById("drawCanvas");
		//
	    let ctx = canvas.getContext("2d");

	    //Background
	    let background new Image();
	    background.src = BadgeImageConfig['background'][badgeData['conference']];
	    background.onload = function () {
				 ctx.drawImage(background, 0, 0);
			}

		//Sports
		let sport = new Image();
		sport.onload = function () {
			 ctx.drawImage(sport, 0, 0);
		}
		sport.src =  BadgeImageConfig['sport'][badgeData['sport']];
		
		// Overlay
		let overlay = new Image();
		overlay.onload = function () {
			ctx.drawImage(overlay, 0, 0);
		}
		overlay.src =  BadgeImageConfig['overlay'][badgeData['overlay']];
		
		//Text
		ctx.textAlign = "center"; 
		ctx.font = "36px Helvetica";
		ctx.fillStyle = "#ffffff"; 
		ctx.fillText(badgeData.badgeName, 400, 400);	//220
		ctx.font = "20px Helvetica"; 
		ctx.fillText(`Awarded to ${badgeData.recipientName}`, 400, 475);

	   	function dBackgroundLayer() {
	   		let background = new Image();
			background.onload = function () {
				 ctx.drawImage(background, 0, 0);
			}
			background.src = BadgeImageConfig['background'][badgeData['conference']];
			background.onload();
			
	   	}

	   	function dSportLayer() {
	   		let sport = new Image();
			sport.onload = function () {
				 ctx.drawImage(sport, 0, 0);
			}
			sport.src =  BadgeImageConfig['sport'][badgeData['sport']];
			sport.onload();
				
	   	}

	   	function dOverlayLayer() {
	   		let overlay = new Image();
			overlay.onload = function () {
   			ctx.drawImage(overlay, 0, 0);
			}
			overlay.src =  BadgeImageConfig['overlay'][badgeData['overlay']];
			overlay.onload();
			
	   	}

	   	function dTextLayer() {
	   		ctx.textAlign = "center"; 
    		ctx.font = "36px Helvetica";
    		ctx.fillStyle = "#ffffff"; 
			ctx.fillText(badgeData.badgeName, 400, 400);	//220
			ctx.font = "20px Helvetica"; 
    		ctx.fillText(`Awarded to ${badgeData.recipientName}`, 400, 475);
	   	}

	   	function paintBadge(callback1, callback2, callback3, callback4) {
	   		//let dataURI;
	   		// setTimeout(function(){ 
	   		// 	callback1() }, 500);

	   		// setTimeout(function() {
	   		// 	callback2()}, 1000);
	   		
	   		// setTimeout(function() {
	   		// 	callback3()}, 1500);

	   		// setTimeout(function() {
	   		// 	callback4()}, 2000);

	   		// setTimeout(function() {
	   		// 	dataURI = canvas.toDataURL("image/png")
	   		// }, 3000);

	   		
	   		callback1();
	   		callback2();
	   		callback3();
	   		callback4();

	   		return canvas.toDataURL("image/png");
	   		
	   	}