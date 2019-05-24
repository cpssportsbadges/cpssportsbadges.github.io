/*
	Name: badgeLayerConfig
	Description: 
		Contains links to the badge image layers
		PLEASE STORE IN ROOT DIRECTORY of BadgeRenderer/
	Created By: Joseph Varilla
	Last Edited: 5/16/2019
*/

const CertRenderConfig = [
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
					// scalex: 2.5,
					// scaley: 2.5,

					x: 130,
					y: 140,
					imagePath: BadgeImageConfig['sport']['v4'][badgeData.sport][1]
				},
				{
					type: "text",
					name: "date",
					fontSize: "30px",
					fontColor: "#012c5e",
					fontFamily: "SignatureScript",
					x: 540,//440,
					y: 740,//720, // 690,
					text: "May 16th, 2019"//badgeData.awardDate.to
				},
				{
					type: "text",
					name: "issuer",
					fontSize: "30px",
					fontColor: "#012c5e",
					fontFamily: "SignatureScript",
					x: 850,//440,
					y: 740, // 690,
					text: badgeData.issuerName
				},
				{
					type: "text",
					name: "recipientName",
					textAlign: "center",
					fontSize: "60px",
					fontColor: "#012c5e",
					fontFamily: "Verdana",//"Arial",
					x: 675,//440,
					y: 380, // 690,
					text: badgeData.recipientName
				},
				{
					type: "text",
					name: "awardName",
					fontSize: "42px",
					fontColor: "#012c5e",
					fontFamily: "Verdana",//"Helvetica",
					x: 675,//440,
					y: 450, // 690,
					text: badgeData.awardName
				},
				{
					type: "text",
					name: "date-label",
					textAlign: "center",
					fontSize: "24px",
					fontColor: "#012c5e",
					fontFamily: "Verdana",//"Arial",
					x: 440,//440,
					y: 765,
					text: "Date"
				},
				{
					type: "text",
					name: "issuerTitle",
					textAlign: "start",
					fontSize: "24px",
					fontColor: "#012c5e",
					fontFamily: "Verdana",//"Arial",
					x: 760,
					y: 765,
					text: badgeData.issuerTitle
				}

			]

module.exports = CertRenderConfig;