const destination = "https://api.badgr.io/public/assertions/p9muDZCOTT-ikavmyWabcA.json?v=1_1"
const destination2 = "https://api.badgr.io/v2/assertions/p9muDZCOTT-ikavmyWabcA";
let badgeData;
$(() => {
   

   function apiGetAll (URL) {
   // console.log("Fetching stuff")
   let result;
   let badge = fetch(URL)
     .then(function(response) {
     	return response.json();
     	// h = badge;
     	// console.log(badge);
     	// return badge;
   	})
     .then((data) => {
		console.log(data);
		badgeData = data;
		$("#badgeImage").attr('src', badgeData.image);
		$("#badgeRecipient").text(badgeData["extensions:recipientProfile"].name);
	});
   return badge;
  }


	let holy = apiGetAll(destination);
	console.log(holy);

})







