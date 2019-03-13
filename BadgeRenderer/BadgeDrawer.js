let BadgeImageConfig = require("./badgeLayersConfig.js");

class BadgeDrawer {
	constructor(theCanvasId) {
		super();
		this.canvasId;
	}



	function mergeImageURIs(images) {
      return new Promise( (resolve, reject) => {
          var canvas = document.createElement('canvas');
          canvas.width = 1000; // desired width of merged images
          canvas.height = 1000; // desired height of merged images
          Promise.all(images.map(imageObj => add2canvas(canvas, imageObj))).then(() => resolve(canvas.toDataURL('image/png'), reject));
      });
  }

  function add2canvas(canvas, imageObj) {
    return new Promise( (resolve, reject) => {
       if (!imageObj || typeof imageObj != 'object') return reject();
       var x = imageObj.x && canvas.width ? (imageObj.x >=0 ? imageObj.x : canvas.width + imageObj.x) : 0;
       var y = imageObj.y && canvas.height ? (imageObj.y >=0 ? imageObj.y : canvas.height + imageObj.y) : 0;
       var image = new Image();
       image.onload = function () {
           canvas.getContext('2d').drawImage(this, x, y);
           resolve();
       };

       image.src = imageObj.src;
    });
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
}

module.exports = BadgeDrawer;