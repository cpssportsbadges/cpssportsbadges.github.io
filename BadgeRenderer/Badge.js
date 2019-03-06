
class Badge {
	constructor(badgeHash, badgeData) {
		this.hash = badgeHash;
		this.data = JSON.parse(badgeData);
	}

	get(prop) {
		return this.data[prop] || "property does not exist";  
	}

	getHtml() {
		return "<canvas></canvas>";
	}
}


module.exports Badge