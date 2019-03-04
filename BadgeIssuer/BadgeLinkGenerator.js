class BadgeLinkGenerator {
	constructor(linkBase) {
		this.CryptoJS = require("crypto-js");
		this.linkBase = linkBase;
		this.keyValChars ="0123456789abcdefghijklmnopqrstuvwxyz"
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
   		 key += this.keyValChars[this.getRandomInt(this.keyValChars.length)]
  		}
  		return key;
  	}

  	getBadgeURL(hash, baseWebsiteURL) {
  		return `${baseWebsiteURL}?ebs=${hash}`;
 	 }

	getBadgeLinks(arrOfBadgeData, keyLength) {
		let arrOfOutput = [];
  		console.log(arrOfBadgeData);
  		

  		return arrOfBadgeData.map((badge) => {
  			let recipientEmail = badge.email;
  			let badgeKey = this.getRandomKey(keyLength);
  			let badgeData = {
	          recipientName: badge.recipientName,
	          badgeName: badge.badgeName,
	          badgeImage: badge.badgeImage
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
