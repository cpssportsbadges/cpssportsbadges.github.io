class BadgeLinkGenerator {
	constructor(linkBase) {
		this.CryptoJS = require("crypto-js");
		this.linkBase = linkBase;
		this.keyValChars =["0123456789","abcdefghijklmnopqrstuvwxyz"]
	}

	getRandomInt(arrLength) {//generates random int between 0 and one below the arr length
 	 	return Math.floor(Math.random() * arrLength); 
  	}

	getRandomKey(keyLength = 3)  {//Min of 3 char key
 		let key = '';
  		if (keyLength < 3) {
  		  keyLength = 3;
  		}
		
		for(let keyIdx = 0; keyIdx < keyLength; keyIdx++) {
   		 key += this.keyValChars[keyIdx % 2][this.getRandomInt(this.keyValChars[keyIdx % 2].length)]
  		}
  		return key;
  	}

  	getBadgeURL(hash, baseWebsiteURL) {
  		return `${baseWebsiteURL}?ebs=${hash}`;
 	 }

	getBadgeLinks(arrOfBadgeData, keyLength) {
		let arrOfOutput = [];
  		

  		return arrOfBadgeData.map((badge) => {
  			let recipientEmail = badge.recipientEmail;
  			let badgeKey = this.getRandomKey(keyLength);
  			

	        let badgeData = {};

	        for (var key in badge) {
   				 if (badge.hasOwnProperty(key) && key !== "recipientEmail") {
       			 	badgeData[key] = badge[key];
    			}
			}

	        let badgeDataString = JSON.stringify(badgeData);
	        let bytes = this.CryptoJS.AES.encrypt(badgeDataString, badgeKey);
	        let badgeHash = bytes.toString();
	        let badgeURL = this.getBadgeURL(badgeHash, this.linkBase);

	        return {email: recipientEmail, url: badgeURL, key: badgeKey}
  		});		
	}

}
module.exports = BadgeLinkGenerator;
